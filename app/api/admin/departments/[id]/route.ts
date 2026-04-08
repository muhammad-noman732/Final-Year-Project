import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { departmentController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  return await departmentController.getDepartment(id)
})

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  const { id } = await ctx!.params
  return await departmentController.updateDepartment(req, id)
})
