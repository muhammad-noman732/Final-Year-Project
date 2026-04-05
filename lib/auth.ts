
import { headers } from "next/headers"
import type { AuthUser, Role } from "@/types/auth"
import { UnauthorizedError, ForbiddenError } from "@/lib/utils/AppError"


export async function getAuthUser(): Promise<AuthUser> {
  const h = await headers()

  const userId = h.get("x-user-id")
  const role = h.get("x-user-role") as Role | null
  const tenantId = h.get("x-tenant-id") || null
  const name = h.get("x-user-name") ?? ""
  const email = h.get("x-user-email") ?? ""
  const isFirst = h.get("x-user-first-login") === "true"

  if (!userId || !role) throw new UnauthorizedError()

  return { userId, tenantId, role, name, email, isFirstLogin: isFirst }
}

/**
 * Returns tenantId + userId + role, or throws if user has no tenant.
 * SUPER_ADMIN has no tenant — use getAuthUser() for super admin routes.
 */
export async function getTenantContext(): Promise<{
  tenantId: string
  userId: string
  role: Role
}> {
  const user = await getAuthUser()
  if (!user.tenantId) {
    throw new ForbiddenError("This action requires a university tenant context.")
  }
  return { tenantId: user.tenantId, userId: user.userId, role: user.role }
}

/**
 * Guard helper — throws ForbiddenError if the authenticated user's role
 * is not in the allowed list.
 */
export async function requireRole(...allowedRoles: Role[]): Promise<AuthUser> {
  const user = await getAuthUser()
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError()
  }
  return user
}
