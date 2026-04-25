import type { SSELiveTransaction } from "@/types/client/ui/vc.ui.types"

export interface AdminTransactionRow {
  id: string
  studentName: string
  rollNumber: string
  departmentName: string
  departmentCode: string
  programName: string
  semester: number
  amountPaid: number
  amountDue: number
  feeStatus: string
  paidAt: string | null
  daysOverdue: number
}

export interface AdminDashboardMetrics {
  totalStudents: number
  totalCollected: number
  outstanding: number
  defaulters: number
  collectedToday: number
  paymentRate: number
  studentsPaid: number
  studentsUnpaid: number
}

export interface AdminTransactionMeta {
  total: number
  page: number
  totalPages: number
}

export type AdminStatusTab = "paid" | "unpaid" | "defaulters"

export interface UseAdminDashboardReturn {
  metrics: AdminDashboardMetrics
  isLoading: boolean
  liveTransactions: SSELiveTransaction[]
  initialTransactions: SSELiveTransaction[]
  sseConnected: boolean
  newPaymentsCount: number
  newAmountCollected: number
  showToast: boolean
  toastMessage: string
  transactions: AdminTransactionRow[]
  transactionsMeta: AdminTransactionMeta
  isTransactionsLoading: boolean
  statusTab: AdminStatusTab
  setStatusTab: (tab: AdminStatusTab) => void
  transactionsPage: number
  setTransactionsPage: (page: number) => void
  handleExportCSV: () => void
  lastUpdatedAt: string | null
}

export interface AdminTransactionTableProps {
  transactions: AdminTransactionRow[]
  meta: AdminTransactionMeta
  isLoading: boolean
  statusTab: AdminStatusTab
  onTabChange: (tab: AdminStatusTab) => void
  page: number
  onPageChange: (page: number) => void
  onExportCSV: () => void
  unpaidCount: number
  defaultersCount: number
}
