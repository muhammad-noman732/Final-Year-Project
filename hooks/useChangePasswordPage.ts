"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useChangePasswordMutation } from "@/store/api/authApi"

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters required")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Must contain a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
  })

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export function useChangePasswordPage() {
  const router = useRouter()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const newPassword = watch("newPassword", "")
  const confirmPassword = watch("confirmPassword", "")

  const requirements = useMemo(
    () => ({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword),
    }),
    [newPassword]
  )

  const strengthScore = Object.values(requirements).filter(Boolean).length
  const strengthLevel =
    strengthScore <= 1 ? "weak" : strengthScore === 2 ? "fair" : strengthScore === 3 ? "good" : "strong"
  
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword

  const onSubmit = async (data: ChangePasswordFormData) => {
    setError(null)
    try {
      const result = await changePassword(data).unwrap()
      if (result.success) {
        const redirectTo = result.data?.redirectTo || "/login"
        router.push(redirectTo)
      }
    } catch (err: any) {
      if (err.data?.error?.fields) {
        const firstFieldErrors = Object.values(err.data.error.fields)[0]
        setError(Array.isArray(firstFieldErrors) ? firstFieldErrors[0] : String(firstFieldErrors))
      } else {
        setError(err.data?.error?.message || "Failed to change password.")
      }
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    error,
    showCurrent,
    setShowCurrent,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    newPassword,
    strengthScore,
    strengthLevel,
    passwordsMatch,
  }
}
