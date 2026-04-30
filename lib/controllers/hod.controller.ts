import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { HodService } from "@/lib/services/hod.service"
import { hodDashboardQuerySchema, hodStudentsQuerySchema } from "@/lib/validators/hod.validators"

export class HodController {
  constructor(private readonly hodService: HodService) {}

  async getDashboard(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("HOD")
    const params = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = hodDashboardQuerySchema.parse(params)
    const result = await this.hodService.getDashboard(tenantId, userId, query)
    return successResponse(result)
  }

  async getStudents(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("HOD")
    const params = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = hodStudentsQuerySchema.parse(params)
    const result = await this.hodService.getStudents(tenantId, userId, query)
    return successResponse(result)
  }
}
