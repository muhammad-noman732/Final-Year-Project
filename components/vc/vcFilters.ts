import type { VCAnalyticsFilters } from "@/types/client/store/vc.store.types"
import type { VCFilterState } from "@/components/vc/VCFilterBar"

const VALID_FEE_STATUS = new Set(["ALL", "PAID", "UNPAID", "PARTIAL", "OVERDUE", "WAIVED"])
const VALID_RANGE = new Set(["today", "7d", "30d", "90d", "custom"])

export const defaultVCFilters: VCFilterState = {
  departmentId: "",
  programId: "",
  sessionId: "",
  semester: "",
  feeStatus: "ALL",
  range: "30d",
  from: "",
  to: "",
  search: "",
}

export function buildVCQuery(filters: VCFilterState): VCAnalyticsFilters {
  const feeStatus = VALID_FEE_STATUS.has(filters.feeStatus) ? filters.feeStatus : "ALL"
  const safeRange = VALID_RANGE.has(filters.range) ? filters.range : "30d"
  const hasCustomRange = safeRange === "custom"
  const hasCustomDates = Boolean(filters.from && filters.to)

  return {
    departmentId: filters.departmentId || undefined,
    programId: filters.programId || undefined,
    sessionId: filters.sessionId || undefined,
    semester: filters.semester ? Number(filters.semester) : undefined,
    feeStatus,
    range: hasCustomRange
      ? (hasCustomDates ? "custom" : undefined)
      : safeRange,
    from: hasCustomRange && hasCustomDates ? filters.from : undefined,
    to: hasCustomRange && hasCustomDates ? filters.to : undefined,
    search: filters.search || undefined,
  }
}
