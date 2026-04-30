"use client"

import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatFullCurrency } from "@/config/constants"
import type { HodDefaultersTableProps } from "@/types/client/ui/hod.ui.types"

const HEAD = ["Student", "Program", "Sem", "Amount Due", "Outstanding", "Overdue"]

export default function HodDefaultersTable({ defaulters }: HodDefaultersTableProps) {
  const hasDefaulters = defaulters.length > 0
  
  return (
    <div className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 dark:border-white/10 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 shadow-sm">
            <AlertTriangle className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Defaulters &amp; Pending Vouchers
          </h3>
          {hasDefaulters && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 shadow-sm">
              {defaulters.length}
            </span>
          )}
        </div>
      </div>

      <div>
        {!hasDefaulters ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-[#22C55E]" strokeWidth={2} />
            </div>
            <p className="text-sm font-bold text-[#0F172A] dark:text-slate-100">All Clear</p>
            <p className="mt-1.5 text-xs font-medium text-[#64748B] dark:text-slate-400 max-w-[200px] leading-relaxed">
              No defaulters — all students in this view are cleared
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto text-left">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-white/5 hover:bg-transparent">
                  {HEAD.map((h) => (
                    <TableHead key={h} className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-500 h-12 px-6">
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaulters.map((d) => {
                  const isCritical = d.daysOverdue > 7
                  const urgencyColor = isCritical ? "text-[#EF4444]" : d.daysOverdue > 0 ? "text-amber-500" : "text-[#64748B] dark:text-slate-400"
                  return (
                    <TableRow key={d.studentId}
                      className={`border-slate-100 dark:border-white/5 transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-white/5 ${isCritical ? "bg-[#EF4444]/5 dark:bg-[#EF4444]/10" : ""}`}>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm font-bold text-[#0F172A] dark:text-slate-200 leading-tight">{d.studentName}</p>
                        <p className="text-xs font-medium font-mono text-[#64748B] dark:text-slate-500 mt-1">{d.rollNumber}</p>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-[#64748B] dark:text-slate-400 max-w-[160px] truncate py-4 px-6">{d.programName}</TableCell>
                      <TableCell className="text-sm font-medium text-[#64748B] dark:text-slate-400 py-4 px-6">{d.semester}</TableCell>
                      <TableCell className="text-sm font-bold text-[#0F172A] dark:text-slate-200 py-4 px-6">{formatFullCurrency(d.amountDue)}</TableCell>
                      <TableCell className={`text-sm font-bold py-4 px-6 ${urgencyColor}`}>{formatFullCurrency(d.outstandingAmount)}</TableCell>
                      <TableCell className="py-4 px-6">
                        {d.daysOverdue > 0 ? (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${isCritical ? "text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800"}`}>
                            <Clock className="w-3 h-3" />{d.daysOverdue}d overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 shadow-sm">
                            Pending
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
