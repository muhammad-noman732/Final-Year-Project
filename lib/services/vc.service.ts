import { FeeStatus, PaymentMethod, PaymentStatus, type Prisma } from "@/app/generated/prisma/client"
import type {
  CurrentStatusAssignmentRow,
  LivePaymentRow,
  VCRepository,
} from "@/lib/repositories/vc.repository"
import { buildPaginationMeta, getPaginationParams } from "@/lib/utils/paginate"
import type {
  VCAnalyticsData,
  VCAnalyticsFilters,
  VCDepartmentPerformance,
  VCDashboardData,
  VCDashboardOverview,
  VCPaginatedStudents,
  VCPaymentMethodBreakdown,
  VCStudentLedgerRow,
  VCSemesterBreakdown,
  VCTrendPoint,
} from "@/types/server/vc.types"

interface DateRange {
  from: Date
  to: Date
}

type CanonicalStudentFeeStatus = "PAID" | "UNPAID" | "OVERDUE"

interface CanonicalStudentAssignment {
  assignment: CurrentStatusAssignmentRow
  status: CanonicalStudentFeeStatus
}

export class VCService {
  constructor(private readonly vcRepo: VCRepository) {}

  async getDashboard(
    tenantId: string,
    filters: VCAnalyticsFilters,
  ): Promise<VCDashboardData> {
    const range = this.resolveDateRange(filters)
    const paymentScopeWhere = this.buildPaymentScopeWhere(tenantId, filters)
    const paymentRangeWhere = this.buildPaymentWhere(tenantId, filters, range)
    const todayRange = this.todayRange()
    const paymentTodayWhere = this.buildPaymentWhere(tenantId, filters, todayRange)
    const failedPaymentWhere: Prisma.PaymentWhereInput = {
      ...paymentScopeWhere,
      status: PaymentStatus.FAILED,
      createdAt: { gte: range.from, lte: range.to },
    }
    const recentCompletedWhere: Prisma.PaymentWhereInput = {
      ...paymentRangeWhere,
      status: PaymentStatus.COMPLETED,
    }
    const allTimeCompletedWhere: Prisma.PaymentWhereInput = {
      ...paymentScopeWhere,
      status: PaymentStatus.COMPLETED,
    }
    const completedInRangeWhere: Prisma.PaymentWhereInput = {
      ...paymentRangeWhere,
      status: PaymentStatus.COMPLETED,
    }
    const completedTodayWhere: Prisma.PaymentWhereInput = {
      ...paymentTodayWhere,
      status: PaymentStatus.COMPLETED,
    }

    const [
      currentStatusAssignments,
      allTimePaymentsAggregate,
      paymentsAggregate,
      paymentsTodayAggregate,
      failedPaymentsInRange,
      recentPayment,
      collectionPayments,
      paymentMethodsRows,
      livePaymentsRows,
    ] = await Promise.all([
      this.vcRepo.findCurrentStatusAssignments(this.buildCurrentStatusAssignmentWhere(tenantId, filters)),
      this.vcRepo.sumPayments(allTimeCompletedWhere),
      this.vcRepo.aggregatePayments(completedInRangeWhere),
      this.vcRepo.aggregatePayments(completedTodayWhere),
      this.vcRepo.countPayments(failedPaymentWhere),
      this.vcRepo.findLatestPayment(recentCompletedWhere),
      this.vcRepo.findCollectionPayments(completedInRangeWhere),
      this.vcRepo.groupPaymentsByMethod(completedInRangeWhere),
      this.vcRepo.findLivePayments(paymentScopeWhere),
    ])

    const canonicalAssignments = this.buildCanonicalAssignments(currentStatusAssignments)
    const scopedCanonicalAssignments = this.filterCanonicalByFeeStatus(canonicalAssignments, filters.feeStatus)
    const overview = this.buildOverview({
      canonicalAssignments: scopedCanonicalAssignments,
      allTimePaymentsAggregate,
      paymentsAggregate,
      paymentsTodayAggregate,
      failedPaymentsInRange,
      recentPayment,
    })
    const departmentPerformance = this.buildDepartmentPerformance(scopedCanonicalAssignments)
    const semesterBreakdown = this.buildSemesterBreakdown(scopedCanonicalAssignments)

    const collectionTrend = this.buildCollectionTrend(collectionPayments)
    const paymentMethods = this.mapPaymentMethods(paymentMethodsRows)
    const livePayments = livePaymentsRows.map((row) => this.mapLivePayment(row))

    return {
      overview,
      departmentPerformance,
      semesterBreakdown,
      collectionTrend,
      paymentMethods,
      livePayments,
    }
  }

