"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import { Skeleton } from "boneyard-js/react"
import { Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import VCFilterBar, { type VCFilterState } from "@/components/vc/VCFilterBar"
import VCOverviewCards from "@/components/vc/VCOverviewCards"
import VCDashboardPanels from "@/components/vc/VCDashboardPanels"
import VCAnalyticsPanels from "@/components/vc/VCAnalyticsPanels"
import VCLiveFeed from "@/components/vc/VCLiveFeed"
import { buildVCQuery, defaultVCFilters } from "@/components/vc/vcFilters"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useGetVCDashboardQuery } from "@/store/api/vc/vcApi"
import { useSSE } from "@/hooks/useSSE"
import { formatFullCurrency } from "@/config/constants"

export default function VCDashboard() {
  const router = useRouter()
  const [filters, setFilters] = useState<VCFilterState>(defaultVCFilters)

  const query = useMemo(() => buildVCQuery(filters), [filters])

  const { data: departmentsData } = useGetDepartmentsQuery({ page: 1, limit: 100 })
  const departmentsRaw = departmentsData?.data?.data ?? []
  const hasDepartmentsLoaded = Boolean(departmentsData?.data)
  const departmentExists = filters.departmentId
    ? departmentsRaw.some((department) => department.id === filters.departmentId)
    : true

  const programsQueryArg = filters.departmentId
    ? (!hasDepartmentsLoaded
      ? skipToken
      : departmentExists
        ? { page: 1, limit: 100, departmentId: filters.departmentId }
        : skipToken)
    : { page: 1, limit: 100 }

  const { data: programsData } = useGetProgramsQuery(programsQueryArg)
  const { data: sessionsData } = useGetSessionsQuery({ page: 1, limit: 100 })

  const dashboardQuery = useGetVCDashboardQuery(query, {
    refetchOnMountOrArgChange: true,
  })

  // SSE real-time events
  const {
    transactions: liveTransactions,
    newPaymentsCount,
    newAmountCollected,
    connected: sseConnected,
    latestEvent,
    clearLatestEvent,
  } = useSSE()

  // Toast notification for new payments
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    if (latestEvent && latestEvent.type === "PaymentSuccess") {
      const p = latestEvent.payload
      setToastMessage(`${p.studentName} paid ${formatFullCurrency(p.amount)}`)
      setShowToast(true)
      clearLatestEvent()

      const timer = setTimeout(() => setShowToast(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [latestEvent, clearLatestEvent])

  const departments = departmentsRaw.map((department) => ({
    id: department.id,
    label: department.name,
  }))
  useEffect(() => {
    if (hasDepartmentsLoaded && filters.departmentId && !departmentExists) {
      setFilters((current) => ({
        ...current,
        departmentId: "",
        programId: "",
      }))
    }
  }, [hasDepartmentsLoaded, filters.departmentId, departmentExists])


  const programs = (programsData?.data?.data ?? []).map((program) => ({
    id: program.id,
    label: program.name,
  }))

  const sessions = (sessionsData?.data?.data ?? []).map((session) => ({
    id: session.id,
    label: session.name,
  }))

  const handleFilterChange = (key: keyof VCFilterState, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
      ...(key === "departmentId" ? { programId: "" } : {}),
    }))
  }

  const handleReset = () => {
    setFilters(defaultVCFilters)
  }

  const handleTodayToggle = () => {
    setFilters((current) => ({
      ...current,
      range: current.range === "today" ? "30d" : "today",
    }))
  }

  const handleDepartmentTracking = (departmentId: string) => {
    router.push(`/vc/tracking?scope=department&departmentId=${departmentId}&tab=overview`)
  }

  const handleSemesterTracking = (semester: number) => {
    const departmentPart = filters.departmentId ? `&departmentId=${filters.departmentId}` : ""
    router.push(`/vc/tracking?scope=semester&semester=${semester}${departmentPart}&tab=overview`)
  }

  const handleOverviewCardClick = (tab: "paid" | "defaulters" | "payments") => {
    const targetTab = tab === "defaulters" ? "defaulters" : tab === "paid" ? "paid" : "overview"
    router.push(`/vc/tracking?tab=${targetTab}`)
  }

  const dashboard = dashboardQuery.data?.data
  const lastUpdatedAt = dashboardQuery.fulfilledTimeStamp
    ? new Date(dashboardQuery.fulfilledTimeStamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    : null

  return (
    <div className="space-y-6 pb-8">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#0d1321] px-4 py-3 shadow-2xl shadow-emerald-500/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400">New Payment Received</p>
              <p className="text-[11px] text-muted-foreground">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            VC Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tenant-wide payment visibility with filters by department, semester, session, and status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdatedAt ? (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              <Clock className="h-3 w-3" />
              <span>Updated {lastUpdatedAt}</span>
            </div>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`h-8 border-white/[0.08] text-xs transition-colors ${
              filters.range === "today"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-300"
                : "bg-transparent text-muted-foreground hover:text-foreground"
            }`}
            onClick={handleTodayToggle}
          >
            <Zap className="mr-1 h-3.5 w-3.5" />
            Today
          </Button>
        </div>
      </div>

      <VCFilterBar
        filters={filters}
        departments={departments}
        programs={programs}
        sessions={sessions}
        onChange={handleFilterChange}
        onReset={handleReset}
        showSearch={false}
      />

      <Skeleton name="vc-overview-cards" loading={dashboardQuery.isLoading && !dashboard}>
        {dashboard ? (
          <VCOverviewCards overview={dashboard.overview} onCardClick={handleOverviewCardClick} />
        ) : null}
      </Skeleton>

      {/* Live Feed + Charts Grid */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Skeleton name="vc-dashboard-panels" loading={dashboardQuery.isLoading && !dashboard}>
            {dashboard ? (
              <VCDashboardPanels
                departmentPerformance={dashboard.departmentPerformance}
                semesterBreakdown={dashboard.semesterBreakdown}
                livePayments={dashboard.livePayments}
                collectionTrend={dashboard.collectionTrend}
                onDepartmentSelect={handleDepartmentTracking}
                onSemesterSelect={handleSemesterTracking}
              />
            ) : (
              <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] px-5 py-10 text-sm text-muted-foreground">
                Loading dashboard data...
              </div>
            )}
          </Skeleton>
        </div>

        {/* Live Transaction Feed */}
        <div>
          <VCLiveFeed
            transactions={liveTransactions}
            connected={sseConnected}
            newPaymentsCount={newPaymentsCount}
            newAmountCollected={newAmountCollected}
          />
        </div>
      </div>

      {/* Analytics merged into main dashboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-foreground">Advanced Analytics</h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">In Dashboard</p>
        </div>
        <Skeleton name="vc-analytics-panels-inline" loading={dashboardQuery.isLoading && !dashboard}>
          {dashboard ? (
            <VCAnalyticsPanels
              data={{
                overview: dashboard.overview,
                collectionTrend: dashboard.collectionTrend,
                departmentPerformance: dashboard.departmentPerformance,
                semesterBreakdown: dashboard.semesterBreakdown,
                paymentMethods: dashboard.paymentMethods,
              }}
              onDepartmentSelect={handleDepartmentTracking}
              onSemesterSelect={handleSemesterTracking}
            />
          ) : null}
        </Skeleton>
      </div>
    </div>
  )
}
