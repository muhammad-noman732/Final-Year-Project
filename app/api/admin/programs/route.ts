import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { programController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await programController.getPrograms(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await programController.createProgram(req)
})
