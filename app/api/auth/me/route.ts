import { withErrorHandler } from "@/lib/utils/routeHandler"
import { authController } from "@/lib/di"

export const GET = withErrorHandler(async () => {
  return await authController.me()
})
