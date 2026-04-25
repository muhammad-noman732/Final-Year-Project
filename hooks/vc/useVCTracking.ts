"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useGetVCDashboardQuery, useGetVCStudentsQuery } from "@/store/api/vc/vcApi"
import { buildVCQuery, defaultVCFilters } from "@/components/vc/vcFilters"
import { formatCurrency } from "@/config/constants"
import type { VCFilterState, VCSelectOption } from "@/types/client/ui/vc.ui.types"
import type {
  TrackingTab,
  TrackingScope,
  TrackingKPICard,
  UseVCTrackingReturn,
} from "@/types/client/ui/vc.ui.types"

function feeStatusFromTab(tab: TrackingTab): VCFilterState["feeStatus"] {
  if (tab === "defaulters") return "OVERDUE"
  if (tab === "paid") return "PAID"
  if (tab === "unpaid") return "UNPAID"
  return "ALL"
}

export function useVCTracking(): UseVCTrackingReturn {
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

  const { data: departmentsData } = useGetDepartmentsQuery({ page: 1, limit: 100 })
  const departmentsRaw = departmentsData?.data?.data ?? []
  const hasDepartmentsLoaded = Boolean(departmentsData?.data)
  const departmentExists = filters.departmentId
    ? departmentsRaw.some((d) => d.id === filters.departmentId)
    : true

  // Derive sanitized filters: clear stale departmentId once list loads and it's not found.
  // This avoids calling setState inside an effect (react-hooks/set-state-in-effect).
  const effectiveFilters = useMemo<VCFilterState>(() => {
    if (hasDepartmentsLoaded && filters.departmentId && !departmentExists) {
      return { ...filters, departmentId: "", programId: "" }
    }
    return filters
  }, [filters, hasDepartmentsLoaded, departmentExists])

  const query = useMemo(() => buildVCQuery(effectiveFilters), [effectiveFilters])

  const studentsQuery = useMemo(
    () => ({ ...buildVCQuery(effectiveFilters), page, limit: 15 }),
    [effectiveFilters, page],
  )

  const programsQueryArg = effectiveFilters.departmentId
    ? !hasDepartmentsLoaded
      ? skipToken
      : { page: 1, limit: 100, departmentId: effectiveFilters.departmentId }
    : { page: 1, limit: 100 }

  const { data: programsData } = useGetProgramsQuery(programsQueryArg)
  const { data: sessionsData } = useGetSessionsQuery({ page: 1, limit: 100 })

  const dashboardQuery = useGetVCDashboardQuery(query, { refetchOnMountOrArgChange: true })

  const studentsResult = useGetVCStudentsQuery(
    tab === "overview" ? skipToken : studentsQuery,
    { refetchOnMountOrArgChange: true },
  )

  const departments: VCSelectOption[] = departmentsRaw.map((d) => ({ id: d.id, label: d.name }))
  const programs: VCSelectOption[] = (programsData?.data?.data ?? []).map((p) => ({
    id: p.id,
    label: p.name,
  }))
  const sessions: VCSelectOption[] = (sessionsData?.data?.data ?? []).map((s) => ({
    id: s.id,
    label: s.name,
  }))

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("tab", tab)
    params.set("scope", scope)
    if (effectiveFilters.departmentId) params.set("departmentId", effectiveFilters.departmentId)
    if (effectiveFilters.semester) params.set("semester", effectiveFilters.semester)
    const nextQuery = params.toString()
    if (nextQuery !== searchParams.toString()) {
      router.replace(`/vc/tracking?${nextQuery}`)
    }
  }, [tab, scope, effectiveFilters.departmentId, effectiveFilters.semester, router, searchParams])

  const handleFilterChange = (key: keyof VCFilterState, value: string) => {
    if (key === "feeStatus") return
    setPage(1)
    setFilters((c) => ({
      ...c,
      [key]: value,
      ...(key === "departmentId" ? { programId: "" } : {}),
    }))
  }

  const handleTabChange = (nextTab: string) => {
    const typed = nextTab as TrackingTab
    setTab(typed)
    setPage(1)
    setFilters((c) => ({ ...c, feeStatus: feeStatusFromTab(typed) }))
  }

  const handleScopeChange = (nextScope: string) => {
    const typed = nextScope as TrackingScope
    setScope(typed)
    setFilters((c) => ({
      ...c,
      departmentId: typed === "overall" ? "" : c.departmentId,
      semester: typed === "overall" ? "" : c.semester,
    }))
  }

  const handleReset = () => {
    setFilters({
      ...defaultVCFilters,
      feeStatus: feeStatusFromTab(tab),
      departmentId: scope === "department" ? filters.departmentId : "",
      semester: scope === "semester" ? filters.semester : "",
    })
    setPage(1)
  }

  const handlePageChange = (newPage: number) => setPage(newPage)

  const handleExport = useCallback(() => {
    const rows = studentsResult.data?.data?.data
    if (!rows?.length) return
    const headers = [
      "Name", "Roll No", "Email", "Department", "Program",
      "Semester", "Status", "Amount Due", "Amount Paid",
      "Outstanding", "Due Date", "Days Overdue",
    ]
    const csvRows = rows.map((r) => [
      r.studentName, r.rollNumber, r.email, r.departmentCode, r.programName,
      r.semester, r.feeStatus, r.amountDue, r.amountPaid,
      r.outstandingAmount, new Date(r.dueDate).toLocaleDateString(), r.daysOverdue,
    ])
    const csvContent = [
      headers.join(","),
      ...csvRows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `vc-${tab}-${new Date().toISOString().slice(0, 10)}.csv`
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

  const trackingCards: TrackingKPICard[] = overview
    ? tab === "defaulters"
      ? [
          { label: "Defaulters", value: String(overview.defaulters), tone: "text-rose-400", icon: "alert" },
          { label: "Outstanding", value: formatCurrency(overview.outstandingAmount), tone: "text-amber-400", icon: "currency" },
          {
            label: "Overdue Ratio",
            value: `${overview.totalStudents > 0 ? Math.round((overview.defaulters / overview.totalStudents) * 100) : 0}%`,
            tone: "text-rose-300",
            icon: "ratio",
          },
          { label: "In Scope", value: String(overview.totalStudents), tone: "text-foreground", icon: "users" },
        ]
      : tab === "paid"
        ? [
            { label: "Paid Students", value: String(overview.studentsPaid), tone: "text-emerald-400", icon: "check" },
            { label: "Collected", value: formatCurrency(overview.collectedInRange), tone: "text-emerald-300", icon: "currency" },
            { label: "Transactions", value: String(overview.paymentsInRange), tone: "text-gold-400", icon: "receipt" },
            { label: "Payment Rate", value: `${overview.paymentRate}%`, tone: "text-sky-400", icon: "ratio" },
          ]
        : tab === "unpaid"
          ? [
              { label: "Unpaid Students", value: String(overview.studentsUnpaid), tone: "text-amber-400", icon: "users" },
              { label: "Outstanding", value: formatCurrency(overview.outstandingAmount), tone: "text-amber-300", icon: "currency" },
              {
                label: "Unpaid Ratio",
                value: `${overview.totalStudents > 0 ? Math.round((overview.studentsUnpaid / overview.totalStudents) * 100) : 0}%`,
                tone: "text-amber-200",
                icon: "ratio",
              },
              { label: "In Scope", value: String(overview.totalStudents), tone: "text-foreground", icon: "users" },
            ]
          : [
              { label: "Total Students", value: String(overview.totalStudents), tone: "text-foreground", icon: "users" },
              { label: "Paid", value: String(overview.studentsPaid), tone: "text-emerald-400", icon: "check" },
              { label: "Unpaid", value: String(overview.studentsUnpaid), tone: "text-amber-400", icon: "alert" },
              { label: "Defaulters", value: String(overview.defaulters), tone: "text-rose-400", icon: "alert" },
            ]
    : []

  return {
    tab,
    scope,
    filters: effectiveFilters,
    page,
    departments,
    programs,
    sessions,
    overview,
    departmentPerformance,
    semesterBreakdown,
    lastUpdatedAt,
    isOverviewLoading: dashboardQuery.isLoading && !overview,
    studentsData: studentsResult.data?.data,
    isStudentsLoading: studentsResult.isLoading,
    isStudentsFetching: studentsResult.isFetching,
    trackingCards,
    handleFilterChange,
    handleTabChange,
    handleScopeChange,
    handleReset,
    handlePageChange,
    handleExport,
  }
}
