import type { PaginationMeta } from "@/types/server/shared.types"

export type VCFeeStatus = "ALL" | "PAID" | "UNPAID" | "PARTIAL" | "OVERDUE" | "WAIVED"
export type VCTimeRange = "today" | "7d" | "30d" | "90d" | "custom"

export interface VCAnalyticsFilters {
  departmentId?: string
  programId?: string
  sessionId?: string
  semester?: number
  feeStatus?: VCFeeStatus
  range?: VCTimeRange
  from?: string
  to?: string
  search?: string
  page?: number
  limit?: number
}

export interface VCDashboardOverview {
  totalStudents: number
  studentsPaid: number
  studentsUnpaid: number
  defaulters: number
  paymentRate: number
  totalCollected: number
  collectedInRange: number
  collectedToday: number
  outstandingAmount: number
  paymentsInRange: number
  paymentsToday: number
  failedPaymentsInRange: number
  recentPaidAt: string | null
}

export interface VCDepartmentPerformance {
  departmentId: string
  departmentName: string
  departmentCode: string
  totalStudents: number
  paidStudents: number
  defaulters: number
  collectibleAmount: number
  collectedAmount: number
  outstandingAmount: number
  todayPayments: number
  todayAmount: number
  paymentRate: number
}

export interface VCSemesterBreakdown {
  semester: number
  paidAmount: number
  unpaidAmount: number
  paidStudents: number
  unpaidStudents: number
}

export interface VCTrendPoint {
  label: string
  amount: number
  payments: number
}

export interface VCPaymentMethodBreakdown {
  method: string
  count: number
  amount: number
}

export interface VCLivePaymentItem {
  id: string
  studentName: string
  studentId: string
  departmentCode: string
  programName: string
  semester: number
  amount: number
  method: string
  status: string
  paidAt: string | null
  createdAt: string
}

export interface VCStudentLedgerRow {
  assignmentId: string
  studentId: string
  rollNumber: string
  studentName: string
  email: string
  departmentName: string
  departmentCode: string
  programName: string
  sessionName: string
  semester: number
  feeStatus: string
  amountDue: number
  amountPaid: number
  outstandingAmount: number
  dueDate: string
  paidAt: string | null
  daysOverdue: number
  enrollmentStatus: string
}

export interface VCPaginatedStudents {
  data: VCStudentLedgerRow[]
  meta: PaginationMeta
}

export interface VCDashboardData {
  overview: VCDashboardOverview
  departmentPerformance: VCDepartmentPerformance[]
  semesterBreakdown: VCSemesterBreakdown[]
  collectionTrend: VCTrendPoint[]
  paymentMethods: VCPaymentMethodBreakdown[]
  livePayments: VCLivePaymentItem[]
}

export interface VCAnalyticsData {
  overview: VCDashboardOverview
  collectionTrend: VCTrendPoint[]
  departmentPerformance: VCDepartmentPerformance[]
  semesterBreakdown: VCSemesterBreakdown[]
  paymentMethods: VCPaymentMethodBreakdown[]
}
