# 5.1 Component Diagram

## Real-Time Fee and Registration Intelligent Dashboard
### Government College University Faisalabad (GCUF)

---

## Overview

A Component Diagram describes the **physical artifacts** of a system — the actual files, executables, compiled libraries, runtime processes, and external interfaces that exist in the deployed environment. Unlike a Class Diagram (which shows logical structure), a Component Diagram shows **what physically exists on disk or in memory** and **how those physical units connect and communicate**.

The Real-Time Fee and Registration Intelligent Dashboard is structured as a **multi-tenant, multi-process Node.js application** deployed on a VPS. Its physical components span five layers: Frontend UI, API Engine, Business Logic, Data Storage, and External Services.

---

## Component Architecture Layers

```
┌──────────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER (React)                       │
│  [Redux Store] → [RTK Query API Layer] → [Page Components]       │
│  [VC Dashboard] [Admin Dashboard] [Student Portal] [Auth Pages]  │
└───────────────────────────┬──────────────────────────────────────┘
                            │ HTTPS / SSE
┌───────────────────────────▼──────────────────────────────────────┐
│              NEXT.JS SERVER (Node.js Process — PM2)              │
│  [Auth Middleware Proxy] → [API Route Handlers]                  │
│  [withErrorHandler] → [Controllers] → [Services] → [Repos]       │
└──────┬──────────────┬───────────────┬────────────────────────────┘
       │              │               │
┌──────▼───┐   ┌──────▼──────┐ ┌─────▼──────────────────────────┐
│PostgreSQL│   │   Redis     │ │   External Services             │
│(Prisma)  │   │(ioredis)    │ │   [Stripe API] [SendGrid API]   │
└──────────┘   └─────────────┘ └────────────────────────────────┘
```

---

## Component 1: Authentication & Middleware Proxy

**Physical Files:**
- `lib/proxies/auth.proxy.ts` — Main Edge-compatible auth middleware
- `lib/proxies/cors.proxy.ts` — CORS preflight handler
- `lib/proxies/security-headers.proxy.ts` — HTTP security headers injector
- `lib/proxies/request-context.proxy.ts` — Request ID injection and logging
- `lib/jwt.ts` — JWT sign/verify using `jose` library (Edge-compatible)
- `middleware.ts` — Next.js entry point that invokes `authProxy()`

**What it does:**
- Intercepts **every incoming HTTP request** before it reaches any route handler
- Verifies the `auth-token` httpOnly cookie using `jose.jwtVerify()`
- Extracts JWT claims (`userId`, `role`, `tenantId`, `isFirstLogin`) and injects them as request headers (`x-user-id`, `x-user-role`, `x-tenant-id`)
- Enforces role-based route protection: STUDENT → `/student/*`, VC → `/vc/*`, ADMIN → `/admin/*`
- Redirects unauthenticated users to `/login`; API calls receive `401 UNAUTHORIZED`
- Enforces first-login password change: any route except `/changepassword` is blocked until `isFirstLogin = false`
- Applies CORS headers, security headers (CSP, X-Frame-Options, etc.), and a unique `X-Request-Id` to every response

**Interfaces:**
- *Provided:* Processes all HTTP requests before Next.js routes them
- *Required:* Reads `JWT_SECRET` from environment; reads `auth-token` cookie from request

---

## Component 2: Dependency Injection Container

**Physical File:**
- `lib/di.ts` — Central DI container; instantiates and wires all repositories, services, and controllers as singletons

**What it does:**
- Instantiates all 14 Repositories with the shared Prisma client
- Instantiates all 15 Services, injecting the required repositories
- Instantiates all 14 Controllers, injecting the required services
- Exports named controller instances used directly by API route handlers
- Ensures **one instance per process** — no redundant DB connections

**Key wiring:**
```
PrismaClient → Repositories → Services → Controllers → API Routes
```

**Exported controllers:** `authController`, `superAdminController`, `departmentController`, `programController`, `sessionController`, `userController`, `studentController`, `feeStructureController`, `studentFeeController`, `feeAssignmentController`, `paymentController`, `webhookController`, `vcController`, `cronController`

---

## Component 3: Route Handler Engine

