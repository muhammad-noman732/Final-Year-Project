import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { sessionController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await sessionController.getSessions(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await sessionController.createSession(req)
})
