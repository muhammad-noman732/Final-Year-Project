import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { getTenantContext, requireRole } from "@/lib/auth"
import { successResponse } from "@/lib/utils/ApiResponse"
import { env } from "@/lib/env"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async (req: NextRequest) => {
  await getTenantContext()
  await requireRole("VC", "ADMIN", "SUPER_ADMIN")

  const response = await fetch(`${env.ML_SERVICE_URL}/forecast`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 0 } // Live request during local test
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}))
    throw new Error(errorDetails?.detail ?? "ML Engine Forecast query failed.")
  }

  const forecastData = await response.json()
  return successResponse(forecastData)
})
