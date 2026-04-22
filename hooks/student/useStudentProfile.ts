"use client"

import { useGetMyFeeProfileQuery } from "@/store/api/student/studentApi"
import type {
  FeeAssignment,
  FeeProfileSummary,
  StudentProfile,
} from "@/types/client/store/student.store.types"

export function useStudentProfile() {
  const { data, isLoading, isFetching, isError } = useGetMyFeeProfileQuery()

  return {
    profile: data?.student,
    assignments: data?.assignments ?? [],
    summary: data?.summary,
    current: data?.summary?.currentAssignment ?? null,
    isLoading,
    isFetching,
    isError,
  }
}
