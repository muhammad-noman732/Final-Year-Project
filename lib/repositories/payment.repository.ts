import {
  type PrismaClient,
  type Prisma,
  type Payment,
  type WebhookEvent,
  FeeStatus,
  PaymentStatus,
  PaymentMethod,
} from "@/app/generated/prisma/client"


const PAYMENT_ASSIGNMENT_INCLUDE = {
  student: {
    include: {
      user: { select: { email: true, name: true } },
      program: { select: { name: true } },
      session: { select: { name: true } },
    },
  },
  feeStructure: {
    select: { semester: true },
  },
} satisfies Prisma.FeeAssignmentInclude

export type FeeAssignmentWithRelations = Prisma.FeeAssignmentGetPayload<{
  include: typeof PAYMENT_ASSIGNMENT_INCLUDE
}>


export class PaymentRepository {
  constructor(private readonly db: PrismaClient) { }

  //  Payment Intent creation queries 

  async getStudentByUserId(
    tenantId: string,
    userId: string,
  ): Promise<{ id: string; studentId: string } | null> {
    return this.db.student.findUnique({
      where: { tenantId, userId },
      select: { id: true, studentId: true },
    })
  }


  async findFeeAssignmentForPayment(
    feeAssignmentId: string,
    studentId: string,
    tenantId: string,
  ): Promise<FeeAssignmentWithRelations | null> {
    return this.db.feeAssignment.findUnique({
      where: {
        id: feeAssignmentId,
        studentId,
        tenantId,
        status: { in: [FeeStatus.UNPAID, FeeStatus.OVERDUE, FeeStatus.PARTIAL] },
      },
      include: PAYMENT_ASSIGNMENT_INCLUDE,
    })
  }


  async findExistingPaymentForAssignment(
    feeAssignmentId: string,
  ): Promise<Payment | null> {
    return this.db.payment.findFirst({
      where: {
        feeAssignmentId,
        status: { in: [PaymentStatus.PENDING, PaymentStatus.PROCESSING] },
        stripePaymentIntentId: { not: null },
      },
      orderBy: { createdAt: "desc" },
    })
  }


  async createPaymentRecord(data: {
    tenantId: string
    studentId: string
    feeAssignmentId: string
    stripePaymentIntentId: string
    amount: number
    receiptNumber: string
    ipAddress?: string
    userAgent?: string
  }): Promise<Payment> {
    return this.db.payment.create({
      data: {
        tenantId: data.tenantId,
        studentId: data.studentId,
        feeAssignmentId: data.feeAssignmentId,
        stripePaymentIntentId: data.stripePaymentIntentId,
        amount: data.amount,
        method: PaymentMethod.STRIPE_CARD,
        status: PaymentStatus.PENDING,
        receiptNumber: data.receiptNumber,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    })
  }

  //  Webhook update queries 

  async findPaymentByStripeIntentId(
    stripePaymentIntentId: string,
  ): Promise<Payment | null> {
    return this.db.payment.findUnique({
      where: { stripePaymentIntentId },
    })
  }


  async fulfilPayment(data: {
    paymentId: string
    feeAssignmentId: string
    studentId: string
    amount: number
    stripeResponse: object
    paidAt: Date
  }): Promise<void> {
    await this.db.$transaction([
      // 1. Update the Payment record → COMPLETED
      this.db.payment.update({
        where: { id: data.paymentId },
        data: {
          status: PaymentStatus.COMPLETED,
          stripeResponse: data.stripeResponse,
          paidAt: data.paidAt,
        },
      }),

      // 2. Update FeeAssignment → PAID
      this.db.feeAssignment.update({
        where: { id: data.feeAssignmentId },
        data: {
          status: FeeStatus.PAID,
          amountPaid: { increment: data.amount },
          paidAt: data.paidAt,
        },
      }),

      this.db.student.update({
        where: { id: data.studentId },
        data: {
          feeStatus: FeeStatus.PAID,
          totalFeePaid: { increment: data.amount },
        },
      }),
    ])
  }


  async failPayment(paymentId: string): Promise<void> {
    const payment = await this.db.payment.findUnique({
      where: { id: paymentId },
      select: { feeAssignmentId: true },
    })
    if (!payment) return

    await this.db.$transaction([
      this.db.payment.update({
        where: { id: paymentId },
        data: { status: PaymentStatus.FAILED },
      }),


      this.db.feeAssignment.update({
        where: { id: payment.feeAssignmentId },
        data: { status: FeeStatus.UNPAID },
      }),
    ])
  }


  async markPaymentProcessing(paymentId: string): Promise<void> {
    await this.db.payment.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.PROCESSING },
    })
  }



  //  Receipt number generation 

  async generateReceiptNumber(tenantId: string): Promise<string> {
    const year = new Date().getFullYear()
    const count = await this.db.payment.count({
      where: {
        tenantId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
      },
    })

    const tenant = await this.db.tenant.findUnique({
      where: { id: tenantId },
      select: { shortName: true },
    })

    const prefix = tenant?.shortName?.toUpperCase() ?? "UNI"
    const sequence = String(count + 1).padStart(5, "0")
    return `${prefix}-${year}-${sequence}`
  }
}