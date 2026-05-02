"use client"

import { Wifi, WifiOff, Zap, Clock, Users, Banknote, AlertTriangle, TrendingUp, LayoutDashboard, ArrowUpRight } from "lucide-react"
import VCLiveFeed from "@/components/vc/VCLiveFeed"
import AdminTransactionTable from "@/components/admin/AdminTransactionTable"
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard"
import { formatCurrency } from "@/config/constants"

export default function AdminDashboard() {
  const {
    metrics,
    isLoading,
    liveTransactions,
    initialTransactions,
    sseConnected,
    newPaymentsCount,
    newAmountCollected,
    showToast,
    toastMessage,
    transactions,
    transactionsMeta,
    isTransactionsLoading,
    statusTab,
    setStatusTab,
    transactionsPage,
    setTransactionsPage,
    handleExportCSV,
    lastUpdatedAt,
  } = useAdminDashboard()

  const collectionTotal = metrics.totalCollected + metrics.outstanding
  const collectionProgress =
    collectionTotal > 0 ? Math.round((metrics.totalCollected / collectionTotal) * 100) : 0

  return (
    <div className="space-y-6 pb-10 p-5 lg:p-8 animate-in fade-in duration-500">

      {/* ─── Toast ──────────────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/10 dark:shadow-black/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 flex-shrink-0 border border-emerald-500/15">
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 tracking-wide">Payment Received</p>
              <p className="text-[11px] text-slate-500 dark:text-muted-foreground mt-0.5">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Page Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/15 flex-shrink-0">
            <LayoutDashboard className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">
              Platform <span className="text-amber-500 dark:text-gold-400">Overview</span>
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-muted-foreground mt-0.5">
              Real-time university fee intelligence — live payments, ledger, and export.
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
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-300 ${sseConnected
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-slate-200 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.03] text-slate-500 dark:text-muted-foreground"
              }`}
          >
            {sseConnected ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <Wifi className="h-3 w-3" />
                Live
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                Offline
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Bento Metrics ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Fee Collected (2 cols) */}
        <div
          className="group lg:col-span-2 relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Banknote className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
                    Total Revenue
                  </p>
                  <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Lifetime Collection</p>
                </div>
              </div>
              {newAmountCollected > 0 && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500">+{formatCurrency(newAmountCollected)} Live</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                {isLoading ? (
                  <div className="h-9 w-40 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
                ) : (
                  <h2 className="text-3xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
                    {formatCurrency(metrics.totalCollected)}
                  </h2>
                )}
              </div>
              <div className="flex-1 max-w-[240px] space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-muted-foreground/60">Progress</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{collectionProgress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000"
                    style={{ width: `${collectionProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Collection (1 col) */}
        <div
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(212, 168, 73, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(212, 168, 73, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20">
              <TrendingUp className="h-4.5 w-4.5 text-gold-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
              Today
            </p>
          </div>
          {isLoading ? (
            <div className="h-8 w-28 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
              {formatCurrency(metrics.collectedToday)}
            </h3>
          )}
          <p className="mt-2 text-[11px] font-medium text-slate-500 dark:text-muted-foreground/50">
            <span className="text-emerald-500 font-bold">{metrics.studentsPaid}</span> payments completed
          </p>
        </div>

        {/* Defaulters (1 col) */}
        <div
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(244, 63, 94, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(244, 63, 94, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
              Critical
            </p>
          </div>
          {isLoading ? (
            <div className="h-8 w-16 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
              {metrics.defaulters}
            </h3>
          )}
          <p className="mt-2 text-[11px] font-bold text-rose-500 uppercase tracking-tighter">Defaulters List</p>
        </div>

        {/* Total Students (1 col) */}
        <div
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20">
              <Users className="h-4.5 w-4.5 text-sky-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
              Enrollment
            </p>
          </div>
          {isLoading ? (
            <div className="h-8 w-24 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
              {metrics.totalStudents.toLocaleString()}
            </h3>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
              {metrics.studentsPaid} Paid
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-md">
              {metrics.studentsUnpaid} Pending
            </span>
          </div>
        </div>

        {/* Outstanding Amount (1 col) */}
        <div
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock className="h-4.5 w-4.5 text-amber-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
              Arrears
            </p>
          </div>
          {isLoading ? (
            <div className="h-8 w-28 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
              {formatCurrency(metrics.outstanding)}
            </h3>
          )}
          <p className="mt-2 text-[11px] font-medium text-amber-600 dark:text-amber-400/70">Total Pending Dues</p>
        </div>

        {/* Payment Rate (2 cols) */}
        <div
          className="group lg:col-span-2 relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)`
          }}
        >
          <div className="flex items-center justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Zap className="h-4.5 w-4.5 text-violet-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/60">
                  Efficiency
                </p>
              </div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-muted-foreground/60 mb-1">Payment Success Rate</p>
              {isLoading ? (
                <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-white/[0.05] animate-pulse" />
              ) : (
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-foreground tracking-tight tabular-nums">
                  {metrics.paymentRate.toFixed(1)}%
                </h3>
              )}
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className="text-slate-100 dark:text-white/5" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - metrics.paymentRate / 100)}`}
                    className="text-violet-500 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-foreground">{Math.round(metrics.paymentRate)}%</span>
                </div>
              </div>
              <p className="text-[10px] font-medium text-slate-400 dark:text-muted-foreground/40 text-right max-w-[120px]">
                Overall collection efficiency across all programs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content: Transactions + Live Feed ─────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <AdminTransactionTable
          transactions={transactions}
          meta={transactionsMeta}
          isLoading={isTransactionsLoading}
          statusTab={statusTab}
          onTabChange={setStatusTab}
          page={transactionsPage}
          onPageChange={setTransactionsPage}
          onExportCSV={handleExportCSV}
          unpaidCount={metrics.studentsUnpaid}
          defaultersCount={metrics.defaulters}
        />

        <VCLiveFeed
          transactions={liveTransactions}
          initialTransactions={initialTransactions}
          connected={sseConnected}
          newPaymentsCount={newPaymentsCount}
          newAmountCollected={newAmountCollected}
        />
      </div>
    </div>
  )
}
