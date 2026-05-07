"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, GraduationCap, Check, X, ShieldCheck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

// ─── Validation Schema (mirrors backend) ─────────────────────

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

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

// ═══════════════════════════════════════════════════════════════

export default function ChangePasswordPage() {
  const router = useRouter()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  // ─── Password strength calculation ────────────────────────

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
  const strengthColors = {
    weak: "bg-rose-500",
    fair: "bg-amber-500",
    good: "bg-sky-500",
    strong: "bg-emerald-500",
  }
  const strengthLabels = { weak: "Weak", fair: "Fair", good: "Good", strong: "Strong" }

  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword
  const passwordsDontMatch = confirmPassword.length > 0 && newPassword !== confirmPassword

  // ─── Submit handler — calls real API ──────────────────────

  const onSubmit = async (data: ChangePasswordFormData): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        // Show field-level error (e.g., "Current password is incorrect")
        if (result.error?.fields) {
          const firstFieldErrors = Object.values(result.error.fields)[0]
          setError(Array.isArray(firstFieldErrors) ? firstFieldErrors[0] : String(firstFieldErrors))
        } else {
          setError(result.error?.message || "Failed to change password.")
        }
        return
      }

      // Success — redirect to dashboard (backend returns redirectTo based on role)
      const redirectTo = result.data?.redirectTo || "/login"
      router.push(redirectTo)

    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] p-4 overflow-hidden font-sans">
      {/* Dynamic Mesh Gradient Background */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#b8c6e5] rounded-full blur-[100px] opacity-50 pointer-events-none animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[50vw] bg-[#f0e4c8] rounded-full blur-[100px] opacity-50 pointer-events-none animate-pulse" 
        style={{ animationDuration: '12s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[50vw] bg-[#e5d4ed] rounded-full blur-[100px] opacity-50 pointer-events-none animate-pulse" 
        style={{ animationDuration: '10s', animationDelay: '4s' }} 
      />

      <div className="relative w-full max-w-[440px] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-indigo-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            UniSync
          </h1>
          <p className="text-slate-500 text-[15px] font-medium tracking-wide">
            Secure your account with a new password
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50/80 border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2.5">
            <Label htmlFor="currentPassword" className="text-sm font-semibold text-slate-700">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                autoComplete="current-password"
                className="h-12 rounded-xl bg-white/50 border-slate-200/80 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 placeholder:text-slate-400 pr-10 transition-all duration-200"
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs font-medium text-red-500 mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2.5">
            <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="h-12 rounded-xl bg-white/50 border-slate-200/80 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 placeholder:text-slate-400 pr-10 transition-all duration-200"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs font-medium text-red-500 mt-1">{errors.newPassword.message}</p>
            )}

            {/* Strength Indicator */}
            {newPassword.length > 0 && (
              <div className="space-y-3 mt-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          i < strengthScore ? strengthColors[strengthLevel] : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      strengthLevel === "strong"
                        ? "text-emerald-600"
                        : strengthLevel === "good"
                        ? "text-sky-600"
                        : strengthLevel === "fair"
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {strengthLabels[strengthLevel]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    { key: "minLength", label: "8+ Characters" },
                    { key: "hasUppercase", label: "Uppercase Letter" },
                    { key: "hasNumber", label: "One Number" },
                    { key: "hasSpecialChar", label: "Special Char" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300",
                        requirements[key as keyof typeof requirements] ? "bg-emerald-100" : "bg-slate-100"
                      )}>
                        {requirements[key as keyof typeof requirements] ? (
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <span className={cn(
                        "text-[11px] font-medium transition-colors duration-300",
                        requirements[key as keyof typeof requirements] ? "text-emerald-700" : "text-slate-400"
                      )}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2.5">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="h-12 rounded-xl bg-white/50 border-slate-200/80 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 placeholder:text-slate-400 pr-10 transition-all duration-200"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordsMatch && (
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-1.5">
                <ShieldCheck className="w-4 h-4" /> Passwords match
              </p>
            )}
            {passwordsDontMatch && (
              <p className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-4 h-4" /> Passwords do not match
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-xs font-medium text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[15px] transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-70 rounded-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Update Password</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
