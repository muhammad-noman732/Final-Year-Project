"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useGetMyFeeProfileQuery } from "@/store/api/student/studentApi"
import type {
  FeeAssignment,
  FeeStatus,
  StudentPayment,
  StudentProfile,
  FeeProfileSummary,
} from "@/types/client/store/student.store.types"

//  Countdown types 

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

//  Flattened payment + label 

export interface FlatPayment extends StudentPayment {
  assignmentLabel: string
  assignmentSemester: number
}

//  Full hook return type 

export interface UseStudentDashboardReturn {
  // Profile data
  profile: StudentProfile | undefined
  assignments: FeeAssignment[]
  summary: FeeProfileSummary | undefined

  // Current unpaid/overdue assignment (null if all paid or no fee assigned)
  current: FeeAssignment | null
  isPaid: boolean         // true when there are assignments AND none are unpaid/overdue
  hasNoFee: boolean       // true when no assignments have been made yet
  isOverdue: boolean      // true when current assignment is OVERDUE

  // Derived stats
  feeStatus: FeeStatus | null
  paidSemestersCount: number
  latestPaidAssignment: FeeAssignment | null

  // Payment history (all payments across all assignments, newest first)
  allPayments: FlatPayment[]

  // Countdown for the current assignment deadline
  countdown: CountdownTime

  // Progress bar showing elapsed time between semester start and due date (0–100)
  progressPct: number

  // UI state
  isLoading: boolean
  isFetching: boolean
  isError: boolean

  // Payment history panel toggle
  historyOpen: boolean
  setHistoryOpen: (open: boolean) => void

  isNavigating: boolean
  setIsNavigating: (navigating: boolean) => void
}

//  Ordinal helper 

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

//  Countdown computation 

function computeCountdown(target: Date | null): CountdownTime {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  }
}

//  Hook 

export function useStudentDashboard(): UseStudentDashboardReturn {
  const { data, isLoading, isFetching, isError } = useGetMyFeeProfileQuery()

  const [historyOpen, setHistoryOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [countdown, setCountdown] = useState<CountdownTime>(
    { days: 0, hours: 0, minutes: 0, seconds: 0 },
  )

  //  Derived values 

  const assignments: FeeAssignment[] = data?.assignments ?? []
  const profile: StudentProfile | undefined = data?.student
  const summary: FeeProfileSummary | undefined = data?.summary

  const current: FeeAssignment | null = summary?.currentAssignment ?? null
  const dueDateStr = current?.dueDate
  const dueDate: Date | null = useMemo(
    () => (dueDateStr ? new Date(dueDateStr) : null),
    [dueDateStr]
  )

  const isPaid =
    !isLoading && assignments.length > 0 && current === null
  const hasNoFee = !isLoading && assignments.length === 0
  const isOverdue = current?.status === "OVERDUE"

  const feeStatus: FeeStatus | null = current?.status ?? null

  const paidSemestersCount = assignments.filter((a) => a.status === "PAID").length

  const latestPaidAssignment: FeeAssignment | null =
    assignments.find((a) => a.status === "PAID") ?? null

  // Flatten all payments across all assignments, newest first, with label
  const allPayments: FlatPayment[] = assignments
    .flatMap((a) =>
      a.payments.map((p) => ({
        ...p,
        assignmentLabel: `${ordinal(a.feeStructure.semester)} Semester`,
        assignmentSemester: a.feeStructure.semester,
      })),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  // Progress bar: elapsed time from session start → due date (approximate)
  const sessionStartYear = profile?.session?.startYear ?? new Date().getFullYear()
  const sessionStart = new Date(`${sessionStartYear}-08-01`)
  const elapsed = Date.now() - sessionStart.getTime()
  const total = (dueDate?.getTime() ?? Date.now()) - sessionStart.getTime()
  const progressPct = Math.min(100, Math.max(0, total > 0 ? (elapsed / total) * 100 : 0))

  // ── Countdown ticker ────────────────────────────────────────────────────────

  const tick = useCallback(() => {
    setCountdown(computeCountdown(dueDate))
  }, [dueDate])

  useEffect(() => {
    tick()
    const interval = setInterval(tick, 1_000)
    return () => clearInterval(interval)
  }, [tick])

  return {
    profile,
    assignments,
    summary,
    current,
    isPaid,
    hasNoFee,
    isOverdue,
    feeStatus,
    paidSemestersCount,
    latestPaidAssignment,
    allPayments,
    countdown,
    progressPct,
    isLoading,
    isFetching,
    isError,
    historyOpen,
    setHistoryOpen,
    isNavigating,
    setIsNavigating,
  }
}
