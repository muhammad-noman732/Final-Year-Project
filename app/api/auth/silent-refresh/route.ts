import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { authController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return authController.silentRefresh(req)
})
