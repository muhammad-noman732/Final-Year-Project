import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { cronController } from "@/lib/di"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return cronController.processRegistrationInsights(req)
})
