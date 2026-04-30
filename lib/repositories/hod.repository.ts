import { PaymentStatus, type Prisma, type PrismaClient } from "@/app/generated/prisma/client"

const HOD_LIVE_PAYMENT_SELECT = {
  id: true,
  amount: true,
  paidAt: true,
  createdAt: true,
  student: {
    select: {
      studentId: true,
      user: { select: { name: true } },
      program: { select: { name: true } },
    },
  },
  feeAssignment: {
    select: {
      feeStructure: { select: { semester: true } },
    },
  },
} satisfies Prisma.PaymentSelect

export type HODLivePaymentRow = Prisma.PaymentGetPayload<{ select: typeof HOD_LIVE_PAYMENT_SELECT }>

const HOD_ASSIGNMENT_SELECT = {
  id: true,
  amountDue: true,
  amountPaid: true,
  status: true,
  dueDate: true,
  paidAt: true,
  createdAt: true,
  student: {
    select: {
      id: true,
      studentId: true,
      currentSemester: true,
      user: { select: { name: true, email: true } },
      program: { select: { name: true } },
    },
  },
  feeStructure: {
    select: { semester: true, sessionYear: true },
  },
} satisfies Prisma.FeeAssignmentSelect

export type HODAssignmentRow = Prisma.FeeAssignmentGetPayload<{ select: typeof HOD_ASSIGNMENT_SELECT }>

export class HODRepository {
  constructor(private readonly db: PrismaClient) {}

  findUserWithDepartment(userId: string, tenantId: string) {
    return this.db.user.findFirst({
      where: { id: userId, tenantId },
      select: {
        hodDepartment: {
          select: { id: true, name: true, code: true },
        },
      },
    })
  }

  findAssignments(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: HOD_ASSIGNMENT_SELECT,
      orderBy: [
        { studentId: "asc" },
        { feeStructure: { sessionYear: "desc" } },
        { dueDate: "desc" },
        { createdAt: "desc" },
      ],
    })
  }

  aggregatePayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true },
    })
  }

  findLivePayments(departmentId: string, tenantId: string) {
    return this.db.payment.findMany({
      where: {
        tenantId,
        status: PaymentStatus.COMPLETED,
        student: { is: { departmentId } },
      },
      select: HOD_LIVE_PAYMENT_SELECT,
      orderBy: [{ paidAt: "desc" }, { createdAt: "desc" }],
      take: 12,
    })
  }
}
