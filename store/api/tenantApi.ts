import { baseApi } from "./baseApi"

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboardTenant: builder.mutation<
      { tenantId: string; slug: string; adminEmail: string }, // Response shape
      { universityName: string; shortName: string; domain?: string; adminName: string; adminEmail: string } // Payload shape
    >({
      query: (body) => ({
        url: "/superadmin/tenants",
        method: "POST",
        body,
      }),
      // Invalidates the 'Tenant' tag so any queries listing tenants will instantly auto-refresh
      invalidatesTags: ["Tenant"], 
    }),
  }),
})

export const { useOnboardTenantMutation } = tenantApi
