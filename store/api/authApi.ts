import { baseApi } from "./baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/changepassword",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
})

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi
