import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import { ValidationError } from "@/lib/utils/AppError"
import type { RegistrationService } from "@/lib/services/registration.service"

export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  async importCsv(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const formData = await req.formData()
    const file = formData.get("file")

    if (!file || typeof file === "string") {
      throw new ValidationError("A CSV file must be uploaded under the field 'file'.")
    }

    const fileName = (file as File).name
    if (!fileName.toLowerCase().endsWith(".csv")) {
      throw new ValidationError("Only .csv files are accepted.")
    }

    const csvText = await (file as File).text()
    const result = await this.registrationService.importCsv(tenantId, userId, fileName, csvText)

    return successResponse(result)
  }

  async getStats(_req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("VC", "ADMIN")

    const stats = await this.registrationService.getRegistrationStats(tenantId)
    return successResponse(stats)
  }
}
