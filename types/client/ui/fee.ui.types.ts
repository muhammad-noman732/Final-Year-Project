import type { AssignFeeResult } from "@/types/server/fee.types"

export interface UseAssignFeeReturn {
  assignAll: (feeStructureId: string) => Promise<void>
  isAssigning: boolean
  lastResult: AssignFeeResult | null
}
