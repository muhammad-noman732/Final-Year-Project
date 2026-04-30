"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Clock, Users, Zap } from "lucide-react"
import { Skeleton } from "boneyard-js/react"
import HodStatsGrid from "@/components/hod/HodStatsGrid"
import HodSemesterChart from "@/components/hod/HodSemesterChart"
import HodLiveFeed from "@/components/hod/HodLiveFeed"
import { useHodDashboard } from "@/hooks/hod/useHodDashboard"
import type { HodDashboardClientProps } from "@/types/client/ui/hod.ui.types"

export default function HodDashboardClient({ initialData }: HodDashboardClientProps) {
  const {
    department, overview, semesterBreakdown,
    liveTransactions, initialTransactions, sseConnected,
    newPaymentsCount, newAmountCollected, isLoading, lastUpdatedAt,
    showToast, toastMessage,
  } = useHodDashboard(initialData, { fetchDashboard: true, fetchStudents: false })

  return (
    <div className="relative isolate space-y-6 pb-10 min-h-[calc(100dvh-3.5rem)] p-5 lg:p-8 transition-colors duration-300" style={{ backgroundColor: "var(--hod-bg, #F4F6FA)" }}>

      {/* Fantasy UI Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#050811] dark:via-[#0A0E1A] dark:to-[#050811]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b8c6e5] dark:bg-[#312e81] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute top-[20%] right-[10%] w-[45%] h-[50%] bg-[#f0e4c8] dark:bg-[#1e1b4b] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-[#e5d4ed] dark:bg-[#3730a3] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            key="hod-toast"
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-5 right-5 z-50"
          >
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#22C55E] flex-shrink-0">
                <Zap className="h-4 w-4 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-[#0F172A] dark:text-slate-100">Payment Received</p>
                <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">{toastMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Users className="h-6 w-6 text-[#0F172A] dark:text-slate-100" strokeWidth={1.8} />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-slate-100 leading-none">
              {department.name}
              <span className="ml-2 font-medium text-[#64748B] dark:text-slate-500">— Hod Dashboard</span>
            </h1>
            <p className="text-sm text-[#64748B] dark:text-slate-400 mt-1.5 leading-none">
              Department-scoped fee tracking with real-time updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {lastUpdatedAt && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#64748B] dark:text-slate-400 bg-white/40 dark:bg-white/5 px-3 py-1.5 rounded-full border border-white/60 dark:border-white/10 backdrop-blur-sm shadow-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated {lastUpdatedAt}</span>
            </div>
          )}
          <div
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 shadow-sm border backdrop-blur-sm ${sseConnected ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20" : "bg-white/40 dark:bg-white/5 text-[#64748B] dark:text-slate-500 border-white/60 dark:border-white/10"
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${sseConnected ? "bg-[#22C55E] animate-pulse" : "bg-gray-400 dark:bg-gray-600"}`} />
            {sseConnected ? "Live Updates" : "Offline"}
          </div>
        </div>
      </motion.div>

      <Skeleton name="hod-stats-grid" loading={isLoading && !overview}>
        <HodStatsGrid overview={overview} sseConnected={sseConnected} newAmountCollected={newAmountCollected} />
      </Skeleton>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Skeleton name="hod-semester-chart" loading={isLoading && semesterBreakdown.length === 0}>
          <HodSemesterChart data={semesterBreakdown} />
        </Skeleton>
        <HodLiveFeed transactions={liveTransactions} initialTransactions={initialTransactions}
          connected={sseConnected} newPaymentsCount={newPaymentsCount} />
      </div>
    </div>
  )
}
