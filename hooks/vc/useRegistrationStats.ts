"use client"

import { useGetRegistrationStatsQuery } from "@/store/api/vc/registrationApi"
import type { RegistrationDashboardStats } from "@/types/server/registration.types"

export interface UseRegistrationStatsReturn {
  stats: RegistrationDashboardStats | undefined
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useRegistrationStats(): UseRegistrationStatsReturn {
  const { data, isLoading, isError, refetch } = useGetRegistrationStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return {
    stats: data?.data,
    isLoading,
    isError,
    refetch,
  }
}
