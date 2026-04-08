import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { programController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  return await programController.getDepartmentPrograms(req, id)
})
