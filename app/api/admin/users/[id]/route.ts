import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { userController } from "@/lib/di"
import { logger } from "@/lib/logger"

export const GET = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  logger.info({ adminUserId: id }, "GET /api/admin/users/[id] initiated")
  return await userController.getUser(id)
})

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  logger.info({ adminUserId: id }, "PATCH /api/admin/users/[id] initiated")
  return await userController.updateUser(req, id)
})

export const DELETE = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  logger.info({ adminUserId: id }, "DELETE /api/admin/users/[id] initiated")
  return await userController.deleteUser(req, id)
})
