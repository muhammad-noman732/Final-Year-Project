"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { SSEPaymentEvent } from "@/types/server/sse.types"
import type { HodSSELiveTransaction, UseHodSSEReturn } from "@/types/client/ui/hod.ui.types"

const INITIAL_RETRY_DELAY_MS = 5_000
const MAX_RETRY_DELAY_MS = 30_000

export function useHodSSE(): UseHodSSEReturn {
  const [transactions, setTransactions] = useState<HodSSELiveTransaction[]>([])
  const [newPaymentsCount, setNewPaymentsCount] = useState(0)
  const [newAmountCollected, setNewAmountCollected] = useState(0)
  const [connected, setConnected] = useState(false)
  const [latestEvent, setLatestEvent] = useState<SSEPaymentEvent | null>(null)

  const esRef = useRef<EventSource | null>(null)
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const delayRef = useRef<number>(INITIAL_RETRY_DELAY_MS)

  const clearLatestEvent = useCallback(() => setLatestEvent(null), [])

  useEffect(() => {
    let cancelled = false

    function connect() {
      if (cancelled) return
      const es = new EventSource("/api/hod/live")
      esRef.current = es

      es.onopen = () => {
        if (!cancelled) {
          setConnected(true)
          delayRef.current = INITIAL_RETRY_DELAY_MS
        }
      }

      es.onmessage = (event) => {
        if (cancelled) return
        try {
          const data = JSON.parse(event.data) as SSEPaymentEvent | { type: "connected" }
          if (data.type === "connected") return

          if (data.type === "PaymentSuccess") {
            const payment = (data as SSEPaymentEvent).payload
            const tx: HodSSELiveTransaction = {
              id: `sse-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              studentName: payment.studentName,
              rollNumber: payment.rollNumber,
              program: payment.program,
              semester: payment.semester,
              amount: payment.amount,
              paidAt: payment.paidAt,
            }
            setTransactions((prev) => [tx, ...prev].slice(0, 50))
            setNewPaymentsCount((prev) => prev + 1)
            setNewAmountCollected((prev) => prev + payment.amount)
            setLatestEvent(data as SSEPaymentEvent)
          }
        } catch {
          // Ignore malformed frames
        }
      }

      es.onerror = () => {
        es.close()
        if (!cancelled) {
          setConnected(false)
          delayRef.current = Math.min(delayRef.current * 2, MAX_RETRY_DELAY_MS)
          retryRef.current = setTimeout(connect, delayRef.current)
        }
      }
    }

    connect()

    return () => {
      cancelled = true
      esRef.current?.close()
      if (retryRef.current) clearTimeout(retryRef.current)
    }
  }, [])

  return { transactions, newPaymentsCount, newAmountCollected, connected, latestEvent, clearLatestEvent }
}
