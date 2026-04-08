import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, NotFoundError } from "@/lib/utils/AppError"
import type { StudentRepository, StudentRow } from "@/lib/repositories/student.repository"
import type { DepartmentRepository } from "@/lib/repositories/department.repository"
import type { ProgramRepository } from "@/lib/repositories/program.repository"
import type { AcademicSessionRepository } from "@/lib/repositories/academicSession.repository"
import type { TenantRepository } from "@/lib/repositories/tenant.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type { EmailService } from "@/lib/services/email.service"
import type {
  CreateStudentInput,
  UpdateStudentInput,
  ListStudentsQuery,
} from "@/lib/validators/admin.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class StudentService {
  private readonly BCRYPT_ROUNDS = 12

  private generateTempPassword(): string {
    return randomBytes(9).toString("base64url").slice(0, 12)
  }

  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly deptRepo: DepartmentRepository,
    private readonly programRepo: ProgramRepository,
    private readonly sessionRepo: AcademicSessionRepository,
    private readonly tenantRepo: TenantRepository,
    private readonly emailService: EmailService,
    private readonly auditService: AuditService,
  ) { }

  // List Students

  async getStudents(
    tenantId: string,
    query: ListStudentsQuery,
  ): Promise<PaginatedResult<StudentRow>> {
    const where: Prisma.StudentWhereInput = { tenantId }
    const andConditions: Prisma.StudentWhereInput[] = []

    if (query.departmentId) andConditions.push({ departmentId: query.departmentId })
    if (query.programId) andConditions.push({ programId: query.programId })
    if (query.sessionId) andConditions.push({ sessionId: query.sessionId })
    if (query.semester !== undefined) {
      andConditions.push({ currentSemester: query.semester })
    }
    if (query.enrollmentStatus) {
      andConditions.push({ enrollmentStatus: query.enrollmentStatus })
    }

    if (andConditions.length > 0) {
      where.AND = andConditions
    }

    const orderBy: Prisma.StudentOrderByWithRelationInput[] = [
      { createdAt: "desc" },
      { id: "asc" },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.studentRepo.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  // Get Single Student

  async getStudent(tenantId: string, id: string): Promise<StudentRow> {
    const student = await this.studentRepo.findById(tenantId, id)
    if (!student) throw new NotFoundError("Student not found.")
    return student
  }

  // Create Student (User + Student in $transaction)

  async createStudent(
    tenantId: string,
    adminUserId: string,
    input: CreateStudentInput,
  ): Promise<StudentRow> {
    // 1. Verify all FK references belong to this tenant — prevents cross-tenant injection.
    //    Run all three lookups in parallel for speed.
    const [dept, program, session, existingRollNo] = await Promise.all([
      this.deptRepo.findById(tenantId, input.departmentId),
      this.programRepo.findById(tenantId, input.programId),
      this.sessionRepo.findById(tenantId, input.sessionId),
      this.studentRepo.findByStudentId(tenantId, input.studentId),
    ])

    if (!dept) {
      throw new NotFoundError(
        "Department not found or does not belong to your university.",
      )
    }
    if (!program) {
      throw new NotFoundError(
        "Program not found or does not belong to your university.",
      )
    }
    if (!session) {
      throw new NotFoundError(
        "Academic session not found or does not belong to your university.",
      )
    }

    // 2. Conflict check — @@unique([tenantId, studentId])
    if (existingRollNo) {
      throw new ConflictError(
        "A student with this roll number already exists in your university.",
      )
    }

    // 3. Generate temp password and hash
    const emailNormalized = input.email.toLowerCase().trim()
    const tempPassword = this.generateTempPassword()
    const passwordHash = await bcrypt.hash(tempPassword, this.BCRYPT_ROUNDS)

    // 4. Persist — User + Student atomically (Rule 12: $transaction)
    const student = await this.studentRepo.createWithUser({
      userData: {
        tenantId,
        name: input.name.trim(),
        email: emailNormalized,
        phone: input.phone ?? null,
        role: "STUDENT",
        passwordHash,
        isFirstLogin: true,
        isActive: true,
      },
      studentData: {
        tenantId,
        studentId: input.studentId,
        cnic: input.cnic ?? null,
        sessionId: input.sessionId,
        departmentId: input.departmentId,
        programId: input.programId,
        currentSemester: input.currentSemester,
      },
    })

    // 5. Fetch tenant name for welcome email
    const tenant = await this.tenantRepo.findById(tenantId)
    const universityName = tenant?.name ?? "Your University"

    // 6. Send welcome email (fire-and-forget)
    // TODO: Replace with BullMQ `emails` queue → `welcome-email` job when queue worker is live
    this.emailService
      .sendWelcomeEmail({
        to: emailNormalized,
        name: student.user.name,
        role: "STUDENT",
        tempPassword,
        universityName,
      })
      .catch((err: unknown) => {
        logger.error(
          { err, studentId: student.id },
          "Failed to dispatch student welcome email",
        )
      })

    // 7. Audit log (fire-and-forget)
    this._audit({
      tenantId,
      userId: adminUserId,
      action: "student.created",
      entity: "Student",
      entityId: student.id,
      newData: {
        name: student.user.name,
        email: student.user.email,
        studentId: student.studentId,
        departmentId: student.department.id,
        programId: student.program.id,
      },
    })

    logger.info({ tenantId, studentId: student.id }, "Student created successfully")

    return student
  }

  // Update Student

  async updateStudent(
    tenantId: string,
    adminUserId: string,
    id: string,
    input: UpdateStudentInput,
  ): Promise<StudentRow> {
    const existing = await this.studentRepo.findById(tenantId, id)
    if (!existing) throw new NotFoundError("Student not found.")

    await this.studentRepo.update(tenantId, id, {
      ...(input.currentSemester !== undefined && {
        currentSemester: input.currentSemester,
      }),
      ...(input.enrollmentStatus !== undefined && {
        enrollmentStatus: input.enrollmentStatus,
      }),
      ...(input.cnic !== undefined && { cnic: input.cnic }),
    })

    // Persist optional user-level phone update on the linked User row.
    if (input.phone !== undefined) {
      await this.studentRepo.updateStudentUserPhone(tenantId, id, input.phone)
    }

    const updated = await this.studentRepo.findById(tenantId, id)
    if (!updated) throw new NotFoundError("Student not found.")

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "student.updated",
      entity: "Student",
      entityId: updated.id,
      oldData: {
        currentSemester: existing.currentSemester,
        enrollmentStatus: existing.enrollmentStatus,
      },
      newData: {
        currentSemester: updated.currentSemester,
        enrollmentStatus: updated.enrollmentStatus,
      },
    })

    logger.info({ tenantId, studentId: updated.id }, "Student updated successfully")

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
