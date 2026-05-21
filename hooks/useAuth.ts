
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { baseApi } from "@/store/api/baseApi"
import { logout as logoutAction } from "@/store/slices/authSlice"
import type { Role } from "@/types/server/shared.types"

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
  const dispatch = useDispatch()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      dispatch(logoutAction())
      dispatch(baseApi.util.resetApiState())
      router.push("/login")
    }
  }, [dispatch, router])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  }
}
