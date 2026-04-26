import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { ImportResult } from "@/types/server/registration.types"

export const adminRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    importRegistrationCsv: builder.mutation<ApiResponse<ImportResult>, FormData>({
      query: (formData) => ({
        url: "/admin/registration/import",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Registration", id: "STATS" }],
    }),
  }),
})

export const { useImportRegistrationCsvMutation } = adminRegistrationApi
