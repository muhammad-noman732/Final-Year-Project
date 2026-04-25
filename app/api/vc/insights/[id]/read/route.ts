import { withErrorHandler } from "@/lib/utils/routeHandler"
import { vcController } from "@/lib/di"
import type { NextRequest } from "next/server"

export const PATCH = withErrorHandler(async (req: NextRequest, ctx?: { params: Promise<Record<string, string>> }) => {
  const params = await ctx?.params
  const id = params?.["id"] ?? ""
  return vcController.markInsightRead(req, id)
})
