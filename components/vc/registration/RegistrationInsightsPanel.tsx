"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  ShieldAlert,
  X,
  ChevronRight,
  Lightbulb,
  CheckCheck,
} from "lucide-react"
import type { InsightItem } from "@/types/server/vc.types"

interface Props {
  insightsUpdatedAt?: number | null
}

function getConfig(insight: InsightItem) {
  const { type, priority } = insight
  if (priority === "CRITICAL") return {
    Icon: AlertTriangle, iconColor: "text-red-400", borderColor: "border-l-red-500",
    hoverBg: "hover:bg-red-950/20", badgeText: "CRITICAL",
    badgeClass: "bg-red-950/60 text-red-400 ring-1 ring-red-500/25", dotColor: "bg-red-500",
  }
  if (type === "RISK") return {
    Icon: ShieldAlert, iconColor: "text-rose-400", borderColor: "border-l-rose-500",
    hoverBg: "hover:bg-rose-950/15", badgeText: "RISK",
    badgeClass: "bg-rose-950/60 text-rose-400 ring-1 ring-rose-500/25", dotColor: "bg-rose-500",
  }
  if (priority === "HIGH") return {
    Icon: AlertCircle, iconColor: "text-orange-400", borderColor: "border-l-orange-500",
    hoverBg: "hover:bg-orange-950/15", badgeText: "ALERT",
    badgeClass: "bg-orange-950/60 text-orange-400 ring-1 ring-orange-500/25", dotColor: "bg-orange-500",
  }
  if (type === "PREDICTION" || priority === "MEDIUM") return {
    Icon: TrendingUp, iconColor: "text-yellow-400", borderColor: "border-l-yellow-500/70",
    hoverBg: "hover:bg-yellow-950/10", badgeText: "FORECAST",
    badgeClass: "bg-yellow-950/60 text-yellow-400 ring-1 ring-yellow-500/20", dotColor: "bg-yellow-500",
  }
  return {
    Icon: CheckCircle2, iconColor: "text-emerald-400", borderColor: "border-l-emerald-500/70",
    hoverBg: "hover:bg-emerald-950/10", badgeText: "SUCCESS",
    badgeClass: "bg-emerald-950/60 text-emerald-400 ring-1 ring-emerald-500/20", dotColor: "bg-emerald-500",
  }
}

function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${color}`} />
    </span>
  )
}

function InsightCard({ insight, onDismiss, isDismissing, index }: {
  insight: InsightItem; onDismiss: (id: string) => void; isDismissing: boolean; index: number
}) {
  const router = useRouter()
  const { Icon, iconColor, borderColor, hoverBg, badgeText, badgeClass, dotColor } = getConfig(insight)
  const isCritical = insight.priority === "CRITICAL"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 12, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 380, damping: 36, delay: index * 0.055 }}
      className={`group relative rounded-r-md px-4 py-3 transition-colors duration-150 border border-l-2 border-white/[0.03] ${borderColor} ${hoverBg}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-[3px] shrink-0">
          <Icon className={`h-3.5 w-3.5 ${iconColor}`} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[0.14em] ${badgeClass}`}>
              {badgeText}
            </span>
            {isCritical && <PulseDot color={dotColor} />}
          </div>
          <p className="text-[12.5px] leading-[1.5] text-foreground/70">{insight.message}</p>
          {insight.actionLabel && (
            <button
              type="button"
              onClick={() => router.push("/vc")}
              className="group/cta flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground/45 transition-colors hover:text-foreground/60 active:scale-[0.98]"
            >
              {insight.actionLabel}
              <ChevronRight className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5" strokeWidth={2.5} />
            </button>
          )}
        </div>
        <motion.button
          type="button"
          disabled={isDismissing}
          onClick={() => onDismiss(insight.id)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="mt-[3px] shrink-0 rounded p-[3px] text-muted-foreground/20 opacity-0 transition-colors hover:bg-white/[0.05] hover:text-muted-foreground/55 group-hover:opacity-100 disabled:cursor-not-allowed"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.2} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function RegistrationInsightsPanel({ insightsUpdatedAt }: Props) {
  const [insights, setInsights] = useState<InsightItem[]>([])
  const [initialLoad, setInitialLoad] = useState(true)
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set())
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [])

  const fetchInsights = useCallback(async () => {
    try {
      const res = await fetch("/api/vc/insights?module=REGISTRATION")
      if (!res.ok || !isMounted.current) return
      const json = await res.json() as { success: boolean; data: InsightItem[] }
      if (json.success && Array.isArray(json.data) && isMounted.current) {
        setInsights(json.data)
      }
    } catch { /* non-critical */ }
    finally { if (isMounted.current) setInitialLoad(false) }
  }, [])

  useEffect(() => { fetchInsights() }, [fetchInsights])
  useEffect(() => {
    if (insightsUpdatedAt != null) fetchInsights()
  }, [insightsUpdatedAt, fetchInsights])

  const dismiss = useCallback(async (id: string) => {
    setDismissingIds((prev) => new Set(prev).add(id))
    try {
      const res = await fetch(`/api/vc/insights/${id}/read`, { method: "PATCH" })
      if (res.ok && isMounted.current) setInsights((prev) => prev.filter((i) => i.id !== id))
    } catch { /* silent */ }
    finally {
      if (isMounted.current) {
        setDismissingIds((prev) => { const next = new Set(prev); next.delete(id); return next })
      }
    }
  }, [])

  const dismissAll = useCallback(async () => {
    const ids = insights.map((i) => i.id)
    ids.forEach((id) => setDismissingIds((prev) => new Set(prev).add(id)))
    await Promise.allSettled(ids.map((id) => fetch(`/api/vc/insights/${id}/read`, { method: "PATCH" })))
    if (isMounted.current) setInsights([])
  }, [insights])

  if (initialLoad || insights.length === 0) return null

  const critical = insights.filter((i) => i.priority === "CRITICAL")
  const rest = insights.filter((i) => i.priority !== "CRITICAL")

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className="overflow-hidden rounded-lg border border-white/[0.05] bg-zinc-950"
    >
      <div className="flex items-center gap-2.5 border-b border-white/[0.04] px-4 py-2.5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.04]">
          <Lightbulb className="h-[11px] w-[11px] text-muted-foreground/50" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55">
            Registration Intelligence
          </span>
          <span className="text-[9.5px] text-muted-foreground/40">
            {insights.length} insight{insights.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={dismissAll}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-white/[0.04] transition-colors"
          >
            <CheckCheck className="h-3 w-3" />
            All read
          </button>
          <div className="flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
            </span>
            <span className="flex h-4 min-w-[1.25rem] items-center justify-center rounded-full bg-white/[0.05] px-1.5 text-[9.5px] font-semibold text-muted-foreground/55">
              {insights.length}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-[1px] bg-white/[0.012] p-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {critical.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} onDismiss={dismiss} isDismissing={dismissingIds.has(insight.id)} index={i} />
          ))}
        </AnimatePresence>
        {critical.length > 0 && rest.length > 0 && <div className="my-1 h-px bg-white/[0.06]" />}
        <AnimatePresence mode="popLayout" initial={false}>
          {rest.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} onDismiss={dismiss} isDismissing={dismissingIds.has(insight.id)} index={critical.length + i} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