**Physical Files:**
- `lib/utils/routeHandler.ts` — `withErrorHandler()` HOF wrapper
- `lib/utils/ApiResponse.ts` — `successResponse()`, `errorResponse()`, `handleError()`
- `lib/utils/AppError.ts` — Error class hierarchy
- `lib/utils/paginate.ts` — Pagination helper
- `lib/utils/retry.ts` — Exponential backoff retry wrapper
- `lib/utils/timeout.ts` — Timeout wrapper for external calls
- `lib/utils/paymentError.ts` — Payment-specific error types

**What it does:**
- `withErrorHandler` wraps every API route, catching ALL unhandled errors — no try/catch inside route handlers
- Translates `ZodError`, `AppError`, Prisma errors (`P2002` conflict, `P2025` not found) into structured JSON responses
- Guarantees a consistent API response shape: `{ success, data?, error?: { code, message, fields? }, meta? }`
- Assigns a unique `requestId` (UUID) to every request for log correlation

**Error classes:** `AppError`, `NotFoundError` (404), `UnauthorizedError` (401), `ForbiddenError` (403), `ValidationError` (400), `ConflictError` (409), `RateLimitError` (429), `ServiceUnavailableError` (503), `InternalServerError` (500), `TimeoutError` (504)

---

## Component 4: API Route Handlers

**Physical Files (grouped by domain):**

| Domain | Files |
|---|---|
| Auth | `app/api/auth/login/route.ts`, `logout/route.ts`, `changepassword/route.ts`, `me/route.ts` |
| Super Admin | `app/api/superadmin/tenants/route.ts` |
| Admin — Users | `app/api/admin/users/route.ts` |
| Admin — Students | `app/api/admin/students/route.ts` |
| Admin — Departments | `app/api/admin/departments/route.ts` |
| Admin — Programs | `app/api/admin/programs/route.ts` |
| Admin — Sessions | `app/api/admin/sessions/route.ts` |
| Admin — Fees | `app/api/admin/fees/structures/route.ts`, `fees/assignments/route.ts` |
| Student | `app/api/student/me/fees/route.ts` |
| Payments | `app/api/webhooks/stripe/route.ts` |
| VC | `app/api/vc/dashboard/route.ts`, `analytics/route.ts`, `insights/route.ts`, `students/route.ts`, `live/route.ts` |
| Cron | `app/api/cron/fee-insights/route.ts` |

**Pattern:** Every route is wrapped with `withErrorHandler`, calls the relevant controller method, and returns a typed `successResponse`. No business logic lives in route files.

---

## Component 5: Controllers Layer

**Physical Files:** `lib/controllers/` (14 files)

| Controller | Responsibility |
|---|---|
| `auth.controller.ts` | Login, logout, change password, get current user |
| `superadmin.controller.ts` | Create and list university tenants |
| `department.controller.ts` | CRUD departments (Admin only) |
| `program.controller.ts` | CRUD programs within departments |
| `academicSession.controller.ts` | CRUD academic sessions (2024-2028 etc.) |
| `user.controller.ts` | Create VC/HOD/Admin users, list users |
| `student.controller.ts` | Register students, list students with pagination |
| `feeStructure.controller.ts` | Create/update fee structures per program+semester |
| `studentFee.controller.ts` | Get a student's current fee status |
| `feeAssignment.controller.ts` | Assign fee structures to students |
| `payment.controller.ts` | Initiate Stripe payment intent |
| `webhook.controller.ts` | Receive and route Stripe webhook events |
| `vc.controller.ts` | Dashboard data, analytics, student ledger, insights |
| `cron.controller.ts` | Trigger nightly fee insight computation across all tenants |

**Interface:** Controllers receive the `NextRequest`, extract validated parameters via `getTenantContext()` / `getAuthUser()`, delegate to services, and return the service result.

---

## Component 6: Services Layer (Business Logic)

**Physical Files:** `lib/services/` (15 files)

