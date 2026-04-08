import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { programController } from "@/lib/di"

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  if (!ctx) throw new Error("Route params are required.")
  const { id } = await ctx.params
  return await programController.updateProgram(req, id)
})
