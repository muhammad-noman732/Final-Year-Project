"use client"

import { Banknote, Users, AlertTriangle, Receipt, TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type { VCDashboardOverview } from "@/types/server/vc.types"

interface VCOverviewCardsProps {
  overview: VCDashboardOverview
  onCardClick?: (tab: "paid" | "defaulters" | "payments") => void
}

function StatCard(props: {
  label: string
  primary: string
  secondary: string
  sub: string
  icon: typeof TrendingUp
  iconClass: string
  bgClass: string
  borderClass: string
  onClick?: () => void
  highlight?: boolean
}) {
  const Icon = props.icon
  const clickable = Boolean(props.onClick)

  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={!clickable}
      className={[
        "group relative rounded-xl border p-5 text-left transition-all duration-200",
        props.bgClass,
        props.borderClass,
        clickable
          ? "cursor-pointer hover:brightness-110 active:scale-[0.985]"
          : "cursor-default",
      ].join(" ")}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${props.iconClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {props.label}
        </p>
      </div>

      {/* Value */}
      <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
        {props.primary}
      </p>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">{props.secondary}</p>

      <Separator className="bg-white/[0.04] my-3" />

      {/* Sub */}
      <p className="text-[11px] text-muted-foreground">{props.sub}</p>
    </button>
  )
}

export default function VCOverviewCards({ overview, onCardClick }: VCOverviewCardsProps) {
  const payRate = overview.paymentRate ?? 0
  const rateColor = payRate >= 70 ? "text-emerald-400" : payRate >= 40 ? "text-gold-400" : "text-rose-400"

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Collected"
        primary={formatCurrency(overview.collectedInRange)}
        secondary={`+${formatCurrency(overview.collectedToday)} today`}
        sub={`${formatFullCurrency(overview.collectedInRange)} in selected range`}
        icon={Banknote}
        iconClass="bg-emerald-500/10 text-emerald-400"
        bgClass="bg-navy-900"
        borderClass="border-white/[0.05] hover:border-emerald-500/20"
        onClick={onCardClick ? () => onCardClick("payments") : undefined}
      />

      <StatCard
        label="Students Paid"
        primary={`${overview.studentsPaid} / ${overview.totalStudents}`}
        secondary={
          // secondary shown as colored rate inline — handled below
          `${payRate}% collection rate`
        }
        sub={`${overview.totalStudents - overview.studentsPaid} students pending`}
        icon={Users}
        iconClass="bg-sky-500/10 text-sky-400"
        bgClass="bg-navy-900"
        borderClass="border-white/[0.05] hover:border-sky-500/20"
        onClick={onCardClick ? () => onCardClick("paid") : undefined}
      />

      <StatCard
        label="Defaulters"
        primary={String(overview.defaulters)}
        secondary={`${formatCurrency(overview.outstandingAmount)} outstanding`}
        sub="Overdue or unpaid fee assignments"
        icon={AlertTriangle}
        iconClass="bg-rose-500/10 text-rose-400"
        bgClass="bg-navy-900"
        borderClass="border-white/[0.05] hover:border-rose-500/20"
        onClick={onCardClick ? () => onCardClick("defaulters") : undefined}
      />

      <StatCard
        label="Transactions"
        primary={String(overview.paymentsInRange)}
        secondary={`${overview.failedPaymentsInRange} failed`}
        sub="Across all semesters in range"
        icon={Receipt}
        iconClass="bg-gold-500/10 text-gold-400"
        bgClass="bg-navy-900"
        borderClass="border-white/[0.05] hover:border-gold-500/20"
        onClick={onCardClick ? () => onCardClick("payments") : undefined}
      />
    </div>
  )
}
