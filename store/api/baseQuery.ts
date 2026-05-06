import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query"

const API_BASE_URL = "/api"

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1. Initial request execution
  let result = await baseQuery(args, api, extraOptions)

  // 2. Intercept 401 Unauthorized errors (Token Expired)
  if (result.error && result.error.status === 401) {
    const uri = typeof args === "string" ? args : args.url

    // If the failure was already trying to refresh, do not loop infinitely
    if (uri.includes('/auth/refresh')) {
      return result
    }

    // 3. Attempt to fetch a new Access Token using the HttpOnly Refresh Token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    )

    // 4. If refresh succeeded, seamlessly retry the original request
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions)
    } else {
      // If refresh failed, the user is permanently logged out.
      // You can dispatch a logout action to the authSlice here if needed!
      // api.dispatch(logout()); 
    }
  }

  return result
}
