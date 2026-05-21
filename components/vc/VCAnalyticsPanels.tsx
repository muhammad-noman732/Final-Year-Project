"use client"

import {
  Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"
import { TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import VCDepartmentHealthGrid from "@/components/vc/VCDepartmentHealthGrid"
import type { VCAnalyticsData } from "@/types/client/store/vc.store.types"

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

function PanelHeader({
  icon: Icon,
  iconClass,
  title,
}: {
  icon: typeof TrendingUp
  iconClass: string
  title: string
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-foreground">{title}</h3>
    </div>
  )
}

export default function VCAnalyticsPanels({
  data,
  onDepartmentSelect,
  onSemesterSelect,
}: {
  data: VCAnalyticsData
  onDepartmentSelect?: (departmentId: string) => void
  onSemesterSelect?: (semester: number) => void
}) {
  return (
    <div className="space-y-4">
      {/* Collection Timeline — commented out
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <PanelHeader icon={TrendingUp} iconClass="bg-gold-500/10 text-gold-400" title="Collection Timeline" />
        {data.collectionTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.collectionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${Math.round(v / 1000)}K`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone" dataKey="amount" name="Collected"
                stroke="#d4a843" strokeWidth={2} dot={false}
                activeDot={{ r: 4, fill: "#d4a843" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-xs text-[#64748B] dark:text-muted-foreground">No timeline data for selected range.</p>
          </div>
        )}
      </div>
      */}

      {}
      <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <PanelHeader icon={TrendingUp} iconClass="bg-violet-500/10 text-violet-400" title="Department Health" />
        <VCDepartmentHealthGrid
          departments={data.departmentPerformance}
          onDepartmentSelect={onDepartmentSelect}
        />
      </div>

    </div>
  )
}
