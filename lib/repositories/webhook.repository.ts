import type { PrismaClient, WebhookEvent } from "@/app/generated/prisma/client"

export class WebhookRepository {
  constructor(private readonly db: PrismaClient) {}

    async findWebhookEvent(stripeEventId: string): Promise<WebhookEvent | null> {
    return this.db.webhookEvent.findUnique({
      where: { stripeEventId },
    })
  }

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

    async markWebhookProcessed(stripeEventId: string): Promise<void> {
    await this.db.webhookEvent.update({
      where: { stripeEventId },
      data: { processed: true, processedAt: new Date() },
    })
  }

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
