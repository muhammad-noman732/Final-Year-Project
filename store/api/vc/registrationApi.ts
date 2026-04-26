import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { RegistrationDashboardStats } from "@/types/server/registration.types"

export const vcRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegistrationStats: builder.query<ApiResponse<RegistrationDashboardStats>, void>({
      query: () => ({ url: "/vc/registration" }),
      providesTags: [{ type: "Registration", id: "STATS" }],
    }),
  }),
})

export const { useGetRegistrationStatsQuery } = vcRegistrationApi
