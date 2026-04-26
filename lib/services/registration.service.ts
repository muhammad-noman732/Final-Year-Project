import Papa from "papaparse"
import { logger } from "@/lib/logger"
import { broadcastRegistrationImported, broadcastInsightsUpdated } from "@/lib/sse"
import type { ApplicantRepository } from "@/lib/repositories/applicant.repository"
import type { ImportBatchRepository } from "@/lib/repositories/importBatch.repository"
import type { ActivityLogRepository } from "@/lib/repositories/activityLog.repository"
import type { InsightRepository } from "@/lib/repositories/insight.repository"
import type { AcademicSessionRepository } from "@/lib/repositories/academicSession.repository"
import { csvRowSchema } from "@/lib/validators/registration.validators"
import type {
  ImportResult,
  RegistrationDashboardStats,
} from "@/types/server/registration.types"
import {
  PROGRAM_CAPACITY,
  CAPACITY_CRITICAL,
  CAPACITY_WARNING,
} from "@/types/server/registration.types"
import { ValidationError } from "@/lib/utils/AppError"

// Normalise CSV header names — exported systems may use various casings
function normaliseRow(raw: Record<string, string>): Record<string, string> {
  const headerMap: Record<string, string> = {
    full_name: "fullName",
    fullname: "fullName",
    name: "fullName",
    matric_percent: "matricPercent",
    matricpercent: "matricPercent",
    matric: "matricPercent",
    fsc_percent: "fscPercent",
    fscpercent: "fscPercent",
    fsc: "fscPercent",
  }
  return Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [
      headerMap[k.toLowerCase().trim()] ?? k.trim(),
      v,
    ]),
  )
}

export class RegistrationService {
  constructor(
    private readonly applicantRepo: ApplicantRepository,
    private readonly importBatchRepo: ImportBatchRepository,
    private readonly activityLogRepo: ActivityLogRepository,
    private readonly insightRepo: InsightRepository,
    private readonly sessionRepo: AcademicSessionRepository,
  ) {}

  async importCsv(
    tenantId: string,
    userId: string,
    fileName: string,
    csvText: string,
  ): Promise<ImportResult> {
    const parsed = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (parsed.errors.length > 0) {
      throw new ValidationError(
        `CSV parse error: ${parsed.errors[0]?.message ?? "Unknown"}`,
      )
    }

    const rows = parsed.data
    if (rows.length === 0) {
      throw new ValidationError("CSV file has no data rows.")
    }

    const errors: ImportResult["errors"] = []
    let batchProgram = ""
    let batchSession = ""

    // Validate rows before writing anything
    const validApplicantInputs: Array<{
      fullName: string
      email: string
      phone: string | null
      program: string
      department: string
      session: string
      matricPercent: number
      fscPercent: number
      meritScore: number
      gender: string | null
      city: string | null
    }> = []

    for (let i = 0; i < rows.length; i++) {
      const raw = normaliseRow(rows[i] as Record<string, string>)
      const result = csvRowSchema.safeParse(raw)
      if (!result.success) {
        errors.push({
          row: i + 2, // +2: 1-indexed + header row
          reason: result.error.issues.map((e) => e.message).join("; "),
        })
        continue
      }

      const { fullName, email, phone, program, department, session, matricPercent, fscPercent, gender, city } =
        result.data
      const meritScore = +(matricPercent * 0.4 + fscPercent * 0.6).toFixed(2)

      if (!batchProgram) batchProgram = program
      if (!batchSession) batchSession = session

      validApplicantInputs.push({
        fullName,
        email,
        phone: phone ?? null,
        program,
        department,
        session,
        matricPercent,
        fscPercent,
        meritScore,
        gender: gender ?? null,
        city: city ?? null,
      })
    }

    if (validApplicantInputs.length === 0) {
      return {
        success: false,
        totalImported: 0,
        failed: errors.length,
        batchId: null,
        errors,
      }
    }

    // Create the batch record
    const batch = await this.importBatchRepo.create({
      tenantId,
      fileName,
      totalCount: validApplicantInputs.length,
      program: batchProgram,
      session: batchSession,
      importedBy: userId,
    })

    // Bulk-create applicants
    await this.applicantRepo.createMany(
      validApplicantInputs.map((a) => ({ ...a, tenantId, importBatchId: batch.id })),
    )

    const totalImported = validApplicantInputs.length

    void this.activityLogRepo
      .create({
        tenantId,
        type: "IMPORT",
        message: `Admin imported ${totalImported} applicant${totalImported !== 1 ? "s" : ""} for ${batchProgram} (${batchSession})`,
        metadata: {
          batchId: batch.id,
          fileName,
          totalImported,
          failed: errors.length,
        },
      })
      .catch((err: unknown) =>
        logger.error({ err }, "ActivityLog write failed after import"),
      )

    void broadcastRegistrationImported(tenantId, {
      batchId: batch.id,
      count: totalImported,
      program: batchProgram,
      session: batchSession,
    })

    logger.info(
      {
        event: "registration.import.complete",
        tenantId,
        batchId: batch.id,
        totalImported,
        failed: errors.length,
      },
      "CSV import completed",
    )

    return {
      success: true,
      totalImported,
      failed: errors.length,
      batchId: batch.id,
      errors,
    }
  }

