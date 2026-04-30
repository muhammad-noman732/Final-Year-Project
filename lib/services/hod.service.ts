import { FeeStatus, PaymentStatus, type Prisma } from "@/app/generated/prisma/client"
import type { HodAssignmentRow, HodLivePaymentRow, HodRepository } from "@/lib/repositories/hod.repository"
import { buildPaginationMeta, getPaginationParams } from "@/lib/utils/paginate"
import { ForbiddenError } from "@/lib/utils/AppError"
import type {
  HodDashboardData,
  HodDefaulterRow,
  HodDepartmentInfo,
  HodFilters,
  HodLivePaymentItem,
  HodOverview,
  HodPaginatedStudents,
  HodSemesterBreakdown,
  HodStudentRow,
} from "@/types/server/hod.types"

type CanonicalStatus = "PAID" | "UNPAID" | "OVERDUE"

interface CanonicalAssignment {
  row: HodAssignmentRow
  status: CanonicalStatus
}

export class HodService {
  constructor(private readonly hodRepo: HodRepository) {}

  async getHodDepartment(userId: string, tenantId: string): Promise<HodDepartmentInfo> {
    const user = await this.hodRepo.findUserWithDepartment(userId, tenantId)
    if (!user?.hodDepartment) throw new ForbiddenError("HOD department not assigned.")
    return user.hodDepartment
  }

  async getDashboard(
    tenantId: string,
    userId: string,
    filters: HodFilters,
  ): Promise<HodDashboardData> {
    const department = await this.getHodDepartment(userId, tenantId)
    const assignmentWhere = this.buildAssignmentWhere(tenantId, department.id, filters)
    const today = this.todayRange()

    const completedWhere: Prisma.PaymentWhereInput = {
      tenantId,
      status: PaymentStatus.COMPLETED,
      student: { is: { departmentId: department.id } },
    }
    const completedTodayWhere: Prisma.PaymentWhereInput = {
      ...completedWhere,
      paidAt: { gte: today.from, lte: today.to },
    }

    const [assignments, allTimeAggregate, todayAggregate, liveRows] = await Promise.all([
      this.hodRepo.findAssignments(assignmentWhere),
      this.hodRepo.aggregatePayments(completedWhere),
      this.hodRepo.aggregatePayments(completedTodayWhere),
      this.hodRepo.findLivePayments(department.id, tenantId),
    ])

    const canonical = this.buildCanonical(assignments)
    const filtered = this.filterByStatus(canonical, filters.feeStatus)

    return {
      department,
      overview: this.buildOverview(filtered, allTimeAggregate, todayAggregate),
      semesterBreakdown: this.buildSemesterBreakdown(filtered),
      livePayments: liveRows.map((r) => this.mapLivePayment(r)),
      defaulters: this.buildDefaulters(canonical),
    }
  }

  async getStudents(
    tenantId: string,
    userId: string,
    filters: HodFilters,
  ): Promise<HodPaginatedStudents> {
    const department = await this.getHodDepartment(userId, tenantId)
    const { page = 1, limit = 20 } = filters
    const { skip } = getPaginationParams({ page, limit })

    const where = this.buildAssignmentWhere(tenantId, department.id, filters, true)
    const assignments = await this.hodRepo.findAssignments(where)
    const canonical = this.filterByStatus(this.buildCanonical(assignments), filters.feeStatus)

    const total = canonical.length
    const paged = canonical.slice(skip, skip + limit)

    return {
      data: paged.map((c) => this.mapStudentRow(c)),
      meta: buildPaginationMeta(total, page, limit),
    }
  }

  private buildAssignmentWhere(
    tenantId: string,
    departmentId: string,
    filters: HodFilters,
    includeSearch = false,
  ): Prisma.FeeAssignmentWhereInput {
    const studentWhere: Prisma.StudentWhereInput = {
      tenantId,
      departmentId,
      ...(filters.semester !== undefined ? { currentSemester: filters.semester } : {}),
      ...(includeSearch && filters.search
        ? {
            OR: [
              { studentId: { contains: filters.search, mode: "insensitive" } },
              { user: { is: { name: { contains: filters.search, mode: "insensitive" } } } },
            ],
          }
        : {}),
    }
    return { tenantId, student: { is: studentWhere } }
  }

  private buildCanonical(rows: HodAssignmentRow[]): CanonicalAssignment[] {
    const map = new Map<string, HodAssignmentRow>()
    for (const row of rows) {
      if (row.feeStructure.semester !== row.student.currentSemester) continue
      const existing = map.get(row.student.id)
      if (!existing) { map.set(row.student.id, row); continue }
      if (this.compareRecency(row, existing) > 0) map.set(row.student.id, row)
    }
    return Array.from(map.values()).map((row) => ({ row, status: this.normalizeStatus(row) }))
  }

  private compareRecency(a: HodAssignmentRow, b: HodAssignmentRow): number {
    if (a.feeStructure.sessionYear !== b.feeStructure.sessionYear) {
      return a.feeStructure.sessionYear - b.feeStructure.sessionYear
    }
    if (a.dueDate.getTime() !== b.dueDate.getTime()) {
      return a.dueDate.getTime() - b.dueDate.getTime()
    }
    return a.createdAt.getTime() - b.createdAt.getTime()
  }

