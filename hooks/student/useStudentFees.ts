"use client"

import { useGetMyFeeProfileQuery } from "@/store/api/student/studentApi"
import type {
  FeeAssignment,
  FeeProfileSummary,
  StudentProfile,
} from "@/types/client/store/student.store.types"

export interface UseStudentFeesReturn {
  // Data
  profile: StudentProfile | undefined
  assignments: FeeAssignment[]
  summary: FeeProfileSummary | undefined
  current: FeeAssignment | null
  // UI state
  isLoading: boolean
  isFetching: boolean
  isError: boolean
}

export function useStudentFees(): UseStudentFeesReturn {
  const { data, isLoading, isFetching, isError } = useGetMyFeeProfileQuery()

  return {
    profile: data?.student,
    assignments: data?.assignments ?? [],
    summary: data?.summary,
    current: data?.summary.currentAssignment ?? null,
    isLoading,
    isFetching,
    isError,
  }
}
