import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { StudentFeeService } from "@/lib/services/studentFee.service"
import {
  buildCachedFn,
  studentFeeTag,
  allStudentFeesTag,
} from "@/lib/cache"

export class StudentFeeController {
  constructor(private readonly studentFeeService: StudentFeeService) { }

  async getMyFeeProfile() {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("STUDENT")

    // Cache per-student (userId) + tenant-wide tag so either a targeted
    // revalidateStudentFee() or a bulk revalidateAllStudentFees() busts it.
    const getCached = buildCachedFn(
      async (uid: string, tid: string) =>
        this.studentFeeService.getMyFeeProfile(tid, uid),
      ["student-fee-profile", userId, tenantId],
      [studentFeeTag(tenantId, userId), allStudentFeesTag(tenantId)],
      60,
    )

    const result = await getCached(userId, tenantId)
    return successResponse(result)
  }
}
