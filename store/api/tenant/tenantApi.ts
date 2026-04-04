import { baseApi } from "../baseApi"
import type { OnboardTenantPayload, OnboardTenantResponse } from "@/types/frontend/tenant.api.types"

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboardTenant: builder.mutation<OnboardTenantResponse, OnboardTenantPayload>({
      query: (body) => ({
        url: "/superadmin/tenants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tenant"], 
    }),
  }),
})

export const { useOnboardTenantMutation } = tenantApi
