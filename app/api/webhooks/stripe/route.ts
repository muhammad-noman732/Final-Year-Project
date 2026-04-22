import type { NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { webhookController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return webhookController.handleWebhookRaw(req)
})
