import { withErrorHandler } from "@/lib/utils/routeHandler"
import { notificationController } from "@/lib/di"
import type { NextRequest } from "next/server"

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  if (!ctx) throw new Error("Route params are required.")
  const { id } = await ctx.params
  return notificationController.markRead(id)
})
