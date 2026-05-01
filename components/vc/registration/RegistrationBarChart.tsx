"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import { BarChart2 } from "lucide-react"

interface Props {
  data: Array<{ program: string; department: string; count: number }>
}

const DEPT_COLORS: Record<string, string> = {
  CS: "#818cf8",
  Biology: "#34d399",
  Physics: "#fb923c",
  Math: "#f472b6",
}

const DEFAULT_COLOR = "#6366f1"

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { program: string; department: string; count: number } }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0]!.payload
  const color = DEPT_COLORS[d.department] ?? DEFAULT_COLOR
  return (
    <div className="rounded-lg border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-[#0a0f1e] backdrop-blur-md px-3 py-2 shadow-xl">
      <p className="text-[11px] font-bold" style={{ color }}>
        {d.program}
      </p>
      <p className="text-[13px] font-bold text-slate-900 dark:text-foreground tabular-nums">
        {d.count.toLocaleString()} applicants
      </p>
    </div>
  )
}

export default function RegistrationBarChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-muted-foreground/40">
        No registration data yet.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] backdrop-blur-md shadow-sm p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200/50 dark:bg-white/[0.04]">
          <BarChart2 className="h-3.5 w-3.5 text-slate-500 dark:text-muted-foreground/50" strokeWidth={1.8} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-muted-foreground/55">
          Registrations by Program
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="program"
            tick={{ fill: "rgba(148,163,184,0.5)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(148,163,184,0.4)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {data.map((entry) => (
              <Cell
                key={entry.program}
                fill={DEPT_COLORS[entry.department] ?? DEFAULT_COLOR}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
