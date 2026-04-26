import { withErrorHandler } from "@/lib/utils/routeHandler"
import { notificationController } from "@/lib/di"

export const GET = withErrorHandler(async () => {
  return notificationController.getUnreadCount()
})
