import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentController } from "@/lib/di"
import { logger } from "@/lib/logger"

export const GET = withErrorHandler(async (req: NextRequest) => {
  logger.info("GET /api/admin/students initiated")
  return await studentController.getStudents(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  logger.info("POST /api/admin/students initiated")
  return await studentController.createStudent(req)
})
