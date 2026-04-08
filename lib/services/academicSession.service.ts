import type { Prisma } from "@/app/generated/prisma/client"
import { ConflictError, NotFoundError } from "@/lib/utils/AppError"
import type { AcademicSessionRepository, AcademicSessionRow } from "@/lib/repositories/academicSession.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type {
  CreateSessionInput,
  ListSessionsQuery,
} from "@/lib/validators/session.validators"
import type { PaginatedResult } from "@/types/server/admin.types"
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/paginate"
import { logger } from "@/lib/logger"

export class AcademicSessionService {
  constructor(
    private readonly sessionRepo: AcademicSessionRepository,
    private readonly auditService: AuditService,
  ) { }

  async getSessions(
    tenantId: string,
    query: ListSessionsQuery,
  ): Promise<PaginatedResult<AcademicSessionRow>> {
    //  Build WHERE 
    const where: Prisma.AcademicSessionWhereInput = { tenantId }

    if (query.isCurrent !== undefined) {
      where.isCurrent = query.isCurrent
    }

    // ── Build ORDER BY ──────────────────────────────────────────
    const orderBy: Prisma.AcademicSessionOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortDir },
      { id: query.sortDir },
    ]

    const { skip } = getPaginationParams({ page: query.page, limit: query.limit })

    const { data, total } = await this.sessionRepo.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    })

    return { data, meta: buildPaginationMeta(total, query.page, query.limit) }
  }

  async getSession(tenantId: string, id: string): Promise<AcademicSessionRow> {
    const session = await this.sessionRepo.findById(tenantId, id)
    if (!session) throw new NotFoundError("Academic session not found")
    return session
  }

  async createSession(
    tenantId: string,
    userId: string,
    input: CreateSessionInput,
  ): Promise<AcademicSessionRow> {
    const existing = await this.sessionRepo.findByName(tenantId, input.name)
    if (existing) throw new ConflictError("An academic session with this name already exists.")

    let session = await this.sessionRepo.create({
      tenantId,
      name: input.name.trim(),
      startYear: input.startYear,
      endYear: input.endYear,
      isCurrent: input.isCurrent ?? false,
    })

    // If marked as current, atomically flip all others to false
    if (input.isCurrent) {
      session = await this.sessionRepo.makeCurrent(tenantId, session.id)
    }

    this._audit({
      tenantId,
      userId,
      action: "session.created",
      entity: "AcademicSession",
      entityId: session.id,
      newData: { name: session.name, startYear: session.startYear, isCurrent: session.isCurrent },
    })

    logger.info(
      {
        event: "session.create.success",
        tenantId,
        sessionId: session.id,
      },
      "Academic session created successfully"
    )

    return session
  }

  async makeCurrent(
    tenantId: string,
    userId: string,
    id: string,
  ): Promise<AcademicSessionRow> {
    const session = await this.sessionRepo.findById(tenantId, id)
    if (!session) throw new NotFoundError("Academic session not found")

    if (session.isCurrent) {
      return session // already current — no-op
    }

    const updated = await this.sessionRepo.makeCurrent(tenantId, id)

    this._audit({
      tenantId,
      userId,
      action: "session.made_current",
      entity: "AcademicSession",
      entityId: updated.id,
      newData: { name: updated.name, isCurrent: true },
    })

    logger.info(
      {
        event: "session.current.set",
        tenantId,
        sessionId: updated.id,
      },
      "Academic session set as current"
    )

    return updated
  }

  // ── Private 
  private _audit(params: {
    tenantId: string
    userId: string
    action: string
    entity: string
    entityId: string
    oldData?: Record<string, unknown>
    newData?: Record<string, unknown>
  }): void {
    void this.auditService
      .log({ ...params, userRole: "ADMIN" })
  }
}
