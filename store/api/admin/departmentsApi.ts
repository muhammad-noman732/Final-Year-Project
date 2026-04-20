import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  CreateDepartmentPayload,
  UpdateDepartmentPayload,
  ListDepartmentsQueryParams,
  Department,
  PaginatedDepartments,
} from "@/types/client/store/department.store.types"

interface UpdateDepartmentArg {
  id: string
  body: UpdateDepartmentPayload
}

const toQueryParams = (query?: ListDepartmentsQueryParams): Record<string, string> => {
  if (!query) return {}
  const params: Record<string, string> = {}
  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.search) params.search = query.search
  if (query.isActive !== undefined) params.isActive = String(query.isActive)
  if (query.sortBy) params.sortBy = query.sortBy
  if (query.sortDir) params.sortDir = query.sortDir
  return params
}

export const departmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<ApiResponse<PaginatedDepartments>, ListDepartmentsQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/departments",
        params: toQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
            { type: "Department", id: "LIST" },
            ...result.data.data.map((d) => ({ type: "Department" as const, id: d.id })),
          ]
          : [{ type: "Department", id: "LIST" }],
    }),

    getDepartment: builder.query<ApiResponse<Department>, string>({
      query: (id) => ({ url: `/admin/departments/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Department", id }],
    }),

    createDepartment: builder.mutation<ApiResponse<Department>, CreateDepartmentPayload>({
      query: (body) => ({
        url: "/admin/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    updateDepartment: builder.mutation<ApiResponse<Department>, UpdateDepartmentArg>({
      query: ({ id, body }) => ({
        url: `/admin/departments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "Department", id: "LIST" },
        { type: "Department", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentsApi
