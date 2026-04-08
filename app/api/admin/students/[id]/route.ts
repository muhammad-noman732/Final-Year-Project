import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentController } from "@/lib/di"
import { logger } from "@/lib/logger"

export const GET = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  logger.info({ studentId: id }, "GET /api/admin/students/[id] initiated")
  return await studentController.getStudent(id)
})

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  logger.info({ studentId: id }, "PATCH /api/admin/students/[id] initiated")
  return await studentController.updateStudent(req, id)
})
