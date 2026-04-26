"use client"

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { baseApi } from "@/store/api/baseApi"

const INITIAL_RETRY_DELAY_MS = 5_000
const MAX_RETRY_DELAY_MS = 30_000

/**
 * Connects to /api/notifications/stream and invalidates RTK Query notification
 * cache whenever the server broadcasts a "NewNotification" ping.
 * Must be mounted inside a Redux Provider.
 */
export function useNotificationStream(): void {
  const dispatch = useDispatch<AppDispatch>()
  const esRef = useRef<EventSource | null>(null)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryDelayRef = useRef<number>(INITIAL_RETRY_DELAY_MS)

  useEffect(() => {
    let cancelled = false

    function connect() {
      if (cancelled) return

      const es = new EventSource("/api/notifications/stream")
      esRef.current = es

      es.onopen = () => {
        if (!cancelled) retryDelayRef.current = INITIAL_RETRY_DELAY_MS
      }

      es.onmessage = (event) => {
        if (cancelled) return
        try {
          const data = JSON.parse(event.data) as { type: string }
          if (data.type === "NewNotification") {
            dispatch(
              baseApi.util.invalidateTags([
                { type: "Notification", id: "LIST" },
                { type: "Notification", id: "UNREAD_COUNT" },
              ]),
            )
          }
        } catch {
          // Ignore malformed frames
        }
      }

      es.onerror = () => {
        es.close()
        if (!cancelled) {
          retryDelayRef.current = Math.min(retryDelayRef.current * 2, MAX_RETRY_DELAY_MS)
          retryTimeoutRef.current = setTimeout(connect, retryDelayRef.current)
        }
      }
    }

    connect()

    return () => {
      cancelled = true
      esRef.current?.close()
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
    }
  }, [dispatch])
}
