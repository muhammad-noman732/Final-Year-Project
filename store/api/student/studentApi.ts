import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  StudentFeeProfile,
} from "@/types/server/student.types"

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
  }),
  overrideExisting: false,
})

export const { useGetMyFeeProfileQuery } = studentApi
