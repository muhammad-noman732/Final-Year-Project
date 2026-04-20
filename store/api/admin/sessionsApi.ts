import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  CreateSessionPayload,
  ListSessionsQueryParams,
  AcademicSession,
  PaginatedSessions,
} from "@/types/client/store/session.store.types"

const toQueryParams = (query?: ListSessionsQueryParams): Record<string, string> => {
  if (!query) return {}
  const params: Record<string, string> = {}
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.isCurrent !== undefined) params.isCurrent = String(query.isCurrent)
  if (query.sortBy) params.sortBy = query.sortBy
  if (query.sortDir) params.sortDir = query.sortDir
  return params
}

export const sessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<ApiResponse<PaginatedSessions>, ListSessionsQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/sessions",
        params: toQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              { type: "Session", id: "LIST" },
              ...result.data.data.map((s) => ({ type: "Session" as const, id: s.id })),
            ]
          : [{ type: "Session", id: "LIST" }],
    }),

    getSession: builder.query<ApiResponse<AcademicSession>, string>({
      query: (id) => ({ url: `/admin/sessions/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Session", id }],
    }),

    createSession: builder.mutation<ApiResponse<AcademicSession>, CreateSessionPayload>({
      query: (body) => ({
        url: "/admin/sessions",
        method: "POST",
        body,
      }),
      // Pure invalidation — server cache makes the refetch fast.
      invalidatesTags: [{ type: "Session", id: "LIST" }],
    }),

    setCurrentSession: builder.mutation<ApiResponse<AcademicSession>, string>({
      query: (id) => ({
        url: `/admin/sessions/${id}/current`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Session", id: "LIST" }],
    }),
  }),
})

export const {
  useGetSessionsQuery,
  useGetSessionQuery,
  useCreateSessionMutation,
  useSetCurrentSessionMutation,
} = sessionsApi
