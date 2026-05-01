"use client"

import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"
import { Building2, TrendingUp, AlertTriangle, CheckCircle2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type { VCDepartmentPerformance } from "@/types/client/store/vc.store.types"

interface Props {
  departments: VCDepartmentPerformance[]
  onDepartmentSelect?: (departmentId: string) => void
}

function ChartTooltip(props: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
}) {
  if (!props.active || !props.payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-[#0a0f1e] backdrop-blur-md px-3 py-2 text-xs shadow-xl">
      {props.label ? <p className="mb-1.5 font-bold text-[#0F172A] dark:text-foreground">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <div key={`${entry.name}-${entry.color}`} className="flex items-center gap-2 text-slate-600 dark:text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="font-medium">{entry.name}:</span>
          <span className="text-[#0F172A] dark:text-foreground font-bold">
            {entry.value > 999 ? formatFullCurrency(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function VCDepartmentPage({ departments, onDepartmentSelect }: Props) {
  if (departments.length === 0) {
    return (
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-navy-900/40 backdrop-blur-md px-5 py-14 text-center">
        <Building2 className="mx-auto h-8 w-8 text-[#64748B]/30 dark:text-white/10 mb-3" />
        <p className="text-sm text-[#64748B] dark:text-muted-foreground">No department data for current filters.</p>
      </div>
    )
  }

  const deptChartData = departments.map((d) => ({
    name: d.departmentCode,
    paid: d.paidStudents,
    defaulters: d.defaulters,
    rate: d.paymentRate,
  }))

  const sorted = [...departments].sort((a, b) => b.paymentRate - a.paymentRate)
  const top = sorted[0]
  const bottom = sorted[sorted.length - 1]

  return (
    <div className="space-y-4">
      {/* Summary Row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B] dark:text-muted-foreground mb-2">Total Departments</p>
          <p className="text-2xl font-bold text-[#0F172A] dark:text-foreground">{departments.length}</p>
          <p className="text-xs font-medium text-[#64748B] dark:text-muted-foreground mt-1">Across all faculties</p>
        </div>

        {top && (
          <div className="rounded-xl border border-emerald-500/25 dark:border-emerald-500/15 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 dark:from-emerald-500/10 dark:to-emerald-500/[0.02] backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600/80 dark:text-emerald-400/70">Top Performer</p>
            </div>
            <p className="text-base font-bold text-[#0F172A] dark:text-foreground truncate">{top.departmentName}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">{top.paymentRate}% collection rate</p>
          </div>
        )}

        {bottom && bottom.departmentId !== top?.departmentId && (
          <div className="rounded-xl border border-rose-500/25 dark:border-rose-500/15 bg-gradient-to-br from-rose-500/20 to-rose-500/5 dark:from-rose-500/10 dark:to-rose-500/[0.02] backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600/80 dark:text-rose-400/70">Needs Attention</p>
            </div>
            <p className="text-base font-bold text-[#0F172A] dark:text-foreground truncate">{bottom.departmentName}</p>
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-medium">{bottom.paymentRate}% collection rate</p>
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] backdrop-blur-md shadow-sm p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gold-400" />
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-foreground">Paid vs Defaulters by Department</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#64748B] dark:text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />Paid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-rose-500" />Defaulters
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={Math.max(220, departments.length * 44)}>
          <BarChart data={deptChartData} layout="vertical" barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis
              type="category" dataKey="name"
              tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} width={46}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.1)" }} />
            <Bar dataKey="paid" name="Paid Students" stackId="s" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="defaulters" name="Defaulters" stackId="s" fill="#f43f5e" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department Cards Grid */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((dept) => {
          const isGood = dept.paymentRate >= 70
          const isMid = dept.paymentRate >= 40 && dept.paymentRate < 70
          const rateColor = isGood ? "text-emerald-600 dark:text-emerald-400" : isMid ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
          const barColor = isGood ? "bg-emerald-500" : isMid ? "bg-amber-500" : "bg-rose-500"

          return (
            <button
              key={dept.departmentId}
              type="button"
              onClick={() => onDepartmentSelect?.(dept.departmentId)}
              className="group rounded-xl border border-white/60 dark:border-white/[0.05] bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] p-4 text-left transition-all duration-300 hover:from-white hover:to-white/60 dark:hover:from-[#0a0f1e] dark:hover:to-[#0a0f1e] hover:border-white/80 dark:hover:border-white/[0.10] hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] backdrop-blur-md shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-foreground truncate">{dept.departmentName}</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-muted-foreground mt-0.5">{dept.departmentCode}</p>
                </div>
                <span className={`text-lg font-bold tabular-nums ${rateColor}`}>
                  {dept.paymentRate}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full bg-slate-200/50 dark:bg-white/[0.05] mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${dept.paymentRate}%` }}
                />
              </div>

              <Separator className="bg-slate-200/50 dark:bg-white/[0.04] mb-3" />

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-slate-500 dark:text-muted-foreground font-medium mb-0.5">Collected</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">{formatCurrency(dept.collectedAmount)}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-muted-foreground font-medium mb-0.5">Outstanding</p>
                  <p className="text-rose-600 dark:text-rose-400 font-bold tabular-nums">{formatCurrency(dept.outstandingAmount)}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-muted-foreground font-medium mb-0.5">Students</p>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400 dark:text-muted-foreground" />
                    <p className="text-[#0F172A] dark:text-foreground font-bold tabular-nums">{dept.paidStudents + dept.defaulters}</p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
