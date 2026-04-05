export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number,
    code: string,
    isOperational = true,
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND")
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required. Please log in.") {
    super(message, 401, "UNAUTHORIZED")
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, 403, "FORBIDDEN")
  }
}

export class ValidationError extends AppError {
  public readonly fields?: Record<string, string[]>

  constructor(message = "Validation failed", fields?: Record<string, string[]>) {
    super(message, 400, "VALIDATION_ERROR")
    this.fields = fields
  }
}

export class ConflictError extends AppError {
  constructor(message = "A record with this data already exists.") {
    super(message, 409, "CONFLICT")
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again later.") {
    super(message, 429, "RATE_LIMIT_EXCEEDED")
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service temporarily unavailable.") {
    super(message, 503, "SERVICE_UNAVAILABLE")
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected internal server error occurred.") {
    super(message, 500, "INTERNAL_SERVER_ERROR", true)
  }
}

export class TimeoutError extends AppError {
  constructor(operationName: string, ms: number) {
    super(
      `${operationName} timed out after ${ms}ms`,
      504,
      'TIMEOUT_ERROR',
      true
    );
  }
}
