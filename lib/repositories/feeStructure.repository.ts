import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shapes

const FEE_STRUCTURE_SELECT = {
  id: true,
  semester: true,
  sessionYear: true,
  tuitionFee: true,
  labFee: true,
  libraryFee: true,
  sportsFee: true,
  registrationFee: true,
  examinationFee: true,
  otherFee: true,
  totalFee: true,
  dueDate: true,
  lateFee: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  program: {
    select: {
      id: true,
      name: true,
      code: true,
      degreeType: true,
      totalSemesters: true,
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  },
  _count: {
    select: { assignments: true },
  },
} satisfies Prisma.FeeStructureSelect

// Exported row types

export type FeeStructureRow = Prisma.FeeStructureGetPayload<{
  select: typeof FEE_STRUCTURE_SELECT
}>

// Repository class

export class FeeStructureRepository {
  constructor(private readonly db: PrismaClient) { }

  async findById(tenantId: string, id: string): Promise<FeeStructureRow | null> {
    return this.db.feeStructure.findFirst({
      where: { id, tenantId },
      select: FEE_STRUCTURE_SELECT,
    })
  }

  async findByUnique(
    tenantId: string,
    programId: string,
    semester: number,
    sessionYear: number,
  ): Promise<{ id: string } | null> {
    return this.db.feeStructure.findUnique({
      where: {
        tenantId_programId_semester_sessionYear: {
          tenantId,
          programId,
          semester,
          sessionYear,
        },
      },
      select: { id: true },
    })
  }

  async findMany(params: {
    where: Prisma.FeeStructureWhereInput
    orderBy: Prisma.FeeStructureOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: FeeStructureRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.feeStructure.count({ where: params.where }),
      this.db.feeStructure.findMany({
        where: params.where,
        select: FEE_STRUCTURE_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  async create(data: Prisma.FeeStructureUncheckedCreateInput): Promise<FeeStructureRow> {
    return this.db.feeStructure.create({ data, select: FEE_STRUCTURE_SELECT })
  }

  async update(
    id: string,
    tenantId: string,
    data: Prisma.FeeStructureUncheckedUpdateInput,
  ): Promise<FeeStructureRow> {
    return this.db.feeStructure.update({
      where: { id, tenantId },
      data,
      select: FEE_STRUCTURE_SELECT,
    })
  }
}
