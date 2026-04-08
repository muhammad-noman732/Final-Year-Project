# GCUF University Fee Management System — Project Context

> **Read this file completely before writing any code.**
> This is the single source of truth for the entire project.
> Every decision, every architectural choice, every standard is documented here.

---

## 1. WHAT WE ARE BUILDING

A **multi-tenant, real-time university fee management SaaS** that replaces GCUF's manual fee collection process.

### The Problem We Are Solving

Current manual process at GCUF:
- Student pays fee at bank → gets physical stamped voucher
- Submits voucher to department teacher → teacher manually verifies
- Teacher forwards to admin → admin updates spreadsheets
- Vice Chancellor receives monthly reports (always outdated)

### Our Automated Solution

```
Student logs in → sees fee → pays via Stripe → gets digital receipt instantly
Admin sees payment in real-time → no manual verification needed
VC dashboard updates live without refresh → sees everything happening now
```

---

## 2. TECH STACK (FINAL — DO NOT CHANGE)

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router + TypeScript (strict mode) |
| Database | PostgreSQL + Prisma ORM |
| Cache / Pub-Sub | Redis (ioredis) |
| Background Jobs | BullMQ (runs on VPS as persistent process) |
| Auth | Custom JWT (httpOnly cookies) + bcryptjs |
| Payment | Stripe only (no JazzCash, no EasyPaisa) |
| Email | sendgrid|
| Real-Time | Server-Sent Events (SSE) |
| Deployment | VPS (Hetzner/Hostinger) — |
| Process Manager | PM2 (Next.js app + BullMQ workers + cron jobs) |
| Reverse Proxy | Nginx + SSL via Certbot |

**Critical deployment note:** This runs on a VPS as a long-running Node.js process. It is NOT serverless(but maybe in future use this as well as for now we are developing). BullMQ works correctly. No connection pooling workarounds needed. One global PrismaClient instance, one global Redis client instance.

---

## 3. MULTI-TENANT ARCHITECTURE

The system is multi-tenant. Every university is a **Tenant**. Every database table has `tenantId`. Every query is scoped by `tenantId` from the JWT.

### Tenant Isolation Rule

```typescript
// WRONG — never do this
const students = await prisma.student.findMany()

// CORRECT — always scope by tenantId from JWT
const { tenantId } = getTenantContext()
const students = await prisma.student.findMany({ where: { tenantId } })
```

`tenantId` always comes from the verified JWT via `getTenantContext()`.
Never trust `tenantId` from the request body.

### What Is Built Now vs Later

**Build now (required for submission):**
- Full tenant data isolation (tenantId on every query)
- Super admin can create university tenants
- Super admin can create university admin accounts
- All role dashboards working end to end

**Schema exists but implement later:**
- Subscription billing (Stripe subscriptions)
- Plan limits enforcement
- Super admin analytics dashboard

---

## 4. USER ROLES AND COMPLETE FLOW

### Roles

```
SUPER_ADMIN  → You (the product company). Created by seeding only.
ADMIN        → University registrar. Created by SUPER_ADMIN.
VC           → Vice Chancellor. Created by ADMIN.
HOD          → Head of Department. Created by ADMIN.
STUDENT      → Student. Created by ADMIN.
```

### Complete User Journey

```
SUPER_ADMIN (seeded in DB)
  └── Logs in → creates GCUF tenant → creates GCUF Admin account
      └── System emails Admin: temp password + login link

GCUF ADMIN
  └── Receives email → first login → forced to change password
      └── Creates VC, HOD, Student accounts → each receives email with temp password

VC / HOD / STUDENT
  └── Each receives email → first login → change password → their dashboard
      └── All data scoped to GCUF tenantId automatically
```

### First Login Flow

Every created user has `isFirstLogin: true` in DB.
JWT contains `isFirstLogin` flag.
Middleware detects it → redirects to `/changepassword`.
After password change → `isFirstLogin = false` → normal dashboard.

### Login Redirect By Role

```
SUPER_ADMIN  → /superadmin
ADMIN        → /admin
VC           → /vc
HOD          → /hod
STUDENT      → /student
```

---