| Service | Key Operations |
|---|---|
| `auth.service.ts` | Verify credentials, issue JWT, bcryptjs password hashing, first-login flow |
| `tenant.service.ts` | Create multi-tenant university, validate slug uniqueness |
| `user.service.ts` | Create role-specific users, send welcome emails, enforce tenant limits |
| `student.service.ts` | Register student with auto-generated roll number (e.g. `GCUF-2024-CS-0042`), link to department/program/session |
| `department.service.ts` | Manage departments with tenant isolation |
| `program.service.ts` | Manage academic programs with department linkage |
| `academicSession.service.ts` | Manage academic sessions, enforce single active session |
| `feeStructure.service.ts` | Create fee templates per program+semester, validate fee amounts, cascade assign to enrolled students |
| `feeAssignment.service.ts` | Assign fees to individual students, auto-generate challan numbers |
| `studentFee.service.ts` | Query a single student's active fee assignments |
| `payment.service.ts` | Create Stripe PaymentIntent with metadata, save PENDING payment record |
| `webhook.service.ts` | Verify Stripe signature, process `payment_intent.succeeded` → update DB, broadcast SSE event, write ActivityLog |
| `email.service.ts` | Send transactional emails via SendGrid (welcome, receipt, reminders) |
| `vc.service.ts` | Compute dashboard KPIs, department performance, collection trends, semester breakdowns, smart fee insights |
| `audit.service.ts` | Append immutable AuditLog records for every significant action |

---

## Component 7: Repositories Layer (Data Access)

**Physical Files:** `lib/repositories/` (14 files)

Each repository receives the Prisma client via constructor injection and owns all database queries for its entity. All queries are **tenant-scoped** — every `findMany`, `findFirst`, `create`, etc. includes `tenantId` in the `where` clause.

| Repository | Entity / Purpose |
|---|---|
| `user.repository.ts` | User lookups, password update, last login update |
| `tenant.repository.ts` | Tenant creation, find by slug |
| `department.repository.ts` | Department CRUD with tenant scoping |
| `program.repository.ts` | Program CRUD, department linkage |
| `academicSession.repository.ts` | Session CRUD, current session enforcement |
| `student.repository.ts` | Student registration, paginated lists, risk level updates |
| `feeStructure.repository.ts` | Fee template CRUD |
| `feeAssignment.repository.ts` | Fee assignment creation, status updates, defaulter queries |
| `payment.repository.ts` | Payment creation, Stripe PI lookup, fulfillment (atomic transaction) |
| `webhook.repository.ts` | Idempotent webhook event storage (WebhookEvent table) |
| `vc.repository.ts` | Complex aggregated analytics queries for VC dashboard |
| `activityLog.repository.ts` | Append-only activity feed writes |
| `insight.repository.ts` | Smart insight CRUD (create/read/mark-read) |
| `audit.repository.ts` | Append-only audit log writes |

---

## Component 8: Database Layer

**Physical Artifacts:**
- `prisma/schema.prisma` — Full Prisma schema (658 lines, 15 models)
- `app/generated/prisma/` — Auto-generated Prisma Client executable
- `lib/prisma.ts` — Singleton `PrismaClient` with `globalThis` pattern + `PrismaPg` adapter
- `prisma/migrations/` — SQL migration files applied to PostgreSQL

**Database Models:**

| Model | Purpose |
|---|---|
| `Tenant` | One row per university. Root of all multi-tenant data. |
| `User` | All roles (SUPER_ADMIN, ADMIN, VC, HOD, STUDENT) in one table |
| `RefreshToken` | Persistent sessions, "logout all devices" support |
| `PasswordResetToken` | One-time SHA-256 hashed reset tokens |
| `AcademicSession` | Batch/year groups (e.g., 2024-2028) |
| `Department` | CS, Biology, Physics, Mathematics |
| `Program` | BS CS, MCS, MS Physics, etc. within departments |
| `Student` | Academic profile extending User, with denormalized fee snapshot and risk metrics |
| `FeeStructure` | Fee template per program+semester (tuition, lab, library, sports, exam fees) |
| `FeeAssignment` | "Student X owes PKR 50,000 for semester 4" — individual fee record |
| `Payment` | Immutable financial transaction record. Never deleted. |
| `WebhookEvent` | Idempotent Stripe webhook log (prevents double processing) |
| `EmailLog` | Every email ever sent — for compliance and resend |
| `Notification` | In-app bell notifications |
| `AuditLog` | Append-only, immutable action history for compliance |
| `ActivityLog` | Real-time VC feed entries (payment events) |
| `Insight` | AI-computed fee collection alerts, predictions, risk flags |
| `Subscription` | SaaS billing records (schema ready, billing implemented later) |

