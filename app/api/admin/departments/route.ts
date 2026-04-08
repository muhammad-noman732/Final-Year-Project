import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { departmentController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await departmentController.getDepartments(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await departmentController.createDepartment(req)
})
