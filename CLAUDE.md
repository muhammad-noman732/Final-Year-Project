# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run seed         # Seed database (tsx seed/index.ts)
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio
```

There is no test suite configured.

## Architecture

### Roles

Five roles drive every access-control decision:

| Role | tenantId | Scope |
|------|----------|-------|
| `SUPER_ADMIN` | `null` | All tenants (product company) |
| `ADMIN` | set | Full control within their university |
| `VC` | set | Read-only analytics for their university |
| `HOD` | set | Filtered view of their department |
| `STUDENT` | set | Their own fee data only |

### Request Lifecycle

```
Browser → middleware (lib/proxies/auth.proxy.ts)
        → injects x-user-id, x-user-role, x-tenant-id headers
        → route handler (app/api/**) wrapped in withErrorHandler
        → controller (lib/controllers/) via DI container (lib/di.ts)
        → service (lib/services/) — business logic, audit logging
        → repository (lib/repositories/) — Prisma queries
```

All routes are thin: they call one controller method and return its result. Controllers inject auth context via `getAuthUser()` / `getTenantContext()` / `requireRole()` from `lib/auth.ts`.

### Middleware (lib/proxies/auth.proxy.ts)

- Verifies JWT from the `auth-token` httpOnly cookie using `jose`
- Injects decoded claims as request headers consumed by route handlers
- Enforces role→route mapping (redirect on mismatch)
- Forces password change on first login
- `BONEYARD_BYPASS=true` env var mocks auth headers for automated testing tools

### Dependency Injection

`lib/di.ts` exports all singletons wired as: repositories → services → controllers. Import controllers from there; do not instantiate them manually.

### Multi-Tenancy

Every data-bearing model has a `tenantId` FK. `getTenantContext()` in `lib/auth.ts` returns the calling user's tenant and throws if none exists — use it in every admin/vc/hod/student route to prevent cross-tenant data leaks.

### Payment Flow

1. Admin creates `FeeStructure` (per program + semester + year)
2. Admin assigns fees → `FeeAssignment` rows created per student
3. Student triggers checkout → service creates a Stripe `PaymentIntent` with metadata `{ tenantId, studentId, feeAssignmentId }`
4. Frontend uses `clientSecret` to complete payment via `@stripe/react-stripe-js`
5. Stripe fires `payment_intent.succeeded` → `/api/webhooks/stripe`
6. Webhook handler (idempotent via `stripeEventId` deduplication in `WebhookEvent` table) marks `Payment` as COMPLETED, updates `FeeAssignment.status`, denormalizes totals onto `Student`, sends receipt email + in-app notification

All monetary amounts are stored as **integers (PKR)** — never floats.

### Key Patterns

**Route handler:**
```typescript
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { fooController } from "@/lib/di"

export const GET = withErrorHandler(async (req: NextRequest) => {
  return fooController.getAll(req)
})
```

**Auth guard in a controller/service:**
```typescript
const { tenantId, userId } = await getTenantContext() // throws if unauthenticated or no tenant
await requireRole(Role.ADMIN)                         // throws 403 if wrong role
```

**Request validation:** Zod schemas live in `lib/validators/`. Parse with `.parse(body)` — `withErrorHandler` catches `ZodError` and returns a 400.

**Audit logging:** Call helpers in `lib/audit.ts` for every mutation. Audit logs are append-only (never updated or deleted).

### Data Model Highlights

- `Tenant` → owns all other entities
- `User` → one per login; STUDENT users link 1:1 to a `Student` profile
- `FeeStructure` → template (tuition, lab, library, sports, registration, exam amounts)
- `FeeAssignment` → "student X owes this structure"; tracks `amountDue`, `amountPaid`, `status`
- `Payment` → immutable transaction record; no cascade delete
- `WebhookEvent` → Stripe deduplication log
- `AuditLog` / `EmailLog` → compliance records, never deleted

`FeeStatus` enum: `UNPAID | PARTIAL | PAID | OVERDUE | WAIVED`  
`PaymentStatus` enum: `PENDING | PROCESSING | COMPLETED | FAILED | REFUNDED | EXPIRED`

### Directory Map

| Path | Purpose |
|------|---------|
| `app/(auth)` | Public login / password-change pages |
| `app/(dashboard)/(admin\|vc\|hod\|student\|superadmin)` | Role-gated dashboard UIs |
| `app/api/{admin,vc,hod,student,superadmin}` | Role-scoped REST endpoints |
| `app/api/webhooks/stripe` | Stripe webhook handler |
| `lib/controllers` | Thin request-handler layer |
| `lib/services` | Business logic (auth, payment, email, analytics) |
| `lib/repositories` | Prisma query abstraction |
| `lib/validators` | Zod schemas |
| `lib/proxies` | Middleware chain (auth, CORS, security headers) |
| `lib/di.ts` | DI wiring — single source of truth for all singletons |
| `lib/auth.ts` | `getAuthUser`, `getTenantContext`, `requireRole` helpers |
| `lib/stripe/server.ts` | Stripe SDK client (server-only) |
| `lib/email` | SendGrid email templates |
| `lib/utils/routeHandler.ts` | `withErrorHandler` wrapper |
| `lib/audit.ts` | Audit log helpers |
| `components` | Shared UI; sub-folders per role |
| `hooks` | Custom React hooks (`useAuth`, `useSSE`, etc.) |
| `config` | Site constants, role→route map |
| `prisma` | Schema + migrations |
| `seed` | Database seed script |

## Environment Variables

```env
DATABASE_URL=postgresql://...
JWT_SECRET=<32+ char secret>
JWT_EXPIRES_IN=7d
SENDGRID_API_KEY=...
FROM_EMAIL=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Optional: BONEYARD_BYPASS=true  — mocks auth for automated testing tools
```

## Tech Stack

Next.js 16 (App Router) · PostgreSQL + Prisma v7 · JWT/httpOnly cookies (`jose`) · Stripe · SendGrid · Redux Toolkit · Radix UI + shadcn + Tailwind CSS · Zod · React Hook Form · Recharts · Pino
