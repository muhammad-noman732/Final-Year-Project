import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { sessionController } from "@/lib/di"

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  if (!ctx) throw new Error("Route params are required.")
  const { id } = await ctx.params
  return await sessionController.getSession(id)
})
