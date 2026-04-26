import type { PrismaClient, Prisma } from "@/app/generated/prisma/client"

export class ImportBatchRepository {
  constructor(private readonly db: PrismaClient) {}

  create(data: Prisma.ImportBatchUncheckedCreateInput) {
    return this.db.importBatch.create({ data })
  }

  findByTenant(tenantId: string, limit = 20) {
    return this.db.importBatch.findMany({
      where: { tenantId },
      orderBy: { importedAt: "desc" },
      take: limit,
    })
  }

  findById(id: string) {
    return this.db.importBatch.findUnique({ where: { id } })
  }
}
