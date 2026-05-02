"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, RefreshCw } from "lucide-react"
import { useRegistrationStats } from "@/hooks/vc/useRegistrationStats"
import type { SSERegistrationImportedEvent } from "@/types/server/sse.types"
import RegistrationStatCards from "./RegistrationStatCards"
import RegistrationBarChart from "./RegistrationBarChart"
import CapacityProgress from "./CapacityProgress"
import DailyImportChart from "./DailyImportChart"
import RegistrationLiveFeed from "./RegistrationLiveFeed"
import RegistrationInsightsPanel from "./RegistrationInsightsPanel"

interface Props {
  latestRegistrationEvent: SSERegistrationImportedEvent | null
  registrationImportedAt: number | null
  insightsUpdatedAt: number | null
  sseConnected: boolean
}

export default function VCRegistrationTab({
  latestRegistrationEvent,
  registrationImportedAt,
  insightsUpdatedAt,
  sseConnected,
}: Props) {
  const { stats, isLoading, refetch } = useRegistrationStats()
  const [animateKey, setAnimateKey] = useState(0)
  const prevImportedAt = useRef<number | null>(null)

  // Re-fetch and re-animate when a new CSV import arrives via SSE
  useEffect(() => {
    if (
      registrationImportedAt != null &&
      registrationImportedAt !== prevImportedAt.current
    ) {
      prevImportedAt.current = registrationImportedAt
      void refetch()
      setAnimateKey((k) => k + 1)
    }
  }, [registrationImportedAt, refetch])

  const recentActivity =
    stats?.recentImportActivity.map((a) => ({
      id: a.id,
      message: a.message,
      metadata: a.metadata,
      createdAt: a.createdAt,
    })) ?? []

  return (
    <div className="space-y-5">
      {/* Intelligence feed — registration module only */}
      <RegistrationInsightsPanel insightsUpdatedAt={insightsUpdatedAt} />

      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 shrink-0">
            <GraduationCap className="h-4.5 w-4.5 text-violet-400" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Registration Overview</h2>
            <p className="text-xs text-muted-foreground/55 mt-0.5">
              Applicant intake, program capacity, and daily import activity.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { void refetch(); setAnimateKey((k) => k + 1) }}
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-transparent px-3 py-1.5 text-[11px] text-muted-foreground/60 transition-colors hover:border-white/[0.12] hover:text-foreground/70 active:scale-[0.97]"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} strokeWidth={2} />
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      {stats ? (
        <RegistrationStatCards
          totalRegistered={stats.totalRegistered}
          registeredThisSession={stats.registeredThisSession}
          todayImports={stats.todayImports}
          programsNearCapacity={stats.programsNearCapacity}
          animateKey={animateKey}
        />
      ) : null}

      {/* Bar chart + Capacity side-by-side on xl */}
      {stats ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <RegistrationBarChart data={stats.byProgram} />
          <CapacityProgress data={stats.capacityData} />
        </div>
      ) : null}

      {/* Daily trend + Live feed side-by-side on xl */}
      {stats ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <DailyImportChart data={stats.dailyActivity} />
          <RegistrationLiveFeed
            initialActivity={recentActivity}
            latestRegistrationEvent={latestRegistrationEvent}
            connected={sseConnected}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-[#080c18] backdrop-blur-md shadow-sm px-5 py-10 text-center text-sm font-medium text-slate-500 dark:text-muted-foreground/40">
          Loading activity…
        </div>
      )}

      {/* Empty state */}
      {!isLoading && stats?.totalRegistered === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 dark:border-white/[0.07] bg-white/40 dark:bg-transparent backdrop-blur-md shadow-sm dark:shadow-none py-16 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
            <GraduationCap className="h-5 w-5 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-foreground/70">No applicants imported yet</p>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-muted-foreground/40">
              Ask an admin to upload a CSV file from the Registration section.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
