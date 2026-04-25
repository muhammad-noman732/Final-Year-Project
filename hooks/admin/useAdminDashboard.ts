"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useGetVCDashboardQuery, useGetVCStudentsQuery } from "@/store/api/vc/vcApi"
import { useGetStudentsQuery } from "@/store/api/admin/studentsApi"
import { useSSE } from "@/hooks/vc/useSSE"
import { formatFullCurrency } from "@/config/constants"
import type { VCLivePaymentItem } from "@/types/server/vc.types"
import type { SSELiveTransaction } from "@/types/client/ui/vc.ui.types"
import type {
  AdminTransactionRow,
  AdminTransactionMeta,
  AdminStatusTab,
  UseAdminDashboardReturn,
  AdminDashboardMetrics,
} from "@/types/client/ui/admin.ui.types"

const PAGE_SIZE = 10

function mapToLiveTransaction(p: VCLivePaymentItem): SSELiveTransaction {
  return {
    id: p.id,
    studentName: p.studentName,
    rollNumber: p.studentId,
    department: p.departmentCode,
    program: p.programName,
    semester: `Semester ${p.semester}`,
    amount: p.amount,
    paidAt: p.paidAt ?? p.createdAt,
  }
}

export function useAdminDashboard(): UseAdminDashboardReturn {
  const [statusTab, setStatusTabState] = useState<AdminStatusTab>("paid")
  const [transactionsPage, setTransactionsPageState] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const {
    transactions: liveTransactions,
    newPaymentsCount,
    newAmountCollected,
    connected: sseConnected,
    latestEvent,
    clearLatestEvent,
  } = useSSE()

  const {
    data: vcData,
    isLoading,
    fulfilledTimeStamp,
    refetch: refetchDashboard,
  } = useGetVCDashboardQuery({ feeStatus: "ALL", range: "30d" }, { refetchOnMountOrArgChange: true })

  const { data: studentsData } = useGetStudentsQuery({ page: 1, limit: 1 })

  const feeStatusParam =
    statusTab === "defaulters" ? "OVERDUE" : statusTab === "paid" ? "PAID" : "UNPAID"

  const { data: txData, isLoading: isTransactionsLoading } = useGetVCStudentsQuery({
    feeStatus: feeStatusParam,
    page: transactionsPage,
    limit: PAGE_SIZE,
    range: "30d",
  })

  useEffect(() => {
    if (!latestEvent) return
    const { studentName, amount } = latestEvent.payload
    setToastMessage(`${studentName} paid ${formatFullCurrency(amount)}`)
    setShowToast(true)
    void refetchDashboard()
    const timer = setTimeout(() => {
      setShowToast(false)
      clearLatestEvent()
    }, 4_000)
    return () => clearTimeout(timer)
  }, [latestEvent, clearLatestEvent, refetchDashboard])

  const setStatusTab = useCallback((tab: AdminStatusTab) => {
    setStatusTabState(tab)
    setTransactionsPageState(1)
  }, [])

  const setTransactionsPage = useCallback((page: number) => {
    setTransactionsPageState(page)
  }, [])

  const overview = vcData?.data?.overview
  const metrics: AdminDashboardMetrics = {
    totalStudents: studentsData?.data?.meta?.total ?? 0,
    totalCollected: overview?.totalCollected ?? 0,
    outstanding: overview?.outstandingAmount ?? 0,
    defaulters: overview?.defaulters ?? 0,
    collectedToday: overview?.collectedToday ?? 0,
    paymentRate: overview?.paymentRate ?? 0,
    studentsPaid: overview?.studentsPaid ?? 0,
    studentsUnpaid: overview?.studentsUnpaid ?? 0,
  }

  const initialTransactions = useMemo<SSELiveTransaction[]>(() => {
    if (!vcData?.data?.livePayments) return []
    return vcData.data.livePayments.map(mapToLiveTransaction)
  }, [vcData])

  const rawRows = txData?.data?.data ?? []
  const transactions: AdminTransactionRow[] = rawRows.map((r) => ({
    id: r.assignmentId,
    studentName: r.studentName,
    rollNumber: r.rollNumber,
    departmentName: r.departmentName,
    departmentCode: r.departmentCode,
    programName: r.programName,
    semester: r.semester,
    amountPaid: r.amountPaid,
    amountDue: r.amountDue,
    feeStatus: r.feeStatus,
    paidAt: r.paidAt,
    daysOverdue: r.daysOverdue,
  }))

  const txMeta = txData?.data?.meta
  const transactionsMeta: AdminTransactionMeta = {
    total: txMeta?.total ?? 0,
    page: txMeta?.page ?? 1,
    totalPages: txMeta?.totalPages ?? 1,
  }

  const handleExportCSV = useCallback(() => {
    if (!transactions.length) return
    const headers = [
      "Student",
      "Roll No",
      "Department",
      "Program",
      "Semester",
      "Amount Due",
      "Amount Paid",
      "Status",
      "Paid At",
    ]
    const rows = transactions.map((t) => [
      t.studentName,
      t.rollNumber,
      t.departmentName,
      t.programName,
      String(t.semester),
      String(t.amountDue),
      String(t.amountPaid),
      t.feeStatus,
      t.paidAt ? new Date(t.paidAt).toLocaleString() : "-",
    ])
    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `transactions-${statusTab}-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [transactions, statusTab])

  const lastUpdatedAt = fulfilledTimeStamp
    ? new Date(fulfilledTimeStamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null

  return {
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
  }
}
