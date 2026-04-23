import { type Prisma, type PrismaClient } from "@/app/generated/prisma/client"

const LIVE_PAYMENT_SELECT = {
  id: true,
  amount: true,
  method: true,
  status: true,
  paidAt: true,
  createdAt: true,
  student: {
    select: {
      studentId: true,
      user: { select: { name: true } },
      department: { select: { code: true } },
      program: { select: { name: true } },
    },
  },
  feeAssignment: {
    select: {
      feeStructure: {
        select: { semester: true },
      },
    },
  },
} satisfies Prisma.PaymentSelect

export type LivePaymentRow = Prisma.PaymentGetPayload<{ select: typeof LIVE_PAYMENT_SELECT }>

const STUDENT_LEDGER_SELECT = {
  id: true,
  amountDue: true,
  amountPaid: true,
  status: true,
  dueDate: true,
  paidAt: true,
  student: {
    select: {
      id: true,
      studentId: true,
      enrollmentStatus: true,
      currentSemester: true,
      user: { select: { name: true, email: true } },
      department: { select: { name: true, code: true } },
      program: { select: { name: true } },
      session: { select: { name: true } },
    },
  },
  feeStructure: {
    select: {
      semester: true,
    },
  },
} satisfies Prisma.FeeAssignmentSelect

export type StudentLedgerAssignmentRow = Prisma.FeeAssignmentGetPayload<{
  select: typeof STUDENT_LEDGER_SELECT
}>

const CURRENT_STATUS_ASSIGNMENT_SELECT = {
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
      enrollmentStatus: true,
      user: { select: { name: true, email: true } },
      department: { select: { name: true, code: true } },
      program: { select: { name: true } },
      session: { select: { name: true } },
    },
  },
  feeStructure: {
    select: {
      semester: true,
      sessionYear: true,
    },
  },
} satisfies Prisma.FeeAssignmentSelect

export type CurrentStatusAssignmentRow = Prisma.FeeAssignmentGetPayload<{
  select: typeof CURRENT_STATUS_ASSIGNMENT_SELECT
}>

export class VCRepository {
  constructor(private readonly db: PrismaClient) {}

  countStudents(where: Prisma.StudentWhereInput) {
    return this.db.student.count({ where })
  }

  findDistinctAssignmentStudentIds(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: { studentId: true },
      distinct: ["studentId"],
    })
  }

  aggregatePayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true },
    })
  }

  sumPayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.aggregate({
      where,
      _sum: { amount: true },
    })
  }

  countPayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.count({ where })
  }

  findLatestPayment(where: Prisma.PaymentWhereInput) {
    return this.db.payment.findFirst({
      where,
      orderBy: { paidAt: "desc" },
      select: { paidAt: true },
    })
  }

  findOutstandingAssignments(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: { amountDue: true, amountPaid: true },
    })
  }

  findDepartments(where: Prisma.DepartmentWhereInput) {
    return this.db.department.findMany({
      where,
      select: { id: true, name: true, code: true },
      orderBy: { name: "asc" },
    })
  }

  findStudentsForDepartmentStats(where: Prisma.StudentWhereInput) {
    return this.db.student.findMany({
      where,
      select: { id: true, departmentId: true },
    })
  }

  findAssignmentsForDepartmentStats(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: {
        amountDue: true,
        amountPaid: true,
        status: true,
        student: {
          select: {
            id: true,
            departmentId: true,
          },
        },
      },
    })
  }

  findPaymentsForDepartmentStats(where: Prisma.PaymentWhereInput) {
    return this.db.payment.findMany({
      where,
      select: {
        amount: true,
        student: { select: { departmentId: true } },
      },
    })
  }

  findSemesterAssignments(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: {
        amountDue: true,
        amountPaid: true,
        status: true,
        studentId: true,
        feeStructure: { select: { semester: true } },
      },
      orderBy: {
        feeStructure: {
          semester: "asc",
        },
      },
    })
  }

  findCollectionPayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.findMany({
      where,
      select: { amount: true, paidAt: true },
      orderBy: { paidAt: "asc" },
    })
  }

  groupPaymentsByMethod(where: Prisma.PaymentWhereInput) {
    return this.db.payment.groupBy({
      by: ["method"],
      where,
      _sum: { amount: true },
      _count: { id: true },
    })
  }

  findLivePayments(where: Prisma.PaymentWhereInput) {
    return this.db.payment.findMany({
      where,
      select: LIVE_PAYMENT_SELECT,
      orderBy: [{ paidAt: "desc" }, { createdAt: "desc" }],
      take: 12,
    })
  }

  countStudentLedgerRows(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.count({ where })
  }

  findStudentLedgerRows(where: Prisma.FeeAssignmentWhereInput, skip: number, take: number) {
    return this.db.feeAssignment.findMany({
      where,
      select: STUDENT_LEDGER_SELECT,
      orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
      skip,
      take,
    })
  }

  findCurrentStatusAssignments(where: Prisma.FeeAssignmentWhereInput) {
    return this.db.feeAssignment.findMany({
      where,
      select: CURRENT_STATUS_ASSIGNMENT_SELECT,
      orderBy: [
        { studentId: "asc" },
        { feeStructure: { sessionYear: "desc" } },
        { dueDate: "desc" },
        { createdAt: "desc" },
      ],
    })
  }
}
