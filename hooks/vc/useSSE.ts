"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { SSEPaymentEvent } from "@/types/server/sse.types"
import type { SSELiveTransaction, UseSSEReturn } from "@/types/client/ui/vc.ui.types"

const INITIAL_RETRY_DELAY_MS = 5_000
const MAX_RETRY_DELAY_MS = 30_000

/**
 * Subscribes to real-time payment events via Server-Sent Events (/api/vc/live).
 * Reconnects automatically with exponential backoff (5s → 10s → 20s → 30s cap).
 */
export function useSSE(): UseSSEReturn {
  const [transactions, setTransactions] = useState<SSELiveTransaction[]>([])
  const [newPaymentsCount, setNewPaymentsCount] = useState(0)
  const [newAmountCollected, setNewAmountCollected] = useState(0)
  const [connected, setConnected] = useState(false)
  const [latestEvent, setLatestEvent] = useState<SSEPaymentEvent | null>(null)

  const eventSourceRef = useRef<EventSource | null>(null)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryDelayRef = useRef<number>(INITIAL_RETRY_DELAY_MS)

  const clearLatestEvent = useCallback(() => setLatestEvent(null), [])

  useEffect(() => {
    let cancelled = false

    function connect() {
      if (cancelled) return

      const es = new EventSource("/api/vc/live")
      eventSourceRef.current = es

      es.onopen = () => {
        if (!cancelled) {
          setConnected(true)
          retryDelayRef.current = INITIAL_RETRY_DELAY_MS
        }
      }

      es.onmessage = (event) => {
        if (cancelled) return
        try {
          const data = JSON.parse(event.data) as SSEPaymentEvent | { type: "connected" }
          if (data.type === "connected") return

          if (data.type === "PaymentSuccess") {
            const payment = (data as SSEPaymentEvent).payload
            const tx: SSELiveTransaction = {
              id: `sse-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              ...payment,
            }
            setTransactions((prev) => [tx, ...prev].slice(0, 50))
            setNewPaymentsCount((prev) => prev + 1)
            setNewAmountCollected((prev) => prev + payment.amount)
            setLatestEvent(data as SSEPaymentEvent)
          }
        } catch {
          // Ignore malformed frames (e.g. keepalive comments)
        }
      }

      es.onerror = () => {
        es.close()
        if (!cancelled) {
          setConnected(false)
          retryDelayRef.current = Math.min(retryDelayRef.current * 2, MAX_RETRY_DELAY_MS)
          retryTimeoutRef.current = setTimeout(connect, retryDelayRef.current)
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
