// ═══════════════════════════════════════════════════════════════
//  Client-side Auth Types
//  Used by: React components, hooks, pages
//  Safe to import in "use client" files.
// ═══════════════════════════════════════════════════════════════

import type { Role } from "@/types/shared"

// ─── User (from /api/auth/me) ─────────────────────────────────

export interface ClientUser {
  id:           string
  name:         string
  email:        string
  role:         Role
  tenantId:     string | null
  isFirstLogin: boolean
}

// ─── Login response payload ───────────────────────────────────

export interface LoginResponseData {
  user: {
    id:           string
    name:         string
    email:        string
    role:         string
    isFirstLogin: boolean
    tenantId:     string | null
    tenantName:   string | null
    tenantSlug:   string | null
  }
  redirectTo: string
}

// ─── Generic API response shape ───────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?:   T
  error?: {
    code:    string
    message: string
    fields?: Record<string, string[]>
  }
}
