// ═══════════════════════════════════════════════════════════════
//  useAuth — Client-side hook for authentication state
//
//  Fetches current user from /api/auth/me on mount.
//  Provides: user data, loading state, logout function.
// ═══════════════════════════════════════════════════════════════

"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { Role } from "@/types/auth"

interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
  tenantId: string | null
  isFirstLogin: boolean
}

interface UseAuthReturn {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch current user on mount
  useEffect(() => {
    let cancelled = false

    async function fetchUser(): Promise<void> {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) {
          setUser(null)
          return
        }
        const json = await res.json()
        if (!cancelled && json.success) {
          setUser(json.data)
        }
      } catch {
        setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchUser()
    return () => { cancelled = true }
  }, [])

  // Logout — calls API to clear cookie, then redirects to login
  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      setUser(null)
      router.push("/login")
    }
  }, [router])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  }
}
