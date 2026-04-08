import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { programController } from "@/lib/di"

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  return await programController.updateProgram(req, id)
})
