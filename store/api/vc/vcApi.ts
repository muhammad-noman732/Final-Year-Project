import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  VCAnalyticsData,
  VCAnalyticsFilters,
  VCDashboardData,
  VCPaginatedStudents,
} from "@/types/client/store/vc.store.types"

const toQueryParams = (
  query?: VCAnalyticsFilters,
): Record<string, string> => {
  if (!query) return {}

  const params: Record<string, string> = {}

  if (query.departmentId) params.departmentId = query.departmentId
  if (query.programId) params.programId = query.programId
  if (query.sessionId) params.sessionId = query.sessionId
  if (query.semester !== undefined) params.semester = String(query.semester)
  if (query.feeStatus) params.feeStatus = query.feeStatus
  if (query.range) params.range = query.range
  if (query.from) params.from = query.from
  if (query.to) params.to = query.to
  if (query.search) params.search = query.search
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)

  return params
}

export const vcApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVCDashboard: builder.query<ApiResponse<VCDashboardData>, VCAnalyticsFilters | undefined>({
      query: (query) => ({
        url: "/vc/dashboard",
        params: toQueryParams(query),
      }),
      providesTags: [{ type: "VCDashboard", id: "CURRENT" }],
    }),

    getVCAnalytics: builder.query<ApiResponse<VCAnalyticsData>, VCAnalyticsFilters | undefined>({
      query: (query) => ({
        url: "/vc/analytics",
        params: toQueryParams(query),
      }),
      providesTags: [{ type: "VCDashboard", id: "ANALYTICS" }],
    }),

    getVCStudents: builder.query<ApiResponse<VCPaginatedStudents>, VCAnalyticsFilters | undefined>({
      query: (query) => ({
        url: "/vc/students",
        params: toQueryParams(query),
      }),
      providesTags: [{ type: "VCStudents", id: "LIST" }],
    }),
  }),
})

export const {
  useGetVCDashboardQuery,
  useGetVCAnalyticsQuery,
  useGetVCStudentsQuery,
} = vcApi
