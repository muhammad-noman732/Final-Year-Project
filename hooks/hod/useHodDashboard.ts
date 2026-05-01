"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useGetHodDashboardQuery, useGetHodStudentsQuery } from "@/store/api/hod/hodApi"
import { useHodSSE } from "@/hooks/hod/useHodSSE"
import { formatFullCurrency } from "@/config/constants"
import type { HodDashboardData, HodFilters, HodLivePaymentItem, HodPaginatedStudents } from "@/types/server/hod.types"
import type { HodFilterState, HodSSELiveTransaction, UseHodDashboardReturn } from "@/types/client/ui/hod.ui.types"

const defaultFilters: HodFilterState = {
  semester: "",
  feeStatus: "ALL",
  search: "",
}

function buildQuery(filters: HodFilterState): HodFilters {
  return {
    ...(filters.semester ? { semester: Number(filters.semester) } : {}),
    ...(filters.feeStatus !== "ALL" ? { feeStatus: filters.feeStatus } : {}),
    ...(filters.search ? { search: filters.search } : {}),
  }
}

export function useHodDashboard(
  initialData: HodDashboardData | null,
  options: { fetchStudents?: boolean; fetchDashboard?: boolean } = { fetchStudents: true, fetchDashboard: true },
  initialStudentsData?: HodPaginatedStudents | null
): UseHodDashboardReturn {
  const [filters, setFilters] = useState<HodFilterState>(defaultFilters)
  const [studentsPage, setStudentsPage] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const isDefaultFilters = filters.semester === "" && filters.feeStatus === "ALL" && filters.search === ""
  const skipDashboard = !options.fetchDashboard || (isDefaultFilters && initialData !== null)
  const skipStudents = !options.fetchStudents || (isDefaultFilters && studentsPage === 1 && initialStudentsData != null)

  const dashboardQueryArgs = useMemo(() => buildQuery(filters), [filters])
  const dashboardQuery = useGetHodDashboardQuery(dashboardQueryArgs, {
    skip: skipDashboard,
  })

  const studentsQueryArgs = useMemo(() => ({
    ...buildQuery(filters),
    page: studentsPage,
    limit: 20
  }), [filters, studentsPage])

  const studentsQuery = useGetHodStudentsQuery(studentsQueryArgs, {
    skip: skipStudents,
  })

  const { transactions, newPaymentsCount, newAmountCollected, connected, latestEvent, clearLatestEvent } =
    useHodSSE()

  const { refetch: refetchDashboard } = dashboardQuery

  useEffect(() => {
    if (latestEvent?.type !== "PaymentSuccess") return
    const p = latestEvent.payload
    setToastMessage(`${p.studentName} paid ${formatFullCurrency(p.amount)}`)
    setShowToast(true)
    clearLatestEvent()
    void refetchDashboard()
    const timer = setTimeout(() => setShowToast(false), 4_000)
    return () => clearTimeout(timer)
  }, [latestEvent, clearLatestEvent, refetchDashboard])

  const dashboard = useMemo(() => dashboardQuery.data?.data ?? initialData, [dashboardQuery.data, initialData])
  const studentsData = useMemo(() => studentsQuery.data?.data ?? initialStudentsData, [studentsQuery.data, initialStudentsData])

  const lastUpdatedAt = useMemo(() => {
    return dashboardQuery.fulfilledTimeStamp
      ? new Date(dashboardQuery.fulfilledTimeStamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      : null
  }, [dashboardQuery.fulfilledTimeStamp])

  const initialTransactions = useMemo<HodSSELiveTransaction[]>(() => {
    if (!dashboard?.livePayments) return []
    return dashboard.livePayments.map((p: HodLivePaymentItem) => ({
      id: p.id,
      studentName: p.studentName,
      rollNumber: p.rollNumber,
      program: p.programName,
      semester: `Semester ${p.semester}`,
      amount: p.amount,
      paidAt: p.paidAt ?? p.createdAt,
    }))
  }, [dashboard?.livePayments])

  const handleFilterChange = useCallback((key: keyof HodFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setStudentsPage(1)
  }, [])

  const handleReset = useCallback(() => {
    setFilters(defaultFilters)
    setStudentsPage(1)
  }, [])

  const fallbackOverview = useMemo(() => ({
    totalStudents: 0,
    paidStudents: 0,
    unpaidStudents: 0,
    defaulters: 0,
    paymentRate: 0,
    totalCollected: 0,
    collectedToday: 0,
    outstandingAmount: 0,
    paymentsToday: 0
  }), [])

  const overview = useMemo(() => dashboard?.overview ?? fallbackOverview, [dashboard?.overview, fallbackOverview])

  return {
    department: dashboard?.department ?? { id: "", name: "", code: "" },
    overview,
    semesterBreakdown: dashboard?.semesterBreakdown ?? [],
    defaulters: dashboard?.defaulters ?? [],
    liveTransactions: transactions,
    initialTransactions,
    sseConnected: connected,
    newPaymentsCount,
    newAmountCollected,
    isLoading: dashboardQuery.isLoading,
    lastUpdatedAt,
    showToast,
    toastMessage,
    filters,
    handleFilterChange,
    handleReset,
    students: studentsData?.data ?? [],
    studentsMeta: studentsData?.meta,
    isStudentsLoading: studentsQuery.isLoading,
    isStudentsFetching: studentsQuery.isFetching,
    studentsPage,
    handlePageChange: setStudentsPage,
  }
}
