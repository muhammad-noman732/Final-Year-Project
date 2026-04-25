export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  status: number
  fields?: Record<string, string[]>
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
    fields?: Record<string, string[]>
  }
}

export type Role = "SUPER_ADMIN" | "ADMIN" | "VC" | "HOD" | "STUDENT"

export const ROLE_ROUTES: Record<Role, string> = {
  SUPER_ADMIN: "/superadmin",
  ADMIN: "/admin",
  VC: "/vc",
  HOD: "/hod",
  STUDENT: "/student",
}

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  VC: "Vice Chancellor",
  HOD: "Head of Department",
  STUDENT: "Student",
}
