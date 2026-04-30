import type { PaginationMeta } from "@/types/server/shared.types"

export interface HodDepartmentInfo {
  id: string
  name: string
  code: string
}

export interface HodOverview {
  totalStudents: number
  paidStudents: number
  unpaidStudents: number
  defaulters: number
  paymentRate: number
  totalCollected: number
  collectedToday: number
  outstandingAmount: number
  paymentsToday: number
}

export interface HodSemesterBreakdown {
  semester: number
  paidAmount: number
  unpaidAmount: number
  paidStudents: number
  unpaidStudents: number
}

export interface HodLivePaymentItem {
  id: string
  studentName: string
  rollNumber: string
  programName: string
  semester: number
  amount: number
  paidAt: string | null
  createdAt: string
}

export interface HodStudentRow {
  assignmentId: string
  studentId: string
  rollNumber: string
  studentName: string
  email: string
  programName: string
  semester: number
  feeStatus: string
  amountDue: number
  amountPaid: number
  outstandingAmount: number
  dueDate: string
  paidAt: string | null
  daysOverdue: number
}

export interface HodDefaulterRow {
  studentId: string
  rollNumber: string
  studentName: string
  email: string
  programName: string
  semester: number
  amountDue: number
  amountPaid: number
  outstandingAmount: number
  dueDate: string
  daysOverdue: number
}

export interface HodDashboardData {
  department: HodDepartmentInfo
  overview: HodOverview
  semesterBreakdown: HodSemesterBreakdown[]
  livePayments: HodLivePaymentItem[]
  defaulters: HodDefaulterRow[]
}

export interface HodPaginatedStudents {
  data: HodStudentRow[]
  meta: PaginationMeta
}

export interface HodFilters {
  semester?: number
  feeStatus?: "ALL" | "PAID" | "UNPAID" | "OVERDUE"
  search?: string
  page?: number
  limit?: number
}
