import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shapes

const PROGRAM_SELECT = {
  id: true,
  name: true,
  code: true,
  degreeType: true,
  durationYears: true,
  totalSemesters: true,
  isActive: true,
  departmentId: true,
  createdAt: true,
  updatedAt: true,
  department: {
    select: { id: true, name: true, code: true },
  },
  _count: {
    select: { students: true, feeStructures: true },
  },
} satisfies Prisma.ProgramSelect

// Exported row type

export type ProgramRow = Prisma.ProgramGetPayload<{ select: typeof PROGRAM_SELECT }>


export class ProgramRepository {
  constructor(private readonly db: PrismaClient) { }

  async findById(tenantId: string, id: string): Promise<ProgramRow | null> {
    return this.db.program.findFirst({
      where: { id, tenantId },
      select: PROGRAM_SELECT,
    })
  }

  async findByCode(tenantId: string, code: string): Promise<{ id: string } | null> {
    return this.db.program.findUnique({
      where: { tenantId_code: { tenantId, code: code.toUpperCase() } },
      select: { id: true },
    })
  }

  async findMany(params: {
    where: Prisma.ProgramWhereInput
    orderBy: Prisma.ProgramOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: ProgramRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.program.count({ where: params.where }),
      this.db.program.findMany({
        where: params.where,
        select: PROGRAM_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  async findAllActive(tenantId: string): Promise<ProgramRow[]> {
    return this.db.program.findMany({
      where: { tenantId, isActive: true },
      select: PROGRAM_SELECT,
      orderBy: [{ department: { name: "asc" } }, { name: "asc" }],
    })
  }

  async create(data: Prisma.ProgramUncheckedCreateInput): Promise<ProgramRow> {
    return this.db.program.create({ data, select: PROGRAM_SELECT })
  }

  async update(
    id: string,
    tenantId: string,
    data: Prisma.ProgramUncheckedUpdateInput,
  ): Promise<ProgramRow> {
    return this.db.program.update({
      where: { id, tenantId },
      data,
      select: PROGRAM_SELECT,
    })
  }
}
