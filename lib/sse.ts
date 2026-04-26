/**
 * Server-Sent Events broadcast helpers.
 *
 * Events are published via Redis pub/sub so they propagate correctly across
 * multiple Node.js processes and serverless Lambda instances. Each SSE client
 * (GET /api/vc/live) maintains its own Redis subscriber connection; the webhook
 * service calls broadcastPayment() to publish onto the shared channel.
 */

import { redisPublisher, sseChannel, notificationChannel } from "@/lib/redis"
import type { SSEPaymentEvent, SSERegistrationImportedEvent } from "@/types/server/sse.types"

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

/**
 * Publish a NewNotification ping to a specific user's SSE stream.
 * The client reacts by invalidating its RTK Query notification cache.
 * Errors are swallowed so notification failures never break payment processing.
 */
export async function broadcastRegistrationImported(
  tenantId: string,
  payload: SSERegistrationImportedEvent["payload"],
): Promise<void> {
  try {
    const event: SSERegistrationImportedEvent = { type: "RegistrationImported", payload }
    await redisPublisher.publish(sseChannel(tenantId), JSON.stringify(event))
  } catch (err) {
    console.error("[SSE] Failed to broadcast registration:imported event via Redis:", err)
  }
}

export async function broadcastNotification(userId: string, _payload: unknown): Promise<void> {
  try {
    await redisPublisher.publish(
      notificationChannel(userId),
      JSON.stringify({ type: "NewNotification" }),
    )
  } catch (err) {
    console.error("[SSE] Failed to broadcast notification event via Redis:", err)
  }
}
