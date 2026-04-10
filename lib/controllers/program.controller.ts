import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { ProgramService } from "@/lib/services/program.service"
import {
  createProgramSchema,
  updateProgramSchema,
  listProgramsQuerySchema,
} from "@/lib/validators/program.validators"
import {
  buildCachedFn,
  programTag,
  revalidatePrograms,
} from "@/lib/cache"

export class ProgramController {
  constructor(private readonly programService: ProgramService) { }

  async getPrograms(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC", "HOD")
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listProgramsQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(key)
        const { tenantId: tid, ...q } = parsed
        return this.programService.getPrograms(tid, q)
      },
      ["programs", queryKey],
      [programTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
    return successResponse(result)
  }

  async getDepartmentPrograms(req: NextRequest, departmentId: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC", "HOD")
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listProgramsQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query, departmentId })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(key)
        const { tenantId: tid, ...q } = parsed
        return this.programService.getPrograms(tid, q)
      },
      ["programs-by-dept", queryKey],
      [programTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
    return successResponse(result)
  }

  async createProgram(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = createProgramSchema.parse(body)

    const result = await this.programService.createProgram(tenantId, userId, data)

    revalidatePrograms(tenantId)

    return successResponse(result, 201)
  }

  async updateProgram(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = updateProgramSchema.parse(body)

    const result = await this.programService.updateProgram(tenantId, userId, id, data)

    revalidatePrograms(tenantId)

    return successResponse(result)
  }
}
