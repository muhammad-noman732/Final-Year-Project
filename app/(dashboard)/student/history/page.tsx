"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard, Receipt, CheckCircle2,
  FileText, TrendingUp, Clock,
} from "lucide-react"
import { formatFullCurrency } from "@/config/constants"
import { Skeleton } from "boneyard-js/react"
import { useStudentLedger } from "@/hooks/student/useStudentLedger"

function fmt(d: string | Date | null | undefined) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
}

function methodLabel(method: string) {
  if (method === "STRIPE_CARD") return "Card"
  if (method === "BANK_CHALLAN") return "Challan"
  if (method === "WAIVER") return "Waiver"
  return method
}

const METHOD_ICON = {
  STRIPE_CARD: CreditCard,
  BANK_CHALLAN: Receipt,
  WAIVER: CheckCircle2,
} as const

export default function StudentHistoryPage() {
  const {
    summary,
    allPayments,
    isLoading,
    filter,
    setFilter,
    filteredPayments,
  } = useStudentLedger()

  const completedCount = allPayments.filter((p) => p.status === "COMPLETED").length

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 70% 40% at 20% -5%, rgba(212,168,67,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-6 pb-16">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[20px] font-bold tracking-tight text-zinc-50">Payment History</h1>
            <p className="mt-0.5 text-[12.5px] text-zinc-500">
              Complete record of all fee transactions.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10.5px] text-zinc-500 flex-shrink-0 mt-0.5">
            <Clock className="h-3 w-3" />
            <span className="font-mono tabular-nums">
              {allPayments.length} record{allPayments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── SUMMARY STRIP ── */}
        <Skeleton name="history-summary" loading={isLoading}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1.5">
                Total cleared
              </p>
              <p className="font-mono tabular-nums text-[19px] font-bold text-gold-400 leading-tight">
                {summary?.totalPaid ? formatFullCurrency(summary.totalPaid) : "PKR 0"}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-2">
                Transactions
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono tabular-nums text-[28px] font-bold text-zinc-50 leading-none">
                  {completedCount}
                </span>
                <span className="text-[11px] text-zinc-500">confirmed</span>
              </div>
            </div>

            {summary && summary.totalOutstanding > 0 ? (
              <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-5 col-span-2 sm:col-span-1">
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-amber-500/70 font-semibold mb-1.5">
                  Outstanding
                </p>
                <p className="font-mono tabular-nums text-[19px] font-bold text-amber-300 leading-tight">
                  {formatFullCurrency(summary.totalOutstanding)}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 col-span-2 sm:col-span-1">
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-emerald-500/70 font-semibold mb-1.5">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[15px] font-bold text-emerald-300">Clear</span>
                </div>
              </div>
            )}
          </div>
        </Skeleton>

        {/* ── FILTER TABS ── */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.025] border border-white/[0.04] w-fit">
          {(["all", "completed", "pending"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "rounded-[9px] px-4 py-1.5 text-xs font-semibold border transition-all duration-200",
                filter === f
                  ? "bg-white/[0.07] border-white/[0.08] text-zinc-100 shadow-sm"
                  : "border-transparent text-zinc-500 hover:text-zinc-300",
              ].join(" ")}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* ── TRANSACTION TABLE ── */}
        <Skeleton name="history-transactions" loading={isLoading}>
          {filteredPayments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-white/[0.06] py-20 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]">
                <FileText className="h-5 w-5 text-zinc-500" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-semibold text-zinc-300">No records found</p>
              <p className="mt-1 text-[12.5px] text-zinc-500">
                {filter === "all"
                  ? "No payment records exist yet."
                  : `No ${filter} transactions match this filter.`}
              </p>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.012] overflow-hidden">

              {/* Desktop column headers */}
              <div className="hidden md:grid md:grid-cols-[36px_1fr_130px_80px_minmax(0,1fr)_128px] gap-4 border-b border-white/[0.05] px-5 py-2.5 bg-white/[0.01]">
                {(["", "Semester", "Date", "Method", "Receipt", "Amount"] as const).map((h, i) => (
                  <span
                    key={`${h}-${i}`}
                    className={[
                      "text-[9.5px] uppercase tracking-[0.18em] text-zinc-500 font-semibold",
                      i === 5 ? "text-right" : "",
                    ].join(" ")}
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="divide-y divide-white/[0.04]">
                <AnimatePresence mode="popLayout">
                  {filteredPayments.map((p, idx) => {
                    const MethodIcon = METHOD_ICON[p.method as keyof typeof METHOD_ICON] ?? Receipt
                    const isConfirmed = p.status === "COMPLETED"
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          delay: idx * 0.03,
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="group hover:bg-white/[0.013] transition-colors duration-100"
                      >
                        {/* Desktop row */}
                        <div className="hidden md:grid md:grid-cols-[36px_1fr_130px_80px_minmax(0,1fr)_128px] gap-4 items-center px-5 py-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-inset ring-white/[0.06] group-hover:bg-white/[0.07] transition-colors">
                            <MethodIcon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[13px] font-medium text-zinc-100 truncate">{p.assignmentLabel}</p>
                            <span className={[
                              "text-[9.5px] uppercase tracking-[0.12em] font-bold",
                              isConfirmed ? "text-emerald-400" : "text-amber-400",
                            ].join(" ")}>
                              {isConfirmed ? "Confirmed" : p.status.toLowerCase()}
                            </span>
                          </div>

                          <span className="text-[12px] text-zinc-400 font-mono tabular-nums">
                            {fmt(p.paidAt)}
                          </span>

                          <span className="text-[12px] text-zinc-400">{methodLabel(p.method)}</span>

                          <span className="text-[11px] text-zinc-500 font-mono truncate">
                            {p.receiptNumber}
                          </span>

                          <div className="flex items-center justify-end gap-2">
                            <span className="font-mono tabular-nums font-semibold text-zinc-50 text-[13px]">
                              {formatFullCurrency(p.amount)}
                            </span>
                          </div>
                        </div>

                        {/* Mobile row */}
                        <div className="md:hidden flex items-start gap-3 px-4 py-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]">
                            <MethodIcon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-zinc-100 truncate">
                                  {p.assignmentLabel}
                                </p>
                                <p className="text-[11px] text-zinc-500 font-mono tabular-nums mt-0.5">
                                  {fmt(p.paidAt)} · {methodLabel(p.method)}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-mono tabular-nums font-semibold text-zinc-50 text-[13px]">
                                  {formatFullCurrency(p.amount)}
                                </p>
                                <span className={[
                                  "text-[9.5px] uppercase tracking-widest font-bold",
                                  isConfirmed ? "text-emerald-400" : "text-amber-400",
                                ].join(" ")}>
                                  {isConfirmed ? "Confirmed" : p.status.toLowerCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10.5px] text-zinc-600 font-mono mt-1 truncate">
                              {p.receiptNumber}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Footer totals */}
              {summary && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.05] bg-white/[0.01]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-gold-400" />
                    <span className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-semibold">
                      Lifetime cleared
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-[15px] font-bold text-gold-400">
                    {formatFullCurrency(summary.totalPaid)}
                  </span>
                </div>
              )}
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  )
}
