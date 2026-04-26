import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { VCService } from "@/lib/services/vc.service"
import {
  vcDashboardQuerySchema,
  vcStudentsQuerySchema,
} from "@/lib/validators/vc.validators"

export class VCController {
  constructor(private readonly vcService: VCService) {}

  async getDashboard(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("VC", "ADMIN")

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = vcDashboardQuerySchema.parse(searchParams)
    const result = await this.vcService.getDashboard(tenantId, query)

    return successResponse(result)
  }

  async getAnalytics(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("VC", "ADMIN")

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = vcDashboardQuerySchema.parse(searchParams)
    const result = await this.vcService.getAnalytics(tenantId, query)

    return successResponse(result)
  }

  async getStudents(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("VC", "ADMIN")

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = vcStudentsQuerySchema.parse(searchParams)
    const result = await this.vcService.getStudents(tenantId, query)

    return successResponse(result)
  }

  async getInsights(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("VC", "ADMIN")
    const module = req.nextUrl.searchParams.get("module") ?? "FEE"
    const result = await this.vcService.getInsights(tenantId, module)
    return successResponse(result)
  }

  async markInsightRead(_req: NextRequest, id: string) {
    const { tenantId: _ } = await getTenantContext()
    await requireRole("VC", "ADMIN")
    await this.vcService.markInsightRead(id)
    return successResponse({ marked: true })
  }
}
