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
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-gold-500/20">
            <GraduationCap className="w-8 h-8 text-navy-950" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            Set Your New Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a strong password to secure your account
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium text-foreground/80">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  className="h-11 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30 pr-10"
                  {...register("currentPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400 transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-rose-400">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-foreground/80">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="h-11 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30 pr-10"
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400 transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-rose-400">{errors.newPassword.message}</p>
              )}

              {/* Strength Indicator */}
              {newPassword.length > 0 && (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            i < strengthScore ? strengthColors[strengthLevel] : "bg-navy-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        strengthLevel === "strong"
                          ? "text-emerald-400"
                          : strengthLevel === "good"
                          ? "text-sky-400"
                          : strengthLevel === "fair"
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {strengthLabels[strengthLevel]}
                    </span>
                  </div>

                  {/* Requirements checklist */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: "minLength", label: "Minimum 8 characters" },
                      { key: "hasUppercase", label: "One uppercase letter" },
                      { key: "hasNumber", label: "One number" },
                      { key: "hasSpecialChar", label: "One special character" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-1.5">
                        {requirements[key as keyof typeof requirements] ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-muted-foreground/50" />
                        )}
                        <span
                          className={`text-[11px] ${
                            requirements[key as keyof typeof requirements]
                              ? "text-emerald-400"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="h-11 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30 pr-10"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordsMatch && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Passwords match
                </p>
              )}
              {passwordsDontMatch && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <X className="w-3 h-3" /> Passwords don&apos;t match
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-xs text-rose-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold text-sm shadow-lg shadow-gold-500/20 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Password</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
