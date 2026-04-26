
export interface ApplicantRow {
  id: string
  tenantId: string
  importBatchId: string
  fullName: string
  email: string
  phone: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender: string | null
  city: string | null
  importedAt: string
}

export interface ImportBatchRow {
  id: string
  tenantId: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt: string
}

export interface ImportResult {
  success: boolean
  totalImported: number
  failed: number
  batchId: string | null
  errors: Array<{ row: number; reason: string }>
}

export interface RegistrationDashboardStats {
  totalRegistered: number
  registeredThisSession: number
  todayImports: number
  programsNearCapacity: number
  byProgram: Array<{ program: string; department: string; count: number }>
  capacityData: Array<{
    program: string
    department: string
    count: number
    capacity: number
    percentage: number
    status: "critical" | "warning" | "good"
  }>
  dailyActivity: Array<{ date: string; count: number }>
  recentImportActivity: Array<{
    id: string
    message: string
    metadata: Record<string, unknown> | null
    createdAt: string
  }>
}

// Capacity constants — seats per program
export const PROGRAM_CAPACITY: Record<string, number> = {
  CS: 400,
  Biology: 350,
  Physics: 300,
  Math: 250,
}

// Capacity thresholds
export const CAPACITY_CRITICAL = 0.9  // ≥90% → critical
export const CAPACITY_WARNING  = 0.85 // ≥85% → warning