  async getRegistrationStats(tenantId: string): Promise<RegistrationDashboardStats> {
    const currentSessionRow = await this.sessionRepo.findCurrent(tenantId)
    const currentSession = currentSessionRow?.name ?? ""

    const [
      totalRegistered,
      registeredThisSession,
      todayImports,
      byProgramRaw,
      activityRaw,
      recentActivity,
    ] = await Promise.all([
      this.applicantRepo.countByTenant(tenantId),
      currentSession
        ? this.applicantRepo.countBySession(tenantId, currentSession)
        : Promise.resolve(0),
      this.applicantRepo.countTodayImports(tenantId),
      this.applicantRepo.groupByProgram(tenantId),
      this.applicantRepo.getDailyActivityLast30Days(tenantId),
      this.activityLogRepo.findByTenant(tenantId, 20),
    ])

    const capacityData = byProgramRaw.map((row) => {
      const count = row._count.id
      const capacity = PROGRAM_CAPACITY[row.department] ?? 500
      const percentage = Math.min(100, Math.round((count / capacity) * 100))
      const ratio = count / capacity
      const status: "critical" | "warning" | "good" =
        ratio >= CAPACITY_CRITICAL ? "critical" : ratio >= CAPACITY_WARNING ? "warning" : "good"
      return {
        program: row.program,
        department: row.department,
        count,
        capacity,
        percentage,
        status,
      }
    })

    const programsNearCapacity = capacityData.filter(
      (p) => p.count / p.capacity >= CAPACITY_WARNING,
    ).length

    // Daily activity for the past 30 days, filling zeros for empty days
    const dailyMap = new Map<string, number>()
    for (const { importedAt } of activityRaw) {
      const key = importedAt.toISOString().slice(0, 10)
      dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1)
    }
    const dailyActivity: RegistrationDashboardStats["dailyActivity"] = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      dailyActivity.push({ date: key, count: dailyMap.get(key) ?? 0 })
    }

    const recentImportActivity = recentActivity
      .filter((a) => a.type === "IMPORT")
      .slice(0, 10)
      .map((a) => ({
        id: a.id,
        message: a.message,
        metadata: (a.metadata as Record<string, unknown> | null) ?? null,
        createdAt: a.createdAt.toISOString(),
      }))

    return {
      totalRegistered,
      registeredThisSession,
      todayImports,
      programsNearCapacity,
      byProgram: byProgramRaw.map((r) => ({
        program: r.program,
        department: r.department,
        count: r._count.id,
      })),
      capacityData,
      dailyActivity,
      recentImportActivity,
    }
  }

  async computeRegistrationInsights(tenantId: string): Promise<void> {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    await this.insightRepo.deleteByModule(tenantId, "REGISTRATION")

    const [byProgram, lastImport, currentSessionRow] = await Promise.all([
      this.applicantRepo.groupByProgram(tenantId),
      this.applicantRepo.getLastImportTimestamp(tenantId),
      this.sessionRepo.findCurrent(tenantId),
    ])

    if (byProgram.length === 0) return

    const insightRows: Parameters<typeof this.insightRepo.createMany>[0] = []

    // 1. Capacity Alerts
    for (const row of byProgram) {
      const count = row._count.id
      const capacity = PROGRAM_CAPACITY[row.department] ?? 500
      const ratio = count / capacity
      if (ratio >= CAPACITY_WARNING) {
        const remaining = capacity - count
        const pct = Math.round(ratio * 100)
        insightRows.push({
          tenantId,
          module: "REGISTRATION",
          type: "ALERT",
          priority: ratio >= CAPACITY_CRITICAL ? "HIGH" : "MEDIUM",
          message: `${row.program} (${row.department}) is ${pct}% full. Only ${remaining} seat${remaining !== 1 ? "s" : ""} remaining.`,
          actionLabel: "View Registration",
          actionType: "VIEW_LIST",
          expiresAt,
        })
      }
    }

    // 2. Department Comparison — flag programs 20%+ below average
    const totalApplicants = byProgram.reduce((s, r) => s + r._count.id, 0)
    const avgCount = totalApplicants / byProgram.length
    for (const row of byProgram) {
      if (avgCount > 0) {
        const shortfall = ((avgCount - row._count.id) / avgCount) * 100
        if (shortfall >= 20) {
          insightRows.push({
            tenantId,
            module: "REGISTRATION",
            type: "ALERT",
            priority: "MEDIUM",
            message: `${row.program} registrations are ${Math.round(shortfall)}% below campus average (${row._count.id} vs avg ${Math.round(avgCount)}).`,
            expiresAt,
          })
        }
      }
    }

    // 3. Prediction — ETA to capacity based on 30-day daily import rate
    const activityRaw = await this.applicantRepo.getDailyActivityLast30Days(tenantId)
    const dailyAvg = activityRaw.length > 0 ? activityRaw.length / 30 : 0
    if (dailyAvg > 0) {
      for (const row of byProgram) {
        const capacity = PROGRAM_CAPACITY[row.department] ?? 500
        const remaining = capacity - row._count.id
        if (remaining > 0 && remaining < capacity) {
          const daysUntilFull = Math.ceil(remaining / dailyAvg)
          if (daysUntilFull <= 90) {
            insightRows.push({
              tenantId,
              module: "REGISTRATION",
              type: "PREDICTION",
              priority: "MEDIUM",
              message: `At current import rate (~${Math.round(dailyAvg)}/day), ${row.program} will reach capacity in ~${daysUntilFull} day${daysUntilFull !== 1 ? "s" : ""}.`,
              expiresAt,
            })
          }
        }
      }
    }

    // 4. Activity Anomaly — no imports in last 48 h
    if (lastImport) {
      const hoursSince =
        (now.getTime() - lastImport.importedAt.getTime()) / (1000 * 60 * 60)
      if (hoursSince >= 48) {
        insightRows.push({
          tenantId,
          module: "REGISTRATION",
          type: "ALERT",
          priority: "HIGH",
          message: `No registration imports in the last ${Math.round(hoursSince)} hours. Admission activity may have stopped.`,
          expiresAt,
        })
      }
    }

    // 5. Merit Score Summary (current session)
    if (currentSessionRow?.name) {
      const meritData = await this.applicantRepo.getAverageMeritByProgram(
        tenantId,
        currentSessionRow.name,
      )
      if (meritData.length > 0) {
        const overall =
          meritData.reduce((s, r) => s + (r._avg.meritScore ?? 0), 0) / meritData.length
        const top = meritData.reduce((best, r) =>
          (r._avg.meritScore ?? 0) > (best._avg.meritScore ?? 0) ? r : best,
        )
        insightRows.push({
          tenantId,
          module: "REGISTRATION",
          type: "SUCCESS",
          priority: "LOW",
          message: `Average merit score this session: ${overall.toFixed(1)}. Top program by merit: ${top.program} (${(top._avg.meritScore ?? 0).toFixed(1)}).`,
          expiresAt,
        })
      }
    }

    if (insightRows.length > 0) {
      await this.insightRepo.createMany(insightRows)
    }

    void broadcastInsightsUpdated(tenantId)
  }
}
