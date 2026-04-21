import type { PrismaClient, WebhookEvent } from "@/app/generated/prisma/client"

export class WebhookRepository {
  constructor(private readonly db: PrismaClient) {}

  /**
   * Check if a webhook event has already been processed.
   */
  async findWebhookEvent(stripeEventId: string): Promise<WebhookEvent | null> {
    return this.db.webhookEvent.findUnique({
      where: { stripeEventId },
    })
  }

  /**
   * Create a webhook event record BEFORE processing.
   */
  async createWebhookEvent(data: {
    stripeEventId: string
    type: string
    tenantId: string | null
    rawPayload: string
  }): Promise<WebhookEvent> {
    return this.db.webhookEvent.create({
      data: {
        stripeEventId: data.stripeEventId,
        type: data.type,
        tenantId: data.tenantId,
        rawPayload: data.rawPayload,
        processed: false,
      },
    })
  }

  /**
   * Mark a webhook event as successfully processed.
   */
  async markWebhookProcessed(stripeEventId: string): Promise<void> {
    await this.db.webhookEvent.update({
      where: { stripeEventId },
      data: { processed: true, processedAt: new Date() },
    })
  }

  /**
   * Record that a webhook event's handler threw an error.
   */
  async markWebhookFailed(stripeEventId: string, reason: string): Promise<void> {
    await this.db.webhookEvent.update({
      where: { stripeEventId },
      data: {
        failedAt: new Date(),
        failureReason: reason.substring(0, 1000),
      },
    })
  }
}
