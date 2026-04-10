import { baseApi } from "@/store/api/baseApi"
import type {
  CreateSessionPayload,
  GetSessionApiResponse,
  GetSessionsApiResponse,
  ListSessionsQueryParams,
} from "@/types/client/admin.api.types"

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
    getSessions: builder.query<GetSessionsApiResponse, ListSessionsQueryParams | undefined>({
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

    getSession: builder.query<GetSessionApiResponse, string>({
      query: (id) => ({ url: `/admin/sessions/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Session", id }],
    }),

    createSession: builder.mutation<GetSessionApiResponse, CreateSessionPayload>({
      query: (body) => ({
        url: "/admin/sessions",
        method: "POST",
        body,
      }),
      // Pure invalidation — server cache makes the refetch fast.
      invalidatesTags: [{ type: "Session", id: "LIST" }],
    }),

    setCurrentSession: builder.mutation<GetSessionApiResponse, string>({
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
