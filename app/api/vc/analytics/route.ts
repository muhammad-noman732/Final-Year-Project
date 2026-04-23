import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { vcController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return vcController.getAnalytics(req)
})