**Connection:** PostgreSQL via `pg` connection pool → `PrismaPg` adapter → `PrismaClient`

---

## Component 9: Redis Cache & Pub/Sub Engine

**Physical Files:**
- `lib/redis.ts` — `redisPublisher` singleton + `createRedisSubscriber()` factory
- `lib/cache.ts` — Next.js `unstable_cache` wrappers with tenant-scoped tags
- `lib/sse.ts` — `broadcastPayment()` and `broadcastInsightsUpdated()` publisher helpers

**Two distinct uses of Redis:**

**1. Pub/Sub for Real-Time Events:**
- Channel naming: `sse:payments:{tenantId}`
- When a Stripe webhook confirms payment → `WebhookService` calls `broadcastPayment()` → `redisPublisher.publish(channel, event)`
- The SSE endpoint (`/api/vc/live`) creates a **dedicated subscriber connection** per connected browser tab using `createRedisSubscriber()`
- The subscriber relays messages to the browser's `ReadableStream` as SSE data frames
- 30-second keepalive pings prevent connection timeouts

**2. Next.js Data Cache (tag-based invalidation):**
- Tenant-scoped cache tags: `departments-{tenantId}`, `students-{tenantId}`, `student-fee-{tenantId}-{userId}`, etc.
- Admin mutations call `revalidateTag()` → invalidates only affected tenant's cached data
- After payment fulfillment → `revalidateStudentFee()` busts the student's fee cache instantly

---

## Component 10: Server-Sent Events (SSE) Endpoint

**Physical File:** `app/api/vc/live/route.ts`

**What it does:**
- `GET /api/vc/live` — persistent HTTP connection from browser to server
- Requires `VC` or `ADMIN` role (enforced via `requireRole()`)
- Creates a Redis subscriber, subscribes to `sse:payments:{tenantId}`
- Returns a `ReadableStream` with `Content-Type: text/event-stream`
- Streams JSON events to the browser: `PaymentSuccess` and `InsightsUpdated`
- On browser disconnect: unsubscribes from Redis, quits subscriber connection, clears keepalive timer
- Prevents data leaks: each connection is scoped to the authenticated tenant's channel

---

## Component 11: Intelligent Insights Engine (Cron)

**Physical Files:**
- `app/api/cron/fee-insights/route.ts` — HTTP trigger endpoint
- `lib/controllers/cron.controller.ts` — Orchestrates multi-tenant insight computation
- `lib/services/vc.service.ts` → `computeFeeInsights()` — Core intelligence algorithm

**Insight types computed nightly:**

| Insight Type | Logic |
|---|---|
| `ALERT / HIGH` | Department ≥15% below campus payment average → "CS dept is 22% below average, 38 students unpaid" |
| `ALERT / CRITICAL` | Deadline ≤3 days away with unpaid students → "Deadline in 2 days. 45 students unpaid. Expected loss: PKR 2.25M" |
| `SUCCESS / LOW` | Collection rate >90% with 5+ days remaining → "92% paid, best performance this session" |
| `PREDICTION / MEDIUM` | Daily collection rate extrapolation → "At PKR 120K/day, full collection by May 3" |
| `RISK / HIGH` | Students with 3+ consecutive late payments → "12 students flagged HIGH RISK" |

**Flow:** Cron hits `/api/cron/fee-insights` → `CronController.processFeeInsights()` → fetches all active tenants → for each tenant: `VCService.computeFeeInsights()` → deletes old insights → computes new ones → persists to `Insight` table → `broadcastInsightsUpdated()` → VC dashboard refreshes in real-time

---

## Component 12: Stripe Payment Integration

**Physical Files:**
- `lib/stripe/stripe.server.ts` — Server-side `Stripe` SDK instance (secret key, `maxNetworkRetries: 2`)
- `lib/stripe/stripe.client.ts` — Browser-side `loadStripe()` promise (publishable key)
- `lib/services/payment.service.ts` — Creates `PaymentIntent` with full metadata
- `lib/services/webhook.service.ts` — Processes `payment_intent.succeeded`, `.payment_failed`, `.processing`
- `lib/repositories/webhook.repository.ts` — Idempotent `WebhookEvent` storage