  private normalizeStatus(row: HodAssignmentRow): CanonicalStatus {
    if (row.status === FeeStatus.PAID) return "PAID"
    if (row.status === FeeStatus.OVERDUE || row.dueDate.getTime() < Date.now()) return "OVERDUE"
    return "UNPAID"
  }

  private filterByStatus(rows: CanonicalAssignment[], feeStatus?: string): CanonicalAssignment[] {
    if (!feeStatus || feeStatus === "ALL") return rows
    if (feeStatus === "PAID") return rows.filter((r) => r.status === "PAID")
    if (feeStatus === "OVERDUE") return rows.filter((r) => r.status === "OVERDUE")
    if (feeStatus === "UNPAID") return rows.filter((r) => r.status === "UNPAID")
    return rows
  }

  private buildOverview(
    rows: CanonicalAssignment[],
    allTime: { _sum: { amount: number | null }; _count: { id: number } },
    today: { _sum: { amount: number | null }; _count: { id: number } },
  ): HodOverview {
    const totalStudents = rows.length
    const paidStudents = rows.filter((r) => r.status === "PAID").length
    const unpaidStudents = rows.filter((r) => r.status === "UNPAID").length
    const defaulters = rows.filter((r) => r.status === "OVERDUE").length
    const outstandingAmount = rows.reduce(
      (sum, r) => sum + Math.max(r.row.amountDue - r.row.amountPaid, 0),
      0,
    )
    return {
      totalStudents,
      paidStudents,
      unpaidStudents,
      defaulters,
      paymentRate: totalStudents === 0 ? 0 : Number(((paidStudents / totalStudents) * 100).toFixed(1)),
      totalCollected: allTime._sum.amount ?? 0,
      collectedToday: today._sum.amount ?? 0,
      outstandingAmount,
      paymentsToday: today._count.id,
    }
  }

  private buildSemesterBreakdown(rows: CanonicalAssignment[]): HodSemesterBreakdown[] {
    const map = new Map<number, HodSemesterBreakdown>()
    for (const { row, status } of rows) {
      const sem = row.student.currentSemester
      const cur = map.get(sem) ?? {
        semester: sem,
        paidAmount: 0,
        unpaidAmount: 0,
        paidStudents: 0,
        unpaidStudents: 0,
      }
      if (status === "PAID") {
        cur.paidAmount += row.amountPaid
        cur.paidStudents += 1
      } else {
        cur.unpaidAmount += Math.max(row.amountDue - row.amountPaid, 0)
        cur.unpaidStudents += 1
      }
      map.set(sem, cur)
    }
    return Array.from(map.values()).sort((a, b) => a.semester - b.semester)
  }

  private buildDefaulters(rows: CanonicalAssignment[]): HodDefaulterRow[] {
    const now = Date.now()
    return rows
      .filter((r) => r.status === "OVERDUE" || r.status === "UNPAID")
      .map(({ row, status }) => {
        const daysOverdue =
          row.dueDate.getTime() < now && status !== "PAID"
            ? Math.max(Math.ceil((now - row.dueDate.getTime()) / (1000 * 60 * 60 * 24)), 0)
            : 0
        return {
          studentId: row.student.id,
          rollNumber: row.student.studentId,
          studentName: row.student.user.name,
          email: row.student.user.email,
          programName: row.student.program.name,
          semester: row.student.currentSemester,
          amountDue: row.amountDue,
          amountPaid: row.amountPaid,
          outstandingAmount: Math.max(row.amountDue - row.amountPaid, 0),
          dueDate: row.dueDate.toISOString(),
          daysOverdue,
        }
      })
      .sort((a, b) => b.daysOverdue - a.daysOverdue)
  }

  private mapLivePayment(row: HodLivePaymentRow): HodLivePaymentItem {
    return {
      id: row.id,
      studentName: row.student.user.name,
      rollNumber: row.student.studentId,
      programName: row.student.program.name,
      semester: row.feeAssignment.feeStructure.semester,
      amount: row.amount,
      paidAt: row.paidAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    }
  }

  private mapStudentRow({ row, status }: CanonicalAssignment): HodStudentRow {
    const now = Date.now()
    const daysOverdue =
      row.dueDate.getTime() < now && status !== "PAID"
        ? Math.max(Math.ceil((now - row.dueDate.getTime()) / (1000 * 60 * 60 * 24)), 0)
        : 0
    return {
      assignmentId: row.id,
      studentId: row.student.id,
      rollNumber: row.student.studentId,
      studentName: row.student.user.name,
      email: row.student.user.email,
      programName: row.student.program.name,
      semester: row.student.currentSemester,
      feeStatus: status.toLowerCase(),
      amountDue: row.amountDue,
      amountPaid: row.amountPaid,
      outstandingAmount: Math.max(row.amountDue - row.amountPaid, 0),
      dueDate: row.dueDate.toISOString(),
      paidAt: row.paidAt?.toISOString() ?? null,
      daysOverdue,
    }
  }

  private todayRange() {
    const from = new Date()
    from.setHours(0, 0, 0, 0)
    const to = new Date()
    to.setHours(23, 59, 59, 999)
    return { from, to }
  }
}
