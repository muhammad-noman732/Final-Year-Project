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
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">

      {/* ─── Toast ──────────────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-[#070b14]/90 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 flex-shrink-0 border border-emerald-500/15">
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 tracking-wide">Payment Received</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{toastMessage}</p>
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
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Platform <span className="text-gold-400">Overview</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-300 ${
              sseConnected
                ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-400"
                : "border-white/[0.06] bg-white/[0.03] text-muted-foreground"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">

        {/* Hero: Total Collected (3 cols) */}
        <div className="group col-span-1 sm:col-span-2 md:col-span-3 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-6 hover:-translate-y-0.5 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] transition-all duration-300">
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[60px] opacity-10 group-hover:opacity-25 transition-opacity duration-500 bg-emerald-500" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                  <Banknote className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/70">
                  Total Fee Collected
                </span>
              </div>
              {newAmountCollected > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15">
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-bold text-emerald-400">
                    +{formatCurrency(newAmountCollected)} live
                  </span>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="h-10 w-48 rounded-lg bg-white/[0.04] animate-pulse mb-2" />
            ) : (
              <p className="text-4xl md:text-5xl font-bold text-foreground tracking-tight tabular-nums">
                {formatCurrency(metrics.totalCollected)}
              </p>
            )}

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground/60">Collection progress</span>
                <span className="font-semibold text-emerald-400">{collectionProgress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${collectionProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10.5px] text-muted-foreground/50">
                <span>Collected</span>
                <span>Outstanding {formatCurrency(metrics.outstanding)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Collection (2 cols) */}
        <div className="group col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-gold-500/20 hover:shadow-[0_0_20px_rgba(212,168,73,0.08)] transition-all duration-300">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-gold-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/15 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gold-400" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground/50">
                Today
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1.5">
              Today&apos;s Collection
            </p>
            {isLoading ? (
              <div className="h-8 w-32 rounded-lg bg-white/[0.04] animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">
                {formatCurrency(metrics.collectedToday)}
              </p>
            )}
            <p className="text-[11px] text-muted-foreground/50 mt-2">
              {metrics.studentsPaid} payments completed
            </p>
          </div>
        </div>

        {/* Defaulters (1 col) */}
        <div className="group col-span-1 md:col-span-1 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-rose-500/20 hover:shadow-[0_0_20px_rgba(251,113,133,0.08)] transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[45px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-rose-500" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1.5">
              Defaulters
            </p>
            {isLoading ? (
              <div className="h-8 w-16 rounded-lg bg-white/[0.04] animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">
                {metrics.defaulters}
              </p>
            )}
            <p className="text-[11px] text-rose-400/70 mt-2 font-medium">Overdue</p>
          </div>
        </div>

        {/* Total Students (2 cols) */}
        <div className="group col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-sky-500/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.08)] transition-all duration-300">
          <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full blur-[50px] opacity-8 group-hover:opacity-18 transition-opacity duration-500 bg-sky-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center mb-3">
                <Users className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1.5">
                Total Students
              </p>
              {isLoading ? (
                <div className="h-7 w-20 rounded-lg bg-white/[0.04] animate-pulse" />
              ) : (
                <p className="text-xl font-bold text-foreground tracking-tight tabular-nums">
                  {metrics.totalStudents.toLocaleString()}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-[11px] text-emerald-400 font-semibold mb-1">
                {metrics.studentsPaid} paid
              </div>
              <div className="text-[11px] text-amber-400/80 font-medium">
                {metrics.studentsUnpaid} unpaid
              </div>
            </div>
          </div>
        </div>

        {/* Outstanding Amount (2 cols) */}
        <div className="group col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-amber-500/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all duration-300">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-amber-500" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-amber-400/60 border border-amber-500/15 bg-amber-500/5 px-2 py-0.5 rounded-full">
                Pending
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1.5">
              Outstanding Amount
            </p>
            {isLoading ? (
              <div className="h-7 w-28 rounded-lg bg-white/[0.04] animate-pulse" />
            ) : (
              <p className="text-xl font-bold text-foreground tracking-tight tabular-nums">
                {formatCurrency(metrics.outstanding)}
              </p>
            )}
          </div>
        </div>

        {/* Payment Rate (2 cols) */}
        <div className="group col-span-1 sm:col-span-2 md:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300">
          <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full blur-[50px] opacity-8 group-hover:opacity-18 transition-opacity duration-500 bg-violet-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1.5">
                Payment Rate
              </p>
              {isLoading ? (
                <div className="h-7 w-20 rounded-lg bg-white/[0.04] animate-pulse" />
              ) : (
                <p className="text-xl font-bold text-foreground tracking-tight tabular-nums">
                  {metrics.paymentRate.toFixed(1)}%
                </p>
              )}
              <p className="text-[11px] text-muted-foreground/50 mt-1">of enrolled students</p>
            </div>
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - metrics.paymentRate / 100)}`}
                  className="text-violet-400 transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-violet-400">
                {Math.round(metrics.paymentRate)}%
              </span>
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