  async getAnalytics(
    tenantId: string,
    filters: VCAnalyticsFilters,
  ): Promise<VCAnalyticsData> {
    const dashboard = await this.getDashboard(tenantId, filters)

    return {
      overview: dashboard.overview,
      collectionTrend: dashboard.collectionTrend,
      departmentPerformance: dashboard.departmentPerformance,
      semesterBreakdown: dashboard.semesterBreakdown,
      paymentMethods: dashboard.paymentMethods,
    }
  }

  async getStudents(
    tenantId: string,
    filters: VCAnalyticsFilters,
  ): Promise<VCPaginatedStudents> {
    const { page = 1, limit = 10 } = filters
    const { skip } = getPaginationParams({ page, limit })
    const rows = await this.vcRepo.findCurrentStatusAssignments(
      this.buildCurrentStatusAssignmentWhere(tenantId, filters, true),
    )
    const canonicalRows = this.filterCanonicalByFeeStatus(
      this.buildCanonicalAssignments(rows),
      filters.feeStatus,
    )
    const total = canonicalRows.length
    const pagedRows = canonicalRows.slice(skip, skip + limit)

    return {
      data: pagedRows.map((row) => this.mapCanonicalStudentLedgerRow(row)),
      meta: buildPaginationMeta(total, page, limit),
    }
  }

  private buildStudentWhere(tenantId: string, filters: VCAnalyticsFilters): Prisma.StudentWhereInput {
    const where: Prisma.StudentWhereInput = { tenantId }
    if (filters.departmentId) where.departmentId = filters.departmentId
    if (filters.programId) where.programId = filters.programId
    if (filters.sessionId) where.sessionId = filters.sessionId
    if (filters.semester !== undefined) where.currentSemester = filters.semester
    return where
  }

  private buildPaymentScopeWhere(tenantId: string, filters: VCAnalyticsFilters): Prisma.PaymentWhereInput {
    const where: Prisma.PaymentWhereInput = {
      tenantId,
      student: { is: this.buildStudentWhere(tenantId, filters) },
    }
    if (filters.semester !== undefined) {
      where.feeAssignment = {
        is: {
          feeStructure: { is: { semester: filters.semester } },
        },
      }
    }
    return where
  }

  private buildPaymentWhere(tenantId: string, filters: VCAnalyticsFilters, range: DateRange): Prisma.PaymentWhereInput {
    return {
      ...this.buildPaymentScopeWhere(tenantId, filters),
      paidAt: { gte: range.from, lte: range.to },
    }
  }

  private buildOverview(input: {
    canonicalAssignments: CanonicalStudentAssignment[]
    allTimePaymentsAggregate: { _sum: { amount: number | null } }
    paymentsAggregate: { _sum: { amount: number | null }; _count: { id: number } }
    paymentsTodayAggregate: { _sum: { amount: number | null }; _count: { id: number } }
    failedPaymentsInRange: number
    recentPayment: { paidAt: Date | null } | null
  }): VCDashboardOverview {
    const outstandingAmount = input.canonicalAssignments.reduce(
      (sum, row) => sum + Math.max(row.assignment.amountDue - row.assignment.amountPaid, 0),
      0,
    )
    const totalStudents = input.canonicalAssignments.length
    const studentsPaid = input.canonicalAssignments.filter((row) => row.status === "PAID").length
    const defaulters = input.canonicalAssignments.filter((row) => row.status === "OVERDUE").length
    const studentsUnpaid = input.canonicalAssignments.filter((row) => row.status === "UNPAID").length
    const paymentRate = totalStudents === 0 ? 0 : Number(((studentsPaid / totalStudents) * 100).toFixed(1))

    return {
      totalStudents,
      studentsPaid,
      studentsUnpaid,
      defaulters,
      paymentRate,
      totalCollected: input.allTimePaymentsAggregate._sum.amount ?? 0,
      collectedInRange: input.paymentsAggregate._sum.amount ?? 0,
      collectedToday: input.paymentsTodayAggregate._sum.amount ?? 0,
      outstandingAmount,
      paymentsInRange: input.paymentsAggregate._count.id,
      paymentsToday: input.paymentsTodayAggregate._count.id,
      failedPaymentsInRange: input.failedPaymentsInRange,
      recentPaidAt: input.recentPayment?.paidAt?.toISOString() ?? null,
    }
  }

