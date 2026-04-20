import { PaginationMeta } from "./shared.types"

export interface Student {
  id: string
  studentId: string
  cnic: string | null
  currentSemester: number
  enrollmentStatus: "ACTIVE" | "SUSPENDED" | "GRADUATED" | "WITHDRAWN"
  createdAt: string | Date
  updatedAt: string | Date
  user: {
    id: string
    name: string
    email: string
    phone: string | null
    isActive: boolean
    isFirstLogin: boolean
  }
  department: { id: string; name: string; code: string }
  program: { id: string; name: string; code: string; degreeType: string }
  session: { id: string; name: string; startYear: number; endYear: number }
}

export interface PaginatedStudents {
  data: Student[]
  meta: PaginationMeta
}

export interface ListStudentsQueryParams {
  page?: number
  limit?: number
  departmentId?: string
  programId?: string
  sessionId?: string
  semester?: number
  enrollmentStatus?: string
  search?: string
  feeStatus?: string
  sortBy?: string
  sortDir?: "asc" | "desc"
}

export type FeeStatus = "UNPAID" | "PARTIAL" | "PAID" | "OVERDUE" | "WAIVED"
export type PaymentMethod = "STRIPE_CARD" | "BANK_CHALLAN" | "WAIVER"
export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED" | "EXPIRED"
export type EnrollmentStatus = "ACTIVE" | "SUSPENDED" | "GRADUATED" | "WITHDRAWN"

export interface StudentPayment {
  id: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  receiptNumber: string
  receiptUrl: string | null
  paidAt: string | Date | null
  createdAt: string | Date
}

export interface AssignedFeeStructure {
  id: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee: number
  libraryFee: number
  sportsFee: number
  registrationFee: number
  examinationFee: number
  otherFee: number
  totalFee: number
  lateFee: number
  dueDate: string | Date
  program: {
    id: string
    name: string
    code: string
    degreeType: string
  }
}

export interface FeeAssignment {
  id: string
  amountDue: number
  amountPaid: number
  lateFeeApplied: number
  discountApplied: number
  status: FeeStatus
  dueDate: string | Date
  challanNumber: string | null
  challanUrl: string | null
  paidAt: string | Date | null
  createdAt: string | Date
  updatedAt: string | Date
  feeStructure: AssignedFeeStructure
  payments: StudentPayment[]
}

export interface StudentProfile extends Student {}

export interface FeeProfileSummary {
  totalAssigned: number
  totalPaid: number
  totalOutstanding: number
  hasOverdue: boolean
  currentAssignment: FeeAssignment | null
}

export interface StudentFeeProfile {
  student: StudentProfile
  assignments: FeeAssignment[]
  summary: FeeProfileSummary
}
