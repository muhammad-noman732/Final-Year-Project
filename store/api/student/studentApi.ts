import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type { StudentFeeProfile } from "@/types/server/student.types"
import type {
  PaymentIntentApiResponse,
} from "@/types/server/payment.types"

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyFeeProfile: build.query<StudentFeeProfile, void>({
      query: () => ({ url: "/student/me/fees", method: "GET" }),
      transformResponse: (raw: ApiResponse<StudentFeeProfile>) => {
        if (!raw.data) throw new Error("No fee profile data returned")
        return raw.data
      },
      providesTags: ["StudentFeeProfile"],
    }),


    createPaymentIntent: build.mutation<
      PaymentIntentApiResponse,
      { feeAssignmentId: string }
    >({
      query: (body) => ({
        url: "/student/me/payment-intent",
        method: "POST",
        body,
      }),
      transformResponse: (raw: ApiResponse<PaymentIntentApiResponse>) => {
        if (!raw.data) throw new Error("No payment intent data returned")
        return raw.data
      },
    }),

    invalidateFeeProfile: build.mutation<void, void>({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: ["StudentFeeProfile"],
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetMyFeeProfileQuery,
  useCreatePaymentIntentMutation,
  useInvalidateFeeProfileMutation,
} = studentApi
