
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { authController } from "@/lib/di"

export const POST = withErrorHandler(async () => {
  return await authController.logout()
})
