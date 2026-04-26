import { withErrorHandler } from "@/lib/utils/routeHandler"
import { notificationController } from "@/lib/di"
import type { NextRequest } from "next/server"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return notificationController.getNotifications(req)
})
