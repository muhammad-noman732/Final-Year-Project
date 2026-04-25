"use client"

import { ChevronLeft, ChevronRight, Loader2, FileText, Download } from "lucide-react"
import StatusBadge from "@/components/shared/StatusBadge"
import { formatFullCurrency } from "@/config/constants"
import type { VCPaginatedStudents } from "@/types/client/store/vc.store.types"
import type { TrackingTab } from "@/types/client/ui/vc.ui.types"

interface VCStudentsTableProps {
  data?: VCPaginatedStudents
  isLoading: boolean
  tab: TrackingTab
  onPageChange: (page: number) => void
  onExport?: () => void
}

function SkeletonRow() {
  return (
    <tr className="border-t border-white/[0.03]">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div
            className="h-3 rounded bg-white/[0.04] animate-pulse"
            style={{ width: `${50 + (i % 4) * 15}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

function EmptyState({ tab }: { tab: TrackingTab }) {
  const msgs: Record<TrackingTab, { title: string; desc: string }> = {
    overview: { title: "No data", desc: "Select a different scope." },
    paid: { title: "No paid records", desc: "No completed fee assignments match the current filters." },
    defaulters: { title: "No defaulters", desc: "All students are up to date with the current filters." },
    unpaid: { title: "No unpaid fees", desc: "No unpaid assignments found with the current filters." },
  }
  const { title, desc } = msgs[tab]
  return (
    <tr>
      <td colSpan={9} className="px-6 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03]">
            <FileText className="h-4 w-4 text-white/10" />
          </div>
          <p className="text-sm font-medium text-foreground/60">{title}</p>
          <p className="text-xs text-muted-foreground/50">{desc}</p>
        </div>
      </td>
    </tr>
  )
}

export default function VCStudentsTable({
  data,
  isLoading,
  tab,
  onPageChange,
  onExport,
}: VCStudentsTableProps) {
  const rows = data?.data ?? []
  const meta = data?.meta
  const hasRows = rows.length > 0

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/40">
      {/* ── Loading overlay when refetching existing data ── */}
      {isLoading && hasRows && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-900/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-navy-800/90 px-4 py-2.5 shadow-xl">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gold-400" />
            <span className="text-[11px] font-medium text-muted-foreground">Updating results…</span>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.04] px-5 py-3.5">
        <div>
          <p className="text-[12.5px] font-semibold text-foreground">Student Records</p>
          {meta && (
            <p className="text-[10.5px] text-muted-foreground/60 mt-0.5">
              {meta.total} record{meta.total !== 1 ? "s" : ""} · page {meta.page} of {meta.totalPages}
            </p>
          )}
        </div>
        {onExport && hasRows && (
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-gold-500/20 hover:text-gold-400 active:scale-[0.97]"
          >
            <Download className="h-3 w-3" />
            CSV
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {["Student", "Roll No", "Department", "Program", "Sem", "Status", "Due", "Paid", "Date"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={[
                      "px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/50 bg-white/[0.012]",
                      i === 0 ? "text-left pl-5" : i >= 6 ? "text-right" : "text-left",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading && !hasRows ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : !hasRows ? (
              <EmptyState tab={tab} />
            ) : (
              rows.map((row) => {
                const dateStr = row.paidAt
                  ? new Date(row.paidAt).toLocaleDateString([], { day: "numeric", month: "short", year: "2-digit" })
                  : row.daysOverdue > 0
                    ? `+${row.daysOverdue}d overdue`
                    : new Date(row.dueDate).toLocaleDateString([], { day: "numeric", month: "short" })
                const dateColor = row.daysOverdue > 0 && !row.paidAt ? "text-rose-400" : "text-muted-foreground"

                return (
                  <tr
                    key={row.assignmentId}
                    className="group border-t border-white/[0.03] hover:bg-white/[0.015] transition-colors duration-100"
                  >
                    <td className="pl-5 pr-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[10px] font-bold uppercase text-muted-foreground group-hover:bg-white/[0.07] transition-colors">
                          {row.studentName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-medium text-foreground truncate max-w-[130px]">
                            {row.studentName}
                          </p>
                          <p className="text-[10.5px] text-muted-foreground/60 truncate max-w-[130px]">
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                      {row.rollNumber}
                    </td>
                    <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground whitespace-nowrap">
                      {row.departmentCode}
                    </td>
                    <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground max-w-[120px] truncate">
                      {row.programName}
                    </td>
                    <td className="px-3 py-2.5 text-[11.5px] text-muted-foreground text-center">
                      {row.semester}
                    </td>
                    <td className="px-3 py-2.5">
                      <StatusBadge status={row.feeStatus.toLowerCase()} />
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[12px] font-semibold text-foreground font-mono tabular-nums">
                        {formatFullCurrency(row.amountDue)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[12px] font-semibold text-emerald-400 font-mono tabular-nums">
                        {formatFullCurrency(row.amountPaid)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right pr-5">
                      <span className={`text-[11.5px] whitespace-nowrap ${dateColor}`}>
                        {dateStr}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/[0.04] px-5 py-3">
          <span className="text-[10.5px] text-muted-foreground/60">
            Showing {(meta.page - 1) * 15 + 1}–{Math.min(meta.page * 15, meta.total)} of {meta.total}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(meta.page - 1)}
              disabled={meta.page <= 1 || isLoading}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/[0.05] hover:text-foreground disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={[
                  "h-7 w-7 rounded-lg text-[11px] font-semibold transition-all duration-150",
                  p === meta.page
                    ? "bg-gold-500/15 text-gold-400 border border-gold-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onPageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPages || isLoading}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/[0.05] hover:text-foreground disabled:opacity-30 transition-all"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
