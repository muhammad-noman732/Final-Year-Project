import { type NextRequest } from "next/server"
import { UnauthorizedError } from "@/lib/utils/AppError"
import { successResponse } from "@/lib/utils/ApiResponse"
import { broadcastInsightsUpdated } from "@/lib/sse"
import type { TenantService } from "@/lib/services/tenant.service"
import type { VCService } from "@/lib/services/vc.service"

export class CronController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly vcService: VCService
  ) {}

  async processFeeInsights(req: NextRequest) {
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret) {
      const auth = req.headers.get("authorization")
      const secret = req.nextUrl.searchParams.get("secret")
      if (auth !== `Bearer ${cronSecret}` && secret !== cronSecret) {
        throw new UnauthorizedError("Unauthorized cron trigger")
      }
    }

    const allTenants = await this.tenantService.getAllTenants()
    const tenants = allTenants.filter((t) => t.isActive)

    let processed = 0
    for (const tenant of tenants) {
      try {
        await this.vcService.computeFeeInsights(tenant.id)
        await this.broadcastInsights(tenant.id)
        processed++
      } catch (err) {
        console.error(`[Cron] Failed to compute insights for tenant ${tenant.id}:`, err)
      }
    }

    return successResponse({ tenantsProcessed: processed })
  }

  // Small wrapper to allow testing/mocking if needed
  private async broadcastInsights(tenantId: string) {
    await broadcastInsightsUpdated(tenantId)
  }
}
