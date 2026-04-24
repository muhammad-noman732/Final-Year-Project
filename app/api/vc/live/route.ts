import { getTenantContext, requireRole } from "@/lib/auth"
import { sseBroadcaster } from "@/lib/sse"

/**
 * GET /api/vc/live
 *
 * Server-Sent Events endpoint for real-time payment notifications.
 * Only accessible to VC and ADMIN roles.
 */
export async function GET() {
  const { tenantId } = await getTenantContext()
  await requireRole("VC", "ADMIN")

  let interval: ReturnType<typeof setInterval> | null = null
  let clientRef: { controller: ReadableStreamDefaultController; tenantId: string } | null = null

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode("data: {\"type\":\"connected\"}\n\n"),
      )

      clientRef = sseBroadcaster.addClient(controller, tenantId)

      interval = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"))
        } catch {
          clearInterval(interval!)
          if (clientRef) {
            sseBroadcaster.removeClient(clientRef)
            clientRef = null
          }
        }
      }, 30_000)
    },
    cancel() {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      if (clientRef) {
        sseBroadcaster.removeClient(clientRef)
        clientRef = null
      }
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
