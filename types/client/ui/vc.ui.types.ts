import type { SSEPaymentEvent, SSERegistrationImportedEvent } from "@/types/server/sse.types"
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
  registrationImportedAt: number | null
  latestRegistrationEvent: SSERegistrationImportedEvent | null
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

// ─── Tracking Page ────────────────────────────────────────────────────────────

export type TrackingTab = "overview" | "defaulters" | "paid" | "unpaid"
export type TrackingScope = "overall" | "department" | "semester"

export interface TrackingKPICard {
  label: string
  value: string
  tone: string
  icon: string
}

export interface UseVCTrackingReturn {
  tab: TrackingTab
  scope: TrackingScope
  filters: VCFilterState
  page: number
  departments: VCSelectOption[]
  programs: VCSelectOption[]
  sessions: VCSelectOption[]
  overview: import("@/types/server/vc.types").VCDashboardOverview | undefined
  departmentPerformance: import("@/types/server/vc.types").VCDepartmentPerformance[]
  semesterBreakdown: import("@/types/server/vc.types").VCSemesterBreakdown[]
  lastUpdatedAt: string | null
  isOverviewLoading: boolean
  studentsData: import("@/types/server/vc.types").VCPaginatedStudents | undefined
  isStudentsLoading: boolean
  isStudentsFetching: boolean
  trackingCards: TrackingKPICard[]
  handleFilterChange: (key: keyof VCFilterState, value: string) => void
  handleTabChange: (tab: string) => void
  handleScopeChange: (scope: string) => void
  handleReset: () => void
  handlePageChange: (page: number) => void
  handleExport: () => void
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
