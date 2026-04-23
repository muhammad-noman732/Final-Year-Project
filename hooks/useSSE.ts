"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import type { SSEPaymentEvent } from "@/lib/sse"

interface SSELiveTransaction {
  id: string
  studentName: string
  rollNumber: string
  department: string
  program: string
  semester: string
  amount: number
  paidAt: string
}

interface UseSSEReturn {
  /** Latest transactions received via SSE (newest first, max 50). */
  transactions: SSELiveTransaction[]
  /** Incremental counter: total new payments received since mount. */
  newPaymentsCount: number
  /** Incremental counter: total amount received since mount. */
  newAmountCollected: number
  /** Whether the SSE connection is active. */
  connected: boolean
  /** Most recent event (for toast notification). */
  latestEvent: SSEPaymentEvent | null
  /** Clear the latestEvent (after showing toast). */
  clearLatestEvent: () => void
}

/**
 * Hook to listen for real-time payment events via Server-Sent Events.
 * Automatically connects to `/api/vc/live` and reconnects on failure.
 */
export function useSSE(): UseSSEReturn {
  const [transactions, setTransactions] = useState<SSELiveTransaction[]>([])
  const [newPaymentsCount, setNewPaymentsCount] = useState(0)
  const [newAmountCollected, setNewAmountCollected] = useState(0)
  const [connected, setConnected] = useState(false)
  const [latestEvent, setLatestEvent] = useState<SSEPaymentEvent | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearLatestEvent = useCallback(() => setLatestEvent(null), [])

  useEffect(() => {
    let cancelled = false

    function connect() {
      if (cancelled) return

      const es = new EventSource("/api/vc/live")
      eventSourceRef.current = es

      es.onopen = () => {
        if (!cancelled) setConnected(true)
      }

      es.onmessage = (event) => {
        if (cancelled) return

        try {
          const data = JSON.parse(event.data) as
            | SSEPaymentEvent
            | { type: "connected" }

          if (data.type === "connected") return

          if (data.type === "PaymentSuccess") {
            const payment = (data as SSEPaymentEvent).payload

            const tx: SSELiveTransaction = {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              ...payment,
            }

            setTransactions((prev) => [tx, ...prev].slice(0, 50))
            setNewPaymentsCount((prev) => prev + 1)
            setNewAmountCollected((prev) => prev + payment.amount)
            setLatestEvent(data as SSEPaymentEvent)
          }
        } catch {
          // Ignore malformed messages (e.g. keepalive comments)
        }
      }

      es.onerror = () => {
        es.close()
        if (!cancelled) {
          setConnected(false)
          // Reconnect after 5 seconds
          retryTimeoutRef.current = setTimeout(connect, 5_000)
        }
      }
    }

    connect()

    return () => {
      cancelled = true
      eventSourceRef.current?.close()
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
    }
  }, [])

  return {
    transactions,
    newPaymentsCount,
    newAmountCollected,
    connected,
    latestEvent,
    clearLatestEvent,
  }
}
