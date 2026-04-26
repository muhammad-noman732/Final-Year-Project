import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"
import type { CreateNotificationInput } from "@/types/server/notification.types"

const NOTIFICATION_SELECT = {
  id: true,
  tenantId: true,
  userId: true,
  type: true,
  title: true,
  body: true,
  data: true,
  isRead: true,
  readAt: true,
  channel: true,
  createdAt: true,
} satisfies Prisma.NotificationSelect

export type NotificationRow = Prisma.NotificationGetPayload<{
  select: typeof NOTIFICATION_SELECT
}>

export class NotificationRepository {
  constructor(private readonly db: PrismaClient) { }

  async create(input: CreateNotificationInput): Promise<NotificationRow> {
    return this.db.notification.create({
      data: {
        tenantId: input.tenantId,
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body,
        data: (input.data ?? undefined) as Prisma.InputJsonValue | undefined,
        channel: "IN_APP",
        sentAt: new Date(),
      },
      select: NOTIFICATION_SELECT,
    })
  }

  async bulkCreate(inputs: CreateNotificationInput[]): Promise<void> {
    if (inputs.length === 0) return
    const now = new Date()
    await this.db.notification.createMany({
      data: inputs.map((input) => ({
        tenantId: input.tenantId,
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body,
        data: (input.data ?? undefined) as Prisma.InputJsonValue | undefined,
        channel: "IN_APP" as const,
        sentAt: now,
        createdAt: now,
      })),
    })
  }

  async findMany(params: {
    userId: string
    tenantId: string
    skip: number
    take: number
  }): Promise<{ data: NotificationRow[]; total: number }> {
    const [total, data] = await Promise.all([
      this.db.notification.count({
        where: { userId: params.userId, tenantId: params.tenantId },
      }),
      this.db.notification.findMany({
        where: { userId: params.userId, tenantId: params.tenantId },
        select: NOTIFICATION_SELECT,
        orderBy: { createdAt: "desc" },
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  async countUnread(userId: string, tenantId: string): Promise<number> {
    return this.db.notification.count({
      where: { userId, tenantId, isRead: false },
    })
  }

  async markRead(id: string, userId: string, tenantId: string): Promise<void> {
    await this.db.notification.updateMany({
      where: { id, userId, tenantId },
      data: { isRead: true, readAt: new Date() },
    })
  }

  async markAllRead(userId: string, tenantId: string): Promise<void> {
    await this.db.notification.updateMany({
      where: { userId, tenantId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    })
  }
}
