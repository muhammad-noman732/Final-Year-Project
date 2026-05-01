"use client"

import { useState } from "react"
import { CreditCard, GraduationCap, TrendingDown, TrendingUp } from "lucide-react"
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type {
  VCSemesterBreakdown,
  VCTrendPoint,
} from "@/types/client/store/vc.store.types"

interface VCDashboardPanelsProps {
  semesterBreakdown: VCSemesterBreakdown[]
  collectionTrend: VCTrendPoint[]
  onSemesterSelect?: (semester: number) => void
}

function ChartTooltip(props: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
}) {
  if (!props.active || !props.payload?.length) return null
  return (
    <div className="rounded-lg border border-white/60 dark:border-white/[0.08] bg-white/80 dark:bg-navy-800/80 backdrop-blur-md px-3 py-2 text-xs shadow-xl">
      {props.label ? <p className="mb-1.5 font-semibold text-[#0F172A] dark:text-foreground">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <div key={`${entry.name}-${entry.color}`} className="flex items-center gap-2 text-[#64748B] dark:text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span>{entry.name}:</span>
          <span className="text-[#0F172A] dark:text-foreground font-medium">
            {entry.value > 999 ? formatFullCurrency(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function VCDashboardPanels({
  semesterBreakdown,
  collectionTrend,
  onSemesterSelect,
}: VCDashboardPanelsProps) {
  // Monthly comparison from trend
  const monthlyComparison = Array.from(
    collectionTrend.reduce<Map<string, number>>((acc, item) => {
      const monthLabel = item.label.slice(0, 7)
      acc.set(monthLabel, (acc.get(monthLabel) ?? 0) + item.amount)
      return acc
    }, new Map<string, number>()),
  ).map(([month, amount]) => ({ month, amount }))

  const currentMonth = monthlyComparison[monthlyComparison.length - 1]
  const previousMonth = monthlyComparison[monthlyComparison.length - 2]
  const monthDeltaPct =
    currentMonth && previousMonth && previousMonth.amount > 0
      ? Number(
          (((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100).toFixed(1),
        )
      : 0
  const isUp = monthDeltaPct >= 0

  const [selectedMonthSlice, setSelectedMonthSlice] = useState<"Current" | "Previous">("Current")
  const monthComparisonData = [
    { name: "Current", value: currentMonth?.amount ?? 0, color: "#d4a843" },
    { name: "Previous", value: previousMonth?.amount ?? 0, color: "#0ea5e9" },
  ]
  const selectedSliceData =
    monthComparisonData.find((item) => item.name === selectedMonthSlice) ?? monthComparisonData[0]

  return (
    <div className="grid gap-4">
      {/* Collection Trend */}
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/10">
              <CreditCard className="h-3.5 w-3.5 text-gold-400" />
            </div>
            <h3 className="text-sm font-semibold text-[#0F172A] dark:text-foreground">Collection Trend</h3>
          </div>
          {currentMonth && (
            <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
              {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {isUp ? "+" : ""}{monthDeltaPct}% vs last month
            </div>
          )}
        </div>

        {collectionTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={collectionTrend}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a843" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#d4a843" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="label" tick={{ fill: "#6b7a99", fontSize: 10 }}
                tickLine={false} axisLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${Math.round(v / 1000)}K`}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(212,168,67,0.15)", strokeWidth: 1 }} />
              {collectionTrend.length > 1 && (
                <ReferenceLine
                  y={Math.round(collectionTrend.reduce((s, p) => s + p.amount, 0) / collectionTrend.length)}
                  stroke="rgba(212,168,67,0.3)"
                  strokeDasharray="4 4"
                  label={{ value: "avg", fill: "#6b7a99", fontSize: 9, position: "insideTopRight" }}
                />
              )}
              <Area
                type="monotone"
                dataKey="amount"
                name="Collected"
                stroke="#d4a843"
                strokeWidth={2}
                fill="url(#trendGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#d4a843", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-xs text-[#64748B] dark:text-muted-foreground">No trend data in selected range.</p>
          </div>
        )}

        {/* Monthly intel */}
        {currentMonth && (
          <>
            <Separator className="bg-slate-200/50 dark:bg-white/[0.04] my-4" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] text-[#64748B] dark:text-muted-foreground uppercase tracking-[0.16em]">Monthly Intelligence</p>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-foreground">
                  {formatFullCurrency(currentMonth.amount)}
                  <span className="ml-1.5 text-xs font-normal text-[#64748B] dark:text-muted-foreground">current month</span>
                </p>
                <p className="text-xs">
                  <span className="text-[#64748B] dark:text-muted-foreground">Tracking </span>
                  <span className="font-medium text-[#0F172A] dark:text-foreground">{selectedSliceData.name}</span>
                  <span className="text-[#64748B] dark:text-muted-foreground"> · {formatFullCurrency(selectedSliceData.value)}</span>
                </p>
              </div>
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie
                    data={monthComparisonData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={24}
                    outerRadius={38}
                    paddingAngle={2}
                    onClick={(_, index) => {
                      const clicked = monthComparisonData[index]
                      if (clicked) setSelectedMonthSlice(clicked.name as "Current" | "Previous")
                    }}
                  >
                    {monthComparisonData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} opacity={selectedMonthSlice === entry.name ? 1 : 0.4} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Semester Breakdown */}
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10">
            <GraduationCap className="h-3.5 w-3.5 text-sky-400" />
          </div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-foreground">Semester Breakdown</h3>
          <div className="ml-auto flex items-center gap-3 text-[11px] text-[#64748B] dark:text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />Paid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-rose-500" />Unpaid
            </span>
          </div>
        </div>

        {semesterBreakdown.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={semesterBreakdown} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="semester" tick={{ fill: "#6b7a99", fontSize: 10 }}
                  tickLine={false} axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="paidAmount" name="Paid" stackId="fees" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="unpaidAmount" name="Unpaid" stackId="fees" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {onSemesterSelect && (
              <div className="mt-4 flex flex-wrap gap-2">
                {semesterBreakdown.map((sem) => (
                  <button
                    key={sem.semester}
                    type="button"
                    onClick={() => onSemesterSelect(sem.semester)}
                    className="rounded-lg border border-slate-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] px-2.5 py-1 text-[11px] text-[#64748B] dark:text-muted-foreground transition-colors hover:border-gold-500/40 hover:text-[#0F172A] dark:hover:border-gold-500/25 dark:hover:text-gold-300"
                  >
                    Sem {sem.semester}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-xs text-[#64748B] dark:text-muted-foreground">No semester data for current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
