import { withErrorHandler } from "@/lib/utils/routeHandler"
import { notificationController } from "@/lib/di"

export const PATCH = withErrorHandler(async () => {
  return notificationController.markAllRead()
})
