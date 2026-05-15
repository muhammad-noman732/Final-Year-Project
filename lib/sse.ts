
import { redisPublisher, sseChannel, notificationChannel } from "@/lib/redis"
import type { SSEPaymentEvent, SSERegistrationImportedEvent } from "@/types/server/sse.types"

export type { SSEPaymentEvent }

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
