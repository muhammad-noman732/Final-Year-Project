"use client"

import { useSelector } from "react-redux"
import { useMemo } from "react"
import type { RootState } from "@/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatFullCurrency } from "@/config/constants"
import type { HodSemesterChartProps } from "@/types/client/ui/hod.ui.types"

const ORDINAL = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

function ChartTooltip({
  active, payload, label,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl px-4 py-3 text-sm space-y-2 transition-colors duration-300">
      <p className="font-bold text-[#0F172A] dark:text-slate-100 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: p.color }} />
            <span className="text-[#64748B] dark:text-slate-400 font-medium">{p.name}</span>
          </span>
          <span className="text-[#0F172A] dark:text-slate-100 font-bold">{formatFullCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function HodSemesterChart({ data }: HodSemesterChartProps) {
  const theme = useSelector((state: RootState) => state.ui.theme)
  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const chartData = useMemo(
    () => data.map((d) => ({
      semester: `${ORDINAL[d.semester] ?? d.semester} Sem`,
      Paid: d.paidAmount,
      Unpaid: d.unpaidAmount,
      paidStudents: d.paidStudents,
      unpaidStudents: d.unpaidStudents,
    })),
    [data],
  )

  const cardStyle = "relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 dark:border-white/10 p-6 transition-all duration-300"

  if (chartData.length === 0) {
    return (
      <div className={`${cardStyle} flex items-center justify-center h-[300px]`}>
        <p className="text-sm font-medium text-[#64748B] dark:text-slate-500">No semester data available</p>
      </div>
    )
  }

  const textColor = isDark ? "#94A3B8" : "#64748B"
  const gridColor = isDark ? "#1E293B" : "#E2E8F0"

  return (
    <div className={cardStyle}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Semester-wise Collection
        </h3>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#64748B] dark:text-slate-400">
            <span className="w-3 h-3 rounded-md inline-block bg-[#22C55E] shadow-sm" />Paid
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold text-[#64748B] dark:text-slate-400">
            <span className="w-3 h-3 rounded-md inline-block bg-[#EF4444] shadow-sm" />Unpaid
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} barGap={4} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="4 4" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="semester"
            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <Bar dataKey="Paid" stackId="a" fill="#22C55E" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Unpaid" stackId="a" fill="#EF4444" radius={[6, 6, 0, 0]} />
          <YAxis
            tick={{ fill: textColor, fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : v.toString()}
            width={40}
            dx={-10}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
