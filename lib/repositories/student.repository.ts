import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shape 
const STUDENT_SELECT = {
  id: true,
  studentId: true,
  cnic: true,
  currentSemester: true,
  enrollmentStatus: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isActive: true,
      isFirstLogin: true,
    },
  },
  department: {
    select: { id: true, name: true, code: true },
  },
  program: {
    select: { id: true, name: true, code: true, degreeType: true },
  },
  session: {
    select: { id: true, name: true, startYear: true, endYear: true },
  },
} satisfies Prisma.StudentSelect

export type StudentRow = Prisma.StudentGetPayload<{ select: typeof STUDENT_SELECT }>

export class StudentRepository {
  constructor(private readonly db: PrismaClient) { }

  async findById(tenantId: string, id: string): Promise<StudentRow | null> {
    return this.db.student.findFirst({
      where: { id, tenantId },
      select: STUDENT_SELECT,
    })
  }

  /** Checks @@unique([tenantId, studentId]) — used for conflict detection. */
  async findByStudentId(
    tenantId: string,
    studentId: string,
  ): Promise<{ id: string } | null> {
    return this.db.student.findUnique({
      where: { tenantId_studentId: { tenantId, studentId } },
      select: { id: true },
    })
  }

  /**
   * Looks up the Student record that belongs to the authenticated user.
   * Used by the student portal — guarantees tenant isolation via userId.
   */
  async findByUserId(
    tenantId: string,
    userId: string,
  ): Promise<StudentRow | null> {
    return this.db.student.findFirst({
      where: { tenantId, userId },
      select: STUDENT_SELECT,
    })
  }

  async findMany(params: {
    where: Prisma.StudentWhereInput
    orderBy: Prisma.StudentOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: StudentRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.student.count({ where: params.where }),
      this.db.student.findMany({
        where: params.where,
        select: STUDENT_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  /**
   * Creates User + Student atomically.
   */
  async createWithUser(params: {
    userData: Prisma.UserUncheckedCreateInput
    studentData: Omit<Prisma.StudentUncheckedCreateInput, "userId">
  }): Promise<StudentRow> {
    return this.db.$transaction(async (tx) => {
      const user = await tx.user.create({ data: params.userData })
      const student = await tx.student.create({
        data: { ...params.studentData, userId: user.id },
        select: STUDENT_SELECT,
      })
      return student
    })
  }

  async update(
    tenantId: string,
    id: string,
    data: Prisma.StudentUncheckedUpdateInput,
  ): Promise<StudentRow> {
    return this.db.student.update({
      where: { id, tenantId },
      data,
      select: STUDENT_SELECT,
    })
  }

  async updateStudentUserPhone(
    tenantId: string,
    studentId: string,
    phone: string | null,
  ): Promise<void> {
    await this.db.user.updateMany({
      where: {
        tenantId,
        student: {
          is: { id: studentId },
        },
      },
      data: { phone },
    })
  }

  /**
   * Recalculates and persists the denormalized totalFeeDue on each student.
   * totalFeeDue = SUM(amountDue - amountPaid) across UNPAID / OVERDUE / PARTIAL assignments.
   * Called after fee-structure updates or deletes to eliminate ghost fees.
   */
  async recalcFeeTotals(tenantId: string, studentIds: string[]): Promise<void> {
    if (studentIds.length === 0) return
    for (const studentId of studentIds) {
      const { _sum } = await this.db.feeAssignment.aggregate({
        where: { tenantId, studentId, status: { notIn: ["PAID", "WAIVED"] } },
        _sum: { amountDue: true, amountPaid: true },
      })
      const totalFeeDue = Math.max(
        (_sum.amountDue ?? 0) - (_sum.amountPaid ?? 0),
        0,
      )
      await this.db.student.update({
        where: { id: studentId },
        data: { totalFeeDue },
      })
    }
  }
}
