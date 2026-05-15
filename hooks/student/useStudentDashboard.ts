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

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface FlatPayment extends StudentPayment {
  assignmentLabel: string
  assignmentSemester: number
}

export interface UseStudentDashboardReturn {

  profile: StudentProfile | undefined
  assignments: FeeAssignment[]
  summary: FeeProfileSummary | undefined

  current: FeeAssignment | null
  isPaid: boolean         
  hasNoFee: boolean       
  isOverdue: boolean      

  feeStatus: FeeStatus | null
  paidSemestersCount: number
  latestPaidAssignment: FeeAssignment | null

  allPayments: FlatPayment[]

  countdown: CountdownTime

  progressPct: number

  isLoading: boolean
  isFetching: boolean
  isError: boolean

  historyOpen: boolean
  setHistoryOpen: (open: boolean) => void

  isNavigating: boolean
  setIsNavigating: (navigating: boolean) => void
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

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

export function useStudentDashboard(): UseStudentDashboardReturn {
  const { data, isLoading, isFetching, isError } = useGetMyFeeProfileQuery()

  const [historyOpen, setHistoryOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [countdown, setCountdown] = useState<CountdownTime>(
    { days: 0, hours: 0, minutes: 0, seconds: 0 },
  )

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

  const sessionStartYear = profile?.session?.startYear ?? new Date().getFullYear()
  const sessionStart = new Date(`${sessionStartYear}-08-01`)
  const elapsed = Date.now() - sessionStart.getTime()
  const total = (dueDate?.getTime() ?? Date.now()) - sessionStart.getTime()
  const progressPct = Math.min(100, Math.max(0, total > 0 ? (elapsed / total) * 100 : 0))

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
