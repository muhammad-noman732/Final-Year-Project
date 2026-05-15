import { baseApi } from "./baseApi"

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboardTenant: builder.mutation<
      { tenantId: string; slug: string; adminEmail: string }, 
      { universityName: string; shortName: string; domain?: string; adminName: string; adminEmail: string } 
    >({
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