## 5. COMPLETE PRISMA SCHEMA

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tenant {
  id           String   @id @default(cuid())
  name         String
  shortName    String
  slug         String   @unique
  domain       String?  @unique
  logoUrl      String?
  isActive     Boolean  @default(true)
  plan         Plan     @default(FREE)
  maxStudents  Int      @default(500)
  trialEndsAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  users            User[]
  departments      Department[]
  programs         Program[]
  academicSessions AcademicSession[]
  students         Student[]
  feeStructures    FeeStructure[]
  feeAssignments   FeeAssignment[]
  payments         Payment[]
  notifications    Notification[]
  auditLogs        AuditLog[]
  subscription     Subscription?

  @@index([slug])
}

model User {
  id              String    @id @default(cuid())
  tenantId        String
  tenant          Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  email           String
  password        String
  name            String
  phone           String?
  avatarUrl       String?
  role            Role
  isActive        Boolean   @default(true)
  isFirstLogin    Boolean   @default(true)
  lastLoginAt     DateTime?
  hodDepartmentId String?
  hodDepartment   Department? @relation("HODDepartment", fields: [hodDepartmentId], references: [id])
  student         Student?
  refreshTokens   RefreshToken[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([tenantId, email])
  @@index([tenantId])
  @@index([tenantId, role])
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}

model AcademicSession {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  name      String
  startYear Int
  endYear   Int
  isCurrent Boolean  @default(false)
  students  Student[]
  createdAt DateTime @default(now())

  @@unique([tenantId, name])
  @@index([tenantId])
  @@index([tenantId, isCurrent])
}

model Department {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  name      String
  code      String
  isActive  Boolean  @default(true)
  hods      User[]   @relation("HODDepartment")
  programs  Program[]
  students  Student[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([tenantId, code])
  @@index([tenantId])
}

model Program {
  id             String     @id @default(cuid())
  tenantId       String
  tenant         Tenant     @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  departmentId   String
  department     Department @relation(fields: [departmentId], references: [id])
  name           String
  code           String
  durationYears  Int        @default(4)
  totalSemesters Int        @default(8)
  isActive       Boolean    @default(true)
  students       Student[]
  feeStructures  FeeStructure[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  @@unique([tenantId, code])
  @@index([tenantId])
  @@index([departmentId])
}

model Student {
  id               String           @id @default(cuid())
  tenantId         String
  tenant           Tenant           @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  userId           String           @unique
  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  studentId        String
  cnic             String?
  sessionId        String
  session          AcademicSession  @relation(fields: [sessionId], references: [id])
  departmentId     String
  department       Department       @relation(fields: [departmentId], references: [id])
  programId        String
  program          Program          @relation(fields: [programId], references: [id])
  currentSemester  Int              @default(1)
  enrollmentStatus EnrollmentStatus @default(ACTIVE)
  feeAssignments   FeeAssignment[]
  payments         Payment[]
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt

  @@unique([tenantId, studentId])
  @@index([tenantId])
  @@index([tenantId, departmentId])
  @@index([tenantId, currentSemester])
  @@index([tenantId, enrollmentStatus])
}

model FeeStructure {
  id              String        @id @default(cuid())
  tenantId        String
  tenant          Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  programId       String
  program         Program       @relation(fields: [programId], references: [id])
  semester        Int
  sessionYear     Int
  tuitionFee      Int
  labFee          Int           @default(0)
  libraryFee      Int           @default(0)
  sportsFee       Int           @default(0)
  registrationFee Int           @default(0)
  examinationFee  Int           @default(0)
  otherFee        Int           @default(0)
  totalFee        Int
  dueDate         DateTime
  lateFee         Int           @default(0)
  isActive        Boolean       @default(true)
  assignments     FeeAssignment[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@unique([tenantId, programId, semester, sessionYear])
  @@index([tenantId])
  @@index([tenantId, isActive])
}

model FeeAssignment {
  id             String       @id @default(cuid())
  tenantId       String
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  studentId      String
  student        Student      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  feeStructureId String
  feeStructure   FeeStructure @relation(fields: [feeStructureId], references: [id])
  amountDue      Int
  amountPaid     Int          @default(0)
  lateFeeApplied Int          @default(0)
  status         FeeStatus    @default(UNPAID)
  dueDate        DateTime
  challanNumber  String?      @unique
  challanUrl     String?
  payments       Payment[]
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@unique([studentId, feeStructureId])
  @@index([tenantId])
  @@index([tenantId, status])
  @@index([tenantId, dueDate])
  @@index([tenantId, status, dueDate])
  @@index([studentId])
}

model Payment {
  id                    String        @id @default(cuid())
  tenantId              String
  tenant                Tenant        @relation(fields: [tenantId], references: [id])
  studentId             String
  student               Student       @relation(fields: [studentId], references: [id])
  feeAssignmentId       String
  feeAssignment         FeeAssignment @relation(fields: [feeAssignmentId], references: [id])
  amount                Int
  method                PaymentMethod
  status                PaymentStatus @default(PENDING)
  stripePaymentIntentId String?       @unique
  stripeResponse        Json?
  challanNumber         String?
  challanDueDate        DateTime?
  verifiedById          String?
  verifiedAt            DateTime?
  receiptNumber         String        @unique
  receiptUrl            String?
  paidAt                DateTime?
  ipAddress             String?
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  @@index([tenantId])
  @@index([tenantId, studentId])
  @@index([tenantId, status])
  @@index([tenantId, createdAt])
  @@index([tenantId, status, createdAt])
  @@index([stripePaymentIntentId])
}

model Notification {
  id        String              @id @default(cuid())
  tenantId  String
  tenant    Tenant              @relation(fields: [tenantId], references: [id])
  userId    String
  type      NotificationType
  title     String
  body      String
  data      Json?
  isRead    Boolean             @default(false)
  readAt    DateTime?
  channel   NotificationChannel @default(IN_APP)
  sentAt    DateTime?
  createdAt DateTime            @default(now())

  @@index([tenantId, userId, isRead])
  @@index([tenantId, createdAt])
  @@index([userId])
}

model AuditLog {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  userId    String?
  action    String
  entity    String
  entityId  String
  oldData   Json?
  newData   Json?
  ipAddress String?
  createdAt DateTime @default(now())

  @@index([tenantId, createdAt])
  @@index([tenantId, entity, entityId])
  @@index([tenantId, userId])
}

model Subscription {
  id                 String             @id @default(cuid())
  tenantId           String             @unique
  tenant             Tenant             @relation(fields: [tenantId], references: [id])
  plan               Plan
  status             SubscriptionStatus
  stripeCustomerId   String?            @unique
  stripePriceId      String?
  stripeSubId        String?            @unique
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean            @default(false)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
}

enum Role {
  SUPER_ADMIN
  ADMIN
  VC
  HOD
  STUDENT
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}

enum SubscriptionStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
}

enum FeeStatus {
  UNPAID
  PARTIAL
  PAID
  OVERDUE
  WAIVED
}

enum PaymentMethod {
  STRIPE_CARD
  BANK_CHALLAN
  WAIVER
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  EXPIRED
}

enum EnrollmentStatus {
  ACTIVE
  SUSPENDED
  GRADUATED
  WITHDRAWN
}

enum NotificationType {
  FEE_ASSIGNED
  FEE_DUE
  FEE_OVERDUE
  PAYMENT_RECEIVED
  PAYMENT_FAILED
  CHALLAN_GENERATED
  DEADLINE_EXTENDED
  ACCOUNT_CREATED
}

enum NotificationChannel {
  IN_APP
  EMAIL
}
```

---

## 6. FOLDER STRUCTURE

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── changepassword/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── superadmin/
│   │   │   ├── page.tsx
│   │   │   ├── universities/page.tsx
│   │   │   └── layout.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── fees/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── layout.tsx
│   │   ├── vc/
│   │   │   ├── page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── monitoring/page.tsx
│   │   │   └── layout.tsx
│   │   ├── hod/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── student/
│   │   │   ├── page.tsx
│   │   │   ├── payfee/page.tsx
│   │   │   ├── paymentsuccess/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── changepassword/route.ts
│   │   ├── superadmin/
│   │   │   └── tenants/route.ts
│   │   ├── admin/
│   │   │   ├── users/route.ts
│   │   │   ├── students/route.ts
│   │   │   └── fees/
│   │   │       ├── structures/route.ts
│   │   │       └── assignments/route.ts
│   │   ├── student/
│   │   │   ├── fee/route.ts
│   │   │   └── payments/route.ts
│   │   ├── payments/
│   │   │   ├── createintent/route.ts
│   │   │   └── webhook/route.ts
│   │   ├── analytics/
│   │   │   └── dashboard/route.ts
│   │   └── sse/
│   │       └── payments/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                    (shadcn auto-generated)
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── ChangePasswordForm.tsx
│   ├── student/
│   │   ├── FeeCard.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── PaymentHistory.tsx
│   │   └── CountdownTimer.tsx
│   ├── admin/
│   │   ├── DashboardStats.tsx
│   │   ├── StudentsTable.tsx
│   │   ├── AddStudentModal.tsx
│   │   ├── FeeStructureForm.tsx
│   │   └── LivePaymentFeed.tsx
│   ├── vc/
│   │   ├── StatsCards.tsx
│   │   ├── DepartmentCards.tsx
│   │   ├── LiveActivityFeed.tsx
│   │   ├── FilterPanel.tsx
│   │   └── charts/
│   │       ├── LineChart.tsx
│   │       ├── BarChart.tsx
│   │       ├── PieChart.tsx
│   │       └── StackedBarChart.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardHeader.tsx
│   └── shared/
│       ├── StatusBadge.tsx
│       ├── LoadingSkeleton.tsx
│       ├── EmptyState.tsx
│       └── NotificationPanel.tsx
├── lib/
│   ├── prisma.ts
│   ├── redis.ts
│   ├── env.ts
│   ├── errors.ts
│   ├── response.ts
│   ├── routeHandler.ts
│   ├── logger.ts
│   ├── retry.ts
│   ├── timeout.ts
│   ├── rateLimit.ts
│   ├── auth.ts
│   ├── jwt.ts
│   ├── audit.ts
│   └── paginate.ts
├── lib/validators/
│   ├── auth.validators.ts
│   ├── student.validators.ts
│   ├── fee.validators.ts
│   └── payment.validators.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useSSE.ts
│   ├── useStats.ts
│   ├── usePayment.ts
│   └── useCountdown.ts
├── store/
│   ├── store.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── vcSlice.ts
│   └── api/
│       ├── authApi.ts
│       ├── studentApi.ts
│       └── paymentApi.ts
├── types/
│   ├── auth.ts
│   ├── student.ts
│   ├── fee.ts
│   ├── payment.ts
│   └── vc.ts
└── middleware.ts
```

### Naming Conventions

- Components: PascalCase (`LoginForm.tsx`, `FeeCard.tsx`)
- Pages: route folders lowercase no dashes (`payfee/`, `changepassword/`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Lib files: camelCase (`routeHandler.ts`, `rateLimit.ts`)
- Validators: `name.validators.ts`
- API route folders: lowercase no dashes (`createintent/`, `changepassword/`)

---

## 7. PRODUCTION ENGINEERING STANDARDS

### 7a. Build These Files First — Before Any API Route

In this exact order before touching any route or page:

1. `src/lib/env.ts` — Zod env validation, app crashes on startup if vars missing
2. `src/lib/logger.ts` — Structured logger, JSON in production
3. `src/lib/errors.ts` — AppError, NotFoundError, UnauthorizedError, ForbiddenError, ValidationError, ConflictError, RateLimitError, ServiceUnavailableError
4. `src/lib/response.ts` — successResponse + errorResponse (handles Zod + AppError + Prisma errors)
5. `src/lib/routeHandler.ts` — withErrorHandler wrapper (the global error handler equivalent)
6. `src/lib/prisma.ts` — Singleton PrismaClient with globalThis pattern
7. `src/lib/redis.ts` — Singleton Redis client with reconnect logic
8. `src/lib/jwt.ts` — signJWT, verifyJWT
9. `src/lib/auth.ts` — getTenantContext (reads from request headers set by middleware)
10. `src/lib/retry.ts` — withRetry with exponential backoff + jitter
11. `src/lib/timeout.ts` — withTimeout for external service calls
12. `src/lib/rateLimit.ts` — Redis-based rate limiting with pre-defined limiters
13. `src/lib/audit.ts` — createAuditLog helper
14. `src/lib/paginate.ts` — Paginate helper using prisma.$transaction
15. All files in `src/lib/validators/`

### 7b. The Route Handler Pattern

No try-catch inside route handlers. `withErrorHandler` catches everything.

```typescript
// Every route must look exactly like this
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { tenantId } = getTenantContext()
  const students = await prisma.student.findMany({ where: { tenantId } })
  return successResponse(students)
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { tenantId } = getTenantContext()
  const body = await req.json()
  const data = createStudentSchema.parse(body)  // throws ZodError → caught by withErrorHandler
  const student = await prisma.student.create({ data: { ...data, tenantId } })
  return successResponse(student, 201)
})
```

### 7c. API Response Shape — Always This Structure

```typescript
type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    fields?: Record<string, string[]>  // only for validation errors
  }
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### 7d. The 15 Rules — Never Break These

1. Create all `src/lib/` files before writing any route
2. Every route handler wrapped with `withErrorHandler` — no exceptions
3. Never use try-catch inside a route handler
4. Never use `console.log` — always use `logger`
5. Never access `process.env` directly — always use `env` from `src/lib/env.ts`
6. Never return unbounded lists — always paginate
7. Every external call (Stripe, Resend) wrapped with `withRetry`
8. Every external call wrapped with `withTimeout`
9. Every POST/PATCH/DELETE validates body with Zod `.parse()`
10. Every list route validates query params with Zod
11. Never expose raw Prisma errors or stack traces to client
12. Every multi-table write uses `prisma.$transaction`
13. Every important action creates an `AuditLog` record
14. Every mutating route checks rate limits first
15. `tenantId` always from JWT via `getTenantContext()` — never from request body

### 7e. TypeScript Rules

- `strict: true` in tsconfig always
- Never use `any` — use `unknown` then narrow
- Always define return types on functions
- Always define types for all parameters
- Use `z.infer<typeof schema>` for Zod-derived types

---

## 8. REDIS USAGE MAP

| Usage | Key Pattern | TTL | Invalidate On |
|---|---|---|---|
| Session cache | `session:{userId}` | 7 days | Logout |
| Dashboard stats | `stats:{tenantId}` | 30 seconds | Any payment |
| Department stats | `dept:{tenantId}:{deptId}` | 60 seconds | Payment in dept |
| Rate limit login | `ratelimit:login:{ip}` | 15 minutes | — |
| Rate limit payment | `ratelimit:payment:{studentId}` | 60 seconds | — |
| Idempotency key | `idempotent:payment:{studentId}:{feeId}` | 5 minutes | Payment completes |
| Real-time channel | `payments:{tenantId}` pub/sub | — | — |

### Real-Time Flow

```
Payment completes
  → redis.publish(`payments:${tenantId}`, eventData)
  → SSE endpoint receives from Redis channel
  → SSE streams to all connected browsers
  → VC/Admin React state updates
  → Numbers increment live — no page refresh
```

---

## 9. BACKGROUND JOBS (BullMQ)

Runs as separate PM2 process on VPS. Always alive. Not serverless.

| Queue | Job Name | Triggered By |
|---|---|---|
| `emails` | `receipt-email` | Stripe webhook payment completed |
| `emails` | `welcome-email` | Admin creates user |
| `emails` | `fee-reminder` | Cron job daily 9AM |
| `receipts` | `generate-pdf` | Stripe webhook payment completed |
| `analytics` | `bust-cache` | Stripe webhook payment completed |

### Cron Schedule

| Time | Job | What It Does |
|---|---|---|
| Daily 00:01 | Mark overdue | UNPAID past dueDate → OVERDUE, apply late fee |
| Daily 09:00 | Fee reminders | 7d, 3d, 1d before due → add to email queue |
| Monday 08:00 | Weekly summary | Email to ADMIN + VC per tenant |

---

## 10. STRIPE PAYMENT FLOW

```
1. Student clicks Pay Now
2. POST /api/payments/createintent
   → check idempotency key in Redis (prevent double charge)
   → stripe.paymentIntents.create()
   → save Payment record (status: PENDING)
   → return { clientSecret }
3. Frontend: stripe.confirmCardPayment(clientSecret)
4. Stripe webhook → POST /api/payments/webhook
   → verify Stripe signature
   → update Payment status → COMPLETED
   → update FeeAssignment status → PAID
   → redis.publish payment event to SSE channel
   → BullMQ: add receipt-email job
   → BullMQ: add generate-pdf job
   → BullMQ: add bust-cache job
   → create Notification record
   → create AuditLog record
5. SSE streams event to VC and Admin dashboards instantly
6. Student redirected to /student/paymentsuccess
```

**All amounts stored as integers (whole PKR). Never use floats for money.**

---

## 11. AUTHENTICATION DETAILS

- JWT stored in `httpOnly` cookie named `auth-token`
- Cookie: `secure`, `sameSite: lax`, `maxAge: 7 days`
- JWT payload: `{ userId, tenantId, role, name, email, isFirstLogin }`
- Middleware verifies JWT, attaches to request headers:
  - `x-user-id`
  - `x-tenant-id`
  - `x-user-role`
- `getTenantContext()` reads from these headers — called inside route handlers

### Middleware Route Protection

```
/superadmin/* → SUPER_ADMIN only
/admin/*      → ADMIN only
/vc/*         → VC only
/hod/*        → HOD only
/student/*    → STUDENT only
/api/*        → verified JWT required (role checked per route)
```

---

## 12. ENVIRONMENT VARIABLES

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gcuf_fees?schema=public"
JWT_SECRET="minimum-32-characters-random-secret"
JWT_EXPIRES_IN="7d"
REDIS_URL="redis://localhost:6379"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@gcuf.edu.pk"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

Always import `env` from `src/lib/env.ts`. Never use `process.env` directly anywhere else.

---

## 13. SEED DATA

`prisma/seed.ts` creates:

- 1 Tenant: GCUF (`slug: "gcuf"`)
- 1 SUPER_ADMIN: `superadmin@system.com` / `SuperAdmin@123`
- 1 ADMIN: `admin@gcuf.edu.pk` / `Admin@12345`
- 1 VC: `vc@gcuf.edu.pk` / `VC@123456`
- 2 Departments: CS (code: CS), Biology (code: BIO)
- 2 Programs: BS Computer Science (BSCS), BS Biology (BSBio)
- 1 Academic Session: 2024-2028 (isCurrent: true)
- 5 Students with fee assignments for semester 2

---

## 14. WHAT IS DONE vs WHAT NEEDS BUILDING

### Done (UI is complete, needs backend connection)

- Student dashboard, fee card, countdown timer, payment form, success page
- Admin dashboard, students table, fee management pages
- VC dashboard with all charts, live feed, filter panel
- HOD dashboard
- Login page, change password page
- All shadcn components, Tailwind config, RTK Query store structure

### Build in This Order

1. All `src/lib/` utility files (see section 7a)
2. `src/middleware.ts` (JWT verification + role routing)
3. Auth APIs: login, logout, change-password
4. Student APIs: view fee assignment, payment history
5. Stripe: create-intent route + webhook handler
6. SSE endpoint: real-time payment stream
7. Admin APIs: create user, list students, create fee structure, assign fees
8. Analytics API: VC dashboard aggregated stats with Redis cache
9. BullMQ workers: email worker, PDF worker
10. Cron jobs: overdue marking, fee reminders

### Do Not Build Yet (After Submission)

- Stripe subscription billing for universities
- Super admin analytics page
- Plan limit enforcement logic
- Tenant customization settings

---

## 15. DECISIONS MADE — DO NOT REVISIT

- Single Next.js project for all roles — no separate apps
- VPS deployment — not Vercel — BullMQ runs correctly
- Stripe only — no JazzCash, no EasyPaisa
- SSE not WebSockets — one-way push is sufficient
- Custom JWT auth — not NextAuth
- Multi-tenant from day one — tenantId on every table and query
- Subscription table in schema — no implementation until after submission
- Integer amounts for all money — never floats
- No denormalized feeStatus on Student — compute from FeeAssignment + Redis cache
- withErrorHandler on every route — no try-catch in handlers
- env.ts validates all env vars at startup — app crashes immediately if missing