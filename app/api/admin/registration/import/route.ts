import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { registrationController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return registrationController.importCsv(req)
})
