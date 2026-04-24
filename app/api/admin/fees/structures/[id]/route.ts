import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { feeStructureController } from "@/lib/di"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async (
  _req: NextRequest,
  ctx
) => {
  if (!ctx) {
    throw new Error("Fee structure ID is required")
  }
  const { id } = await ctx.params
  return await feeStructureController.getFeeStructure(id)
})

export const PATCH = withErrorHandler(async (
  req: NextRequest,
  ctx
) => {
  if (!ctx) {
    throw new Error("Fee structure ID is required")
  }
  const { id } = await ctx.params
  return await feeStructureController.updateFeeStructure(req, id)
})

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  ctx
) => {
  if (!ctx) {
    throw new Error("Fee structure ID is required")
  }
  const { id } = await ctx.params
  return await feeStructureController.deleteFeeStructure(id)
})
