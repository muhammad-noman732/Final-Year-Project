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
  buildCachedFn,
  feeStructureTag,
  revalidateFeeStructures,
} from "@/lib/cache"

export class FeeStructureController {
  constructor(private readonly feeStructureService: FeeStructureService) { }

  async getFeeStructures(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listFeeStructuresQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(queryKey)
        const { tenantId: tid, ...q } = parsed
        return this.feeStructureService.getFeeStructures(tid, q)
      },
      ["fee-structures", queryKey],
      [feeStructureTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
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

    return successResponse(result, 201)
  }

  async updateFeeStructure(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const data = updateFeeStructureSchema.parse(body)

    const result = await this.feeStructureService.updateFeeStructure(tenantId, userId, id, data)

    revalidateFeeStructures(tenantId)

    return successResponse(result)
  }
}
