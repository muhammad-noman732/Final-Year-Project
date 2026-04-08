import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { AcademicSessionService } from "@/lib/services/academicSession.service"
import {
  createSessionSchema,
  setCurrentSessionSchema,
  listSessionsQuerySchema,
} from "@/lib/validators/session.validators"

export class AcademicSessionController {
  constructor(private readonly sessionService: AcademicSessionService) { }

  async getSessions(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listSessionsQuerySchema.parse(searchParams)

    const result = await this.sessionService.getSessions(tenantId, query)
    return successResponse(result)
  }

  async getSession(id: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC")
    const result = await this.sessionService.getSession(tenantId, id)
    return successResponse(result)
  }

  async createSession(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    const data = createSessionSchema.parse(body)

    const result = await this.sessionService.createSession(tenantId, userId, data)
    return successResponse(result, 201)
  }

  async setCurrentSession(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")
    const body = await req.json()
    setCurrentSessionSchema.parse(body)

    const result = await this.sessionService.makeCurrent(tenantId, userId, id)
    return successResponse(result)
  }
}
