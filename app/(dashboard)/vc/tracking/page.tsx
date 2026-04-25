"use client"

import { Skeleton } from "boneyard-js/react"
import {
  Users, CheckCircle2, AlertTriangle, DollarSign,
  Clock, BarChart3, Building2, GraduationCap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import VCFilterBar from "@/components/vc/VCFilterBar"
import VCStudentsTable from "@/components/vc/VCStudentsTable"
import { formatCurrency } from "@/config/constants"
import { useVCTracking } from "@/hooks/vc/useVCTracking"
import type { TrackingTab, TrackingScope, TrackingKPICard } from "@/types/client/ui/vc.ui.types"
import type { VCDepartmentPerformance, VCSemesterBreakdown } from "@/types/server/vc.types"

// ─── KPI icon map ──────────────────────────────────────────────────────────────

const KPI_ICONS = {
  users: Users,
  check: CheckCircle2,
  alert: AlertTriangle,
  currency: DollarSign,
  ratio: BarChart3,
  receipt: Clock,
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const STATUS_TABS: { value: TrackingTab; label: string; color: string; activeClass: string }[] = [
  { value: "overview", label: "Overview", color: "text-violet-400", activeClass: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  { value: "defaulters", label: "Defaulters", color: "text-rose-400", activeClass: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
  { value: "paid", label: "Paid", color: "text-emerald-400", activeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  { value: "unpaid", label: "Unpaid", color: "text-amber-400", activeClass: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
]

const SCOPE_TABS: { value: TrackingScope; label: string; Icon: typeof Building2 }[] = [
  { value: "overall", label: "University", Icon: Building2 },
  { value: "department", label: "Department", Icon: Building2 },
  { value: "semester", label: "Semester", Icon: GraduationCap },
]

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({ card }: { card: TrackingKPICard }) {
  const Icon = KPI_ICONS[card.icon as keyof typeof KPI_ICONS] ?? Users
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
          {card.label}
        </p>
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.04]">
          <Icon className="h-3 w-3 text-muted-foreground/50" />
        </div>
      </div>
      <p className={`text-2xl font-bold tabular-nums tracking-tight ${card.tone}`}>
        {card.value}
      </p>
    </motion.div>
  )
}

// ─── Department Grid ──────────────────────────────────────────────────────────

function DeptGrid({
  departments,
}: {
  departments: VCDepartmentPerformance[]
}) {
  if (departments.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/[0.06]">
        <p className="text-xs text-muted-foreground">No department data for current filters.</p>
      </div>
    )
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {departments.map((dept, i) => {
        const rate = dept.paymentRate
        const rateColor = rate >= 70 ? "text-emerald-400" : rate >= 45 ? "text-amber-400" : "text-rose-400"
        const barColor = rate >= 70 ? "bg-emerald-500" : rate >= 45 ? "bg-amber-500" : "bg-rose-500"
        return (
          <motion.div
            key={dept.departmentId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 space-y-3"
          >
            <div>
              <p className="text-[12.5px] font-semibold text-foreground">{dept.departmentName}</p>
              <p className="text-[10.5px] font-mono text-muted-foreground/60">{dept.departmentCode}</p>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className={`text-lg font-bold tabular-nums ${rateColor}`}>{rate}%</span>
              <span className="text-muted-foreground">{dept.paidStudents}/{dept.totalStudents}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${rate}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.04]">
              <div>
                <p className="text-[9.5px] text-muted-foreground/50 uppercase tracking-[0.12em]">Collected</p>
                <p className="text-[11.5px] font-semibold text-emerald-400 tabular-nums">{formatCurrency(dept.collectedAmount)}</p>
              </div>
              <div>
                <p className="text-[9.5px] text-muted-foreground/50 uppercase tracking-[0.12em]">Outstanding</p>
                <p className="text-[11.5px] font-semibold text-amber-400 tabular-nums">{formatCurrency(dept.outstandingAmount)}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Semester Grid ────────────────────────────────────────────────────────────

function SemGrid({ semesters }: { semesters: VCSemesterBreakdown[] }) {
  if (semesters.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/[0.06]">
        <p className="text-xs text-muted-foreground">No semester data for current filters.</p>
      </div>
    )
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {semesters.map((sem, i) => {
        const total = sem.paidAmount + sem.unpaidAmount
        const pct = total > 0 ? Math.round((sem.paidAmount / total) * 100) : 0
        return (
          <motion.div
            key={sem.semester}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold text-foreground">Semester {sem.semester}</p>
              <span className="text-[10px] font-semibold text-sky-400">{pct}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full bg-sky-500 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground/60">Paid</span>
                <span className="text-emerald-400 tabular-nums font-medium">{formatCurrency(sem.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground/60">Outstanding</span>
                <span className="text-amber-400 tabular-nums font-medium">{formatCurrency(sem.unpaidAmount)}</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-white/[0.04]">
                <span className="text-muted-foreground/60">{sem.paidStudents} paid</span>
                <span className="text-muted-foreground/60">{sem.unpaidStudents} unpaid</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VCTrackingPage() {
  const {
    tab, scope, filters,
    departments, programs, sessions,
    departmentPerformance, semesterBreakdown,
    lastUpdatedAt, isOverviewLoading,
    studentsData, isStudentsLoading, isStudentsFetching,
    trackingCards,
    handleFilterChange, handleTabChange, handleScopeChange,
    handleReset, handlePageChange, handleExport,
  } = useVCTracking()

  return (
    <div className="space-y-5 pb-10">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">Tracking Center</h1>
          <p className="mt-0.5 text-xs text-muted-foreground/70">
            Operational view — paid, unpaid, defaulters across departments and semesters.
          </p>
        </div>
        {lastUpdatedAt && (
          <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground/50 flex-shrink-0 mt-0.5">
            <Clock className="h-3 w-3" />
            {lastUpdatedAt}
          </div>
        )}
      </div>

      {/* ── Status Tabs ── */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.025] border border-white/[0.04] w-fit">
        {STATUS_TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => handleTabChange(t.value)}
            className={[
              "rounded-[9px] px-4 py-1.5 text-xs font-semibold border transition-all duration-200",
              tab === t.value
                ? t.activeClass
                : "border-transparent text-muted-foreground hover:text-foreground/80",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Scope Toggle (only on Overview) ── */}
      {tab === "overview" && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-semibold">
            Scope:
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.025] border border-white/[0.04]">
            {SCOPE_TABS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => handleScopeChange(s.value)}
                className={[
                  "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all duration-200",
                  scope === s.value
                    ? "bg-white/[0.07] text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground/70",
                ].join(" ")}
              >
                <s.Icon className="h-3 w-3" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <VCFilterBar
        filters={filters}
        departments={departments}
        programs={programs}
        sessions={sessions}
        onChange={handleFilterChange}
        onReset={handleReset}
        onExport={tab !== "overview" ? handleExport : undefined}
        showFeeStatus={tab === "overview"}
      />

      {/* ── KPI Cards ── */}
      <Skeleton name="vc-tracking-kpi" loading={isOverviewLoading}>
        {trackingCards.length > 0 && (
          <AnimatePresence mode="wait">
            <div key={tab} className="grid gap-3 grid-cols-2 xl:grid-cols-4">
              {trackingCards.map((card) => (
                <KPICard key={card.label} card={card} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </Skeleton>

      {/* ── Student Table (non-overview tabs) ── */}
      {tab !== "overview" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Skeleton name="vc-students-table" loading={isStudentsLoading && !studentsData}>
              <VCStudentsTable
                data={studentsData}
                isLoading={isStudentsFetching}
                tab={tab}
                onPageChange={handlePageChange}
                onExport={handleExport}
              />
            </Skeleton>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Overview Breakdowns ── */}
      {tab === "overview" && (
        <AnimatePresence mode="wait">
          {scope === "department" && (
            <motion.div
              key="dept"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <h3 className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold">
                Department Performance
              </h3>
              <DeptGrid departments={departmentPerformance} />
            </motion.div>
          )}

          {scope === "semester" && (
            <motion.div
              key="sem"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <h3 className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold">
                Semester Breakdown
              </h3>
              <SemGrid semesters={semesterBreakdown} />
            </motion.div>
          )}

          {scope === "overall" && (
            <motion.div
              key="overall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center rounded-xl border border-dashed border-white/[0.05] py-10"
            >
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">
                  <BarChart3 className="h-4.5 w-4.5 text-muted-foreground/40" />
                </div>
                <p className="text-[12.5px] font-medium text-foreground/60">University-wide overview</p>
                <p className="mt-1 text-xs text-muted-foreground/50">
                  Switch to Department or Semester scope for detailed breakdowns.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