  private buildDepartmentPerformance(
    rows: CanonicalStudentAssignment[],
  ): VCDepartmentPerformance[] {
    const map = new Map<string, VCDepartmentPerformance>()

    for (const row of rows) {
      const departmentId = row.assignment.student.department.code
      const current = map.get(departmentId) ?? {
        departmentId,
        departmentName: row.assignment.student.department.name,
        departmentCode: row.assignment.student.department.code,
        totalStudents: 0,
        paidStudents: 0,
        defaulters: 0,
        collectibleAmount: 0,
        collectedAmount: 0,
        outstandingAmount: 0,
        todayPayments: 0,
        todayAmount: 0,
        paymentRate: 0,
      }
      current.totalStudents += 1
      if (row.status === "PAID") current.paidStudents += 1
      if (row.status === "OVERDUE") current.defaulters += 1
      current.collectibleAmount += row.assignment.amountDue
      current.collectedAmount += row.assignment.amountPaid
      current.outstandingAmount += Math.max(row.assignment.amountDue - row.assignment.amountPaid, 0)
      if (row.assignment.paidAt && this.isDateToday(row.assignment.paidAt)) {
        current.todayPayments += 1
        current.todayAmount += row.assignment.amountPaid
      }
      map.set(departmentId, current)
    }

    return Array.from(map.values())
      .map((entry) => ({
        ...entry,
        paymentRate: entry.totalStudents === 0
          ? 0
          : Number(((entry.paidStudents / entry.totalStudents) * 100).toFixed(1)),
      }))
      .sort((a, b) => a.departmentName.localeCompare(b.departmentName))
  }

  private buildSemesterBreakdown(rows: CanonicalStudentAssignment[]): VCSemesterBreakdown[] {
    const map = new Map<number, VCSemesterBreakdown>()
    for (const row of rows) {
      const semester = row.assignment.student.currentSemester
      const current = map.get(semester) ?? {
        semester,
        paidAmount: 0,
        unpaidAmount: 0,
        paidStudents: 0,
        unpaidStudents: 0,
      }
      if (row.status === "PAID") {
        current.paidAmount += row.assignment.amountPaid
        current.paidStudents += 1
      } else {
        current.unpaidAmount += Math.max(row.assignment.amountDue - row.assignment.amountPaid, 0)
        current.unpaidStudents += 1
      }
      map.set(semester, current)
    }
    return Array.from(map.values()).sort((a, b) => a.semester - b.semester)
  }

  private buildCollectionTrend(
    payments: Array<{ amount: number; paidAt: Date | null }>,
  ): VCTrendPoint[] {
    const buckets = new Map<string, VCTrendPoint>()
    for (const payment of payments) {
      if (!payment.paidAt) continue
      const label = payment.paidAt.toISOString().slice(0, 10)
      const current = buckets.get(label) ?? { label, amount: 0, payments: 0 }
      current.amount += payment.amount
      current.payments += 1
      buckets.set(label, current)
    }
    return Array.from(buckets.values())
  }

  private mapPaymentMethods(
    rows: Array<{ method: PaymentMethod; _count: { id: number }; _sum: { amount: number | null } }>,
  ): VCPaymentMethodBreakdown[] {
    return rows.map((row) => ({
      method: row.method === PaymentMethod.STRIPE_CARD ? "Stripe Card" : row.method,
      count: row._count.id,
      amount: row._sum.amount ?? 0,
    }))
  }

  private mapLivePayment(payment: LivePaymentRow) {
    return {
      id: payment.id,
      studentName: payment.student.user.name,
      studentId: payment.student.studentId,
      departmentCode: payment.student.department.code,
      programName: payment.student.program.name,
      semester: payment.feeAssignment.feeStructure.semester,
      amount: payment.amount,
      method: payment.method === PaymentMethod.STRIPE_CARD ? "Stripe Card" : payment.method,
      status: payment.status,
      paidAt: payment.paidAt?.toISOString() ?? null,
      createdAt: payment.createdAt.toISOString(),
    }
  }

