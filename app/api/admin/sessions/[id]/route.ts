import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { sessionController } from "@/lib/di"

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  return await sessionController.getSession(id)
})
