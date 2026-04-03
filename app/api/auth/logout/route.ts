
import { withErrorHandler } from "@/lib/routeHandler"
import { authController } from "@/lib/di"

export const POST = withErrorHandler(async () => {
  return await authController.logout()
})
