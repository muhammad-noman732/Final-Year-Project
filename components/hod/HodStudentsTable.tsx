"use client"

import { Search, RotateCcw, ChevronLeft, ChevronRight, Loader2, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/shared/StatusBadge"
import { formatFullCurrency } from "@/config/constants"
import type { HodStudentsTableProps } from "@/types/client/ui/hod.ui.types"

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const
const ORDINAL = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
const HEAD = ["Student", "Program", "Sem", "Status", "Due", "Paid"]

export default function HodStudentsTable({
  students, meta, isLoading, isFetching, filters, page, onFilterChange, onPageChange,
}: HodStudentsTableProps) {
  const hasFilters = filters.search || filters.semester || filters.feeStatus !== "ALL"

  return (
    <div className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 dark:border-white/10 transition-all duration-300">
      
      <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 shadow-sm">
            <Users className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">Department Students</h3>
          {meta && <span className="text-xs font-medium text-[#64748B] dark:text-slate-500">({meta.total} total)</span>}
          {isFetching && !isLoading && <Loader2 className="h-4 w-4 text-[#64748B] dark:text-slate-500 animate-spin" />}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-slate-500 pointer-events-none" />
            <Input
              placeholder="Search student…"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="pl-9 h-9 w-48 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 placeholder:text-[#64748B] dark:placeholder:text-slate-500 focus-visible:ring-[#6366F1]/30 dark:focus-visible:ring-indigo-500/20 shadow-sm font-medium"
            />
          </div>

          <Select value={filters.semester || "all"} onValueChange={(v) => onFilterChange("semester", v === "all" ? "" : v)}>
            <SelectTrigger className="w-[125px] h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 focus:ring-[#6366F1]/30 dark:focus:ring-indigo-500/20 shadow-sm font-medium">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <SelectItem value="all" className="dark:text-slate-300 dark:hover:bg-slate-800">All Sems</SelectItem>
              {SEMESTERS.map((s) => <SelectItem key={s} value={String(s)} className="dark:text-slate-300 dark:hover:bg-slate-800">{ORDINAL[s]} Sem</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={filters.feeStatus} onValueChange={(v) => onFilterChange("feeStatus", v)}>
            <SelectTrigger className="w-[120px] h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 focus:ring-[#6366F1]/30 dark:focus:ring-indigo-500/20 shadow-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <SelectItem value="ALL" className="dark:text-slate-300 dark:hover:bg-slate-800">All Status</SelectItem>
              <SelectItem value="PAID" className="dark:text-slate-300 dark:hover:bg-slate-800">Paid</SelectItem>
              <SelectItem value="UNPAID" className="dark:text-slate-300 dark:hover:bg-slate-800">Unpaid</SelectItem>
              <SelectItem value="OVERDUE" className="dark:text-slate-300 dark:hover:bg-slate-800">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button size="sm" variant="ghost"
              className="h-9 px-3 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              onClick={() => { onFilterChange("search", ""); onFilterChange("semester", ""); onFilterChange("feeStatus", "ALL") }}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto text-left">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 dark:border-white/5 hover:bg-transparent">
              {HEAD.map((h) => (
                <TableHead key={h} className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-500 h-12 px-6">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i} className="border-slate-100 dark:border-white/5 animate-pulse">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <TableCell key={j} className="py-4 px-6"><div className="h-4 rounded-md bg-slate-100 dark:bg-slate-800" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow className="border-slate-100 dark:border-white/5 hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center px-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                      <Search className="w-5 h-5 text-[#64748B] dark:text-slate-500" />
                    </div>
                    <p className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">No students match the current filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              students.map((s) => (
                <TableRow key={s.assignmentId}
                  className="border-slate-100 dark:border-white/5 transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-white/5">
                  <TableCell className="py-4 px-6">
                    <p className="text-sm font-bold text-[#0F172A] dark:text-slate-200 leading-tight">{s.studentName}</p>
                    <p className="text-xs font-medium font-mono text-[#64748B] dark:text-slate-500 mt-1">{s.rollNumber}</p>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-[#64748B] dark:text-slate-400 max-w-[160px] truncate py-4 px-6">{s.programName}</TableCell>
                  <TableCell className="text-sm font-medium text-[#64748B] dark:text-slate-400 py-4 px-6">{s.semester}</TableCell>
                  <TableCell className="py-4 px-6"><StatusBadge status={s.feeStatus} /></TableCell>
                  <TableCell className="text-sm font-bold text-[#0F172A] dark:text-slate-200 py-4 px-6">{formatFullCurrency(s.amountDue)}</TableCell>
                  <TableCell className="text-sm font-bold text-[#22C55E] py-4 px-6">{formatFullCurrency(s.amountPaid)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors duration-300">
          <p className="text-xs font-medium text-[#64748B] dark:text-slate-500">Page {meta.page} of {meta.totalPages} · {meta.total} students</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost"
              className="h-8 w-8 p-0 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              disabled={page <= 1 || isFetching} onClick={() => onPageChange(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost"
              className="h-8 w-8 p-0 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              disabled={page >= meta.totalPages || isFetching} onClick={() => onPageChange(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
