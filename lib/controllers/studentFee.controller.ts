import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import { NotFoundError } from "@/lib/utils/AppError"
import type { StudentFeeService } from "@/lib/services/studentFee.service"
import type { EmailService } from "@/lib/services/email.service"

export class StudentFeeController {
  constructor(
    private readonly studentFeeService: StudentFeeService,
    private readonly emailService: EmailService,
  ) {}

  async getMyFeeProfile() {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("STUDENT")

    const result = await this.studentFeeService.getMyFeeProfile(tenantId, userId)
    return successResponse(result)
  }

  async sendReceiptEmail(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("STUDENT")

    const body = await req.json() as { assignmentId: string }
    const profile = await this.studentFeeService.getMyFeeProfile(tenantId, userId)
    const assignment = profile.assignments.find((a) => a.id === body.assignmentId)

    if (!assignment) throw new NotFoundError("Fee assignment not found.")

    const completedPayment = assignment.payments.find((p) => p.status === "COMPLETED")
    if (!completedPayment) throw new NotFoundError("No completed payment found for this assignment.")

    await this.emailService.sendReceiptEmail({
      to: profile.student.user.email,
      studentName: profile.student.user.name,
      receiptNumber: completedPayment.receiptNumber,
      amount: assignment.amountDue,
      semester: assignment.feeStructure.semester,
      program: assignment.feeStructure.program.name,
      department: profile.student.department.name,
      paidAt: new Date(completedPayment.paidAt ?? new Date()),
      universityName: "Government College University Faisalabad",
    })

    return successResponse({ sent: true })
  }
}
