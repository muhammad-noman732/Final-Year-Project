// ═══════════════════════════════════════════════════════════════
//  Server-side Auth Types
//  Used by: repositories, services, controllers, middleware, lib/
//  NEVER import these in client components ("use client" files).
// ═══════════════════════════════════════════════════════════════

import type { Role } from "@/types/shared"

// ─── JWT ──────────────────────────────────────────────────────

/** Payload stored inside the JWT (claims) */
export interface JWTPayload {
  userId:       string
  tenantId:     string | null
  role:         Role
  name:         string
  email:        string
  isFirstLogin: boolean
}

// ─── Middleware → Controller (request context) ────────────────

/** Extracted from middleware-injected x-user-* headers */
export interface AuthUser {
  userId:       string
  tenantId:     string | null
  role:         Role
  name:         string
  email:        string
  isFirstLogin: boolean
}

// ─── Repository return shapes ─────────────────────────────────

/** Returned by UserRepository.findByEmail — includes tenant info */
export interface UserWithTenant {
  id:           string
  tenantId:     string | null
  email:        string
  passwordHash: string
  name:         string
  role:         string
  isActive:     boolean
  isFirstLogin: boolean
  lastLoginAt:  Date | null
  tenant: {
    id:       string
    slug:     string
    name:     string
    isActive: boolean
  } | null
}

/** Returned by UserRepository.findById — minimal fields for password ops */
export interface UserBasic {
  id:           string
  passwordHash: string
  role:         string
  tenantId:     string | null
  name:         string
  email:        string
}

// ─── Service input/output DTOs ────────────────────────────────

export interface LoginInput {
  email:    string
  password: string
}

export interface LoginResult {
  token:      string
  redirectTo: string
  user: {
    id:         string
    name:       string
    email:      string
    role:       string
    isFirstLogin: boolean
    tenantId:   string | null
    tenantName: string | null
    tenantSlug: string | null
  }
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword:     string
  confirmPassword: string
}

export interface ChangePasswordResult {
  token:      string
  redirectTo: string
}

// ─── Audit ────────────────────────────────────────────────────

export interface CreateAuditLogInput {
  tenantId?:   string | null
  userId?:     string | null
  userEmail?:  string | null
  userRole?:   string | null
  action:      string
  entity:      string
  entityId:    string
  oldData?:    unknown
  newData?:    unknown
  ipAddress?:  string | null
  reason?:     string | null
}

// ─── Email ────────────────────────────────────────────────────

export interface WelcomeEmailParams {
  to:              string
  name:            string
  role:            string
  tempPassword:    string
  universityName?: string
}

export interface PasswordResetEmailParams {
  to:         string
  name:       string
  resetToken: string
}
