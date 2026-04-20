import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { StudentFeeService } from "@/lib/services/studentFee.service"
import {
  buildCachedFn,
  studentFeeTag,
} from "@/lib/cache"

export class StudentFeeController {
  constructor(private readonly studentFeeService: StudentFeeService) { }

  async getMyFeeProfile() {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("STUDENT")

    // Cache per-student using userId (not studentId) as the key component.
    // TTL: 300s = 5 minutes. Invalidated when fee is assigned or payment confirmed.
    const getCached = buildCachedFn(
      async (uid: string, tid: string) =>
        this.studentFeeService.getMyFeeProfile(tid, uid),
      ["student-fee-profile", userId, tenantId],
      [studentFeeTag(tenantId, userId)],
      300,
    )

    const result = await getCached(userId, tenantId)
    return successResponse(result)
  }
}
