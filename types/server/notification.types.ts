import type { NotificationType, NotificationChannel } from "@/app/generated/prisma/client"

export type { NotificationType, NotificationChannel }

export interface CreateNotificationInput {
  tenantId: string
  userId: string
  type: NotificationType
  title: string
  body: string
  data?: Record<string, unknown> | null
}
