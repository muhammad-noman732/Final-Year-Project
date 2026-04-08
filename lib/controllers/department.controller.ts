import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { DepartmentService } from "@/lib/services/department.service"
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  listDepartmentsQuerySchema,
} from "@/lib/validators/department.validators"

export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) { }

  async getDepartments(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "SUPER_ADMIN", "VC")
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listDepartmentsQuerySchema.parse(searchParams)

    const result = await this.deptService.getDepartments(tenantId, query)
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
    return successResponse(result, 201)
  }

  async updateDepartment(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = updateDepartmentSchema.parse(body)

    const result = await this.deptService.updateDepartment(tenantId, userId, id, data)
    return successResponse(result)
  }
}
