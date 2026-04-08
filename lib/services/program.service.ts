import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, NotFoundError } from "@/lib/utils/AppError"
import type { ProgramRepository, ProgramRow } from "@/lib/repositories/program.repository"
import type { DepartmentRepository } from "@/lib/repositories/department.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type {
  CreateProgramInput,
  UpdateProgramInput,
  ListProgramsQuery,
} from "@/lib/validators/program.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class ProgramService {
  constructor(
    private readonly programRepo: ProgramRepository,
    private readonly deptRepo: DepartmentRepository,
    private readonly auditService: AuditService,
  ) { }

  async getPrograms(
    tenantId: string,
    query: ListProgramsQuery,
  ): Promise<PaginatedResult<ProgramRow>> {

    if (query.departmentId) {
      const dept = await this.deptRepo.findById(tenantId, query.departmentId)
      if (!dept) throw new NotFoundError("Department not found")
    }

    //  Build WHERE
    const where: Prisma.ProgramWhereInput = { tenantId }
    const andConditions: Prisma.ProgramWhereInput[] = []

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { code: { contains: query.search, mode: "insensitive" } },
      ]
    }

    if (query.departmentId) andConditions.push({ departmentId: query.departmentId })
    if (query.isActive !== undefined) andConditions.push({ isActive: query.isActive })
    if (query.degreeType) andConditions.push({ degreeType: query.degreeType })

    if (andConditions.length > 0) {
      where.AND = andConditions
    }

    //  Build ORDER BY
    const orderBy: Prisma.ProgramOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortDir },
      { id: query.sortDir },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.programRepo.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  async getProgram(tenantId: string, id: string): Promise<ProgramRow> {
    const program = await this.programRepo.findById(tenantId, id)
    if (!program) throw new NotFoundError("Program not found")
    return program
  }

  async createProgram(
    tenantId: string,
    userId: string,
    input: CreateProgramInput,
  ): Promise<ProgramRow> {
    // Two independent lookups — run in parallel
    const [dept, existing] = await Promise.all([
      this.deptRepo.findById(tenantId, input.departmentId),
      this.programRepo.findByCode(tenantId, input.code),
    ])

    if (!dept) throw new NotFoundError("Department not found")
    if (existing) throw new ConflictError("A program with this code already exists.")

    const program = await this.programRepo.create({
      tenantId,
      departmentId: input.departmentId,
      name: input.name.trim(),
      code: input.code.toUpperCase().trim(),
      degreeType: input.degreeType,
      durationYears: input.durationYears,
      totalSemesters: input.totalSemesters,
    })

    this._audit({
      tenantId,
      userId,
      action: "program.created",
      entity: "Program",
      entityId: program.id,
      newData: { name: program.name, code: program.code, departmentId: program.departmentId },
    })

    logger.info({ tenantId, programId: program.id }, "Program created successfully")

    return program
  }

  async updateProgram(
    tenantId: string,
    userId: string,
    programId: string,
    input: UpdateProgramInput,
  ): Promise<ProgramRow> {
    const existing = await this.programRepo.findById(tenantId, programId)
    if (!existing) throw new NotFoundError("Program not found")

    const updated = await this.programRepo.update(programId, tenantId, {
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.degreeType !== undefined && { degreeType: input.degreeType }),
      ...(input.durationYears !== undefined && { durationYears: input.durationYears }),
      ...(input.totalSemesters !== undefined && { totalSemesters: input.totalSemesters }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    })

    this._audit({
      tenantId,
      userId,
      action: "program.updated",
      entity: "Program",
      entityId: updated.id,
      oldData: {
        name: existing.name,
        isActive: existing.isActive,
        durationYears: existing.durationYears,
        totalSemesters: existing.totalSemesters,
      },
      newData: {
        name: updated.name,
        isActive: updated.isActive,
        durationYears: updated.durationYears,
        totalSemesters: updated.totalSemesters,
      },
    })

    logger.info({ tenantId, programId: updated.id }, "Program updated successfully")

    return updated
  }

  //  Private 
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
