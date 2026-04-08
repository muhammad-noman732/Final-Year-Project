import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { userController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await userController.getUsers(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await userController.createUser(req)
})
