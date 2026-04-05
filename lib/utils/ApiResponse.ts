import { NextResponse } from "next/server"
import { ZodError } from "zod/v4"
import { AppError, ValidationError } from "./AppError"
import { logger } from "@/lib/logger"

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    fields?: Record<string, string[]>
  }
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function successResponse<T>(
  data: T,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(
  code: string,
  message: string,
  status: number,
  fields?: Record<string, string[]>,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, ...(fields ? { fields } : {}) },
    },
    { status },
  )
}

export function handleError(
  error: unknown,
  requestId?: string,
): NextResponse<ApiResponse> {
  if (error instanceof ZodError) {
    const fields: Record<string, string[]> = {}
    for (const issue of error.issues) {
      const path = issue.path.join(".") || "root"
      if (!fields[path]) fields[path] = []
      fields[path].push(issue.message)
    }
    return errorResponse("VALIDATION_ERROR", "Validation failed", 400, fields)
  }

  if (error instanceof ValidationError) {
    const valErr = error as ValidationError
    return errorResponse(valErr.code, valErr.message, valErr.statusCode, valErr.fields)
  }
  if (error instanceof AppError) {
    const appErr = error as AppError
    if (!appErr.isOperational) {
      logger.error(
        { requestId, error: appErr.message, stack: appErr.stack },
        "Non-operational AppError"
      )
    }
    return errorResponse(appErr.code, appErr.message, appErr.statusCode)
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as Record<string, unknown>).code === "string"
  ) {
    const prismaCode = (error as { code: string }).code
    if (prismaCode === "P2002") {
      return errorResponse("CONFLICT", "A record with this data already exists.", 409)
    }
    if (prismaCode === "P2025") {
      return errorResponse("NOT_FOUND", "Record not found.", 404)
    }
  }

  logger.error(
    {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    },
    "Unexpected error"
  )
  return errorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred.", 500)
}
