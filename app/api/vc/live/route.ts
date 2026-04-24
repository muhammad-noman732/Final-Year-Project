import { getTenantContext, requireRole } from "@/lib/auth"
import { createRedisSubscriber, sseChannel } from "@/lib/redis"

/**
 * GET /api/vc/live
 *
 * Server-Sent Events endpoint for real-time payment notifications.
 * Each connection creates its own Redis subscriber so events are delivered
 * correctly regardless of how many server processes are running.
 */
export async function GET() {
  const { tenantId } = await getTenantContext()
  await requireRole("VC", "ADMIN")

  const channel = sseChannel(tenantId)
  const subscriber = createRedisSubscriber()
  const encoder = new TextEncoder()

  // Subscribe before the stream opens so no events are missed during setup
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
