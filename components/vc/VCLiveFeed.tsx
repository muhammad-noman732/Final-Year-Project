"use client"

import { useEffect, useState } from "react"
import { Activity, Wifi, WifiOff } from "lucide-react"
import { formatFullCurrency } from "@/config/constants"
import type { SSELiveTransaction } from "@/types/client/ui/vc.ui.types"

interface VCLiveFeedProps {
  /** Real-time transactions pushed via SSE (newest first). */
  transactions: SSELiveTransaction[]
  /** Historical transactions seeded from the DB on mount (last 12 payments). */
  initialTransactions?: SSELiveTransaction[]
  connected: boolean
  newPaymentsCount: number
  newAmountCollected: number
}

export default function VCLiveFeed({
  transactions,
  initialTransactions = [],
  connected,
  newPaymentsCount,
  newAmountCollected,
}: VCLiveFeedProps) {
  // Merge SSE events (newest) with DB seed (older), deduplicate by id, cap at 50
  const sseIds = new Set(transactions.map((t) => t.id))
  const merged = [
    ...transactions,
    ...initialTransactions.filter((t) => !sseIds.has(t.id)),
  ].slice(0, 50)

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Activity className="h-4 w-4 text-emerald-400" />
            {connected && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-foreground">Live Transaction Feed</h3>
        </div>
        <div className="flex items-center gap-3">
          {newPaymentsCount > 0 && (
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-400 font-medium">+{newPaymentsCount} new</span>
              <span className="text-muted-foreground">&middot;</span>
              <span className="text-gold-400 font-medium">+{formatFullCurrency(newAmountCollected)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            {connected ? (
              <Wifi className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <WifiOff className="h-3.5 w-3.5 text-rose-400" />
            )}
            <span className={`text-[11px] font-medium ${connected ? "text-emerald-400" : "text-rose-400"}`}>
              {connected ? "Live" : "Reconnecting"}
            </span>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-h-[360px] overflow-y-auto">
        {merged.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Activity className="mx-auto h-8 w-8 text-white/[0.06] mb-3" />
            <p className="text-sm text-muted-foreground">No transactions yet</p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              New payments will appear here in real-time
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {merged.map((tx, i) => (
              <LiveTransactionRow key={tx.id} tx={tx} isNew={i < transactions.length} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LiveTransactionRow({ tx, isNew }: { tx: SSELiveTransaction; isNew: boolean }) {
  const [highlight, setHighlight] = useState(isNew)

  useEffect(() => {
    if (!isNew) return
    const timer = setTimeout(() => setHighlight(false), 2_000)
    return () => clearTimeout(timer)
  }, [isNew])

  return (
    <div
      className={`px-5 py-3 transition-colors duration-700 ${highlight ? "bg-emerald-500/[0.04]" : "bg-transparent"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{tx.studentName}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {tx.rollNumber} &middot; {tx.program} &middot; {tx.semester}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-semibold text-emerald-400">{formatFullCurrency(tx.amount)}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {new Date(tx.paidAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  )
}
