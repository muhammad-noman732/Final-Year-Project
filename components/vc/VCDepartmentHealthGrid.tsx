"use client"

import { motion } from "framer-motion"
import { formatCurrency } from "@/config/constants"
import type { VCDepartmentHealthGridProps, VCHealthTier } from "@/types/client/ui/vc.ui.types"
import type { VCDepartmentPerformance } from "@/types/server/vc.types"

function getDeptTier(paymentRate: number): VCHealthTier {
  if (paymentRate >= 70) return "healthy"
  if (paymentRate >= 45) return "at-risk"
  return "critical"
}

const TIER_STYLES: Record<
  VCHealthTier,
  { badge: string; badgeText: string; ring: string; dot: string; donut: string }
> = {
  healthy: {
    badge: "bg-emerald-500/10 text-emerald-400",
    badgeText: "Healthy",
    ring: "border-emerald-500/15",
    dot: "bg-emerald-500",
    donut: "#10b981",
  },
  "at-risk": {
    badge: "bg-amber-500/10 text-amber-400",
    badgeText: "At Risk",
    ring: "border-amber-500/15",
    dot: "bg-amber-500",
    donut: "#f59e0b",
  },
  critical: {
    badge: "bg-rose-500/10 text-rose-400",
    badgeText: "Critical",
    ring: "border-rose-500/20",
    dot: "bg-rose-500",
    donut: "#f43f5e",
  },
}

// ─── Mini Donut ───────────────────────────────────────────────────────────────

function MiniDonut({ rate, color }: { rate: number; color: string }) {
  const r = 14
  const cx = 18
  const cy = 18
  const circumference = 2 * Math.PI * r
  const dash = (rate / 100) * circumference

  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="4"
      />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dash.toFixed(1)} ${circumference.toFixed(1)}`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>
  )
}

// ─── Department Card ──────────────────────────────────────────────────────────

function DeptCard({
  dept,
  index,
  onSelect,
}: {
  dept: VCDepartmentPerformance
  index: number
  onSelect?: (id: string) => void
}) {
  const tier = getDeptTier(dept.paymentRate)
  const styles = TIER_STYLES[tier]

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, delay: index * 0.045 }}
      onClick={() => onSelect?.(dept.departmentId)}
      disabled={!onSelect}
      className={[
        "group flex flex-col gap-3 rounded-xl border p-4 text-left",
        "bg-white/[0.018] transition-all duration-200",
        styles.ring,
        onSelect
          ? "cursor-pointer hover:bg-white/[0.032] hover:border-white/[0.1] active:scale-[0.98]"
          : "cursor-default",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-foreground truncate">
            {dept.departmentName}
          </p>
          <p className="text-[10.5px] font-mono text-muted-foreground/60 mt-0.5">
            {dept.departmentCode}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] ${styles.badge}`}
        >
          {styles.badgeText}
        </span>
      </div>

      {/* Donut + Rate */}
      <div className="flex items-center gap-3">
        <MiniDonut rate={dept.paymentRate} color={styles.donut} />
        <div>
          <p className="text-lg font-bold tabular-nums tracking-tight text-foreground">
            {dept.paymentRate}%
          </p>
          <p className="text-[10.5px] text-muted-foreground">
            {dept.paidStudents}/{dept.totalStudents} paid
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04]">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/50 mb-0.5">
            Outstanding
          </p>
          <p className="text-[11.5px] font-semibold text-foreground tabular-nums">
            {formatCurrency(dept.outstandingAmount)}
          </p>
        </div>
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/50 mb-0.5">
            Today
          </p>
          <p className="text-[11.5px] font-semibold text-foreground tabular-nums">
            {dept.todayPayments > 0
              ? `${dept.todayPayments} pay${dept.todayPayments !== 1 ? "s" : ""}`
              : "—"}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function VCDepartmentHealthGrid({
  departments,
  onDepartmentSelect,
}: VCDepartmentHealthGridProps) {
  if (departments.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-xs text-muted-foreground">No department data.</p>
      </div>
    )
  }

  const sorted = [...departments].sort((a, b) => {
    const tierOrder: Record<VCHealthTier, number> = { critical: 0, "at-risk": 1, healthy: 2 }
    return tierOrder[getDeptTier(a.paymentRate)] - tierOrder[getDeptTier(b.paymentRate)]
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {sorted.map((dept, i) => (
        <DeptCard
          key={dept.departmentId}
          dept={dept}
          index={i}
          onSelect={onDepartmentSelect}
        />
      ))}
    </div>
  )
}
