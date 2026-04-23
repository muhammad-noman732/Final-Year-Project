/**
 * Server-Sent Events (SSE) broadcast manager.
 *
 * Maintains a set of connected writable-stream controllers keyed by tenant.
 * After a successful payment webhook, call `broadcastPayment(...)` to push
 * a real-time event to every VC client listening on that tenant.
 */

export interface SSEPaymentEvent {
  type: "PaymentSuccess"
  payload: {
    studentName: string
    rollNumber: string
    department: string
    program: string
    semester: string
    amount: number
    paidAt: string
  }
}

type SSEClient = {
  controller: ReadableStreamDefaultController
  tenantId: string
}

class SSEBroadcaster {
  private clients: Set<SSEClient> = new Set()

  /** Register a new SSE client stream controller for the given tenant. */
  addClient(controller: ReadableStreamDefaultController, tenantId: string): SSEClient {
    const client: SSEClient = { controller, tenantId }
    this.clients.add(client)
    return client
  }

  /** Remove a client when they disconnect. */
  removeClient(client: SSEClient): void {
    this.clients.delete(client)
  }

  /** Broadcast a payment event to all VC clients on the given tenant. */
  broadcastPayment(tenantId: string, event: SSEPaymentEvent): void {
    const data = `data: ${JSON.stringify(event)}\n\n`

    for (const client of this.clients) {
      if (client.tenantId !== tenantId) continue

      try {
        client.controller.enqueue(new TextEncoder().encode(data))
      } catch {
        // Client may have disconnected — clean up
        this.clients.delete(client)
      }
    }
  }

  /** Number of currently connected clients (useful for debugging). */
  get size(): number {
    return this.clients.size
  }
}

/**
 * Global singleton — survives hot-reloads in development via `globalThis`.
 */
const globalForSSE = globalThis as unknown as { __sseBroadcaster?: SSEBroadcaster }

export const sseBroadcaster: SSEBroadcaster =
  globalForSSE.__sseBroadcaster ?? (globalForSSE.__sseBroadcaster = new SSEBroadcaster())
