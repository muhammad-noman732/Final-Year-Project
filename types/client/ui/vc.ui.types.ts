import type { SSEPaymentEvent } from "@/types/server/sse.types"
import type { VCFeeStatus, VCTimeRange } from "@/types/server/vc.types"

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
