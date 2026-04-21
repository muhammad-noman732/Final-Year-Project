import type { NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { paymentController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return paymentController.createPaymentIntent(req)
})
