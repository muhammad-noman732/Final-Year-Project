"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import { Skeleton } from "boneyard-js/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VCFilterBar from "@/components/vc/VCFilterBar"
import type { VCFilterState } from "@/types/client/ui/vc.ui.types"
import VCStudentsTable from "@/components/vc/VCStudentsTable"
import { buildVCQuery, defaultVCFilters } from "@/components/vc/vcFilters"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useGetVCDashboardQuery, useGetVCStudentsQuery } from "@/store/api/vc/vcApi"
import { formatCurrency } from "@/config/constants"

type TrackingTab = "overview" | "defaulters" | "paid" | "unpaid"
type TrackingScope = "overall" | "department" | "semester"

function feeStatusFromTab(tab: TrackingTab): VCFilterState["feeStatus"] {
  if (tab === "defaulters") return "OVERDUE"
  if (tab === "paid") return "PAID"
  if (tab === "unpaid") return "UNPAID"
  return "ALL"
}

export default function VCTrackingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialTab = (searchParams.get("tab") as TrackingTab) || "overview"
  const initialScope = (searchParams.get("scope") as TrackingScope) || "overall"
  const initialDepartmentId = searchParams.get("departmentId") ?? ""
  const initialSemester = searchParams.get("semester") ?? ""

  const [tab, setTab] = useState<TrackingTab>(initialTab)
  const [scope, setScope] = useState<TrackingScope>(initialScope)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<VCFilterState>({
    ...defaultVCFilters,
    departmentId: initialDepartmentId,
    semester: initialSemester,
    feeStatus: feeStatusFromTab(initialTab),
  })

  const query = useMemo(() => buildVCQuery(filters), [filters])

  // Build the students query — always includes page + limit + feeStatus from tab
  const studentsQuery = useMemo(() => ({
    ...buildVCQuery(filters),
    page,
    limit: 15,
  }), [filters, page])

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

  // Students query — used when on defaulters or paid tab
  const studentsResult = useGetVCStudentsQuery(
    tab === "overview" ? skipToken : studentsQuery,
    { refetchOnMountOrArgChange: true },
  )

  const departments = departmentsRaw.map((department) => ({
    id: department.id,
    label: department.name,
  }))
  const programs = (programsData?.data?.data ?? []).map((program) => ({
    id: program.id,
    label: program.name,
  }))
  const sessions = (sessionsData?.data?.data ?? []).map((session) => ({
    id: session.id,
    label: session.name,
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

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("tab", tab)
    params.set("scope", scope)
    if (filters.departmentId) params.set("departmentId", filters.departmentId)
    if (filters.semester) params.set("semester", filters.semester)
    const nextQuery = params.toString()
    if (nextQuery !== searchParams.toString()) {
      router.replace(`/vc/tracking?${nextQuery}`)
    }
  }, [tab, scope, filters.departmentId, filters.semester, router, searchParams])

  const handleFilterChange = (key: keyof VCFilterState, value: string) => {
    if (key === "feeStatus") {
      return
    }
    setPage(1)
    setFilters((current) => {
      return {
        ...current,
        [key]: value,
        ...(key === "departmentId" ? { programId: "" } : {}),
      }
    })
  }

  const handleTabChange = (nextTab: string) => {
    const typedTab = nextTab as TrackingTab
    setTab(typedTab)
    setPage(1)
    setFilters((current) => {
      return {
        ...current,
        feeStatus: feeStatusFromTab(typedTab),
      }
    })
  }

  const handleScopeChange = (nextScope: string) => {
    const typedScope = nextScope as TrackingScope
    setScope(typedScope)
    setFilters((current) => {
      return {
        ...current,
        departmentId: typedScope === "overall" ? "" : current.departmentId,
        semester: typedScope === "overall" ? "" : current.semester,
      }
    })
  }

  const handleReset = () => {
    const resetFilters = {
      ...defaultVCFilters,
      feeStatus: feeStatusFromTab(tab),
      departmentId: scope === "department" ? filters.departmentId : "",
      semester: scope === "semester" ? filters.semester : "",
    }
    setFilters(resetFilters)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // CSV Export for the current student view
  const handleExport = useCallback(() => {
    const rows = studentsResult.data?.data?.data
    if (!rows || rows.length === 0) return

    const headers = [
      "Name", "Roll No", "Email", "Department", "Program",
      "Semester", "Status", "Amount Due", "Amount Paid",
      "Outstanding", "Due Date", "Days Overdue",
    ]

    const csvRows = rows.map((row) => [
      row.studentName,
      row.rollNumber,
      row.email,
      row.departmentCode,
      row.programName,
      row.semester,
      row.feeStatus,
      row.amountDue,
      row.amountPaid,
      row.outstandingAmount,
      new Date(row.dueDate).toLocaleDateString(),
      row.daysOverdue,
    ])

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `vc-${tab}-students-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [studentsResult.data, tab])

  const overview = dashboardQuery.data?.data?.overview
  const departmentPerformance = dashboardQuery.data?.data?.departmentPerformance ?? []
  const semesterBreakdown = dashboardQuery.data?.data?.semesterBreakdown ?? []
  const lastUpdatedAt = dashboardQuery.fulfilledTimeStamp
    ? new Date(dashboardQuery.fulfilledTimeStamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    : null

  const trackingCards = overview
    ? tab === "defaulters"
      ? [
        { label: "Defaulters", value: String(overview.defaulters), tone: "text-rose-400" },
        { label: "Outstanding", value: formatCurrency(overview.outstandingAmount), tone: "text-gold-400" },
        {
          label: "Overdue Ratio",
          value: `${overview.totalStudents > 0 ? Math.round((overview.defaulters / overview.totalStudents) * 100) : 0}%`,
          tone: "text-rose-300",
        },
        { label: "Students in Scope", value: String(overview.totalStudents), tone: "text-foreground" },
      ]
      : tab === "paid"
        ? [
          { label: "Paid Students", value: String(overview.studentsPaid), tone: "text-emerald-400" },
          { label: "Collection", value: formatCurrency(overview.collectedInRange), tone: "text-emerald-300" },
          { label: "Payments", value: String(overview.paymentsInRange), tone: "text-gold-400" },
          { label: "Payment Rate", value: `${overview.paymentRate}%`, tone: "text-sky-400" },
        ]
        : tab === "unpaid"
          ? [
            { label: "Unpaid Students", value: String(overview.studentsUnpaid), tone: "text-amber-400" },
            { label: "Outstanding", value: formatCurrency(overview.outstandingAmount), tone: "text-gold-400" },
            {
              label: "Unpaid Ratio",
              value: `${overview.totalStudents > 0 ? Math.round((overview.studentsUnpaid / overview.totalStudents) * 100) : 0}%`,
              tone: "text-amber-300",
            },
            { label: "Students in Scope", value: String(overview.totalStudents), tone: "text-foreground" },
          ]
        : [
          { label: "Students", value: String(overview.totalStudents), tone: "text-foreground" },
          { label: "Paid", value: String(overview.studentsPaid), tone: "text-emerald-400" },
          { label: "Unpaid", value: String(overview.studentsUnpaid), tone: "text-amber-400" },
          { label: "Defaulters", value: String(overview.defaulters), tone: "text-rose-400" },
        ]
    : []

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">VC Tracking Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Dedicated operational view for paid, defaulter, and semester/department tracking.
          </p>
        </div>
        {lastUpdatedAt ? (
          <p className="text-[11px] text-muted-foreground/60">
            Last updated <span className="text-muted-foreground">{lastUpdatedAt}</span>
          </p>
        ) : null}
      </div>

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start bg-white/[0.03]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="defaulters">Defaulters</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs value={scope} onValueChange={handleScopeChange}>
        <TabsList className="w-full justify-start bg-white/[0.03]">
          <TabsTrigger value="overall">Overall University</TabsTrigger>
          <TabsTrigger value="department">Department-wise</TabsTrigger>
          <TabsTrigger value="semester">Semester-wise</TabsTrigger>
        </TabsList>
      </Tabs>

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

      <Skeleton name="vc-tracking-overview" loading={dashboardQuery.isLoading && !overview}>
        {overview ? (
          <div className="grid gap-3 md:grid-cols-4">
            {trackingCards.map((card) => (
              <div key={card.label} className="rounded-xl border border-white/[0.06] bg-[#0a0e1a] p-4">
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className={`mt-1 text-xl font-semibold ${card.tone}`}>{card.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Skeleton>

      {/* Student Table — shown on Defaulters, Paid, and Unpaid tabs */}
      {tab !== "overview" ? (
        <Skeleton name="vc-students-table" loading={studentsResult.isLoading}>
          <VCStudentsTable
            data={studentsResult.data?.data}
            isLoading={studentsResult.isFetching}
            onPageChange={handlePageChange}
          />
        </Skeleton>
      ) : null}

      {/* Department / Semester breakdowns — shown on Overview tab */}
      {tab === "overview" && scope === "department" ? (
        <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Department Performance</h3>
          {departmentPerformance.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-4 text-sm text-muted-foreground">
              No department performance data for selected filters.
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {departmentPerformance.map((department) => (
                <div key={department.departmentId} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-foreground">{department.departmentName}</p>
                  <p className="text-[11px] text-muted-foreground">{department.departmentCode}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-black/20 p-2">
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-semibold text-foreground">{department.totalStudents}</p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-2">
                      <p className="text-muted-foreground">Defaulters</p>
                      <p className="font-semibold text-rose-400">{department.defaulters}</p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-2">
                      <p className="text-muted-foreground">Collected</p>
                      <p className="font-semibold text-emerald-400">{formatCurrency(department.collectedAmount)}</p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-2">
                      <p className="text-muted-foreground">Outstanding</p>
                      <p className="font-semibold text-gold-400">{formatCurrency(department.outstandingAmount)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === "overview" && scope === "semester" ? (
        <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Semester Performance</h3>
          {semesterBreakdown.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-4 text-sm text-muted-foreground">
              No semester data for selected filters.
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {semesterBreakdown.map((semester) => (
                <div key={semester.semester} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs">
                  <p className="text-sm font-semibold text-foreground">Semester {semester.semester}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-emerald-400">Paid: {formatCurrency(semester.paidAmount)}</p>
                    <p className="text-rose-400">Outstanding: {formatCurrency(semester.unpaidAmount)}</p>
                    <p className="text-muted-foreground">Paid Students: {semester.paidStudents}</p>
                    <p className="text-muted-foreground">Unpaid Students: {semester.unpaidStudents}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === "overview" && scope === "overall" ? (
        <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5 text-sm text-muted-foreground">
          Use Department-wise or Semester-wise scope for detailed operational tracking.
        </div>
      ) : null}
    </div>
  )
}