  private mapCanonicalStudentLedgerRow(row: CanonicalStudentAssignment): VCStudentLedgerRow {
    const dueDate = row.assignment.dueDate
    const today = new Date()
    const daysOverdue = dueDate.getTime() < today.getTime() && row.status !== "PAID"
      ? Math.max(Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)), 0)
      : 0

    return {
      assignmentId: row.assignment.id,
      studentId: row.assignment.student.id,
      rollNumber: row.assignment.student.studentId,
      studentName: row.assignment.student.user.name,
      email: row.assignment.student.user.email,
      departmentName: row.assignment.student.department.name,
      departmentCode: row.assignment.student.department.code,
      programName: row.assignment.student.program.name,
      sessionName: row.assignment.student.session.name,
      semester: row.assignment.student.currentSemester,
      feeStatus: row.status,
      amountDue: row.assignment.amountDue,
      amountPaid: row.assignment.amountPaid,
      outstandingAmount: Math.max(row.assignment.amountDue - row.assignment.amountPaid, 0),
      dueDate: row.assignment.dueDate.toISOString(),
      paidAt: row.assignment.paidAt?.toISOString() ?? null,
      daysOverdue,
      enrollmentStatus: row.assignment.student.enrollmentStatus,
    }
  }

  private buildCurrentStatusAssignmentWhere(
    tenantId: string,
    filters: VCAnalyticsFilters,
    includeSearch = false,
  ): Prisma.FeeAssignmentWhereInput {
    const studentWhere: Prisma.StudentWhereInput = {
      ...this.buildStudentWhere(tenantId, filters),
      ...(includeSearch && filters.search
        ? {
            OR: [
              { studentId: { contains: filters.search, mode: "insensitive" } },
              { user: { is: { name: { contains: filters.search, mode: "insensitive" } } } },
              { user: { is: { email: { contains: filters.search, mode: "insensitive" } } } },
            ],
          }
        : {}),
    }

    return {
      tenantId,
      student: { is: studentWhere },
    }
  }

  private buildCanonicalAssignments(rows: CurrentStatusAssignmentRow[]): CanonicalStudentAssignment[] {
    const map = new Map<string, CurrentStatusAssignmentRow>()
    for (const row of rows) {
      if (row.feeStructure.semester !== row.student.currentSemester) continue
      const existing = map.get(row.student.id)
      if (!existing) {
        map.set(row.student.id, row)
        continue
      }
      const shouldReplace = this.compareAssignmentRecency(row, existing) > 0
      if (shouldReplace) map.set(row.student.id, row)
    }

    return Array.from(map.values()).map((assignment) => ({
      assignment,
      status: this.normalizeCurrentSemesterStatus(assignment),
    }))
  }

  private compareAssignmentRecency(
    candidate: CurrentStatusAssignmentRow,
    current: CurrentStatusAssignmentRow,
  ): number {
    if (candidate.feeStructure.sessionYear !== current.feeStructure.sessionYear) {
      return candidate.feeStructure.sessionYear - current.feeStructure.sessionYear
    }
    if (candidate.dueDate.getTime() !== current.dueDate.getTime()) {
      return candidate.dueDate.getTime() - current.dueDate.getTime()
    }
    return candidate.createdAt.getTime() - current.createdAt.getTime()
  }

  private normalizeCurrentSemesterStatus(row: CurrentStatusAssignmentRow): CanonicalStudentFeeStatus {
    if (row.status === FeeStatus.PAID) return "PAID"
    const isOverdue = row.status === FeeStatus.OVERDUE || row.dueDate.getTime() < new Date().getTime()
    if (isOverdue) return "OVERDUE"
    return "UNPAID"
  }

  private filterCanonicalByFeeStatus(
    rows: CanonicalStudentAssignment[],
    feeStatus: VCAnalyticsFilters["feeStatus"],
  ): CanonicalStudentAssignment[] {
    if (!feeStatus || feeStatus === "ALL") return rows
    if (feeStatus === "PAID") return rows.filter((row) => row.status === "PAID")
    if (feeStatus === "OVERDUE") return rows.filter((row) => row.status === "OVERDUE")
    if (feeStatus === "UNPAID" || feeStatus === "PARTIAL") {
      return rows.filter((row) => row.status === "UNPAID")
    }
    return rows
  }

  private isDateToday(value: Date): boolean {
    const date = new Date(value)
    const today = new Date()
    return date.getFullYear() === today.getFullYear()
      && date.getMonth() === today.getMonth()
      && date.getDate() === today.getDate()
  }

  private todayRange(): DateRange {
    const from = new Date()
    from.setHours(0, 0, 0, 0)
    const to = new Date()
    to.setHours(23, 59, 59, 999)
    return { from, to }
  }

  private resolveDateRange(filters: VCAnalyticsFilters): DateRange {
    const now = new Date()
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)

    if (filters.range === "custom" && filters.from && filters.to) {
      const from = new Date(filters.from)
      from.setHours(0, 0, 0, 0)

      const to = new Date(filters.to)
      to.setHours(23, 59, 59, 999)

      return { from, to }
    }

    const from = new Date(now)
    from.setHours(0, 0, 0, 0)

    switch (filters.range) {
      case "today":
        break
      case "7d":
        from.setDate(from.getDate() - 6)
        break
      case "90d":
        from.setDate(from.getDate() - 89)
        break
      case "30d":
      default:
        from.setDate(from.getDate() - 29)
        break
    }

    return { from, to: end }
  }
}