**Payment flow:**
```
1. Student → POST /api/payments (createintent)
   → PaymentService creates Stripe PI with metadata:
     { tenantId, studentId, feeAssignmentId, studentRollNo, programName, semesterName }
   → Saves Payment record (status: PENDING) in DB
   → Returns clientSecret to browser

2. Browser → Stripe Elements collects card → confirms PI
   → Stripe calls POST /api/webhooks/stripe

3. WebhookService:
   → Verifies STRIPE_WEBHOOK_SECRET signature
   → Checks idempotency (WebhookEvent table)
   → Calls paymentRepo.fulfilPayment() in Prisma transaction:
      - Payment.status = COMPLETED
      - FeeAssignment.amountPaid += amount, status = PAID
      - Student.totalFeePaid += amount, feeStatus = PAID
   → Broadcasts PaymentSuccess SSE event
   → Writes ActivityLog entry
   → Revalidates student fee cache
```

---

## Component 13: Email Notification Engine

**Physical Files:**
- `lib/services/email.service.ts` — SendGrid API wrapper
- `lib/email/templates.ts` — HTML email templates (welcome, receipt, fee reminder, password reset)
- `lib/validators/` — All input schemas

**Emails sent:**
- **Account Created:** When Admin creates VC/HOD/Student → temporary password + login link
- **Fee Receipt:** After successful payment (triggered by webhook handler)
- **Fee Reminder:** 7 days, 3 days, 1 day before due date (triggered by cron)
- **Password Reset:** Forgot-password flow (schema exists, UI implementation pending)

---

## Component 14: Frontend State Management

**Physical Files:**
- `store/index.ts` — Redux `configureStore()` with RTK Query
- `store/slices/authSlice.ts` — Client-side auth state
- `store/slices/uiSlice.ts` — UI state (modals, sidebar)
- `store/api/baseApi.ts` — RTK Query base with `credentials: include`
- `store/api/baseQuery.ts` — Custom fetch base query
- `store/api/admin/` — 7 API slices: departments, programs, sessions, students, users, fee structures, assignments
- `store/api/student/studentApi.ts` — Student fee and profile queries
- `store/api/vc/vcApi.ts` — VC dashboard, analytics, insights queries
- `store/api/tenantApi.ts` — Tenant creation (Super Admin)
- `store/middleware/error.middleware.ts` — Global RTK Query error handler
- `hooks/useAuth.ts`, `useSSE.ts`, `useDebounce.ts`, `useCreateTenant.ts`

**Pattern:** All server state is managed by RTK Query (auto-caching, re-fetching, optimistic updates). Global UI state is in Redux slices. The SSE hook (`useSSE`) connects to `/api/vc/live` and dispatches `vcApi.invalidateTags()` on incoming events to trigger automatic UI refresh.

---

## Component 15: UI Component Library

**Physical Files — VC Dashboard:**
- `components/vc/VCOverviewCards.tsx` — KPI stat cards (total collected, payment rate, defaulters)
- `components/vc/VCDashboardPanels.tsx` — Department performance charts and live feed
- `components/vc/VCAnalyticsPanels.tsx` — Trend charts, semester breakdowns, method breakdown
- `components/vc/VCStudentsTable.tsx` — Paginated student ledger with search/filter
- `components/vc/VCFilterBar.tsx` — Date range, department, program, semester, fee status filters
- `components/vc/VCLiveFeed.tsx` — Real-time payment activity feed
- `components/vc/InsightsPanel.tsx` — AI-generated alerts, predictions, risk flags panel

**Physical Files — Shared:**
- `components/layout/Sidebar.tsx` — Role-aware navigation sidebar
- `components/layout/Navbar.tsx` — Top bar with user info and notifications
- `components/shared/StatusBadge.tsx` — Color-coded fee/enrollment status badges
- `components/shared/ConfirmDialog.tsx` — Reusable confirmation modal
- `components/shared/EmptyState.tsx` — Empty data state component
- `components/superadmin/CreateTenantModal.tsx` — Multi-tenant university creation form

