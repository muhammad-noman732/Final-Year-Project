import { NotFoundError } from "@/lib/utils/AppError"
import type {
  StudentRepository,
  StudentRow,
} from "@/lib/repositories/student.repository"
import type {
  FeeAssignmentRepository,
  FeeAssignmentRow,
} from "@/lib/repositories/feeAssignment.repository"
import { logger } from "@/lib/logger"

import type { StudentFeeProfile } from "@/types/server/student.types"

export class StudentFeeService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly feeAssignmentRepo: FeeAssignmentRepository,
  ) { }

  async getMyFeeProfile(
    tenantId: string,
    userId: string,
  ): Promise<StudentFeeProfile> {

    const student = await this.studentRepo.findByUserId(tenantId, userId)
    if (!student) {
      throw new NotFoundError(
        "Student profile not found. Please contact your university admin.",
      )
    }

    const assignments = await this.feeAssignmentRepo.findByStudent(
      tenantId,
      student.id,
    )

    const totalAssigned = assignments.reduce((s, a) => s + a.amountDue, 0)
    const totalPaid = assignments.reduce((s, a) => s + a.amountPaid, 0)
    const totalOutstanding = totalAssigned - totalPaid
    const hasOverdue = assignments.some(
      (a) => a.status === "OVERDUE",
    )

    const currentAssignment =
      assignments.find(
        (a) => a.status === "UNPAID" || a.status === "OVERDUE",
      ) ?? null

    logger.info(
      {
        event: "student_fee.profile.loaded",
        tenantId,
        studentId: student.id,
        assignmentCount: assignments.length,
      },
      "Student fee profile loaded",
    )

    return {
      student,
      assignments,
      summary: {
        totalAssigned,
        totalPaid,
        totalOutstanding,
        hasOverdue,
        currentAssignment,
      },
    }
  }
}
