import type { SSEPaymentEvent } from "@/types/server/sse.types"
import type { VCFeeStatus, VCTimeRange, VCDashboardOverview, VCDepartmentPerformance, VCTrendPoint } from "@/types/server/vc.types"

export interface SSELiveTransaction {
  id: string
  studentName: string
  rollNumber: string
  department: string
  program: string
  semester: string
  amount: number
  paidAt: string
}

export interface VCSelectOption {
  id: string
  label: string
}

export interface VCFilterState {
  departmentId: string
  programId: string
  sessionId: string
  semester: string
  feeStatus: VCFeeStatus
  range: VCTimeRange
  from: string
  to: string
  search: string
}

export interface UseSSEReturn {
  transactions: SSELiveTransaction[]
  newPaymentsCount: number
  newAmountCollected: number
  connected: boolean
  latestEvent: SSEPaymentEvent | null
  clearLatestEvent: () => void
  insightsUpdatedAt: number | null
}

// ─── Health Score ──────────────────────────────────────────────────────────────

export type VCHealthTier = "healthy" | "at-risk" | "critical"

export interface VCHealthScore {
  score: number
  tier: VCHealthTier
  paymentRate: number
  defaulterRate: number
  velocityScore: number
  reason: string
}

// ─── Velocity ─────────────────────────────────────────────────────────────────

export type VCVelocityTrend = "accelerating" | "stable" | "slowing"

export interface VCVelocityMetrics {
  paymentsPerHourToday: number
  paymentsPerHourYesterday: number
  projectedDailyPayments: number
  projectedDailyAmount: number
  trend: VCVelocityTrend
  deltaPercent: number
  avgDailyAmount: number
}

// ─── Component Prop Types ──────────────────────────────────────────────────────

export interface VCHealthScoreBentoProps {
  overview: VCDashboardOverview
  collectionTrend: VCTrendPoint[]
  newAmountCollected: number
  sseConnected: boolean
  onCardClick?: (tab: "paid" | "defaulters" | "payments") => void
}

export interface VCDepartmentHealthGridProps {
  departments: VCDepartmentPerformance[]
  onDepartmentSelect?: (departmentId: string) => void
}

export interface VCVelocityCardProps {
  overview: VCDashboardOverview
  collectionTrend: VCTrendPoint[]
}
