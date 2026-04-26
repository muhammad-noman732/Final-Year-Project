"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Radio } from "lucide-react"
import type { SSERegistrationImportedEvent } from "@/types/server/sse.types"

interface FeedEntry {
  id: string
  message: string
  metadata: Record<string, unknown> | null
  createdAt: string
}

interface Props {
  initialActivity: FeedEntry[]
  latestRegistrationEvent: SSERegistrationImportedEvent | null
  connected: boolean
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function RegistrationLiveFeed({
  initialActivity,
  latestRegistrationEvent,
  connected,
}: Props) {
  const [feed, setFeed] = useState<FeedEntry[]>(initialActivity)

  // Seed initial data when it loads
  useEffect(() => {
    setFeed(initialActivity)
  }, [initialActivity])

  // Prepend new import event from SSE
  useEffect(() => {
    if (!latestRegistrationEvent) return
    const p = latestRegistrationEvent.payload
    const entry: FeedEntry = {
      id: `sse-${Date.now()}`,
      message: `Imported ${p.count} applicant${p.count !== 1 ? "s" : ""} for ${p.program} (${p.session})`,
      metadata: { batchId: p.batchId, count: p.count, program: p.program, session: p.session },
      createdAt: new Date().toISOString(),
    }
    setFeed((prev) => [entry, ...prev].slice(0, 20))
  }, [latestRegistrationEvent])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-white/[0.05] bg-[#080c18]"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.04] px-4 py-2.5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.04]">
          <Upload className="h-[11px] w-[11px] text-muted-foreground/50" strokeWidth={2} />
        </div>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55">
          Import Activity
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${connected ? "animate-ping bg-sky-400 opacity-50" : "bg-zinc-600"}`}
            />
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${connected ? "bg-sky-500" : "bg-zinc-600"}`}
            />
          </span>
          <span className="text-[9.5px] text-muted-foreground/40">
            {connected ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      {/* Feed entries */}
      <div className="max-h-64 overflow-y-auto p-3 space-y-[1px]">
        {feed.length === 0 ? (
          <div className="flex h-24 items-center justify-center gap-2 text-[12px] text-muted-foreground/30">
            <Radio className="h-3.5 w-3.5" strokeWidth={1.5} />
            Waiting for import events…
          </div>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            {feed.map((entry) => {
              const meta = entry.metadata as Record<string, unknown> | null
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="flex items-start gap-3 rounded-md border border-white/[0.03] px-3 py-2.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-500/10">
                    <Upload className="h-3 w-3 text-sky-400" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] leading-[1.4] text-foreground/70">{entry.message}</p>
                    {Boolean(meta?.batchId) && (
                      <p className="mt-0.5 font-mono text-[9.5px] text-muted-foreground/30">
                        batch #{String(meta!.batchId as string).slice(-8)}
                      </p>
                    )}
                  </div>
                  <time className="shrink-0 text-[10px] text-muted-foreground/35 tabular-nums">
                    {formatRelative(entry.createdAt)}
                  </time>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
