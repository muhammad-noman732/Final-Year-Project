"use client"

import { Skeleton } from "boneyard-js/react"
import { Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import VCFilterBar from "@/components/vc/VCFilterBar"
import VCOverviewCards from "@/components/vc/VCOverviewCards"
import VCDashboardPanels from "@/components/vc/VCDashboardPanels"
import VCAnalyticsPanels from "@/components/vc/VCAnalyticsPanels"
import VCLiveFeed from "@/components/vc/VCLiveFeed"
import InsightsPanel from "@/components/vc/InsightsPanel"
import { useVCDashboard } from "@/hooks/vc/useVCDashboard"

export default function VCDashboard() {
  const {
    filters,
    handleFilterChange,
    handleReset,
    handleTodayToggle,
    departments,
    programs,
    sessions,
    dashboard,
    isLoading,
    lastUpdatedAt,
    liveTransactions,
    initialTransactions,
    sseConnected,
    newPaymentsCount,
    newAmountCollected,
    showToast,
    toastMessage,
    handleDepartmentTracking,
    handleSemesterTracking,
    handleOverviewCardClick,
    insightsUpdatedAt,
  } = useVCDashboard()

  return (
    <div className="space-y-6 pb-8">
      {/* Intelligence Feed — rendered before everything else */}
      <InsightsPanel insightsUpdatedAt={insightsUpdatedAt} />

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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">VC Dashboard</h1>
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

      <Skeleton name="vc-overview-cards" loading={isLoading && !dashboard}>
        {dashboard ? (
          <VCOverviewCards overview={dashboard.overview} onCardClick={handleOverviewCardClick} />
        ) : null}
      </Skeleton>

      {/* Charts + Live Feed */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Skeleton name="vc-dashboard-panels" loading={isLoading && !dashboard}>
            {dashboard ? (
              <VCDashboardPanels
                departmentPerformance={dashboard.departmentPerformance}
                semesterBreakdown={dashboard.semesterBreakdown}
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

        <div>
          <VCLiveFeed
            transactions={liveTransactions}
            initialTransactions={initialTransactions}
            connected={sseConnected}
            newPaymentsCount={newPaymentsCount}
            newAmountCollected={newAmountCollected}
          />
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-foreground">Advanced Analytics</h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">In Dashboard</p>
        </div>
        <Skeleton name="vc-analytics-panels-inline" loading={isLoading && !dashboard}>
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
