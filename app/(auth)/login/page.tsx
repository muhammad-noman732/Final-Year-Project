"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, GraduationCap, Shield, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

// ─── Validation Schema ───────────────────────────────────────

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

// ─── Role redirect mapping (mirrors backend ROLE_ROUTES) ─────

const ROLE_REDIRECT: Record<string, string> = {
  SUPER_ADMIN: "/superadmin",
  ADMIN: "/admin",
  VC: "/vc",
  HOD: "/hod",
  STUDENT: "/student",
}

// ═══════════════════════════════════════════════════════════════

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  // ─── Submit handler — calls real API ──────────────────────

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        // Show validation field errors or general error message
        if (result.error?.fields) {
          const firstField = Object.values(result.error.fields)[0]
          setError(Array.isArray(firstField) ? firstField[0] : String(firstField))
        } else {
          setError(result.error?.message || "Login failed. Please try again.")
        }
        return
      }

      // Login successful — redirect based on role or isFirstLogin
      const redirectTo = result.data?.redirectTo || ROLE_REDIRECT[result.data?.user?.role] || "/login"
      router.push(redirectTo)

    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Demo credentials (for development) ───────────────────

  const demoCredentials = [
    { email: "superadmin@system.com", label: "Super Admin", password: "SuperAdmin@123" },
    { email: "admin@gcuf.edu.pk", label: "Admin", password: "Admin@12345" },
    { email: "vc@gcuf.edu.pk", label: "VC", password: "VC@123456" },
    { email: "hod@gcuf.edu.pk", label: "HOD", password: "HOD@123456" },
    { email: "student@gcuf.edu.pk", label: "Student", password: "Student@123" },
  ]

  return (
    <div className="min-h-[100dvh] flex">
      {/* ──────────────────────────────────────────────────── */}
      {/* Left Panel — Branding                               */}
      {/* ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a843' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          {/* Decorative circles */}
          <div className="absolute top-20 right-12 w-32 h-32 rounded-full border border-gold-500/10" />
          <div className="absolute bottom-32 left-8 w-48 h-48 rounded-full border border-gold-500/5" />
          <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-gold-500/5" />

          {/* Logo */}
          <div className="mb-10 relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center shadow-2xl shadow-gold-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <GraduationCap className="w-12 h-12 text-navy-950" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gold-gradient tracking-tight text-center mb-3">
            Government College
            <br />
            University Faisalabad
          </h1>

          <div className="w-16 h-[2px] gold-shimmer rounded-full mb-6" />

          <p className="text-muted-foreground text-center text-sm max-w-xs leading-relaxed">
            Intelligent Real-Time University Registration & Fee Management System
          </p>

          {/* Demo credentials (development only) */}
          <div className="mt-12 space-y-2 w-full max-w-xs">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold-500/40 mb-3">
              Quick Access (Dev)
            </p>
            {demoCredentials.map((cred) => (
              <button
                key={cred.email}
                type="button"
                onClick={() => {
                  // Auto-fill the form — user still needs to click "Sign In"
                  const emailInput = document.getElementById("email") as HTMLInputElement
                  const passInput = document.getElementById("password") as HTMLInputElement
                  if (emailInput && passInput) {
                    // Use native input value setter to trigger React Hook Form
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      "value"
                    )?.set
                    if (nativeInputValueSetter) {
                      nativeInputValueSetter.call(emailInput, cred.email)
                      nativeInputValueSetter.call(passInput, cred.password)
                      emailInput.dispatchEvent(new Event("input", { bubbles: true }))
                      passInput.dispatchEvent(new Event("input", { bubbles: true }))
                    }
                  }
                }}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-navy-800/30 border border-gold-500/5 text-xs hover:bg-navy-800/50 hover:border-gold-500/15 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold-500/50"
              >
                <span className="text-muted-foreground">{cred.email}</span>
                <span className="text-gold-400/60 font-medium">{cred.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────── */}
      {/* Right Panel — Login Form                            */}
      {/* ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gold-gradient tracking-tight">
                GCUF
              </h1>
              <p className="text-[11px] text-muted-foreground tracking-wider uppercase">
                Fee Management
              </p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gcuf.edu.pk"
                autoComplete="email"
                className="h-11 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30 text-foreground placeholder:text-muted-foreground/50"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30 text-foreground placeholder:text-muted-foreground/50 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gold-500/8 text-center">
            <p className="text-xs text-muted-foreground">
              Protected by institutional security protocols
            </p>
            <p className="text-[11px] text-muted-foreground/50 mt-1">
              © 2026 Government College University Faisalabad
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
