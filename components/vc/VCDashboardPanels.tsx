"use client"

import { useState } from "react"

import { Building2, CreditCard, GraduationCap } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card } from "@/components/ui/card"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type {
  VCDepartmentPerformance,
  VCSemesterBreakdown,
  VCTrendPoint,
} from "@/types/client/store/vc.store.types"

interface VCDashboardPanelsProps {
  departmentPerformance: VCDepartmentPerformance[]
  semesterBreakdown: VCSemesterBreakdown[]
  collectionTrend: VCTrendPoint[]
  onDepartmentSelect?: (departmentId: string) => void
  onSemesterSelect?: (semester: number) => void
}

function ChartTooltip(props: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
}) {
  if (!props.active || !props.payload?.length) return null

  return (
    <div className="rounded-xl border border-gold-500/10 bg-[#0d1321] px-3 py-2 text-xs shadow-xl">
      {props.label ? <p className="mb-1 text-gold-400">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <p key={`${entry.name}-${entry.color}`} className="text-foreground">
          <span className="mr-1" style={{ color: entry.color }}>
            ●
          </span>
          {entry.name}: {entry.value > 999 ? formatFullCurrency(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

export default function VCDashboardPanels({
  departmentPerformance,
  semesterBreakdown,
  collectionTrend,
  onDepartmentSelect,
  onSemesterSelect,
}: VCDashboardPanelsProps) {

  const monthlyComparison = Array.from(
    collectionTrend.reduce<Map<string, number>>((acc, item) => {
      const monthLabel = item.label.slice(0, 7)
      acc.set(monthLabel, (acc.get(monthLabel) ?? 0) + item.amount)
      return acc
    }, new Map<string, number>()),
  ).map(([month, amount]) => ({ month, amount }))

  const currentMonth = monthlyComparison[monthlyComparison.length - 1]
  const previousMonth = monthlyComparison[monthlyComparison.length - 2]
  const monthDeltaPct = currentMonth && previousMonth && previousMonth.amount > 0
    ? Number((((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100).toFixed(1))
    : 0
  const monthComparisonData = [
    { name: "Current", value: currentMonth?.amount ?? 0, color: "#d4a843" },
    { name: "Previous", value: previousMonth?.amount ?? 0, color: "#0ea5e9" },
  ]
  const [selectedMonthSlice, setSelectedMonthSlice] = useState<"Current" | "Previous">("Current")
  const selectedSliceData = monthComparisonData.find((item) => item.name === selectedMonthSlice) ?? monthComparisonData[0]

  // Department chart data for stacked bar
  const deptChartData = departmentPerformance.map((d) => ({
    name: d.departmentCode,
    paid: d.paidStudents,
    defaulters: d.defaulters,
    collected: d.collectedAmount,
    outstanding: d.outstandingAmount,
    rate: d.paymentRate,
  }))

  return (
    <div className="grid gap-4">
      {/* Department Performance — Horizontal Bar */}
      {departmentPerformance.length > 0 ? (
        <Card className="border-white/[0.05] bg-[#0a0e1a] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gold-400" />
            <h3 className="text-sm font-semibold text-foreground">Department Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={Math.max(200, departmentPerformance.length * 50)}>
            <BarChart data={deptChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="paid" name="Paid Students" stackId="students" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="defaulters" name="Defaulters" stackId="students" fill="#f43f5e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {onDepartmentSelect ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {departmentPerformance.map((dept) => (
                <button
                  key={dept.departmentId}
                  type="button"
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:border-gold-400/30 hover:text-gold-300"
                  onClick={() => onDepartmentSelect(dept.departmentId)}
                >
                  {dept.departmentCode} &middot; {dept.paymentRate}%
                </button>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null}

      {/* Collection Trend + Month Comparison */}
      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-gold-400" />
          <h3 className="text-sm font-semibold text-foreground">Collection Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={collectionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="amount" name="Collected" fill="#d4a843" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {collectionTrend.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">No trend data in selected range.</p>
        ) : null}
        <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-xs">
          <div>
            <p className="text-muted-foreground">Monthly intelligence</p>
            <p className="mt-1 text-foreground">
              {currentMonth ? `Current month: ${formatCurrency(currentMonth.amount)}` : "No current month data"}
            </p>
            <p className={`mt-1 font-medium ${monthDeltaPct >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {monthDeltaPct >= 0 ? "+" : ""}
              {monthDeltaPct}% vs previous month
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Selected: <span className="text-foreground">{selectedSliceData.name}</span> · {formatFullCurrency(selectedSliceData.value)}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie
                data={monthComparisonData}
                dataKey="value"
                nameKey="name"
                innerRadius={26}
                outerRadius={44}
                paddingAngle={2}
                onClick={(_, index) => {
                  const clicked = monthComparisonData[index]
                  if (!clicked) return
                  setSelectedMonthSlice(clicked.name as "Current" | "Previous")
                }}
              >
                {monthComparisonData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Semester Breakdown */}
      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-foreground">Semester Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={semesterBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="semester" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="paidAmount" name="Paid" stackId="fees" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="unpaidAmount" name="Unpaid" stackId="fees" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {semesterBreakdown.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">No semester data for current filters.</p>
        ) : null}
        {onSemesterSelect ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {semesterBreakdown.map((semester) => (
              <button
                key={semester.semester}
                type="button"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[11px] text-slate-300 transition-colors hover:border-gold-400/30 hover:text-gold-300"
                onClick={() => onSemesterSelect(semester.semester)}
              >
                Track Sem {semester.semester}
              </button>
            ))}
          </div>
        ) : null}
      </Card>
    </div>
  )
}
