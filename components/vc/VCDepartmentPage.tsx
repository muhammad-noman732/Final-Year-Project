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
    <div className="rounded-lg border border-white/[0.08] bg-navy-800 px-3 py-2 text-xs shadow-xl">
      {props.label ? <p className="mb-1.5 font-semibold text-foreground">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <div key={`${entry.name}-${entry.color}`} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span>{entry.name}:</span>
          <span className="text-foreground font-medium">
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
      <div className="rounded-xl border border-white/[0.05] bg-navy-900 px-5 py-14 text-center">
        <Building2 className="mx-auto h-8 w-8 text-white/10 mb-3" />
        <p className="text-sm text-muted-foreground">No department data for current filters.</p>
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
        <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Total Departments</p>
          <p className="text-2xl font-bold text-foreground">{departments.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Across all faculties</p>
        </div>

        {top && (
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400/70">Top Performer</p>
            </div>
            <p className="text-base font-bold text-foreground truncate">{top.departmentName}</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">{top.paymentRate}% collection rate</p>
          </div>
        )}

        {bottom && bottom.departmentId !== top?.departmentId && (
          <div className="rounded-xl border border-rose-500/15 bg-rose-500/[0.04] p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-rose-400/70">Needs Attention</p>
            </div>
            <p className="text-base font-bold text-foreground truncate">{bottom.departmentName}</p>
            <p className="text-xs text-rose-400 mt-1 font-medium">{bottom.paymentRate}% collection rate</p>
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gold-400" />
            <h2 className="text-sm font-semibold text-foreground">Paid vs Defaulters by Department</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
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
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
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
          const rateColor = isGood ? "text-emerald-400" : isMid ? "text-gold-400" : "text-rose-400"
          const barColor = isGood ? "bg-emerald-500" : isMid ? "bg-gold-500" : "bg-rose-500"

          return (
            <button
              key={dept.departmentId}
              type="button"
              onClick={() => onDepartmentSelect?.(dept.departmentId)}
              className="group rounded-xl border border-white/[0.05] bg-navy-900 p-4 text-left transition-all duration-200 hover:border-white/[0.10] hover:bg-navy-800 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground truncate">{dept.departmentName}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{dept.departmentCode}</p>
                </div>
                <span className={`text-lg font-bold tabular-nums ${rateColor}`}>
                  {dept.paymentRate}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full bg-white/[0.05] mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${dept.paymentRate}%` }}
                />
              </div>

              <Separator className="bg-white/[0.04] mb-3" />

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-0.5">Collected</p>
                  <p className="text-emerald-400 font-medium tabular-nums">{formatCurrency(dept.collectedAmount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Outstanding</p>
                  <p className="text-rose-400 font-medium tabular-nums">{formatCurrency(dept.outstandingAmount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Students</p>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <p className="text-foreground font-medium tabular-nums">{dept.paidStudents + dept.defaulters}</p>
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
