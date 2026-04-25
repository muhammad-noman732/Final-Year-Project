/**
 * Server-Sent Events broadcast helpers.
 *
 * Events are published via Redis pub/sub so they propagate correctly across
 * multiple Node.js processes and serverless Lambda instances. Each SSE client
 * (GET /api/vc/live) maintains its own Redis subscriber connection; the webhook
 * service calls broadcastPayment() to publish onto the shared channel.
 */

import { redisPublisher, sseChannel } from "@/lib/redis"
import type { SSEPaymentEvent } from "@/types/server/sse.types"

export type { SSEPaymentEvent }

/**
 * Publish a payment event to every SSE client listening on this tenant.
 * Errors are swallowed so a Redis hiccup never breaks the webhook handler.
 */
export async function broadcastPayment(
  tenantId: string,
  event: SSEPaymentEvent,
): Promise<void> {
  try {
    await redisPublisher.publish(sseChannel(tenantId), JSON.stringify(event))
  } catch (err) {
    console.error("[SSE] Failed to broadcast payment event via Redis:", err)
  }
}

export async function broadcastInsightsUpdated(tenantId: string): Promise<void> {
  try {
    await redisPublisher.publish(sseChannel(tenantId), JSON.stringify({ type: "InsightsUpdated" }))
  } catch (err) {
    console.error("[SSE] Failed to broadcast insights:updated event via Redis:", err)
  }
}
