import { PaginationMeta } from "./shared.types"

//  Fee Structures 
export type FeeStatusType = "UNPAID" | "PARTIAL" | "PAID" | "OVERDUE" | "WAIVED"

export interface FeeStructure {
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
  dueDate: string
  lateFee: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  program: {
    id: string
    name: string
    code: string
    degreeType: string
    totalSemesters: number
    department: { id: string; name: string; code: string }
  }
  _count: { assignments: number }
}

export interface PaginatedFeeStructures {
  data: FeeStructure[]
  meta: PaginationMeta
}

export interface ListFeeStructuresQueryParams {
  page?: number
  limit?: number
  programId?: string
  semester?: number
  sessionYear?: number
  isActive?: boolean
  sortBy?: string
  sortDir?: "asc" | "desc"
}

export interface AssignFeeResult {
  assigned: number
  skipped: number
}
