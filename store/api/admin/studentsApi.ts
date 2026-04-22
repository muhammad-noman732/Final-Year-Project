import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  CreateStudentPayload,
  ListStudentsQueryParams,
  UpdateStudentPayload,
  Student,
  PaginatedStudents,
} from "@/types/client/store/student.store.types"

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
    getStudents: builder.query<ApiResponse<PaginatedStudents>, ListStudentsQueryParams | undefined>({
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

    getStudent: builder.query<ApiResponse<Student>, string>({
      query: (id) => ({ url: `/admin/students/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Student", id }],
    }),

    createStudent: builder.mutation<ApiResponse<Student>, CreateStudentPayload>({
      query: (body) => ({
        url: "/admin/students",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),

    updateStudent: builder.mutation<ApiResponse<Student>, UpdateStudentArg>({
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

    deactivateStudent: builder.mutation<ApiResponse<Student>, string>({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "PATCH",
        body: { enrollmentStatus: "SUSPENDED" },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const listPatch = dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const students = draft.data?.data
            if (!students) return
            const existing = students.find((s) => s.id === id)
            if (existing) existing.enrollmentStatus = "SUSPENDED"
          }),
        )
        try {
          await queryFulfilled
        } catch {
          listPatch.undo()
        }
      },
      invalidatesTags: (_r, _e, id) => [
        { type: "Student", id: "LIST" },
        { type: "Student", id },
      ],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeactivateStudentMutation,
} = studentsApi
