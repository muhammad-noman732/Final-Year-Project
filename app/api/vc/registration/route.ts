import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { registrationController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return registrationController.getStats(req)
})
