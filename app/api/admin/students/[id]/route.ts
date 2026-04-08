import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest, ctx) => {
  if (!ctx) throw new Error("Route params are required.")
  const { id } = await ctx.params
  return await studentController.getStudent(id)
})

export const PATCH = withErrorHandler(async (req: NextRequest, ctx) => {
  if (!ctx) throw new Error("Route params are required.")
  const { id } = await ctx.params
  return await studentController.updateStudent(req, id)
})
