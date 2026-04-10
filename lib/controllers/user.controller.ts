import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { UserService } from "@/lib/services/user.service"
import {
  createUserSchema,
  updateUserSchema,
  listUsersQuerySchema,
} from "@/lib/validators/admin.validators"
import {
  buildCachedFn,
  userTag,
  revalidateUsers,
} from "@/lib/cache"

export class UserController {
  constructor(private readonly userService: UserService) { }

  async getUsers(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC") // HOD and Student shouldn't see all users

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listUsersQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(key)
        const { tenantId: tid, ...q } = parsed
        return this.userService.getUsers(tid, q)
      },
      ["users", queryKey],
      [userTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
    return successResponse(result)
  }

  async getUser(id: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")

    const result = await this.userService.getUser(tenantId, id)
    return successResponse(result)
  }

  async createUser(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN") // Only Admin creates VC/HOD

    const body = await req.json()
    const data = createUserSchema.parse(body)

    const result = await this.userService.createUser(tenantId, userId, data)

    revalidateUsers(tenantId)

    return successResponse(result, 201)
  }

  async updateUser(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const data = updateUserSchema.parse(body)

    const result = await this.userService.updateUser(tenantId, userId, id, data)

    revalidateUsers(tenantId)

    return successResponse(result)
  }

  async deleteUser(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const result = await this.userService.deleteUser(tenantId, userId, id)

    revalidateUsers(tenantId)

    return successResponse(result)
  }
}
