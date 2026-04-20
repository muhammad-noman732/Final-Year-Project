import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  CreateProgramPayload,
  ListProgramsQueryParams,
  Program,
  PaginatedPrograms,
} from "@/types/client/store/program.store.types"

const toQueryParams = (query?: ListProgramsQueryParams): Record<string, string> => {
  if (!query) return {}
  const params: Record<string, string> = {}
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.search) params.search = query.search
  if (query.departmentId) params.departmentId = query.departmentId
  if (query.isActive !== undefined) params.isActive = String(query.isActive)
  if (query.degreeType) params.degreeType = query.degreeType
  if (query.sortBy) params.sortBy = query.sortBy
  if (query.sortDir) params.sortDir = query.sortDir
  return params
}

export const programsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<ApiResponse<PaginatedPrograms>, ListProgramsQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/programs",
        params: toQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              { type: "Program", id: "LIST" },
              ...result.data.data.map((p) => ({ type: "Program" as const, id: p.id })),
            ]
          : [{ type: "Program", id: "LIST" }],
    }),

    getProgram: builder.query<ApiResponse<Program>, string>({
      query: (id) => ({ url: `/admin/programs/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Program", id }],
    }),

    createProgram: builder.mutation<ApiResponse<Program>, CreateProgramPayload>({
      query: (body) => ({
        url: "/admin/programs",
        method: "POST",
        body,
      }),
      // Pure invalidation — server cache makes the refetch fast.
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),
  }),
})

export const {
  useGetProgramsQuery,
  useGetProgramQuery,
  useCreateProgramMutation,
} = programsApi
