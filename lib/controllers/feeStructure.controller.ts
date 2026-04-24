import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { FeeStructureService } from "@/lib/services/feeStructure.service"
import {
  createFeeStructureSchema,
  updateFeeStructureSchema,
  listFeeStructuresQuerySchema,
} from "@/lib/validators/admin.validators"
import {
  revalidateFeeStructures,
  revalidateAllStudentFees,
} from "@/lib/cache"

export class FeeStructureController {
  constructor(private readonly feeStructureService: FeeStructureService) { }

  async getFeeStructures(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listFeeStructuresQuerySchema.parse(searchParams)

    // No server-side unstable_cache here — the RTK Query client cache (invalidatesTags)
    // is the correct caching layer. Creating unstable_cache inside a request handler
    // produces a new function reference each time, defeating deduplication.
    const result = await this.feeStructureService.getFeeStructures(tenantId, query)
    return successResponse(result)
  }

  async getFeeStructure(id: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")
    const result = await this.feeStructureService.getFeeStructure(tenantId, id)
    return successResponse(result)
  }

  async createFeeStructure(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const data = createFeeStructureSchema.parse(body)

    const result = await this.feeStructureService.createFeeStructure(tenantId, userId, data)

    revalidateFeeStructures(tenantId)
    revalidateAllStudentFees(tenantId)

    return successResponse(result, 201)
  }

  async updateFeeStructure(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const data = updateFeeStructureSchema.parse(body)

    const result = await this.feeStructureService.updateFeeStructure(tenantId, userId, id, data)

    revalidateFeeStructures(tenantId)
    revalidateAllStudentFees(tenantId)

    return successResponse(result)
  }

  async deleteFeeStructure(id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    await this.feeStructureService.deleteFeeStructure(tenantId, userId, id)

    revalidateFeeStructures(tenantId)
    revalidateAllStudentFees(tenantId)

    return successResponse({ deleted: true })
  }
}
