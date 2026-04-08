import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { userController } from "@/lib/di"
import { logger } from "@/lib/logger"

export const GET = withErrorHandler(async (req: NextRequest) => {
  logger.info("GET /api/admin/users initiated")
  return await userController.getUsers(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  logger.info("POST /api/admin/users initiated")
  return await userController.createUser(req)
})
