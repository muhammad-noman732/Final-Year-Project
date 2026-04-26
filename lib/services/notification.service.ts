import type { NotificationRepository, NotificationRow } from "@/lib/repositories/notification.repository"
import type { CreateNotificationInput, NotificationType } from "@/types/server/notification.types"
import { broadcastNotification } from "@/lib/sse"
import { logger } from "@/lib/logger"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import type { PaginatedResult } from "@/types/server/admin.types"

export class NotificationService {
  constructor(private readonly notificationRepo: NotificationRepository) {}

  async notifyUser(params: {
    tenantId: string
    userId: string
    type: NotificationType
    title: string
    body: string
    data?: Record<string, unknown>
  }): Promise<void> {
    const notification = await this.notificationRepo.create({
      tenantId: params.tenantId,
      userId: params.userId,
      type: params.type,
      title: params.title,
      body: params.body,
      data: params.data ?? null,
    })
    void broadcastNotification(params.userId, notification)
  }

  async fanOut(params: {
    tenantId: string
    userIds: string[]
    type: NotificationType
    title: string
    body: string
    data?: Record<string, unknown>
  }): Promise<void> {
    if (params.userIds.length === 0) return
    const inputs: CreateNotificationInput[] = params.userIds.map((userId) => ({
      tenantId: params.tenantId,
      userId,
      type: params.type,
      title: params.title,
      body: params.body,
      data: params.data ?? null,
    }))
    await this.notificationRepo.bulkCreate(inputs)
    for (const userId of params.userIds) {
      void broadcastNotification(userId, null)
    }
  }

  async getNotifications(
    userId: string,
    tenantId: string,
    query: { page: number; limit: number },
  ): Promise<PaginatedResult<NotificationRow>> {
    const { skip } = getPaginationParams(query)
    const { data, total } = await this.notificationRepo.findMany({
      userId,
      tenantId,
      skip,
      take: query.limit,
    })
    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  async getUnreadCount(userId: string, tenantId: string): Promise<number> {
    return this.notificationRepo.countUnread(userId, tenantId)
  }

  async markRead(id: string, userId: string, tenantId: string): Promise<void> {
    await this.notificationRepo.markRead(id, userId, tenantId)
    logger.info({ event: "notification.mark_read", userId, id }, "Notification marked read")
  }

  async markAllRead(userId: string, tenantId: string): Promise<void> {
    await this.notificationRepo.markAllRead(userId, tenantId)
    logger.info({ event: "notification.mark_all_read", userId }, "All notifications marked read")
  }
}
