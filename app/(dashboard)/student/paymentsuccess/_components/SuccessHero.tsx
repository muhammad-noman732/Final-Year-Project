"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2, Sparkles } from "lucide-react"

export default function SuccessHero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0) scale(1)"
    }, 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700 print:hidden"
      style={{ opacity: 0, transform: "translateY(16px) scale(0.97)" }}
    >
      <div className="flex justify-center mb-4">
        <div className="relative inline-flex">
          <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-[ping_2.2s_ease_infinite]" />
          <span className="absolute inset-2 rounded-full bg-emerald-500/[0.07] animate-[ping_2.2s_ease_0.5s_infinite]" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/20 backdrop-blur-sm">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-gold-500 animate-pulse" />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-foreground mb-1.5 tracking-tight">
        Payment Successful
      </h1>
      <p className="text-zinc-500 dark:text-muted-foreground text-sm">
        Your fee has been paid and verified by the institution.
      </p>
    </div>
  )
}
