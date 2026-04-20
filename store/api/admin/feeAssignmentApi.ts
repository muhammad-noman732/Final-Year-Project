import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { AssignFeePayload, AssignFeeResult } from "@/types/client/store/fee.store.types"

//  RTK Query Slice 

export const feeAssignmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    assignFeeStructure: build.mutation<AssignFeeResult, AssignFeePayload>({
      query: ({ feeStructureId, studentIds }) => ({
        url: `/admin/fees/structures/${feeStructureId}/assign`,
        method: "POST",
        body: { studentIds },
      }),
      transformResponse: (raw: ApiResponse<AssignFeeResult>) => {
        if (!raw.data) throw new Error("No assignment result returned")
        return raw.data
      },
      invalidatesTags: ["FeeStructure"],
    }),
  }),
  overrideExisting: false,
})

export const { useAssignFeeStructureMutation } = feeAssignmentApi
