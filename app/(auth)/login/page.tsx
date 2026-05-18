"use client"

import { Eye, EyeOff, GraduationCap, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginPage } from "@/hooks/useLoginPage"
import { AuthBackground } from "@/components/auth/AuthBackground"

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
    <div className="w-full flex items-center justify-center p-6 relative font-sans">
      <div className="w-full max-w-[420px] relative z-10">
        <div className="flex flex-col items-center mb-8 transform transition-all duration-700 animate-in fade-in slide-in-from-top-4">
          <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-sm">
            <GraduationCap className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold tracking-tight text-foreground">UniSync</h1>
        </div>

        <div className="bg-white border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="p-8 sm:p-10 space-y-8">
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-display font-semibold text-foreground tracking-tight">Welcome Back</h2>
              <p className="text-muted-foreground text-sm font-medium">Secure access to your dashboard</p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10 animate-in shake-200">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                <p className="text-sm font-semibold text-destructive/90 leading-tight">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Email Address
                  </Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@university.edu"
                  className="h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 px-4"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[11px] font-bold text-destructive ml-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Password
                  </Label>

                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 px-4 pr-12"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] font-bold text-destructive ml-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white font-semibold text-[15px] tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-xl flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10">Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-6 border-t border-border/60 text-center flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/80">Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
