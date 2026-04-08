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
      {
        event: "api.request.started",
        requestId,
        method: req.method,
        path: req.nextUrl.pathname,
      },
      "API request started"
    )

    try {
      const response = await handler(req, ctx)

      logger.info(
        {
          event: "api.request.completed",
          requestId,
          method: req.method,
          path: req.nextUrl.pathname,
          statusCode: response.status,
          durationMs: Date.now() - start,
        },
        "API request completed"
      )

      return response
    } catch (error) {
      logger.error(
        {
          event: "api.request.failed",
          requestId,
          method: req.method,
          path: req.nextUrl.pathname,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : String(error),
        },
        "API request failed"
      )

      return handleError(error, requestId)
    }
  }
}
