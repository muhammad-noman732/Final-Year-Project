import type {
  ImportResult,
  RegistrationDashboardStats,
} from "@/types/server/registration.types"

export type { ImportResult, RegistrationDashboardStats }

export interface CsvImportState {
  isUploading: boolean
  result: ImportResult | null
  error: string | null
}
