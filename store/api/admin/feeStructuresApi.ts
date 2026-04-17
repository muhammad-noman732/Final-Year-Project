import { baseApi } from "@/store/api/baseApi"
import type {
  CreateFeeStructurePayload,
  GetFeeStructuresApiResponse,
  GetFeeStructureApiResponse,
  ListFeeStructuresQueryParams,
  UpdateFeeStructurePayload,
  CreateFeeStructureApiResponse,
  UpdateFeeStructureApiResponse,
  FeeStructure,
} from "@/types/client/admin.api.types"

interface UpdateFeeStructureArg {
  id: string
  body: UpdateFeeStructurePayload
}

const toListQueryParams = (query?: ListFeeStructuresQueryParams): Record<string, string> => {
  if (!query) return {}

  const params: Record<string, string> = {}

  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.programId !== undefined) params.programId = query.programId
  if (query.semester !== undefined) params.semester = String(query.semester)
  if (query.sessionYear !== undefined) params.sessionYear = String(query.sessionYear)
  if (query.isActive !== undefined) params.isActive = String(query.isActive)

  return params
}

export const feeStructuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeeStructures: builder.query<GetFeeStructuresApiResponse, ListFeeStructuresQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/fees/structures",
        params: toListQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
            { type: "FeeStructure", id: "LIST" },
            ...result.data.data.map((fs) => ({ type: "FeeStructure" as const, id: fs.id })),
          ]
          : [{ type: "FeeStructure", id: "LIST" }],
    }),

    getFeeStructure: builder.query<GetFeeStructureApiResponse, string>({
      query: (id) => ({
        url: `/admin/fees/structures/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "FeeStructure", id }],
    }),

    createFeeStructure: builder.mutation<CreateFeeStructureApiResponse, CreateFeeStructurePayload>({
      query: (body) => ({
        url: "/admin/fees/structures",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "FeeStructure", id: "LIST" }],
    }),

    updateFeeStructure: builder.mutation<UpdateFeeStructureApiResponse, UpdateFeeStructureArg>({
      query: ({ id, body }) => ({
        url: `/admin/fees/structures/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "FeeStructure", id: "LIST" },
        { type: "FeeStructure", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetFeeStructuresQuery,
  useGetFeeStructureQuery,
  useCreateFeeStructureMutation,
  useUpdateFeeStructureMutation,
} = feeStructuresApi
