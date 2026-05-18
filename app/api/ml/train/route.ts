import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { getTenantContext, requireRole } from "@/lib/auth"
import { successResponse } from "@/lib/utils/ApiResponse"
import { env } from "@/lib/env"

export const dynamic = "force-dynamic"

export const POST = withErrorHandler(async (req: NextRequest) => {
  await getTenantContext()
  await requireRole("ADMIN", "SUPER_ADMIN", "VC")

  const response = await fetch(`${env.ML_SERVICE_URL}/train-all`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}))
    throw new Error(errorDetails?.detail ?? "ML Training failed.")
  }

  const result = await response.json()
  return successResponse(result)
})
