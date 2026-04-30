import { getTenantContext, requireRole } from "@/lib/auth"
import { hodService } from "@/lib/di"
import { createRedisSubscriber, sseChannel } from "@/lib/redis"

export async function GET() {
  const { tenantId, userId } = await getTenantContext()
  await requireRole("HOD")

  const department = await hodService.getHODDepartment(userId, tenantId)
  const channel = sseChannel(tenantId)
  const subscriber = createRedisSubscriber()
  const encoder = new TextEncoder()

  await subscriber.subscribe(channel)

  let keepaliveInterval: ReturnType<typeof setInterval> | null = null

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'))

      subscriber.on("message", (_ch: string, message: string) => {
        try {
          const event = JSON.parse(message) as { type: string; payload?: { department?: string } }
          if (event.type === "PaymentSuccess" && event.payload?.department !== department.code) return
          controller.enqueue(encoder.encode(`data: ${message}\n\n`))
        } catch {
          // Ignore malformed frames
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
