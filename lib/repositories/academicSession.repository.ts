import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shape
const SESSION_SELECT = {
  id: true,
  tenantId: true,
  name: true,
  startYear: true,
  endYear: true,
  isCurrent: true,
  createdAt: true,
  _count: {
    select: { students: true },
  },
} satisfies Prisma.AcademicSessionSelect

// Exported row type

export type AcademicSessionRow = Prisma.AcademicSessionGetPayload<{ select: typeof SESSION_SELECT }>


export class AcademicSessionRepository {
  constructor(private readonly db: PrismaClient) { }

  async findById(tenantId: string, id: string): Promise<AcademicSessionRow | null> {
    return this.db.academicSession.findFirst({
      where: { id, tenantId },
      select: SESSION_SELECT,
    })
  }

  async findByName(tenantId: string, name: string): Promise<{ id: string } | null> {
    return this.db.academicSession.findUnique({
      where: { tenantId_name: { tenantId, name } },
      select: { id: true },
    })
  }

  async findMany(params: {
    where: Prisma.AcademicSessionWhereInput
    orderBy: Prisma.AcademicSessionOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: AcademicSessionRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.academicSession.count({ where: params.where }),
      this.db.academicSession.findMany({
        where: params.where,
        select: SESSION_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  async create(data: Prisma.AcademicSessionUncheckedCreateInput): Promise<AcademicSessionRow> {
    return this.db.academicSession.create({ data, select: SESSION_SELECT })
  }

  /**
   * Atomically set ONE session as current (all others → false).
   */
  async makeCurrent(tenantId: string, id: string): Promise<AcademicSessionRow> {
    await this.db.$transaction([
      this.db.academicSession.updateMany({
        where: { tenantId },
        data: { isCurrent: false },
      }),
      this.db.academicSession.update({
        where: { id },
        data: { isCurrent: true },
      }),
    ])
    return this.findById(tenantId, id) as Promise<AcademicSessionRow>
  }
}
