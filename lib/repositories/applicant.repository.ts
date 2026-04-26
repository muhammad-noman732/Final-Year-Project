import type { PrismaClient, Prisma } from "@/app/generated/prisma/client"

export class ApplicantRepository {
  constructor(private readonly db: PrismaClient) {}

  createMany(data: Prisma.ApplicantCreateManyInput[]) {
    return this.db.applicant.createMany({ data })
  }

  countByTenant(tenantId: string) {
    return this.db.applicant.count({ where: { tenantId } })
  }

  countBySession(tenantId: string, session: string) {
    return this.db.applicant.count({ where: { tenantId, session } })
  }

  countTodayImports(tenantId: string) {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    return this.db.applicant.count({
      where: { tenantId, importedAt: { gte: start, lte: end } },
    })
  }

  groupByProgram(tenantId: string) {
    return this.db.applicant.groupBy({
      by: ["program", "department"],
      where: { tenantId },
      _count: { id: true },
    })
  }

  getDailyActivityLast30Days(tenantId: string) {
    const since = new Date()
    since.setDate(since.getDate() - 29)
    since.setHours(0, 0, 0, 0)
    return this.db.applicant.findMany({
      where: { tenantId, importedAt: { gte: since } },
      select: { importedAt: true },
      orderBy: { importedAt: "asc" },
    })
  }

  getAverageMeritByProgram(tenantId: string, session: string) {
    return this.db.applicant.groupBy({
      by: ["program"],
      where: { tenantId, session },
      _avg: { meritScore: true },
      _count: { id: true },
    })
  }

  countByProgramAndSession(tenantId: string, session: string) {
    return this.db.applicant.groupBy({
      by: ["program"],
      where: { tenantId, session },
      _count: { id: true },
    })
  }

  getLastImportTimestamp(tenantId: string) {
    return this.db.applicant.findFirst({
      where: { tenantId },
      orderBy: { importedAt: "desc" },
      select: { importedAt: true },
    })
  }
}
