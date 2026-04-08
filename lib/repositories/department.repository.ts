import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shapes
const DEPT_SELECT = {
  id: true,
  name: true,
  code: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: { programs: true, students: true, hods: true },
  },
} satisfies Prisma.DepartmentSelect

const DEPT_DETAIL_SELECT = {
  id: true,
  name: true,
  code: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: { programs: true, students: true, hods: true },
  },
  programs: {
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      code: true,
      degreeType: true,
      durationYears: true,
      totalSemesters: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { name: "asc" as const },
  },
  hods: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  },
} satisfies Prisma.DepartmentSelect

// Exported row types

export type DepartmentRow = Prisma.DepartmentGetPayload<{ select: typeof DEPT_SELECT }>
export type DepartmentDetailRow = Prisma.DepartmentGetPayload<{ select: typeof DEPT_DETAIL_SELECT }>

export class DepartmentRepository {
  constructor(private readonly db: PrismaClient) { }

  async findById(tenantId: string, id: string): Promise<DepartmentRow | null> {
    return this.db.department.findFirst({
      where: { id, tenantId },
      select: DEPT_SELECT,
    })
  }

  async findByCode(tenantId: string, code: string): Promise<{ id: string } | null> {
    return this.db.department.findUnique({
      where: { tenantId_code: { tenantId, code: code.toUpperCase() } },
      select: { id: true },
    })
  }

  async findMany(params: {
    where: Prisma.DepartmentWhereInput
    orderBy: Prisma.DepartmentOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: DepartmentRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.department.count({ where: params.where }),
      this.db.department.findMany({
        where: params.where,
        select: DEPT_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  async findDetailById(tenantId: string, id: string): Promise<DepartmentDetailRow | null> {
    return this.db.department.findFirst({
      where: { id, tenantId },
      select: DEPT_DETAIL_SELECT,
    })
  }

  async create(data: Prisma.DepartmentUncheckedCreateInput): Promise<DepartmentRow> {
    return this.db.department.create({ data, select: DEPT_SELECT })
  }

  async update(
    id: string,
    tenantId: string,
    data: Prisma.DepartmentUncheckedUpdateInput,
  ): Promise<DepartmentRow> {
    return this.db.department.update({
      where: { id, tenantId },
      data,
      select: DEPT_SELECT,
    })
  }
}
