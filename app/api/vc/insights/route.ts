import { withErrorHandler } from "@/lib/utils/routeHandler"
import { vcController } from "@/lib/di"
import type { NextRequest } from "next/server"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return vcController.getInsights(req)
})
