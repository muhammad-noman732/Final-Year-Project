import type { NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentFeeController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return studentFeeController.sendReceiptEmail(req)
})
