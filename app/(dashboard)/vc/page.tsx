"use client"

import { Skeleton } from "boneyard-js/react"
import { Clock, Zap, BarChart2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import VCFilterBar from "@/components/vc/VCFilterBar"
import VCHealthScoreBento from "@/components/vc/VCHealthScoreBento"
import VCDashboardPanels from "@/components/vc/VCDashboardPanels"
import VCAnalyticsPanels from "@/components/vc/VCAnalyticsPanels"
import VCLiveFeed from "@/components/vc/VCLiveFeed"
import VCVelocityCard from "@/components/vc/VCVelocityCard"
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
    <div className="space-y-5 pb-10">

      {/* ─── Toast ───────────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-navy-800 px-4 py-3 shadow-2xl shadow-black/40">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 flex-shrink-0">
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400">Payment Received</p>
              <p className="text-[11px] text-muted-foreground">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Intelligence Feed ───────────────────────────────────── */}
      <InsightsPanel insightsUpdatedAt={insightsUpdatedAt} />

      {/* ─── Page Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 flex-shrink-0">
            <LayoutDashboard className="h-4.5 w-4.5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">VC Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tenant-wide payment visibility — filter by department, semester, session, status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {lastUpdatedAt && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              <Clock className="h-3 w-3" />
              <span>Updated {lastUpdatedAt}</span>
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`h-8 text-xs border transition-colors ${
              filters.range === "today"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                : "border-white/[0.08] bg-transparent text-muted-foreground hover:text-foreground"
            }`}
            onClick={handleTodayToggle}
          >
            <Zap className="mr-1.5 h-3 w-3" />
            Today
          </Button>
        </div>
      </div>

      {/* ─── Filters ─────────────────────────────────────────────── */}
      <VCFilterBar
        filters={filters}
        departments={departments}
        programs={programs}
        sessions={sessions}
        onChange={handleFilterChange}
        onReset={handleReset}
        showSearch={false}
      />

      {/* ─── Health Score Bento ──────────────────────────────────── */}
      <Skeleton name="vc-overview-cards" loading={isLoading && !dashboard}>
        {dashboard ? (
          <VCHealthScoreBento
            overview={dashboard.overview}
            collectionTrend={dashboard.collectionTrend}
            newAmountCollected={newAmountCollected}
            sseConnected={sseConnected}
            onCardClick={handleOverviewCardClick}
          />
        ) : null}
      </Skeleton>

      {/* ─── Main Content: Charts + Right Column ─────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        {/* Charts column */}
        <Skeleton name="vc-dashboard-panels" loading={isLoading && !dashboard}>
          {dashboard ? (
            <VCDashboardPanels
              semesterBreakdown={dashboard.semesterBreakdown}
              collectionTrend={dashboard.collectionTrend}
              onSemesterSelect={handleSemesterTracking}
            />
          ) : (
            <div className="rounded-xl border border-white/[0.05] bg-navy-900 px-5 py-10 text-sm text-muted-foreground text-center">
              Loading chart data...
            </div>
          )}
        </Skeleton>

        {/* Right column: Velocity card + Live feed */}
        <div className="flex flex-col gap-4">
          {dashboard && (
            <VCVelocityCard
              overview={dashboard.overview}
              collectionTrend={dashboard.collectionTrend}
            />
          )}
          <VCLiveFeed
            transactions={liveTransactions}
            initialTransactions={initialTransactions}
            connected={sseConnected}
            newPaymentsCount={newPaymentsCount}
            newAmountCollected={newAmountCollected}
          />
        </div>
      </div>

      {/* ─── Advanced Analytics ──────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="h-4 w-4 text-gold-400" />
          <h2 className="text-sm font-semibold text-foreground">Advanced Analytics</h2>
          <Separator className="flex-1 bg-white/[0.04]" />
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
