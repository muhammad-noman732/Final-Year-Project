import type { ApiResponse } from "@/types/client/auth.types"

// ─── Shared ────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ─── Students ──────────────────────────────────────────────────
export interface Student {
  id: string
  studentId: string
  cnic: string | null
  currentSemester: number
  enrollmentStatus: "ACTIVE" | "SUSPENDED" | "GRADUATED" | "WITHDRAWN"
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    phone: string | null
    isActive: boolean
    isFirstLogin: boolean
  }
  department: { id: string; name: string; code: string }
  program: { id: string; name: string; code: string; degreeType: string }
  session: { id: string; name: string; startYear: number; endYear: number }
}

export interface PaginatedStudents {
  data: Student[]
  meta: PaginationMeta
}

export interface ListStudentsQueryParams {
  page?: number
  limit?: number
  departmentId?: string
  programId?: string
  sessionId?: string
  semester?: number
  enrollmentStatus?: string
  search?: string
  sortBy?: string
  sortDir?: "asc" | "desc"
}

export interface CreateStudentPayload {
  name: string
  email: string
  phone?: string
  cnic?: string
  studentId: string
  sessionId: string
  departmentId: string
  programId: string
  currentSemester: number
}

export interface UpdateStudentPayload {
  currentSemester?: number
  enrollmentStatus?: string
  cnic?: string
  phone?: string
}

export type GetStudentsApiResponse = ApiResponse<PaginatedStudents>
export type GetStudentApiResponse = ApiResponse<Student>

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

export interface CreateDepartmentPayload {
  name: string
  code: string
}

export interface UpdateDepartmentPayload {
  name?: string
  isActive?: boolean
}

export type GetDepartmentsApiResponse = ApiResponse<PaginatedDepartments>
export type GetDepartmentApiResponse = ApiResponse<Department>

// ─── Programs ──────────────────────────────────────────────────
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

export interface CreateProgramPayload {
  departmentId: string
  name: string
  code: string
  degreeType: DegreeType
  durationYears: number
  totalSemesters: number
}

export type GetProgramsApiResponse = ApiResponse<PaginatedPrograms>
export type GetProgramApiResponse = ApiResponse<Program>

// ─── Sessions ──────────────────────────────────────────────────
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

export interface CreateSessionPayload {
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
}

export type GetSessionsApiResponse = ApiResponse<PaginatedSessions>
export type GetSessionApiResponse = ApiResponse<AcademicSession>
