"use client"

import { Eye, EyeOff, GraduationCap, ShieldCheck, AlertCircle} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useChangePasswordPage } from "@/hooks/useChangePasswordPage"
import { AuthBackground } from "@/components/auth/AuthBackground"

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
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
  } = useChangePasswordPage()

  const strengthColors = {
    weak: "bg-rose-500",
    fair: "bg-amber-500",
    good: "bg-sky-500",
    strong: "bg-emerald-500",
  }

  const strengthLabels = { weak: "Weak", fair: "Fair", good: "Good", strong: "Strong" }

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
              <h2 className="text-2xl font-display font-semibold text-foreground tracking-tight leading-none">Update Password</h2>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">Protect your account with a strong password</p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10 animate-in shake-200">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                <p className="text-sm font-semibold text-destructive/90 leading-tight">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Current Password</Label>
                <div className="relative">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 px-4"
                    {...register("currentPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-[11px] font-bold text-destructive ml-1">{errors.currentPassword.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">New Password</Label>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 px-4"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-[11px] font-bold text-destructive ml-1">{errors.newPassword.message}</p>}
                {newPassword.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-background border border-border space-y-2 shadow-sm">
                    <div className="flex gap-1">
                      {[0,1,2,3].map(i => (
                        <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-500", i < strengthScore ? (strengthColors as any)[strengthLevel] : "bg-muted")} />
                      ))}
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{(strengthLabels as any)[strengthLevel]} Password</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 px-4"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11px] font-bold text-destructive ml-1">{errors.confirmPassword.message}</p>}
                {passwordsMatch && <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1 ml-1 animate-in fade-in">Match</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white font-semibold text-[15px] tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-xl flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
                <span className="relative z-10">{isLoading ? "Updating..." : "Update Password"}</span>
              </Button>
            </form>

            <div className="pt-6 border-t border-border/60 text-center flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/80">Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
