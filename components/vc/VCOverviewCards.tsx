"use client"

import {
  AlertTriangle,
  Banknote,
  Receipt,
  TrendingUp,
  Users,
} from "lucide-react"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type { VCDashboardOverview } from "@/types/server/vc.types"

interface VCOverviewCardsProps {
  overview: VCDashboardOverview
  onCardClick?: (tab: "paid" | "defaulters" | "payments") => void
}

function OverviewCard(props: {
  label: string
  value: string
  subtext: string
  icon: typeof TrendingUp
  tone: string
  onClick?: () => void
}) {
  const Icon = props.icon
  const isClickable = Boolean(props.onClick)

  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={!isClickable}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5 text-left transition-all duration-200 ${
        isClickable
          ? "cursor-pointer hover:border-white/[0.10] hover:bg-[#0c1120] active:scale-[0.98]"
          : "cursor-default"
      }`}
    >
      {/* Subtle gradient overlay on hover */}
      {isClickable && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      )}
      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className={`rounded-2xl p-3 ${props.tone}`}>
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {props.label}
          </p>
        </div>
        <p className="text-2xl font-bold tracking-tight text-foreground">{props.value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{props.subtext}</p>
      </div>
    </button>
  )
}

export default function VCOverviewCards({ overview, onCardClick }: VCOverviewCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        label="Total Collected"
        value={formatCurrency(overview.collectedInRange)}
        subtext={`${formatFullCurrency(overview.collectedToday)} collected today`}
        icon={Banknote}
        tone="bg-emerald-500/10 text-emerald-400"
        onClick={onCardClick ? () => onCardClick("payments") : undefined}
      />
      <OverviewCard
        label="Students Paid"
        value={`${overview.studentsPaid}/${overview.totalStudents}`}
        subtext={`${overview.paymentRate}% payment rate`}
        icon={Users}
        tone="bg-sky-500/10 text-sky-400"
        onClick={onCardClick ? () => onCardClick("paid") : undefined}
      />
      <OverviewCard
        label="Defaulters"
        value={String(overview.defaulters)}
        subtext={`${formatFullCurrency(overview.outstandingAmount)} still outstanding`}
        icon={AlertTriangle}
        tone="bg-rose-500/10 text-rose-400"
        onClick={onCardClick ? () => onCardClick("defaulters") : undefined}
      />
      <OverviewCard
        label="Transactions"
        value={String(overview.paymentsInRange)}
        subtext={`${overview.failedPaymentsInRange} failed · across student semesters`}
        icon={Receipt}
        tone="bg-gold-500/10 text-gold-400"
        onClick={onCardClick ? () => onCardClick("payments") : undefined}
      />
    </div>
  )
}
