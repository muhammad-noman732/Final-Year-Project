import { baseApi } from "@/store/api/baseApi"
import type {
  AdminUser,
  CreateAdminUserPayload,
  CreateUserApiResponse,
  DeactivateUserApiResponse,
  GetUserApiResponse,
  GetUsersApiResponse,
  ListUsersQueryParams,
  UpdateAdminUserPayload,
  UpdateUserApiResponse,
} from "@/types/client/user.api.types"

interface UpdateUserArg {
  id: string
  body: UpdateAdminUserPayload
}

// build the query params
const toListQueryParams = (query?: ListUsersQueryParams): Record<string, string> => {
  if (!query) return {}

  const params: Record<string, string> = {}

  if (query.page !== undefined) params.page = String(query.page)
  if (query.limit !== undefined) params.limit = String(query.limit)
  if (query.role !== undefined) params.role = query.role
  if (query.isActive !== undefined) params.isActive = String(query.isActive)

  return params
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
   getUsers: builder.query<GetUsersApiResponse, ListUsersQueryParams | undefined>({
      query: (query) => ({
        url: "/admin/users",
        params: toListQueryParams(query),
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              { type: "User", id: "LIST" },
              ...result.data.data.map((user) => ({ type: "User" as const, id: user.id })),
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query<GetUserApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<CreateUserApiResponse, CreateAdminUserPayload>({
      query: (body) => ({
        url: "/admin/users",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const createdUser = data.data

          if (!createdUser) return

          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
              if (!draft.data?.data) return

              draft.data.data.unshift(createdUser)

              if (draft.data.meta) {
                draft.data.meta.total += 1
                draft.data.meta.totalPages = Math.max(
                  1,
                  Math.ceil(draft.data.meta.total / draft.data.meta.limit)
                )
              }
            })
          )
        } catch {
          // No-op: invalidation below ensures cache consistency.
        }
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation<UpdateUserApiResponse, UpdateUserArg>({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const listPatch = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const users = draft.data?.data
            if (!users) return

            const existing = users.find((user) => user.id === id)
            if (!existing) return

            if (body.name !== undefined) existing.name = body.name
            if (body.phone !== undefined) existing.phone = body.phone
            if (body.isActive !== undefined) existing.isActive = body.isActive
            if (body.hodDepartmentId !== undefined) {
              existing.hodDepartmentId = body.hodDepartmentId ?? null
            }
          })
        )

        try {
          const { data } = await queryFulfilled
          const updatedUser = data.data

          if (!updatedUser) return

          dispatch(
            usersApi.util.updateQueryData("getUser", id, (draft) => {
              draft.data = updatedUser
            })
          )
        } catch {
          listPatch.undo()
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "User", id: "LIST" },
        { type: "User", id: arg.id },
      ],
    }),

    deactivateUser: builder.mutation<DeactivateUserApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const listPatch = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const users = draft.data?.data
            if (!users) return

            const existing = users.find((user) => user.id === id)
            if (!existing) return

            existing.isActive = false
          })
        )

        const detailPatch = dispatch(
          usersApi.util.updateQueryData("getUser", id, (draft) => {
            if (!draft.data) return
            draft.data.isActive = false
          })
        )

        try {
          await queryFulfilled
        } catch {
          listPatch.undo()
          detailPatch.undo()
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeactivateUserMutation,
} = usersApi

export type { AdminUser }
