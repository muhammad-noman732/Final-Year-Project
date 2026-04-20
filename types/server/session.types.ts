import { PaginationMeta } from "./shared.types"

export interface AcademicSession {
  id: string
  name: string
  startYear: number
  endYear: number
  isCurrent: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedSessions {
  data: AcademicSession[]
  meta: PaginationMeta
}

export interface ListSessionsQueryParams {
  page?: number
  limit?: number
  isCurrent?: boolean
  sortBy?: string
  sortDir?: "asc" | "desc"
}
