import type {
  FeeStructure,
  PaginatedFeeStructures,
  ListFeeStructuresQueryParams,
  FeeStatusType,
  AssignFeeResult,
} from "@/types/server/fee.types"

import type {
  CreateFeeStructurePayload,
  UpdateFeeStructurePayload,
} from "@/lib/validators/admin.validators"

import type { AssignFeePayload } from "@/lib/validators/feeAssignment.validators"

export type {
  FeeStructure,
  PaginatedFeeStructures,
  ListFeeStructuresQueryParams,
  FeeStatusType,
  CreateFeeStructurePayload,
  UpdateFeeStructurePayload,
  AssignFeePayload,
  AssignFeeResult,
}
