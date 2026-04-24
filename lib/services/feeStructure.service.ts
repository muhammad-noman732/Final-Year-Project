import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, NotFoundError } from "@/lib/utils/AppError"
import type {
  FeeStructureRepository,
  FeeStructureRow,
} from "@/lib/repositories/feeStructure.repository"
import type { FeeAssignmentRepository } from "@/lib/repositories/feeAssignment.repository"
import type { StudentRepository } from "@/lib/repositories/student.repository"
import type { ProgramRepository } from "@/lib/repositories/program.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type { FeeAssignmentService } from "@/lib/services/feeAssignment.service"
import type {
  CreateFeeStructureInput,
  UpdateFeeStructureInput,
  ListFeeStructuresQuery,
} from "@/lib/validators/admin.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class FeeStructureService {
  constructor(
    private readonly feeStructureRepo: FeeStructureRepository,
    private readonly programRepo: ProgramRepository,
    private readonly auditService: AuditService,
    private readonly feeAssignmentService: FeeAssignmentService,
    private readonly feeAssignmentRepo: FeeAssignmentRepository,
    private readonly studentRepo: StudentRepository,
  ) { }

  //  List

  async getFeeStructures(
    tenantId: string,
    query: ListFeeStructuresQuery,
  ): Promise<PaginatedResult<FeeStructureRow>> {
    const where: Prisma.FeeStructureWhereInput = { tenantId }

    if (query.programId) where.programId = query.programId
    if (query.semester !== undefined) where.semester = query.semester
    if (query.sessionYear !== undefined) where.sessionYear = query.sessionYear
    if (query.isActive !== undefined) where.isActive = query.isActive

    const orderBy: Prisma.FeeStructureOrderByWithRelationInput[] = [
      { createdAt: "desc" },
      { id: "asc" },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.feeStructureRepo.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  //  Get Single

  async getFeeStructure(tenantId: string, id: string): Promise<FeeStructureRow> {
    const feeStructure = await this.feeStructureRepo.findById(tenantId, id)
    if (!feeStructure) throw new NotFoundError("Fee structure not found.")
    return feeStructure
  }

  //  Create

  async createFeeStructure(
    tenantId: string,
    adminUserId: string,
    input: CreateFeeStructureInput,
  ): Promise<FeeStructureRow> {
    // 1. Verify the program belongs to this tenant
    const program = await this.programRepo.findById(tenantId, input.programId)
    if (!program) {
      throw new NotFoundError(
        "Program not found or does not belong to your university.",
      )
    }

    // 2. Unique constraint: one fee structure per program + semester + sessionYear per tenant
    const existing = await this.feeStructureRepo.findByUnique(
      tenantId,
      input.programId,
      input.semester,
      input.sessionYear,
    )
    if (existing) {
      throw new ConflictError(
        "A fee structure for this program, semester, and session year already exists.",
      )
    }

    // 3. Persist
    const feeStructure = await this.feeStructureRepo.create({
      tenantId,
      programId: input.programId,
      semester: input.semester,
      sessionYear: input.sessionYear,
      tuitionFee: input.tuitionFee,
      labFee: input.labFee,
      libraryFee: input.libraryFee,
      sportsFee: input.sportsFee,
      registrationFee: input.registrationFee,
      examinationFee: input.examinationFee,
      otherFee: input.otherFee,
      totalFee: input.totalFee,
      dueDate: new Date(input.dueDate),
      lateFee: input.lateFee,
    })

    // 4. AUTOMATIC ASSIGNMENT: Assign to all matching active students immediately
    try {
      await this.feeAssignmentService.assignFee(tenantId, adminUserId, {
        feeStructureId: feeStructure.id,
      })
    } catch (assignError) {
      // We don't want to fail the whole creation if assignment fails (e.g., 0 students)
      logger.warn(
        {
          event: "fee_structure.auto_assign.failure",
          tenantId,
          feeStructureId: feeStructure.id,
          error: assignError,
        },
        "Auto-assignment failed after structure creation",
      )
    }

    // 5. Audit log (fire-and-forget)
    this._audit({
      tenantId,
      userId: adminUserId,
      action: "fee_structure.created",
      entity: "FeeStructure",
      entityId: feeStructure.id,
      newData: {
        programId: feeStructure.program.id,
        semester: feeStructure.semester,
        sessionYear: feeStructure.sessionYear,
        totalFee: feeStructure.totalFee,
        dueDate: feeStructure.dueDate,
      },
    })

    logger.info(
      {
        event: "fee_structure.create.success",
        tenantId,
        feeStructureId: feeStructure.id,
      },
      "Fee structure created successfully",
    )

    return feeStructure
  }

  //  Update

  async updateFeeStructure(
    tenantId: string,
    adminUserId: string,
    id: string,
    input: UpdateFeeStructureInput,
  ): Promise<FeeStructureRow> {
    const existing = await this.feeStructureRepo.findById(tenantId, id)
    if (!existing) throw new NotFoundError("Fee structure not found.")

    // Recompute totalFee if any fee component is being updated
    const mergedTuition = input.tuitionFee ?? existing.tuitionFee
    const mergedLab = input.labFee ?? existing.labFee
    const mergedLibrary = input.libraryFee ?? existing.libraryFee
    const mergedSports = input.sportsFee ?? existing.sportsFee
    const mergedRegistration = input.registrationFee ?? existing.registrationFee
    const mergedExamination = input.examinationFee ?? existing.examinationFee
    const mergedOther = input.otherFee ?? existing.otherFee

    const recomputedTotal =
      mergedTuition +
      mergedLab +
      mergedLibrary +
      mergedSports +
      mergedRegistration +
      mergedExamination +
      mergedOther

    const newTotal = input.totalFee ?? recomputedTotal
    const newDueDate = input.dueDate ? new Date(input.dueDate) : existing.dueDate

    const updated = await this.feeStructureRepo.update(id, tenantId, {
      ...(input.tuitionFee !== undefined && { tuitionFee: input.tuitionFee }),
      ...(input.labFee !== undefined && { labFee: input.labFee }),
      ...(input.libraryFee !== undefined && { libraryFee: input.libraryFee }),
      ...(input.sportsFee !== undefined && { sportsFee: input.sportsFee }),
      ...(input.registrationFee !== undefined && { registrationFee: input.registrationFee }),
      ...(input.examinationFee !== undefined && { examinationFee: input.examinationFee }),
      ...(input.otherFee !== undefined && { otherFee: input.otherFee }),
      ...(input.dueDate !== undefined && { dueDate: newDueDate }),
      ...(input.lateFee !== undefined && { lateFee: input.lateFee }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      totalFee: newTotal,
    })

    // Cascade to UNPAID/OVERDUE assignments when totalFee or dueDate changed
    const totalFeeChanged = newTotal !== existing.totalFee
    const dueDateChanged = newDueDate.getTime() !== existing.dueDate.getTime()

    if (totalFeeChanged || dueDateChanged) {
      const affected = await this.feeAssignmentRepo.findUnpaidByFeeStructure(tenantId, id)

      if (affected.length > 0) {
        await this.feeAssignmentRepo.updateUnpaidByFeeStructure(tenantId, id, {
          amountDue: newTotal,
          dueDate: newDueDate,
        })

        const affectedStudentIds = [...new Set(affected.map((a) => a.studentId))]
        await this.studentRepo.recalcFeeTotals(tenantId, affectedStudentIds)

        logger.info(
          {
            event: "fee_structure.update.cascade",
            tenantId,
            feeStructureId: id,
            updatedAssignments: affected.length,
            affectedStudents: affectedStudentIds.length,
          },
          "Cascaded fee structure update to UNPAID assignments",
        )
      }
    }

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "fee_structure.updated",
      entity: "FeeStructure",
      entityId: updated.id,
      oldData: {
        totalFee: existing.totalFee,
        dueDate: existing.dueDate,
        isActive: existing.isActive,
      },
      newData: {
        totalFee: updated.totalFee,
        dueDate: updated.dueDate,
        isActive: updated.isActive,
      },
    })

    logger.info(
      {
        event: "fee_structure.update.success",
        tenantId,
        feeStructureId: updated.id,
      },
      "Fee structure updated successfully",
    )

    return updated
  }

  //  Delete

  async deleteFeeStructure(
    tenantId: string,
    adminUserId: string,
    id: string,
  ): Promise<void> {
    const existing = await this.feeStructureRepo.findById(tenantId, id)
    if (!existing) throw new NotFoundError("Fee structure not found.")

    // Block deletion if any student has already paid against this structure
    const paidCount = await this.feeAssignmentRepo.countPaidByFeeStructure(tenantId, id)
    if (paidCount > 0) {
      throw new ConflictError(
        `Cannot delete: ${paidCount} student(s) have already paid or partially paid against this fee structure. Archive it (set isActive = false) instead.`,
      )
    }

    // Capture affected students before deletion for totals recalc
    const affected = await this.feeAssignmentRepo.findUnpaidByFeeStructure(tenantId, id)
    const affectedStudentIds = [...new Set(affected.map((a) => a.studentId))]

    // Delete UNPAID/OVERDUE assignments, then the structure itself
    await this.feeAssignmentRepo.deleteUnpaidByFeeStructure(tenantId, id)
    await this.feeStructureRepo.delete(id, tenantId)

    // Recalculate student totals so ghost fees are cleared immediately
    await this.studentRepo.recalcFeeTotals(tenantId, affectedStudentIds)

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "fee_structure.deleted",
      entity: "FeeStructure",
      entityId: id,
      oldData: {
        programId: existing.program.id,
        semester: existing.semester,
        sessionYear: existing.sessionYear,
        totalFee: existing.totalFee,
        deletedAssignments: affected.length,
        affectedStudents: affectedStudentIds.length,
      },
    })

    logger.info(
      {
        event: "fee_structure.delete.success",
        tenantId,
        feeStructureId: id,
        deletedAssignments: affected.length,
        affectedStudents: affectedStudentIds.length,
      },
      "Fee structure deleted successfully",
    )
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

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
