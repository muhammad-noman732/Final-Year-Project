"use client"

import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react"
import { formatCurrency } from "@/config/constants"
import { useVCVelocity } from "@/hooks/vc/useVCVelocity"
import type { VCVelocityCardProps, VCVelocityTrend } from "@/types/client/ui/vc.ui.types"

const TREND_CONFIG: Record<
  VCVelocityTrend,
  { Icon: typeof TrendingUp; color: string; label: string }
> = {
  accelerating: { Icon: TrendingUp, color: "text-emerald-400", label: "Accelerating" },
  stable: { Icon: Minus, color: "text-sky-400", label: "Stable" },
  slowing: { Icon: TrendingDown, color: "text-amber-400", label: "Slowing" },
}

export default function VCVelocityCard({ overview, collectionTrend }: VCVelocityCardProps) {
  const velocity = useVCVelocity(overview, collectionTrend)

  if (!velocity) return null

  const trendCfg = TREND_CONFIG[velocity.trend]
  const TrendIcon = trendCfg.Icon
  const isOnTrack = velocity.projectedDailyAmount >= velocity.avgDailyAmount
  const deltaAbs = Math.abs(velocity.deltaPercent)

  return (
    <div className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-navy-900/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold-500/10">
            <Zap className="h-3 w-3 text-gold-400" />
          </div>
          <span className="text-[11px] font-semibold text-[#0F172A] dark:text-foreground">Payment Velocity</span>
        </div>
        <div className={`flex items-center gap-1 text-[10.5px] font-semibold ${trendCfg.color}`}>
          <TrendIcon className="h-3 w-3" />
          {trendCfg.label}
        </div>
      </div>

      {/* Main stat */}
      <div className="flex items-end gap-1.5 mb-1">
        <span className="text-2xl font-bold tabular-nums tracking-tight text-[#0F172A] dark:text-foreground">
          {velocity.paymentsPerHourToday}
        </span>
        <span className="text-[11px] text-[#64748B] dark:text-muted-foreground mb-0.5">payments/hr today</span>
      </div>

      {/* vs yesterday */}
      {velocity.paymentsPerHourYesterday > 0 && (
        <p className="text-[11px] text-[#64748B] dark:text-muted-foreground mb-3">
          vs{" "}
          <span className="font-medium text-[#0F172A]/80 dark:text-foreground/80">
            {velocity.paymentsPerHourYesterday}
          </span>{" "}
          yesterday
          {deltaAbs > 0 && (
            <span className={`ml-1 font-semibold ${trendCfg.color}`}>
              ({velocity.deltaPercent > 0 ? "+" : ""}
              {velocity.deltaPercent}%)
            </span>
          )}
        </p>
      )}

      {/* Projection row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-white/[0.04]">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-[#64748B]/50 dark:text-muted-foreground/50 mb-0.5">
            Projected Today
          </p>
          <p className="text-sm font-bold tabular-nums text-[#0F172A] dark:text-foreground">
            {formatCurrency(velocity.projectedDailyAmount)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-[#64748B]/50 dark:text-muted-foreground/50 mb-0.5">
            Daily Avg
          </p>
          <p
            className={`text-sm font-bold tabular-nums ${isOnTrack ? "text-emerald-400" : "text-amber-400"}`}
          >
            {isOnTrack ? "On Track" : "Below Avg"}
          </p>
        </div>
      </div>
    </div>
  )
}
