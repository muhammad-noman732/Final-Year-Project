import { type Prisma, type PrismaClient } from "@/app/generated/prisma/client"

export class InsightRepository {
  constructor(private readonly db: PrismaClient) {}

  createMany(data: Prisma.InsightCreateManyInput[]) {
    return this.db.insight.createMany({ data })
  }

  findUnread(tenantId: string) {
    return this.db.insight.findMany({
      where: { tenantId, isRead: false },
      orderBy: { createdAt: "desc" },
    })
  }

  markRead(id: string) {
    return this.db.insight.update({
      where: { id },
      data: { isRead: true },
    })
  }

  deleteAllForTenant(tenantId: string) {
    return this.db.insight.deleteMany({ where: { tenantId } })
  }
}
