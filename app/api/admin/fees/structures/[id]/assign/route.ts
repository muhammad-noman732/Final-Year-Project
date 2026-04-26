import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { feeAssignmentController } from "@/lib/di"


export const POST = withErrorHandler(
  async (req: NextRequest, ctx) => {
    if (!ctx) throw new Error("Route params are required.")
    const { id } = await ctx.params
    return feeAssignmentController.assignFee(req, id)
  },
)
