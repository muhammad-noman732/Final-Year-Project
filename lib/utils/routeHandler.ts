// ═══════════════════════════════════════════════════════════════
//  withErrorHandler — Wraps every API route handler
//
//  Rule: No try-catch inside route handlers. This HOF catches everything.
//  Rule: Log every request entry/exit with requestId, method, path, duration.
// ═══════════════════════════════════════════════════════════════

import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { handleError } from "./ApiResponse"
import { logger } from "@/lib/logger"

type RouteContext = { params: Promise<Record<string, string>> }
type RouteHandler = (req: NextRequest, ctx?: RouteContext) => Promise<NextResponse>

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, ctx?: RouteContext): Promise<NextResponse> => {
    const requestId = randomUUID()
    const start = Date.now()

    logger.info(
      { requestId, method: req.method, path: req.nextUrl.pathname },
      "Request started"
    )

    try {
      const response = await handler(req, ctx)

      logger.info(
        {
          requestId,
          method: req.method,
          path: req.nextUrl.pathname,
          statusCode: response.status,
          durationMs: Date.now() - start,
        },
        "Request completed"
      )

      return response
    } catch (error) {
      logger.error(
        {
          requestId,
          method: req.method,
          path: req.nextUrl.pathname,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : String(error),
        },
        "Request failed"
      )

      return handleError(error, requestId)
    }
  }
}
