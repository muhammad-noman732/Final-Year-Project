import { successResponse } from "@/lib/utils/ApiResponse"
import type { WebhookService } from "@/lib/services/webhook.service"
import { ValidationError } from "@/lib/utils/AppError"

import type { NextRequest } from "next/server"

export class WebhookController {
  constructor(private readonly webhookService: WebhookService) { }


  async handleWebhookRaw(req: NextRequest) {
    const signature = req.headers.get("stripe-signature")
    if (!signature) {
      throw new ValidationError("Missing stripe-signature header")
    }

    const rawBody = await req.text()

    await this.webhookService.processWebhookEvent(rawBody, signature)
    return successResponse({ received: true })
  }
}
