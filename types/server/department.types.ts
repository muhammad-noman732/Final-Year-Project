import { PaginationMeta } from "./shared.types"

// ─── Departments ───────────────────────────────────────────────
export interface Department {
  id: string
  name: string
  code: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedDepartments {
  data: Department[]
  meta: PaginationMeta
}

export interface ListDepartmentsQueryParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sortBy?: string
  sortDir?: "asc" | "desc"
}
