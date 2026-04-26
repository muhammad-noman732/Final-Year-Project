"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface Props {
  data: Array<{ date: string; count: number }>
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#0a0f1e] px-3 py-2 shadow-xl">
      <p className="text-[10px] text-muted-foreground/50">{label}</p>
      <p className="text-[13px] font-bold text-sky-400 tabular-nums">
        {(payload[0]?.value ?? 0).toLocaleString()} imports
      </p>
    </div>
  )
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function DailyImportChart({ data }: Props) {
  // Show only every 5th label to avoid crowding
  const labelledData = data.map((d, i) => ({
    ...d,
    label: i % 5 === 0 ? formatDateLabel(d.date) : "",
  }))

  const hasAnyData = data.some((d) => d.count > 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-xl border border-white/[0.05] bg-[#080c18] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04]">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={1.8} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/55">
            Daily Import Activity
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/35">Last 30 days</span>
      </div>

      {!hasAnyData ? (
        <div className="flex h-44 items-center justify-center text-sm text-muted-foreground/40">
          No import activity yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={labelledData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "rgba(148,163,184,0.4)", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(148,163,184,0.4)", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(56,189,248,0.2)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#38bdf8"
              strokeWidth={1.5}
              fill="url(#regGradient)"
              dot={false}
              activeDot={{ r: 3, fill: "#38bdf8", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  )
}
