"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import { useVCHealthScore } from "@/hooks/vc/useVCHealthScore"
import type { VCHealthScoreBentoProps, VCHealthTier } from "@/types/client/ui/vc.ui.types"

// ─── Gauge Arc constants ───────────────────────────────────────────────────────
const CX = 80
const CY = 80
const R = 56
const START_DEG = 225
const END_DEG = 135

function polar(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CX + R * Math.sin(rad),
    y: CY - R * Math.cos(rad),
  }
}

const start = polar(START_DEG)
const end = polar(END_DEG)
// 270° arc — large-arc-flag=1, sweep-flag=1 (clockwise)
const ARC_PATH = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${R} ${R} 0 1 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`

// ─── Tier config ──────────────────────────────────────────────────────────────

const TIER_CONFIG: Record<
  VCHealthTier,
  { stroke: string; glow: string; badge: string; badgeText: string; label: string }
> = {
  healthy: {
    stroke: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    badge: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    badgeText: "HEALTHY",
    label: "System healthy",
  },
  "at-risk": {
    stroke: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    badge: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    badgeText: "AT RISK",
    label: "Needs attention",
  },
  critical: {
    stroke: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    badge: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
    badgeText: "CRITICAL",
    label: "Action required",
  },
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const W = 120
  const H = 24
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * W
    const y = H - ((v - min) / range) * H
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke="rgba(212,168,67,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  accent,
  onClick,
  colSpan2,
}: {
  label: string
  value: string
  sub?: string
  accent: string
  onClick?: () => void
  colSpan2?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={[
        "group flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] p-3.5",
        "text-left transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)]",
        colSpan2 ? "col-span-2" : "",
        onClick
          ? "cursor-pointer hover:bg-white/80 dark:hover:bg-white/[0.035] hover:border-white/60 dark:hover:border-white/[0.1] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.985]"
          : "cursor-default",
      ]
        .join(" ")
        .trim()}
    >
      <p className={`text-[9.5px] font-bold uppercase tracking-[0.2em] ${accent}`}>{label}</p>
      <p className="text-xl font-bold tabular-nums tracking-tight text-[#0F172A] dark:text-foreground">{value}</p>
      {sub && <p className="text-[11px] text-[#64748B] dark:text-muted-foreground">{sub}</p>}
    </button>
  )
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function VCHealthScoreBento({
  overview,
  collectionTrend,
  newAmountCollected,
  sseConnected,
  onCardClick,
}: VCHealthScoreBentoProps) {
  const healthScore = useVCHealthScore(overview, collectionTrend)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!newAmountCollected || !flashRef.current) return
    flashRef.current.classList.add("ring-2", "ring-emerald-500/40")
    const t = setTimeout(() => {
      flashRef.current?.classList.remove("ring-2", "ring-emerald-500/40")
    }, 1_200)
    return () => clearTimeout(t)
  }, [newAmountCollected])

  const score = healthScore?.score ?? 0
  const tier = healthScore?.tier ?? "healthy"
  const cfg = TIER_CONFIG[tier]
  const sparkPoints = collectionTrend.slice(-7).map((p) => p.amount)

  const payRate = overview.paymentRate ?? 0
  const rateColor =
    payRate >= 70 ? "text-emerald-400" : payRate >= 40 ? "text-amber-400" : "text-rose-400"

  return (
    <div
      ref={flashRef}
      className="flex flex-col xl:flex-row gap-4 rounded-2xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-navy-900/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-5 transition-all duration-500"
    >
      {/* ── Left: Gauge ── */}
      <div className="flex flex-col items-center gap-3 xl:w-[220px] shrink-0">
        {/* Gauge SVG */}
        <div className="relative" style={{ filter: `drop-shadow(0 0 18px ${cfg.glow})` }}>
          <svg width="160" height="140" viewBox="0 0 160 160">
            {/* Background arc */}
            <path
              d={ARC_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Animated progress arc */}
            <motion.path
              d={ARC_PATH}
              fill="none"
              stroke={cfg.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
            />
            {/* Score text */}
            <text
              x={CX}
              y={CY - 6}
              textAnchor="middle"
              className="text-[#0F172A] dark:text-white"
              fill="currentColor"
              fontSize="28"
              fontWeight="700"
              fontFamily="monospace"
            >
              {score}
            </text>
            <text
              x={CX}
              y={CY + 14}
              textAnchor="middle"
              className="text-[#64748B] dark:text-slate-400/70"
              fill="currentColor"
              fontSize="9"
              fontWeight="600"
              letterSpacing="2"
            >
              HEALTH SCORE
            </text>
          </svg>
        </div>

        {/* Tier badge */}
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${cfg.badge}`}
        >
          {cfg.badgeText}
        </span>

        {/* Reason */}
        {healthScore && (
          <p className="text-center text-[11.5px] text-[#64748B]/80 dark:text-muted-foreground/80 max-w-[160px]">
            {healthScore.reason}
          </p>
        )}

        {/* Sparkline */}
        {sparkPoints.length > 1 && (
          <div className="flex flex-col items-center gap-1">
            <Sparkline points={sparkPoints} />
            <p className="text-[10px] text-[#64748B]/50 dark:text-muted-foreground/50">7-day collection</p>
          </div>
        )}

        {/* SSE dot */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            {sseConnected && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${sseConnected ? "bg-emerald-500" : "bg-zinc-600"}`}
            />
          </span>
          <span className="text-[10px] text-[#64748B]/50 dark:text-muted-foreground/50">
            {sseConnected ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      {/* ── Right: Metric Grid ── */}
      <div className="flex-1 grid grid-cols-2 gap-3 content-start">
        {/* Total Collected — hero */}
        <MetricCard
          colSpan2
          label="Total Collected"
          value={formatCurrency(overview.totalCollected)}
          sub={`${formatFullCurrency(overview.totalCollected)} all time`}
          accent="text-gold-400"
          onClick={onCardClick ? () => onCardClick("payments") : undefined}
        />

        {/* Today's Collection */}
        <MetricCard
          label="Today"
          value={formatCurrency(overview.collectedToday)}
          sub={`${overview.paymentsToday} payment${overview.paymentsToday !== 1 ? "s" : ""}`}
          accent="text-emerald-400"
        />

        {/* Payment Rate */}
        <MetricCard
          label="Rate"
          value={`${payRate}%`}
          sub={`${overview.studentsPaid} of ${overview.totalStudents} paid`}
          accent={rateColor}
          onClick={onCardClick ? () => onCardClick("paid") : undefined}
        />

        {/* Students */}
        <MetricCard
          label="Students"
          value={String(overview.totalStudents)}
          sub={`${overview.studentsUnpaid} pending`}
          accent="text-sky-400"
          onClick={onCardClick ? () => onCardClick("paid") : undefined}
        />

        {/* Defaulters */}
        <MetricCard
          label="Defaulters"
          value={String(overview.defaulters)}
          sub={formatCurrency(overview.outstandingAmount) + " outstanding"}
          accent="text-rose-400"
          onClick={onCardClick ? () => onCardClick("defaulters") : undefined}
        />
      </div>
    </div>
  )
}
