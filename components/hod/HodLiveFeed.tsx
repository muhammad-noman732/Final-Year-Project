"use client"

import { useEffect, useState } from "react"
import { Activity, Wifi, WifiOff } from "lucide-react"
import { formatFullCurrency } from "@/config/constants"
import type { HodLiveFeedProps, HodSSELiveTransaction } from "@/types/client/ui/hod.ui.types"

export default function HodLiveFeed({ transactions, initialTransactions, connected, newPaymentsCount }: HodLiveFeedProps) {
  const sseIds = new Set(transactions.map((t) => t.id))
  const merged = [...transactions, ...initialTransactions.filter((t) => !sseIds.has(t.id))].slice(0, 50)

  return (
    <div className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 dark:border-white/10 flex h-full flex-col transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-5 flex-shrink-0 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] relative shadow-sm">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
            {connected && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-sm" />
              </span>
            )}
          </div>
          <span className="text-base font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">Dept Payments</span>
        </div>
        <div className="flex items-center gap-3">
          {newPaymentsCount > 0 && (
            <span className="rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 px-2.5 py-0.5 text-xs font-bold shadow-sm">
              +{newPaymentsCount}
            </span>
          )}
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${connected ? "text-[#22C55E]" : "text-[#64748B] dark:text-slate-500"}`}>
            {connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {connected ? "Live" : "Offline"}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {merged.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
              <Activity className="h-5 w-5 text-[#64748B] dark:text-slate-500" />
            </div>
            <p className="text-sm font-semibold text-[#64748B] dark:text-slate-400">No transactions yet</p>
            <p className="mt-1 text-xs font-medium text-[#64748B] dark:text-slate-500 max-w-[180px] leading-relaxed">
              Department payments appear here in real-time
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-white/5">
            {merged.map((tx, i) => (
              <LiveRow key={tx.id} tx={tx} isNew={i < transactions.length} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LiveRow({ tx, isNew }: { tx: HodSSELiveTransaction; isNew: boolean }) {
  const [highlight, setHighlight] = useState(isNew)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isNew) return
    const t = setTimeout(() => setHighlight(false), 2_500)
    return () => clearTimeout(t)
  }, [isNew])

  const time = mounted ? new Date(tx.paidAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""

  return (
    <div className={`flex items-start gap-4 px-6 py-4 transition-colors duration-700 ${highlight ? "bg-[#22C55E]/5" : "hover:bg-slate-50/50 dark:hover:bg-white/5"}`}>
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase transition-colors duration-700 shadow-sm ${highlight ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]" : "bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-[#64748B] dark:text-slate-400"}`}>
        {tx.studentName.charAt(0)}
      </div>
      <div className="min-w-0 flex-1 pt-0.5 text-left">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-bold text-[#0F172A] dark:text-slate-200">{tx.studentName}</p>
          <p className="flex-shrink-0 text-sm font-bold text-[#22C55E]">{formatFullCurrency(tx.amount)}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="truncate text-xs font-medium text-[#64748B] dark:text-slate-500">{tx.rollNumber} · {tx.semester}</p>
          <p className="flex-shrink-0 text-xs font-medium text-[#64748B] dark:text-slate-500 ml-2">{time}</p>
        </div>
      </div>
    </div>
  )
}
