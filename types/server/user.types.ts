import { PaginationMeta } from "./shared.types"

export type AdminUserRole = "VC" | "HOD"

export interface UserDepartmentRef {
  id: string
  name: string
  code: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string | null
  role: AdminUserRole
  isActive: boolean
  isFirstLogin: boolean
  hodDepartmentId: string | null
  createdAt: string
  updatedAt: string
  hodDepartment: UserDepartmentRef | null
}

export interface PaginatedAdminUsers {
  data: AdminUser[]
  meta: PaginationMeta
}

export interface ListUsersQueryParams {
  page?: number
  limit?: number
  role?: AdminUserRole
  isActive?: boolean
}
