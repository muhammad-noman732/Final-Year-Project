import { baseApi } from "@/store/api/baseApi"
import type { ApiResponse } from "@/types/server/shared.types"
import type {
  NotificationsListResult,
  UnreadCountResult,
} from "@/types/client/store/notifications.store.types"

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ApiResponse<NotificationsListResult>, { page?: number; limit?: number } | void>({
      query: (args) => ({
        url: "/notifications",
        params: args
          ? {
              ...(args.page !== undefined && { page: String(args.page) }),
              ...(args.limit !== undefined && { limit: String(args.limit) }),
            }
          : {},
      }),
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),

    getUnreadCount: builder.query<ApiResponse<UnreadCountResult>, void>({
      query: () => "/notifications/unread-count",
      providesTags: [{ type: "Notification", id: "UNREAD_COUNT" }],
    }),

    markRead: builder.mutation<ApiResponse<{ ok: boolean }>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD_COUNT" },
      ],
    }),

    markAllRead: builder.mutation<ApiResponse<{ ok: boolean }>, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD_COUNT" },
      ],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkReadMutation,
  useMarkAllReadMutation,
} = notificationsApi
