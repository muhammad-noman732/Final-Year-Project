import type {
  AdminUser,
  PaginatedAdminUsers,
  ListUsersQueryParams,
  AdminUserRole,
  UserDepartmentRef,
} from "@/types/server/user.types"

import type {
  CreateUserPayload as CreateAdminUserPayload,
  UpdateUserPayload as UpdateAdminUserPayload,
} from "@/lib/validators/admin.validators"

export type {
  AdminUser,
  PaginatedAdminUsers,
  ListUsersQueryParams,
  AdminUserRole,
  UserDepartmentRef,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
}
