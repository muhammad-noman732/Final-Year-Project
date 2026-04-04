import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/response"
import { getAuthUser } from "@/lib/auth"
import { UnauthorizedError } from "@/lib/errors"
import type { TenantService } from "@/lib/services/tenant.service"
import { onboardTenantSchema } from "@/lib/validators/superadmin.validators"

export class SuperAdminController {
  constructor(private readonly tenantService: TenantService) { }

  async onboardTenant(req: NextRequest) {
    const authUser = await getAuthUser()
    if (authUser.role !== "SUPER_ADMIN") {
      throw new UnauthorizedError("Only Super Admins can onboard universities.")
    }

    const body = await req.json()
    const data = onboardTenantSchema.parse(body)

    const result = await this.tenantService.onboardNewUniversity(data, authUser.userId)
    return successResponse(result, 201)
  }
}
