import type { Role } from "./shared.types"

export interface JWTPayload {
  userId: string
  tenantId: string | null
  role: Role
  name: string
  email: string
  isFirstLogin: boolean
}

export interface AuthUser {
  userId: string
  tenantId: string | null
  role: Role
  name: string
  email: string
  isFirstLogin: boolean
}

export interface UserWithTenant {
  id: string
  tenantId: string | null
  email: string
  passwordHash: string
  name: string
  role: string
  isActive: boolean
  isFirstLogin: boolean
  lastLoginAt: Date | null
  tenant: {
    id: string
    slug: string
    name: string
    isActive: boolean
  } | null
}

export interface UserBasic {
  id: string
  passwordHash: string
  role: string
  tenantId: string | null
  name: string
  email: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
  redirectTo: string
  user: {
    id: string
    name: string
    email: string
    role: string
    isFirstLogin: boolean
    tenantId: string | null
    tenantName: string | null
    tenantSlug: string | null
  }
}

export interface RefreshResult {
  accessToken: string
  refreshToken: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordResult {
  accessToken: string
  refreshToken: string
  redirectTo: string
}

export interface CreateAuditLogInput {
  tenantId?: string | null
  userId?: string | null
  userEmail?: string | null
  userRole?: string | null
  action: string
  entity: string
  entityId: string
  oldData?: unknown
  newData?: unknown
  ipAddress?: string | null
  reason?: string | null
}

export interface WelcomeEmailParams {
  to: string
  name: string
  role: string
  tempPassword: string
  universityName?: string
}

export interface PasswordResetEmailParams {
  to: string
  name: string
  resetToken: string
}

export interface ReceiptEmailParams {
  to: string
  studentName: string
  receiptNumber: string
  amount: number
  semester: number
  program: string
  department: string
  paidAt: Date
  universityName: string
}
