import type { SSEPaymentEvent } from "@/types/server/sse.types"
import type {
  HodDashboardData,
  HodDefaulterRow,
  HodDepartmentInfo,
  HodOverview,
  HodSemesterBreakdown,
  HodStudentRow,
} from "@/types/server/hod.types"
import type { PaginationMeta } from "@/types/server/shared.types"

export interface HodSSELiveTransaction {
  id: string
  studentName: string
  rollNumber: string
  program: string
  semester: string
  amount: number
  paidAt: string
}

export interface UseHodSSEReturn {
  transactions: HodSSELiveTransaction[]
  newPaymentsCount: number
  newAmountCollected: number
  connected: boolean
  latestEvent: SSEPaymentEvent | null
  clearLatestEvent: () => void
}

export interface HodFilterState {
  semester: string
  feeStatus: "ALL" | "PAID" | "UNPAID" | "OVERDUE"
  search: string
}

export interface UseHodDashboardReturn {
  department: HodDepartmentInfo
  overview: HodOverview
  semesterBreakdown: HodSemesterBreakdown[]
  defaulters: HodDefaulterRow[]
  liveTransactions: HodSSELiveTransaction[]
  initialTransactions: HodSSELiveTransaction[]
  sseConnected: boolean
  newPaymentsCount: number
  newAmountCollected: number
  isLoading: boolean
  lastUpdatedAt: string | null
  showToast: boolean
  toastMessage: string
  filters: HodFilterState
  handleFilterChange: (key: keyof HodFilterState, value: string) => void
  handleReset: () => void
  students: HodStudentRow[]
  studentsMeta: PaginationMeta | undefined
  isStudentsLoading: boolean
  isStudentsFetching: boolean
  studentsPage: number
  handlePageChange: (page: number) => void
}

export interface HodDashboardClientProps {
  initialData: HodDashboardData
}

export interface HodStatsGridProps {
  overview: HodOverview
  sseConnected: boolean
  newAmountCollected: number
}

export interface HodSemesterChartProps {
  data: HodSemesterBreakdown[]
}

export interface HodLiveFeedProps {
  transactions: HodSSELiveTransaction[]
  initialTransactions: HodSSELiveTransaction[]
  connected: boolean
  newPaymentsCount: number
}

export interface HodStudentsTableProps {
  students: HodStudentRow[]
  meta: PaginationMeta | undefined
  isLoading: boolean
  isFetching: boolean
  filters: HodFilterState
  page: number
  onFilterChange: (key: keyof HodFilterState, value: string) => void
  onPageChange: (page: number) => void
}

export interface HodDefaultersTableProps {
  defaulters: HodDefaulterRow[]
}
