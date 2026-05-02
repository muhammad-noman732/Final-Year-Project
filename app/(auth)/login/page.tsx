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



  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] p-4 overflow-hidden font-sans">
      {/* Dynamic Mesh Gradient Background using global project colors */}
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
      
      <div className="relative w-full max-w-[420px] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-10">
        
        {/* Form Header */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-indigo-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            UniSync
          </h2>
          <p className="text-slate-500 text-[15px] font-medium tracking-wide">
            Sign in to your account to continue
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
          {/* Email */}
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-12 rounded-xl bg-white/50 border-slate-200/80 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 placeholder:text-slate-400 transition-all duration-200"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-12 rounded-xl bg-white/50 border-slate-200/80 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 placeholder:text-slate-400 pr-10 transition-all duration-200"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[15px] transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-70 rounded-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
