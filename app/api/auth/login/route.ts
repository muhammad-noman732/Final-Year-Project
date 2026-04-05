import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { authController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await authController.login(req)
})
