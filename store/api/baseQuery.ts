import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { Mutex } from "async-mutex"
import { logout } from "@/store/slices/authSlice"

const API_BASE_URL = "/api"

const refreshMutex = new Mutex()

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url
  if (url.includes("/auth/refresh")) {
    return rawBaseQuery(args, api, extraOptions)
  }

  await refreshMutex.waitForUnlock()

  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!refreshMutex.isLocked()) {
      const release = await refreshMutex.acquire()

      try {
        const refreshResult = await rawBaseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          result = await rawBaseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
          if (typeof window !== "undefined") {
            window.location.replace("/login")
          }
        }
      } finally {
        release()
      }
    } else {
      await refreshMutex.waitForUnlock()
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}
