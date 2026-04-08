import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, NotFoundError } from "@/lib/utils/AppError"
import type { DepartmentRepository, DepartmentRow } from "@/lib/repositories/department.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
  ListDepartmentsQuery,
} from "@/lib/validators/department.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class DepartmentService {
  constructor(
    private readonly deptRepo: DepartmentRepository,
    private readonly auditService: AuditService,
  ) { }

  async getDepartments(
    tenantId: string,
    query: ListDepartmentsQuery,
  ): Promise<PaginatedResult<DepartmentRow>> {
    //  Build WHERE 
    const where: Prisma.DepartmentWhereInput = { tenantId }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { code: { contains: query.search, mode: "insensitive" } },
      ]
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive
    }

    //  Build ORDER BY 
    const orderBy: Prisma.DepartmentOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortDir },
      { id: query.sortDir },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.deptRepo.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  async getDepartment(tenantId: string, id: string) {
    const dept = await this.deptRepo.findDetailById(tenantId, id)
    if (!dept) throw new NotFoundError("Department not found")
    return dept
  }

  async createDepartment(
    tenantId: string,
    userId: string,
    input: CreateDepartmentInput,
  ): Promise<DepartmentRow> {
    const existing = await this.deptRepo.findByCode(tenantId, input.code)
    if (existing) throw new ConflictError("A department with this code already exists.")

    const dept = await this.deptRepo.create({
      tenantId,
      name: input.name.trim(),
      code: input.code.toUpperCase().trim(),
    })

    this._audit({
      tenantId,
      userId,
      action: "department.created",
      entity: "Department",
      entityId: dept.id,
      newData: { name: dept.name, code: dept.code },
    })

    logger.info(
      {
        event: "department.create.success",
        tenantId,
        departmentId: dept.id,
      },
      "Department created successfully"
    )

    return dept
  }

  async updateDepartment(
    tenantId: string,
    userId: string,
    deptId: string,
    input: UpdateDepartmentInput,
  ): Promise<DepartmentRow> {
    const existing = await this.deptRepo.findById(tenantId, deptId)
    if (!existing) throw new NotFoundError("Department not found")

    const updated = await this.deptRepo.update(deptId, tenantId, {
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    })

    this._audit({
      tenantId,
      userId,
      action: "department.updated",
      entity: "Department",
      entityId: updated.id,
      oldData: { name: existing.name, isActive: existing.isActive },
      newData: { name: updated.name, isActive: updated.isActive },
    })

    logger.info(
      {
        event: "department.update.success",
        tenantId,
        departmentId: updated.id,
      },
      "Department updated successfully"
    )

    return updated
  }

  // Private
  private _audit(params: {
    tenantId: string
    userId: string
    action: string
    entity: string
    entityId: string
    oldData?: Record<string, unknown>
    newData?: Record<string, unknown>
  }): void {
    void this.auditService
      .log({ ...params, userRole: "ADMIN" })
  }
}
