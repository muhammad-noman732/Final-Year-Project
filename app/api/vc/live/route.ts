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

  const stream = new ReadableStream({
    start(controller) {
      // Send initial heartbeat so the client knows the connection is alive
      controller.enqueue(
        new TextEncoder().encode("data: {\"type\":\"connected\"}\n\n"),
      )

      const client = sseBroadcaster.addClient(controller, tenantId)

      // Keep-alive ping every 30 seconds to prevent proxy/browser timeout
      const interval = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"))
        } catch {
          clearInterval(interval)
          sseBroadcaster.removeClient(client)
        }
      }, 30_000)

      // Cleanup when client disconnects (stream cancelled)
      const originalCancel = controller.close.bind(controller)
      void originalCancel // referenced for TS
    },
    cancel() {
      // The stream was cancelled by the client disconnecting
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
