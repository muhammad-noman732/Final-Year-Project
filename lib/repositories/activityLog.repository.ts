import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

export class ActivityLogRepository {
  constructor(private readonly db: PrismaClient) {}

  create(data: Prisma.ActivityLogUncheckedCreateInput) {
    return this.db.activityLog.create({ data })
  }

  findByTenant(tenantId: string, limit = 50) {
    return this.db.activityLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: limit,
    })
  }
}
