import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { hodController } from "@/lib/di"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return hodController.getDashboard(req)
})
