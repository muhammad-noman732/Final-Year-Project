import { baseApi } from "../baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { OnboardTenantResponse } from "@/types/server/tenant.types"
import type { OnboardTenantFormInput } from "@/lib/validators/superadmin.validators"
export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboardTenant: builder.mutation<ApiResponse<OnboardTenantResponse>, OnboardTenantFormInput>({
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
