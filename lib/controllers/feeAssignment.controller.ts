import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import { revalidateFeeStructures } from "@/lib/cache"
import type { FeeAssignmentService } from "@/lib/services/feeAssignment.service"
import { assignFeeSchema } from "@/lib/validators/feeAssignment.validators"

//  Controller 
export class FeeAssignmentController {
  constructor(private readonly feeAssignmentService: FeeAssignmentService) { }

  async assignFee(req: NextRequest, feeStructureId: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const { studentIds } = assignFeeSchema.parse(body)

    const result = await this.feeAssignmentService.assignFee(
      tenantId,
      userId,
      { feeStructureId, studentIds },
    )

    // Revalidate fee structures cache — the _count.assignments count changes
    revalidateFeeStructures(tenantId)

    return successResponse(result, 200)
  }
}
