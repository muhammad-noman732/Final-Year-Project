"use client"

import { Eye, EyeOff, GraduationCap, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginPage } from "@/hooks/useLoginPage"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    showPassword,
    setShowPassword,
  } = useLoginPage()

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#0F172A] font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#d4a843]/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.15]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.4" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <div className="flex flex-col items-center mb-8 transform transition-all duration-700 animate-in fade-in slide-in-from-top-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a843] to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <GraduationCap className="w-6 h-6 text-[#0F172A]" />
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-white">UniSync</h1>
        </div>

        <div className="bg-[#1E293B]/60 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="p-8 sm:p-10 space-y-8">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 text-sm font-medium">Secure access to your dashboard</p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/10 animate-in shake-200">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm font-semibold text-red-200 leading-tight">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    Email Address
                  </Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@university.edu"
                  className="h-12 rounded-xl bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus:border-[#d4a843]/50 focus:ring-4 focus:ring-[#d4a843]/5 transition-all duration-200 px-4"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[11px] font-bold text-red-400 ml-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    Password
                  </Label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#d4a843] hover:text-amber-400 transition-colors">
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus:border-[#d4a843]/50 focus:ring-4 focus:ring-[#d4a843]/5 transition-all duration-200 px-4 pr-12"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#d4a843] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] font-bold text-red-400 ml-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#d4a843] hover:bg-[#e6b94d] text-[#0F172A] font-black text-sm tracking-wide transition-all duration-300 shadow-xl shadow-amber-950/20 rounded-xl flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-6 border-t border-white/5 text-center flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/70">Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
