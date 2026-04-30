import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { HodDashboardData, HodFilters, HodPaginatedStudents } from "@/types/server/hod.types"

const toQueryParams = (query?: HodFilters): Record<string, string> => {
  if (!query) return {}
  const params: Record<string, string> = {}
  if (query.semester !== undefined) params.semester = String(query.semester)
  if (query.feeStatus && query.feeStatus !== "ALL") params.feeStatus = query.feeStatus
  if (query.search) params.search = query.search
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  return params
}

export const hodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHodDashboard: builder.query<ApiResponse<HodDashboardData>, HodFilters | undefined>({
      query: (query) => ({
        url: "/hod/dashboard",
        params: toQueryParams(query),
      }),
      providesTags: [{ type: "HODDashboard", id: "CURRENT" }],
    }),

    getHodStudents: builder.query<ApiResponse<HodPaginatedStudents>, HodFilters | undefined>({
      query: (query) => ({
        url: "/hod/students",
        params: toQueryParams(query),
      }),
      providesTags: [{ type: "HODStudents", id: "LIST" }],
    }),
  }),
})

export const { useGetHodDashboardQuery, useGetHodStudentsQuery } = hodApi
