"use client"

import { Download, ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/shared/StatusBadge"
import { formatFullCurrency } from "@/config/constants"
import type { AdminTransactionRow, AdminTransactionTableProps, AdminStatusTab } from "@/types/client/ui/admin.ui.types"

const TABS: { label: string; value: AdminStatusTab }[] = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Defaulters", value: "defaulters" },
]

function SkeletonRow() {
  return (
    <tr className="border-t border-white/[0.04]">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className="h-3 rounded-md bg-white/[0.04] animate-pulse" style={{ width: `${60 + (i % 3) * 20}%` }} />
        </td>
      ))}
    </tr>
  )
}

function EmptyState({ tab }: { tab: AdminStatusTab }) {
  const messages: Record<AdminStatusTab, { title: string; desc: string }> = {
    paid: { title: "No paid records", desc: "Completed transactions will appear here." },
    unpaid: { title: "No unpaid fees", desc: "All students are up to date." },
    defaulters: { title: "No defaulters", desc: "No overdue assignments found." },
  }
  const { title, desc } = messages[tab]
  return (
    <tr>
      <td colSpan={8} className="px-6 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center mb-1">
            <FileText className="w-4 h-4 text-white/10" />
          </div>
          <p className="text-sm font-medium text-foreground/70">{title}</p>
          <p className="text-xs text-muted-foreground/60">{desc}</p>
        </div>
      </td>
    </tr>
  )
}

export default function AdminTransactionTable({
  transactions,
  meta,
  isLoading,
  statusTab,
  onTabChange,
  page,
  onPageChange,
  onExportCSV,
  unpaidCount,
  defaultersCount,
}: AdminTransactionTableProps) {
  const tabBadge: Record<AdminStatusTab, number | null> = {
    paid: null,
    unpaid: unpaidCount,
    defaulters: defaultersCount,
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/40 backdrop-blur-xl">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.04] self-start">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-xs font-semibold transition-all duration-200 ${
                statusTab === tab.value
                  ? "bg-white/[0.07] text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {tab.label}
              {tabBadge[tab.value] !== null && tabBadge[tab.value]! > 0 && (
                <span
                  className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                    tab.value === "defaulters"
                      ? "bg-rose-500/15 text-rose-400"
                      : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  {tabBadge[tab.value]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {meta.total > 0 && (
            <span className="text-[11px] text-muted-foreground/60">
              {meta.total} record{meta.total !== 1 ? "s" : ""}
            </span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onExportCSV}
            disabled={transactions.length === 0}
            className="h-8 gap-1.5 text-xs border-gold-500/20 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
          >
            <Download className="w-3 h-3" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {["Student", "Roll No", "Department", "Program", "Sem", "Amount", "Status", "Date"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 bg-white/[0.015]"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : transactions.length === 0 ? (
              <EmptyState tab={statusTab} />
            ) : (
              transactions.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.04]">
          <span className="text-[11px] text-muted-foreground/60">
            Page {meta.page} of {meta.totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || isLoading}
              className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] disabled:opacity-30 transition-all duration-150 active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`h-7 w-7 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                    p === page
                      ? "bg-gold-500/15 text-gold-400 border border-gold-500/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= meta.totalPages || isLoading}
              className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] disabled:opacity-30 transition-all duration-150 active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-2 border-t border-white/[0.04]">
          <Loader2 className="w-3 h-3 text-gold-400 animate-spin" />
          <span className="text-[11px] text-muted-foreground/60">Loading transactions...</span>
        </div>
      )}
    </div>
  )
}

function TransactionRow({ tx }: { tx: AdminTransactionRow }) {
  const date = tx.paidAt
    ? new Date(tx.paidAt).toLocaleDateString([], { month: "short", day: "numeric", year: "2-digit" })
    : "—"

  return (
    <tr className="border-t border-white/[0.04] group hover:bg-white/[0.015] transition-colors duration-150">
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase flex-shrink-0 group-hover:bg-white/[0.08] transition-colors duration-150">
            {tx.studentName.charAt(0)}
          </div>
          <span className="text-[12.5px] font-medium text-foreground truncate max-w-[140px]">
            {tx.studentName}
          </span>
        </div>
      </td>
      <td className="px-3 py-2.5 text-[11.5px] font-mono text-muted-foreground whitespace-nowrap">
        {tx.rollNumber}
      </td>
      <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground whitespace-nowrap">
        {tx.departmentCode}
      </td>
      <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground max-w-[140px] truncate">
        {tx.programName}
      </td>
      <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground text-center">
        {tx.semester}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <span className="text-[12.5px] font-semibold text-foreground font-mono">
          {formatFullCurrency(tx.amountPaid || tx.amountDue)}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <StatusBadge status={tx.feeStatus.toLowerCase()} />
      </td>
      <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          {date}
          {tx.daysOverdue > 0 && (
            <span className="text-[10px] text-rose-400 font-semibold">
              +{tx.daysOverdue}d
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}
