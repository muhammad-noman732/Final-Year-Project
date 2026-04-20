import { PaginationMeta } from "./shared.types"

export type DegreeType = "BS" | "MS" | "MCS" | "PhD" | "BE" | "MBA" | "BBA"

export interface Program {
  id: string
  name: string
  code: string
  degreeType: DegreeType
  durationYears: number
  totalSemesters: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  department: { id: string; name: string; code: string }
}

export interface PaginatedPrograms {
  data: Program[]
  meta: PaginationMeta
}

export interface ListProgramsQueryParams {
  page?: number
  limit?: number
  search?: string
  departmentId?: string
  isActive?: boolean
  degreeType?: string
  sortBy?: string
  sortDir?: "asc" | "desc"
}
