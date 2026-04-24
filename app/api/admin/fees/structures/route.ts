import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { feeStructureController } from "@/lib/di"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return await feeStructureController.getFeeStructures(req)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await feeStructureController.createFeeStructure(req)
})
