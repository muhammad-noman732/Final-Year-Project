import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await studentController.getStudents(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await studentController.createStudent(req)
})
