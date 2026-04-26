import type { PaginationMeta } from "@/types/server/admin.types"

export interface NotificationItem {
  id: string
  type: string
  title: string
  body: string
  data: Record<string, unknown> | null
  isRead: boolean
  readAt: string | null
  createdAt: string
}

export interface NotificationsListResult {
  data: NotificationItem[]
  meta: PaginationMeta
}

export interface UnreadCountResult {
  count: number
}
