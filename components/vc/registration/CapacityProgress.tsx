"use client"

import { motion } from "framer-motion"
import { Gauge } from "lucide-react"

interface CapacityEntry {
  program: string
  department: string
  count: number
  capacity: number
  percentage: number
  status: "critical" | "warning" | "good"
}

interface Props {
  data: CapacityEntry[]
}

const STATUS_CONFIG = {
  critical: {
    bar: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    label: "Almost Full",
    labelClass: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 ring-red-500/25",
  },
  warning: {
    bar: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    label: "Filling Fast",
    labelClass: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 ring-amber-500/25",
  },
  good: {
    bar: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Available",
    labelClass: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 ring-emerald-500/25",
  },
} as const

export default function CapacityProgress({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground/40">
        No capacity data yet.
      </div>
    )
  }

  // Sort critical first
  const sorted = [...data].sort((a, b) => b.percentage - a.percentage)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] backdrop-blur-md shadow-sm p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200/50 dark:bg-white/[0.04]">
          <Gauge className="h-3.5 w-3.5 text-slate-500 dark:text-muted-foreground/50" strokeWidth={1.8} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-muted-foreground/55">
          Program Capacity
        </span>
      </div>

      <div className="space-y-4">
        {sorted.map((entry, i) => {
          const cfg = STATUS_CONFIG[entry.status]
          const remaining = entry.capacity - entry.count
          return (
            <motion.div
              key={entry.program}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 280, damping: 26 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate text-[12.5px] font-bold text-[#0F172A] dark:text-foreground/80">
                    {entry.program}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center rounded px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[0.12em] ring-1 ${cfg.labelClass}`}
                  >
                    {cfg.label}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-[12px] font-bold tabular-nums ${cfg.text}`}>
                    {entry.percentage}%
                  </span>
                  <span className="ml-1 text-[10px] font-medium text-slate-400 dark:text-muted-foreground/35">
                    {entry.count.toLocaleString()}/{entry.capacity.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Track */}
              <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className={`h-full rounded-full ${cfg.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(entry.percentage, 100)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.06 + 0.1, ease: "easeOut" }}
                />
              </div>

              <p className="text-[10px] font-medium text-slate-400 dark:text-muted-foreground/35">
                {remaining > 0
                  ? `${remaining.toLocaleString()} seat${remaining !== 1 ? "s" : ""} remaining`
                  : "Capacity reached"}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