**Physical Files — Boneyard Skeleton UI:**
- `bones/` — 11 JSON skeleton definition files for loading states
  - `students-table.bones.json`, `users-table.bones.json`, `departments-table.bones.json`, `programs-table.bones.json`, `sessions-table.bones.json`, `ledger-summary.bones.json`, `ledger-transactions.bones.json`, `active-liabilities.bones.json`, `student-fee-card.bones.json`, `student-profile-header.bones.json`
- `bones/registry.js` — Skeleton component registry

---

## Component 16: Type System

**Physical Files:**
- `types/server/` — 13 TypeScript type definition files for all server-side data shapes
- `types/client/` — Client-side type definitions
- `lib/validators/` — 11 Zod schema files for runtime validation

| Validator | Schemas |
|---|---|
| `auth.validators.ts` | LoginSchema, ChangePasswordSchema |
| `admin.validators.ts` | CreateUserSchema, UpdateUserSchema, CreateStudentSchema |
| `department.validators.ts` | CreateDepartmentSchema |
| `program.validators.ts` | CreateProgramSchema |
| `session.validators.ts` | CreateSessionSchema |
| `feeAssignment.validators.ts` | AssignFeeSchema |
| `payment.validators.ts` | InitiatePaymentSchema |
| `superadmin.validators.ts` | CreateTenantSchema |
| `vc.validators.ts` | VCFilterSchema |

---

## Component 17: Application Configuration & Seed

**Physical Files:**
- `lib/env.ts` — Zod-validated environment variable declarations (app crashes on startup if any required var is missing)
- `lib/logger.ts` — Pino structured logger (JSON in production, pretty-printed in development)
- `config/constants.ts` — Domain constants: departments, programs, semesters, sessions, currency formatting
- `config/site.ts` — Application-level configuration
- `next.config.ts` — Next.js build configuration
- `tsconfig.json` — TypeScript strict mode configuration
- `seed/index.ts` — Database seeder (creates GCUF tenant, SUPER_ADMIN, ADMIN, VC, STUDENT accounts with `Noman@123`)
- `seed/cleanup.ts` — Test data teardown script

---

## Physical Deployment Architecture

```
VPS Server (Hetzner/Hostinger)
│
├── PM2 Process Manager
│   ├── Process 1: next start (Next.js HTTP Server — port 3000)
│   └── Process 2: Background Jobs (email queue, cron scheduler)
│
├── Nginx (Reverse Proxy)
│   ├── SSL/TLS via Certbot (Let's Encrypt)
│   └── Proxies port 80/443 → port 3000
│
├── PostgreSQL Server — primary data store
│
└── Redis Server (Upstash cloud / self-hosted)
    ├── Publisher: SSE event broadcasting
    └── Subscriber: per-connection SSE streams
```

---

## Component Interface Summary Table

| Component | Provides | Requires |
|---|---|---|
| Auth Middleware | Authenticated request context headers | JWT_SECRET, auth-token cookie |
| DI Container | Singleton controller instances | PrismaClient, all service/repo classes |
| Route Handler Engine | Error-safe API wrapper, structured JSON | Logger, AppError classes |
| API Route Handlers | REST endpoints | DI controllers, auth context |
| Controllers | Business orchestration | Services |
| Services | Business logic execution | Repositories, external clients |
| Repositories | Type-safe DB queries | PrismaClient |
| PostgreSQL + Prisma | Persistent data storage | DATABASE_URL |
| Redis | Pub/Sub messaging, cache invalidation | REDIS_URL |
| SSE Endpoint | Real-time event stream | Redis subscriber, JWT auth |
| Insights Engine (Cron) | Automated AI fee alerts | VCService, all active tenants |
| Stripe Server | Payment intent creation, webhook verification | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET |
| Stripe Client | Browser payment UI | NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY |
| Email Engine | Transactional email delivery | SENDGRID_API_KEY, templates |
| Redux + RTK Query | Client-side state and API caching | All API endpoints |
| UI Components | Rendered dashboard interfaces | Redux store, RTK Query hooks |
| Zod Validators | Runtime schema validation | Called by every controller |
| Audit Logger | Immutable action history | PrismaClient (AuditLog table) |
