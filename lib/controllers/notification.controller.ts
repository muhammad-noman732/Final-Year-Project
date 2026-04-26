import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext } from "@/lib/auth"
import type { NotificationService } from "@/lib/services/notification.service"
import { z } from "zod/v4"

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  async getNotifications(req: NextRequest) {
    const { userId, tenantId } = await getTenantContext()
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listQuerySchema.parse(searchParams)
    const result = await this.notificationService.getNotifications(userId, tenantId, query)
    return successResponse(result)
  }

  async getUnreadCount() {
    const { userId, tenantId } = await getTenantContext()
    const count = await this.notificationService.getUnreadCount(userId, tenantId)
    return successResponse({ count })
  }

  async markRead(id: string) {
    const { userId, tenantId } = await getTenantContext()
    await this.notificationService.markRead(id, userId, tenantId)
    return successResponse({ ok: true })
  }

  async markAllRead() {
    const { userId, tenantId } = await getTenantContext()
    await this.notificationService.markAllRead(userId, tenantId)
    return successResponse({ ok: true })
  }
}
