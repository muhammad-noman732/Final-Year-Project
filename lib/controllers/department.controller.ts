import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { DepartmentService } from "@/lib/services/department.service"
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  listDepartmentsQuerySchema,
} from "@/lib/validators/department.validators"
import {
  buildCachedFn,
  deptTag,
  revalidateDepartments,
  revalidatePrograms,
} from "@/lib/cache"

export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) { }

  async getDepartments(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "SUPER_ADMIN", "VC")
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listDepartmentsQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(key)
        const { tenantId: tid, ...q } = parsed
        return this.deptService.getDepartments(tid, q)
      },
      ["departments", queryKey],
      [deptTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
    return successResponse(result)
  }

  async getDepartment(id: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC", "HOD")
    const result = await this.deptService.getDepartment(tenantId, id)
    return successResponse(result)
  }

  async createDepartment(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = createDepartmentSchema.parse(body)

    const result = await this.deptService.createDepartment(tenantId, userId, data)

    // Bust server cache so next GET returns fresh data
    revalidateDepartments(tenantId)
    revalidatePrograms(tenantId) // programs reference departments

    return successResponse(result, 201)
  }

  async updateDepartment(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = updateDepartmentSchema.parse(body)

    const result = await this.deptService.updateDepartment(tenantId, userId, id, data)

    revalidateDepartments(tenantId)
    revalidatePrograms(tenantId)

    return successResponse(result)
  }
}
