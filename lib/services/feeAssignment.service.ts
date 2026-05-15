import { NotFoundError, ConflictError } from "@/lib/utils/AppError"
import type { StudentRepository, StudentRow } from "@/lib/repositories/student.repository"
import type { FeeStructureRepository } from "@/lib/repositories/feeStructure.repository"
import type { FeeAssignmentRepository } from "@/lib/repositories/feeAssignment.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type { NotificationService } from "@/lib/services/notification.service"
import { logger } from "@/lib/logger"

import type { AssignFeeInput } from "@/lib/validators/feeAssignment.validators"

export class FeeAssignmentService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly feeStructureRepo: FeeStructureRepository,
    private readonly feeAssignmentRepo: FeeAssignmentRepository,
    private readonly auditService: AuditService,
    private readonly notificationService: NotificationService,
  ) { }

    async assignFee(
    tenantId: string,
    adminUserId: string,
    input: AssignFeeInput,
  ): Promise<{ assigned: number; skipped: number }> {

    const feeStructure = await this.feeStructureRepo.findById(
      tenantId,
      input.feeStructureId,
    )
    if (!feeStructure) {
      throw new NotFoundError("Fee structure not found.")
    }
    if (!feeStructure.isActive) {
      throw new ConflictError("Cannot assign an inactive fee structure.")
    }

    let eligibleStudents: StudentRow[] = []

    if (input.studentIds && input.studentIds.length > 0) {

      const { data } = await this.studentRepo.findMany({
        where: {
          tenantId,
          id: { in: input.studentIds },
          programId: feeStructure.program.id,
          currentSemester: feeStructure.semester,
          enrollmentStatus: "ACTIVE",
        },
        orderBy: [{ createdAt: "desc" }],
        skip: 0,
        take: 5000,
      })
      eligibleStudents = data
    } else {

      const { data } = await this.studentRepo.findMany({
        where: {
          tenantId,
          programId: feeStructure.program.id,
          currentSemester: feeStructure.semester,
          enrollmentStatus: "ACTIVE",
        },
        orderBy: [{ createdAt: "desc" }],
        skip: 0,
        take: 5000,
      })
      eligibleStudents = data
    }

    if (eligibleStudents.length === 0) {
      return { assigned: 0, skipped: 0 }
    }

    const eligibleStudentIds = eligibleStudents.map((s) => s.id)

    const now = new Date()
    const records = eligibleStudentIds.map((studentId) => ({
      tenantId,
      studentId,
      feeStructureId: input.feeStructureId,
      amountDue: feeStructure.totalFee,
      amountPaid: 0,
      lateFeeApplied: 0,
      discountApplied: 0,
      status: "UNPAID" as const,
      dueDate: feeStructure.dueDate,
      createdAt: now,
      updatedAt: now,
    }))

    const assigned = await this.feeAssignmentRepo.bulkCreate(records)
    const skipped = eligibleStudentIds.length - assigned

    const studentUserIds = eligibleStudents.map((s) => s.user.id)
    this.notificationService
      .fanOut({
        tenantId,
        userIds: studentUserIds,
        type: "FEE_ASSIGNED",
        title: "Fee Assigned",
        body: `Your Semester ${feeStructure.semester} fee of PKR ${feeStructure.totalFee.toLocaleString()} has been assigned.`,
        data: {
          feeStructureId: input.feeStructureId,
          programName: feeStructure.program.name,
          semester: feeStructure.semester,
          amountDue: feeStructure.totalFee,
        },
      })
      .catch((err: unknown) => {
        logger.error(
          { event: "notification.fee_assigned.failed", err, tenantId },
          "Failed to send fee assignment notifications",
        )
      })

    this._audit({
      tenantId,
      userId: adminUserId,
      action: "fee_assignment.bulk_assigned",
      entity: "FeeAssignment",
      entityId: input.feeStructureId,
      newData: {
        feeStructureId: input.feeStructureId,
        program: feeStructure.program.name,
        semester: feeStructure.semester,
        sessionYear: feeStructure.sessionYear,
        totalFee: feeStructure.totalFee,
        assigned,
        skipped,
      },
    })

    logger.info(
      {
        event: "fee_assignment.bulk_assign.success",
        tenantId,
        feeStructureId: input.feeStructureId,
        assigned,
        skipped,
      },
      "Fee bulk assignment completed",
    )

    return { assigned, skipped }
  }

  private _audit(params: {
    tenantId: string
    userId: string
    action: string
    entity: string
    entityId: string
    newData?: Record<string, unknown>
  }): void {
    void this.auditService.log({ ...params, userRole: "ADMIN" })
  }
}
