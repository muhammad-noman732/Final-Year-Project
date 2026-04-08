import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, ForbiddenError, NotFoundError } from "@/lib/utils/AppError"
import type { UserRepository, AdminUserRow } from "@/lib/repositories/user.repository"
import type { DepartmentRepository } from "@/lib/repositories/department.repository"
import type { TenantRepository } from "@/lib/repositories/tenant.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type { EmailService } from "@/lib/services/email.service"
import type {
  CreateUserInput,
  UpdateUserInput,
  ListUsersQuery,
} from "@/lib/validators/admin.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class UserService {
  private readonly BCRYPT_ROUNDS = 12
  private readonly ALLOWED_ROLES = ["VC", "HOD"] as const

  private generateTempPassword(): string {
    return randomBytes(9).toString("base64url").slice(0, 12)
  }

  constructor(
    private readonly userRepo: UserRepository,
    private readonly deptRepo: DepartmentRepository,
    private readonly tenantRepo: TenantRepository,
    private readonly emailService: EmailService,
    private readonly auditService: AuditService,
  ) { }

  // List Users

  async getUsers(
    tenantId: string,
    query: ListUsersQuery,
  ): Promise<PaginatedResult<AdminUserRow>> {
    const where: Prisma.UserWhereInput = {
      tenantId,
      // Only return VC and HOD — students have their own endpoint
      role: query.role ? query.role : { in: ["VC", "HOD"] },
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive
    }

    const orderBy: Prisma.UserOrderByWithRelationInput[] = [
      { createdAt: "desc" },
      { id: "asc" },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.userRepo.adminFindMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  // Create User (VC or HOD)

  async createUser(
    tenantId: string,
    adminUserId: string,
    input: CreateUserInput,
  ): Promise<AdminUserRow> {
    // 1. Role guard — only VC and HOD are permitted here
    if (!this.ALLOWED_ROLES.includes(input.role as (typeof this.ALLOWED_ROLES)[number])) {
      throw new ForbiddenError(
        "Role must be VC or HOD. Students are created via /api/admin/students.",
      )
    }

    // 2. Conflict check — @@unique([tenantId, email])
    const emailNormalized = input.email.toLowerCase().trim()
    const existing = await this.userRepo.adminFindByEmail(tenantId, emailNormalized)
    if (existing) {
      throw new ConflictError(
        "A user with this email already exists in your university.",
      )
    }

    // 3. If HOD — verify the department belongs to this tenant
    if (input.role === "HOD" && input.hodDepartmentId) {
      const dept = await this.deptRepo.findById(tenantId, input.hodDepartmentId)
      if (!dept) {
        throw new NotFoundError(
          "Department not found or does not belong to your university.",
        )
      }
    }

    // 4. Generate temp password and hash
    const tempPassword = this.generateTempPassword()
    const passwordHash = await bcrypt.hash(tempPassword, this.BCRYPT_ROUNDS)

    // 5. Persist the new user
    const user = await this.userRepo.adminCreate({
      tenantId,
      name: input.name.trim(),
      email: emailNormalized,
      phone: input.phone ?? null,
      role: input.role,
      passwordHash,
      isFirstLogin: true,
      isActive: true,
      hodDepartmentId: input.role === "HOD" ? (input.hodDepartmentId ?? null) : null,
    })

    // 6. Fetch tenant name for welcome email
    const tenant = await this.tenantRepo.findById(tenantId)
    const universityName = tenant?.name ?? "Your University"

    // 7. Send welcome email (fire-and-forget — never block the response)
    // TODO: Replace with BullMQ `emails` queue → `welcome-email` job when queue worker is live
    this.emailService
      .sendWelcomeEmail({
        to: emailNormalized,
        name: user.name,
        role: user.role,
        tempPassword,
        universityName,
      })
      .catch((err: unknown) => {
        logger.error({ err, userId: user.id }, "Failed to dispatch welcome email")
      })

    // 8. Audit log (fire-and-forget)
    this._audit({
      tenantId,
      userId: adminUserId,
      action: "user.created",
      entity: "User",
      entityId: user.id,
      newData: { name: user.name, email: user.email, role: user.role },
    })

    logger.info({ tenantId, userId: user.id, role: user.role }, "User created successfully")

    return user
  }

  async getUser(tenantId: string, id: string): Promise<AdminUserRow> {
    const user = await this.userRepo.adminFindById(tenantId, id)
    if (!user) throw new NotFoundError("User not found.")
    return user
  }

  // Update User

  async updateUser(
    tenantId: string,
    adminUserId: string,
    userId: string,
    input: UpdateUserInput,
  ): Promise<AdminUserRow> {
    const existing = await this.userRepo.adminFindById(tenantId, userId)
    if (!existing) throw new NotFoundError("User not found.")

    // If reassigning HOD department, verify the new dept belongs to this tenant
    if (input.hodDepartmentId !== undefined && existing.role === "HOD") {
      const dept = await this.deptRepo.findById(tenantId, input.hodDepartmentId)
      if (!dept) {
        throw new NotFoundError(
          "Department not found or does not belong to your university.",
        )
      }
    }

    const updated = await this.userRepo.adminUpdate(tenantId, userId, {
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.hodDepartmentId !== undefined && {
        hodDepartmentId: input.hodDepartmentId,
      }),
    })

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "user.updated",
      entity: "User",
      entityId: updated.id,
      oldData: { name: existing.name, isActive: existing.isActive },
      newData: { name: updated.name, isActive: updated.isActive },
    })

    logger.info({ tenantId, userId: updated.id, role: updated.role }, "User updated successfully")

    return updated
  }

  // Soft Delete

  /**
   * Soft delete: sets isActive=false. Records are NEVER hard-deleted.
   * Rule: Only deactivate — never DELETE from the database.
   */
  async deleteUser(
    tenantId: string,
    adminUserId: string,
    userId: string,
  ): Promise<AdminUserRow> {
    const existing = await this.userRepo.adminFindById(tenantId, userId)
    if (!existing) throw new NotFoundError("User not found.")

    const updated = await this.userRepo.adminUpdate(tenantId, userId, {
      isActive: false,
    })

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "user.deactivated",
      entity: "User",
      entityId: updated.id,
      oldData: { isActive: true },
      newData: { isActive: false },
    })

    logger.info({ tenantId, userId: updated.id, role: updated.role }, "User deleted (deactivated) successfully")

    return updated
  }

  // Private helpers

  private _audit(params: {
    tenantId: string
    userId: string
    action: string
    entity: string
    entityId: string
    oldData?: Record<string, unknown>
    newData?: Record<string, unknown>
  }): void {
    void this.auditService.log({ ...params, userRole: "ADMIN" })
  }
}
