import { type Prisma, type PrismaClient } from "@/app/generated/prisma/client"

export class InsightRepository {
  constructor(private readonly db: PrismaClient) {}

  createMany(data: Prisma.InsightCreateManyInput[]) {
    return this.db.insight.createMany({ data })
  }

  findUnread(tenantId: string, module?: string) {
    return this.db.insight.findMany({
      where: {
        tenantId,
        isRead: false,
        ...(module ? { module } : {}),
      },
      orderBy: { createdAt: "desc" },
    })
  }

  markRead(id: string) {
    return this.db.insight.update({
      where: { id },
      data: { isRead: true },
    })
  }

  deleteByModule(tenantId: string, module: string) {
    return this.db.insight.deleteMany({ where: { tenantId, module } })
  }

  /** @deprecated — use deleteByModule to avoid cross-module deletion */
  deleteAllForTenant(tenantId: string) {
    return this.db.insight.deleteMany({ where: { tenantId } })
  }
}
