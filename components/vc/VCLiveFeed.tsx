"use client"

import { useEffect, useState } from "react"
import { Activity, Wifi, WifiOff, ArrowUpRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatFullCurrency } from "@/config/constants"
import type { SSELiveTransaction } from "@/types/client/ui/vc.ui.types"

interface VCLiveFeedProps {
  transactions: SSELiveTransaction[]
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
  const sseIds = new Set(transactions.map((t) => t.id))
  const merged = [
    ...transactions,
    ...initialTransactions.filter((t) => !sseIds.has(t.id)),
  ].slice(0, 50)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            {connected && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-[#0F172A] dark:text-foreground">Live Feed</span>
        </div>

        <div className="flex items-center gap-2">
          {newPaymentsCount > 0 && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
              +{newPaymentsCount}
            </span>
          )}
          <div className={`flex items-center gap-1.5 text-[11px] font-medium ${connected ? "text-emerald-400" : "text-[#64748B] dark:text-muted-foreground"}`}>
            {connected
              ? <Wifi className="h-3 w-3" />
              : <WifiOff className="h-3 w-3 text-[#64748B] dark:text-muted-foreground" />}
            {connected ? "Live" : "Offline"}
          </div>
        </div>
      </div>

      {newPaymentsCount > 0 && newAmountCollected > 0 && (
        <>
          <div className="mx-4 mb-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-3 py-2">
            <p className="text-[11px] text-emerald-400/70 mb-0.5">New this session</p>
            <p className="text-sm font-bold text-emerald-400">
              +{formatFullCurrency(newAmountCollected)}
            </p>
          </div>
        </>
      )}

      <Separator className="bg-slate-200/50 dark:bg-white/[0.04]" />

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {merged.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/[0.03]">
              <Activity className="h-4 w-4 text-[#64748B]/40 dark:text-white/10" />
            </div>
            <p className="text-sm text-[#64748B] dark:text-muted-foreground">No transactions yet</p>
            <p className="mt-1 text-xs text-[#64748B]/60 dark:text-muted-foreground/60">
              Payments will appear here in real-time
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200/50 dark:divide-white/[0.03]">
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
    const t = setTimeout(() => setHighlight(false), 2_500)
    return () => clearTimeout(t)
  }, [isNew])

  const time = new Date(tx.paidAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 transition-colors duration-700 ${
        highlight ? "bg-emerald-500/[0.05]" : "hover:bg-white/60 dark:hover:bg-white/[0.015]"
      }`}
    >
      {/* Avatar placeholder */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/[0.04] text-[11px] font-bold text-[#64748B] dark:text-muted-foreground uppercase">
        {tx.studentName.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[12.5px] font-semibold text-[#0F172A] dark:text-foreground">{tx.studentName}</p>
          <p className="flex-shrink-0 text-[12.5px] font-bold text-emerald-400">
            {formatFullCurrency(tx.amount)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="truncate text-[11px] text-[#64748B] dark:text-muted-foreground">
            {tx.rollNumber} · {tx.program} · {tx.semester}
          </p>
          <p className="flex-shrink-0 text-[11px] text-[#64748B] dark:text-muted-foreground ml-2">{time}</p>
        </div>
      </div>
    </div>
  )
}
