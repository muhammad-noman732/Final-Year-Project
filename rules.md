Next.js TypeScript Production Backend — Rules
Project Structure

Use src/ directory with clear separation: controllers/, services/, repositories/, middlewares/, validators/, lib/, types/, config/
Every route has a handler → controller → service → repository chain, no skipping layers
Keep business logic only in services, never in route handlers or repositories
Repositories only talk to the database, no business logic ever


API Routes & Handlers

All API routes live under src/app/api/ using Next.js App Router conventions
Every route file exports only named HTTP method handlers: GET, POST, PUT, PATCH, DELETE
Handlers are thin — extract input, call controller, return response, nothing else
Always return NextResponse.json() with explicit HTTP status codes, never bare 200 assumptions
Never put async logic directly in the route file without try/catch


Validation

Validate ALL incoming data (body, query params, headers, cookies) at the handler level before anything else
Use Zod for all schema validation, define schemas in a dedicated validators/ folder
Never trust req.body — always parse and validate through Zod schema
Return 400 with structured field errors on validation failure, never a generic message
Validate environment variables at startup using Zod — fail fast if config is missing


Error Handling

Create a central AppError class with statusCode, message, code, and isOperational fields
All errors thrown inside services must be instances of AppError or its subclasses
Create a single withErrorHandler() HOF (Higher Order Function) wrapper that wraps every route handler — this is your Express-equivalent global error middleware
Never let unknown errors reach the client — always catch, log, and return a safe response
Distinguish between operational errors (user errors, 4xx) and programmer errors (bugs, 5xx)
Never expose stack traces or internal messages to the client in production


Logging

Use loggin library best recomended as work in production and for now use conole.log in developments as well
Every log entry must include: timestamp, level, requestId, userId (if auth'd), method, path, statusCode, durationMs
Generate a unique requestId (UUID) per request and pass it through the entire request lifecycle
Log at entry and exit of every request, and on every caught error
Use log levels correctly: debug for dev detail, info for normal ops, warn for recoverable issues, error for failures
Never log sensitive data: passwords, tokens, PII, credit cards


Monitoring & Observability

Expose a /api/health endpoint returning service status, version, uptime, and dependency checks (DB, Redis, etc.)
Expose a /api/ready endpoint for readiness checks (dependencies connected)
Track and alert on: error rate, p95/p99 latency, request volume, DB pool exhaustion
Use OpenTelemetry for distributed tracing if microservices are involved
Instrument with Sentry for error tracking and alerting in production


Retries & Resilience

Wrap all external calls (DB, third-party APIs) with retry logic using exponential backoff + jitter
Use a library like p-retry or implement a generic withRetry() utility
Set explicit timeouts on every external call — never let them hang indefinitely
Use circuit breakers for third-party services that may go down (e.g., opossum)
Treat all external services as unreliable — design for failure, not for success


Database & Repositories

All DB access goes through repository classes/functions only, never inline in services
Use Prisma with full TypeScript types — no raw untyped queries
Never use findMany without a limit — always paginate
Use DB transactions for any multi-step write operations
Keep DB connection pooling configured and monitored — log pool exhaustion
Never expose DB models directly as API responses — always map to DTOs


Authentication & Authorization

Verify auth tokens in a middleware/HOF before handlers, never inside business logic
Use a withAuth() HOF to protect routes declaratively
Separate authentication (who are you?) from authorization (can you do this?)
Store secrets in environment variables only, never in code or committed files
Use short-lived access tokens + refresh token rotation


Middleware (Next.js middleware.ts)

Use global middleware.ts for: auth token verification, rate limiting, request ID injection, CORS headers
Keep middleware lean and fast — no DB calls in the global middleware file
Use matcher config to apply middleware only to relevant routes


Rate Limiting & Security


Set security headers on all responses: X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security
Sanitize all user-supplied strings before using in queries or responses
Enable CORS explicitly — never use wildcard * in production


Environment & Configuration

All config comes from environment variables, typed and validated via Zod at startup
Never hardcode URLs, secrets, timeouts, or limits — everything is config
Maintain separate .env.development, .env.test, .env.production files
Expose a single config object from src/config/index.ts — no direct process.env usage scattered around


TypeScript Standards

Enable strict mode in tsconfig.json — no exceptions
No any types ever — use unknown and narrow it
Define all request/response shapes as TypeScript interfaces or Zod-inferred types
Use type for unions/primitives, interface for object shapes
All functions must have explicit return types



General Rules

All async functions must handle errors — no floating promises
Never mutate input parameters inside functions
Keep functions small, single-purpose, and named after what they do
Document non-obvious decisions with inline comments, not obvious code
Run ESLint + Prettier + Husky pre-commit hooks to enforce standards automatically