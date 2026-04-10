import { baseApi } from "@/store/api/baseApi"
import type {
  CreateStudentPayload,
  GetStudentApiResponse,
  GetStudentsApiResponse,
  ListStudentsQueryParams,
  UpdateStudentPayload,
} from "@/types/client/admin.api.types"

interface UpdateStudentArg {
  id: string
  body: UpdateStudentPayload
}

const toQueryParams = (query?: ListStudentsQueryParams): Record<string, string> => {
  if (!query) return {}
  const params: Record<string, string> = {}
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.departmentId) params.departmentId = query.departmentId
  if (query.programId) params.programId = query.programId
  if (query.sessionId) params.sessionId = query.sessionId
  if (query.semester !== undefined) params.semester = String(query.semester)
  if (query.enrollmentStatus) params.enrollmentStatus = query.enrollmentStatus
  if (query.search) params.search = query.search
  if (query.sortBy) params.sortBy = query.sortBy
  if (query.sortDir) params.sortDir = query.sortDir
  return params
}

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<GetStudentsApiResponse, ListStudentsQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/students",
        params: toQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              { type: "Student", id: "LIST" },
              ...result.data.data.map((s) => ({ type: "Student" as const, id: s.id })),
            ]
          : [{ type: "Student", id: "LIST" }],
    }),

    getStudent: builder.query<GetStudentApiResponse, string>({
      query: (id) => ({ url: `/admin/students/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Student", id }],
    }),

    createStudent: builder.mutation<GetStudentApiResponse, CreateStudentPayload>({
      query: (body) => ({
        url: "/admin/students",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),

    updateStudent: builder.mutation<GetStudentApiResponse, UpdateStudentArg>({
      query: ({ id, body }) => ({
        url: `/admin/students/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "Student", id: "LIST" },
        { type: "Student", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} = studentsApi
