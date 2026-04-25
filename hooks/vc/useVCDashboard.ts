"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useGetVCDashboardQuery } from "@/store/api/vc/vcApi"
import { useSSE } from "@/hooks/vc/useSSE"
import { buildVCQuery, defaultVCFilters } from "@/components/vc/vcFilters"
import { formatFullCurrency } from "@/config/constants"
import type { VCDashboardData, VCLivePaymentItem } from "@/types/server/vc.types"
import type { VCFilterState, VCSelectOption, SSELiveTransaction } from "@/types/client/ui/vc.ui.types"

export interface UseVCDashboardReturn {
  // Filters
  filters: VCFilterState
  handleFilterChange: (key: keyof VCFilterState, value: string) => void
  handleReset: () => void
  handleTodayToggle: () => void
  // Filter options
  departments: VCSelectOption[]
  programs: VCSelectOption[]
  sessions: VCSelectOption[]
  // Dashboard data
  dashboard: VCDashboardData | undefined
  isLoading: boolean
  lastUpdatedAt: string | null
  // SSE live feed
  liveTransactions: SSELiveTransaction[]
  initialTransactions: SSELiveTransaction[]
  sseConnected: boolean
  newPaymentsCount: number
  newAmountCollected: number
  // Toast
  showToast: boolean
  toastMessage: string
  // Navigation handlers
  handleDepartmentTracking: (departmentId: string) => void
  handleSemesterTracking: (semester: number) => void
  handleOverviewCardClick: (tab: "paid" | "defaulters" | "payments") => void
  // Insights SSE signal
  insightsUpdatedAt: number | null
}

export function useVCDashboard(): UseVCDashboardReturn {
  const router = useRouter()
  const [filters, setFilters] = useState<VCFilterState>(defaultVCFilters)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const query = useMemo(() => buildVCQuery(filters), [filters])

  const { data: departmentsData } = useGetDepartmentsQuery({ page: 1, limit: 100 })
  const departmentsRaw = departmentsData?.data?.data ?? []
  const hasDepartmentsLoaded = Boolean(departmentsData?.data)
  const departmentExists = filters.departmentId
    ? departmentsRaw.some((d) => d.id === filters.departmentId)
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

  const {
    transactions: liveTransactions,
    newPaymentsCount,
    newAmountCollected,
    connected: sseConnected,
    latestEvent,
    clearLatestEvent,
    insightsUpdatedAt,
  } = useSSE()

  // Toast notification + KPI cache invalidation on new payment
  useEffect(() => {
    if (latestEvent?.type !== "PaymentSuccess") return
    const p = latestEvent.payload
    setToastMessage(`${p.studentName} paid ${formatFullCurrency(p.amount)}`)
    setShowToast(true)
    clearLatestEvent()
    void dashboardQuery.refetch()
    const timer = setTimeout(() => setShowToast(false), 4_000)
    return () => clearTimeout(timer)
  }, [latestEvent, clearLatestEvent, dashboardQuery])

  // Reset child filters when a department filter is removed externally
  useEffect(() => {
    if (hasDepartmentsLoaded && filters.departmentId && !departmentExists) {
      setFilters((prev) => ({ ...prev, departmentId: "", programId: "" }))
    }
  }, [hasDepartmentsLoaded, filters.departmentId, departmentExists])

  const departments: VCSelectOption[] = departmentsRaw.map((d) => ({ id: d.id, label: d.name }))
  const programs: VCSelectOption[] = (programsData?.data?.data ?? []).map((p) => ({
    id: p.id,
    label: p.name,
  }))
  const sessions: VCSelectOption[] = (sessionsData?.data?.data ?? []).map((s) => ({
    id: s.id,
    label: s.name,
  }))

  const dashboard = dashboardQuery.data?.data

  const lastUpdatedAt = dashboardQuery.fulfilledTimeStamp
    ? new Date(dashboardQuery.fulfilledTimeStamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null

  // Seed the live feed with recent DB payments so it isn't empty on mount
  const initialTransactions = useMemo<SSELiveTransaction[]>(() => {
    if (!dashboard?.livePayments) return []
    return dashboard.livePayments.map((p: VCLivePaymentItem) => ({
      id: p.id,
      studentName: p.studentName,
      rollNumber: p.studentId,
      department: p.departmentCode,
      program: p.programName,
      semester: `Semester ${p.semester}`,
      amount: p.amount,
      paidAt: p.paidAt ?? p.createdAt,
    }))
  }, [dashboard?.livePayments])

  const handleFilterChange = (key: keyof VCFilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "departmentId" ? { programId: "" } : {}),
    }))
  }

  const handleReset = () => setFilters(defaultVCFilters)

  const handleTodayToggle = () => {
    setFilters((prev) => ({ ...prev, range: prev.range === "today" ? "30d" : "today" }))
  }

  const handleDepartmentTracking = (departmentId: string) => {
    router.push(`/vc/tracking?scope=department&departmentId=${departmentId}&tab=overview`)
  }

  const handleSemesterTracking = (semester: number) => {
    const deptPart = filters.departmentId ? `&departmentId=${filters.departmentId}` : ""
    router.push(`/vc/tracking?scope=semester&semester=${semester}${deptPart}&tab=overview`)
  }

  const handleOverviewCardClick = (tab: "paid" | "defaulters" | "payments") => {
    const targetTab = tab === "defaulters" ? "defaulters" : tab === "paid" ? "paid" : "overview"
    router.push(`/vc/tracking?tab=${targetTab}`)
  }

  return {
    filters,
    handleFilterChange,
    handleReset,
    handleTodayToggle,
    departments,
    programs,
    sessions,
    dashboard,
    isLoading: dashboardQuery.isLoading,
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
  }
}
