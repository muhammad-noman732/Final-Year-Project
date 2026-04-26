import { getTenantContext } from "@/lib/auth"
import { createRedisSubscriber, notificationChannel } from "@/lib/redis"

/**
 * GET /api/notifications/stream
 *
 * Per-user SSE stream. Publishes a "NewNotification" ping whenever a notification
 * is written for this user. The client reacts by invalidating its RTK Query cache.
 */
export async function GET() {
  const { userId } = await getTenantContext()

  const channel = notificationChannel(userId)
  const subscriber = createRedisSubscriber()
  const encoder = new TextEncoder()

  await subscriber.subscribe(channel)

  let keepaliveInterval: ReturnType<typeof setInterval> | null = null

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'))

      subscriber.on("message", (_ch: string, message: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`))
        } catch {
          // Stream already closed — client disconnected before cancel() fired
        }
      })

      keepaliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"))
        } catch {
          if (keepaliveInterval) clearInterval(keepaliveInterval)
        }
      }, 30_000)
    },

    cancel() {
      if (keepaliveInterval) clearInterval(keepaliveInterval)
      void subscriber.unsubscribe()
      void subscriber.quit()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
