

import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/routeHandler"
import { authController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await authController.login(req)
})
