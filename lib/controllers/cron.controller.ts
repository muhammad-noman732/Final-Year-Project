import { type NextRequest } from "next/server"
import { UnauthorizedError } from "@/lib/utils/AppError"
import { successResponse } from "@/lib/utils/ApiResponse"
import { broadcastInsightsUpdated } from "@/lib/sse"
import type { TenantService } from "@/lib/services/tenant.service"
import type { VCService } from "@/lib/services/vc.service"
import type { RegistrationService } from "@/lib/services/registration.service"
import { logger } from "@/lib/logger"

export class CronController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly vcService: VCService,
    private readonly registrationService: RegistrationService,
  ) {}

  async processFeeInsights(req: NextRequest) {
    this.verifyCronSecret(req)

    const allTenants = await this.tenantService.getAllTenants()
    const tenants = allTenants.filter((t) => t.isActive)

    let processed = 0
    for (const tenant of tenants) {
      try {
        await this.vcService.computeFeeInsights(tenant.id)
        await broadcastInsightsUpdated(tenant.id)
        processed++
      } catch (err) {
        logger.error({ err, tenantId: tenant.id }, "[Cron] Failed to compute fee insights")
      }
    }

    return successResponse({ tenantsProcessed: processed })
  }

  async processRegistrationInsights(req: NextRequest) {
    this.verifyCronSecret(req)

    const allTenants = await this.tenantService.getAllTenants()
    const tenants = allTenants.filter((t) => t.isActive)

    let processed = 0
    for (const tenant of tenants) {
      try {
        await this.registrationService.computeRegistrationInsights(tenant.id)
        processed++
      } catch (err) {
        logger.error({ err, tenantId: tenant.id }, "[Cron] Failed to compute registration insights")
      }
    }

    return successResponse({ tenantsProcessed: processed })
  }

  private verifyCronSecret(req: NextRequest) {
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret) {
      const auth = req.headers.get("authorization")
      const secret = req.nextUrl.searchParams.get("secret")
      if (auth !== `Bearer ${cronSecret}` && secret !== cronSecret) {
        throw new UnauthorizedError("Unauthorized cron trigger")
      }
    }
  }
}
