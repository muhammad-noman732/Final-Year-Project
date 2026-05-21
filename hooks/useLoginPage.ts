"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/store/api/authApi"
import { baseApi } from "@/store/api/baseApi"

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export type LoginFormData = z.infer<typeof loginSchema>

const ROLE_REDIRECT: Record<string, string> = {
  SUPER_ADMIN: "/superadmin",
  ADMIN: "/admin",
  VC: "/vc",
  HOD: "/hod",
  STUDENT: "/student",
}

export function useLoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    try {
      const result = await login(data).unwrap()
      if (result.success) {
        const redirectTo = result.data?.redirectTo || ROLE_REDIRECT[result.data?.user?.role] || "/login"
        dispatch(baseApi.util.resetApiState())
        router.push(redirectTo)
      }
    } catch (error: unknown) {
      type ErrorShape = {
        data?: {
          error?: {
            fields?: Record<string, string[] | string>
            message?: string
          }
        }
      }

      const e = error as ErrorShape

      if (e.data?.error?.fields) {
        const firstField = Object.values(e.data.error.fields)[0]
        setError(Array.isArray(firstField) ? firstField[0] : String(firstField))
      } else {
        setError(e.data?.error?.message || "Login failed. Please try again.")
      }
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    error,
    showPassword,
    setShowPassword,
  }
}
