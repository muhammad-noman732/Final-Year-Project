import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { feeAssignmentController } from "@/lib/di"


export const POST = withErrorHandler(
  async (req: NextRequest, ctx?: { params: Promise<Record<string, string>> }) => {
    const params = await ctx!.params
    return feeAssignmentController.assignFee(req, params.id)
  },
)
