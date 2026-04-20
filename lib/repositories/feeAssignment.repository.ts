import type { Prisma, PrismaClient } from "@/app/generated/prisma/client"

// Select shape 
const FEE_ASSIGNMENT_SELECT = {
  id: true,
  amountDue: true,
  amountPaid: true,
  lateFeeApplied: true,
  discountApplied: true,
  status: true,
  dueDate: true,
  challanNumber: true,
  challanUrl: true,
  paidAt: true,
  createdAt: true,
  updatedAt: true,
  feeStructure: {
    select: {
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
      lateFee: true,
      dueDate: true,
      program: {
        select: {
          id: true,
          name: true,
          code: true,
          degreeType: true,
        },
      },
    },
  },
  payments: {
    select: {
      id: true,
      amount: true,
      method: true,
      status: true,
      receiptNumber: true,
      receiptUrl: true,
      paidAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" as const },
  },
} satisfies Prisma.FeeAssignmentSelect

export type FeeAssignmentRow = Prisma.FeeAssignmentGetPayload<{
  select: typeof FEE_ASSIGNMENT_SELECT
}>

// Repository 

export class FeeAssignmentRepository {
  constructor(private readonly db: PrismaClient) { }

  /** All fee assignments for one student, ordered newest first */
  async findByStudent(
    tenantId: string,
    studentId: string,
  ): Promise<FeeAssignmentRow[]> {
    return this.db.feeAssignment.findMany({
      where: { tenantId, studentId },
      select: FEE_ASSIGNMENT_SELECT,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    })
  }

  /** Check if a student already has an assignment for this fee structure */
  async findExisting(
    tenantId: string,
    studentId: string,
    feeStructureId: string,
  ): Promise<{ id: string } | null> {
    return this.db.feeAssignment.findUnique({
      where: { studentId_feeStructureId: { studentId, feeStructureId } },
      select: { id: true },
    })
  }

  /**
   * Bulk-create FeeAssignment records atomically.
   * Uses createMany for efficiency (one DB round-trip for N students).
   * Returns count of assignments actually created (duplicates are skipped).
   */
  async bulkCreate(
    records: Prisma.FeeAssignmentCreateManyInput[],
  ): Promise<number> {
    const result = await this.db.feeAssignment.createMany({
      data: records,
      skipDuplicates: true, // honours @@unique([studentId, feeStructureId])
    })
    return result.count
  }

  /** Count how many assignments already exist for a fee structure */
  async countByFeeStructure(
    tenantId: string,
    feeStructureId: string,
  ): Promise<number> {
    return this.db.feeAssignment.count({
      where: { tenantId, feeStructureId },
    })
  }
}
