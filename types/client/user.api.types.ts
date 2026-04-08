import type { ApiResponse } from "@/types/client/auth.types"

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

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
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

export type GetUsersApiResponse = ApiResponse<PaginatedAdminUsers>
export type GetUserApiResponse = ApiResponse<AdminUser>

export interface CreateAdminUserPayload {
  name: string
  email: string
  phone?: string
  role: AdminUserRole
  hodDepartmentId?: string
}

export interface UpdateAdminUserPayload {
  name?: string
  phone?: string
  isActive?: boolean
  hodDepartmentId?: string
}

export type CreateUserApiResponse = ApiResponse<AdminUser>
export type UpdateUserApiResponse = ApiResponse<AdminUser>
export type DeactivateUserApiResponse = ApiResponse<AdminUser>
