# GCUF Fee Management System

Multi-tenant, role-based university fee management platform for institutions.

The system replaces manual fee operations with:
- digital fee structures and assignments
- Stripe-based online payments
- real-time payment updates to admin/VC dashboards
- tenant-isolated data for each university
- intelligent ML-backed forecasting and risk insights

## 1. What This Project Is

This is a full-stack SaaS-style application where each university is a separate tenant.

Core stack:
- Next.js 16 (App Router) + TypeScript
- PostgreSQL + Prisma
- Redis (cache + pub/sub for SSE)
- Stripe for payments
- SendGrid for emails
- FastAPI ML service for forecasting/risk analytics

Roles in the system:
- SUPER_ADMIN: platform owner, creates tenants and admin accounts
- ADMIN: university operator, manages users, departments, programs, sessions, fees
- VC: read-only institutional analytics + live payment intelligence
- HOD: department-level visibility
- STUDENT: sees and pays own fees only

## 2. End-to-End Product Flow (Start to Finish)

1. Platform onboarding
- SUPER_ADMIN logs in
- creates a tenant (university)
- creates an ADMIN account for that tenant

2. Academic setup
- ADMIN creates departments, programs, and academic sessions
- ADMIN creates students and role users (VC/HOD)

3. Fee setup
- ADMIN defines fee structures by program + semester + session year
- ADMIN assigns fee structures to students

4. Payment
- STUDENT logs in and views outstanding fee assignment(s)
- initiates payment (Stripe PaymentIntent)
- completes payment on checkout form

5. Settlement and update
- Stripe webhook confirms payment
- backend marks payment completed
- fee assignment status updates (UNPAID/PARTIAL/PAID etc.)
- student summary totals update
- admin/VC live feed updates through SSE

6. Decision intelligence
- VC views analytics and trend dashboards
- cron/ML insights flag risk, forecast collection, and deadline pressure

## 3. Repository Documentation Map

Detailed architecture docs already present in this repository:
- [project-context.md](project-context.md): complete product and architecture context
- [component_diagram_doc.md](component_diagram_doc.md): physical component diagram and runtime layers
- [ML/INTEGRATION.md](ML/INTEGRATION.md): ML service architecture, proxy pattern, deployment details

This README is the practical operator guide.

## 4. Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or Docker)
- Redis 7+ (or Docker)
- Stripe test keys

## 5. Environment Setup

Create a .env file in project root.

Required variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/gcuf_fee
JWT_SECRET=replace_with_minimum_32_character_secret
JWT_EXPIRES_IN=7d
REDIS_URL=redis://:REDIS_PASSWORD@localhost:6379
NODE_ENV=development

SENDGRID_API_KEY=
FROM_EMAIL=noreply@gcuf.edu.pk
NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

ML_SERVICE_URL=http://localhost:8000
```

Notes:
- JWT_SECRET must be at least 32 characters.
- REDIS_URL is required for refresh-token flows and SSE live updates.
- STRIPE_WEBHOOK_SECRET is needed for local webhook verification.

## 6. Install and Run Locally

1. Install dependencies

```bash
npm install
```

2. Run Prisma migrations

```bash
npx prisma migrate dev
```

3. Generate Prisma client (if needed)

```bash
npx prisma generate
```

4. Seed demo data

```bash
npm run seed
```

5. Start app

```bash
npm run dev
```

6. Open

http://localhost:3000

## 7. Seeded Accounts (Development)

From the current seed script:

- SUPER_ADMIN email: noman@gmail.com
- Common seed password: Noman@123

Additional seeded users include ADMIN, VC, HOD, and STUDENT entries under the seeded tenant.

If you change seed logic, update this section accordingly.

## 8. How to Use the System (Role by Role)

### A. SUPER_ADMIN Use Case: Create University and Bootstrap Admin

Precondition:
- super admin account exists

Steps:
1. Login as SUPER_ADMIN.
2. Create tenant with university metadata (name, slug, domain, branding).
3. Create tenant ADMIN user.

Outcome:
- tenant is available
- admin can login and operate within that tenant scope

### B. ADMIN Use Case: Setup University Data

Steps:
1. Login as ADMIN.
2. Create departments (CS, BIO, etc.).
3. Create programs per department.
4. Create academic sessions and mark current session.
5. Create users (VC/HOD/STUDENT linked users).
6. Register students and map them to department/program/session.

Outcome:
- academic master data is ready for fee operations

### C. ADMIN Use Case: Configure Fee Lifecycle

Steps:
1. Create fee structures by program + semester + session year.
2. Set fee components (tuition, lab, library, sports, registration, exam, other).
3. Define due date and late fee.
4. Assign fee structures to students (creates fee assignments).

Outcome:
- students receive payable fee obligations

### D. STUDENT Use Case: Pay Fee Online

Steps:
1. Login as STUDENT.
2. Open fee page and view outstanding assignment(s).
3. Click pay on an assignment.
4. Backend creates Stripe PaymentIntent and returns clientSecret.
5. Student submits payment details.
6. Stripe confirms payment.

Outcome:
- payment record moves to COMPLETED
- fee status and paid totals update
- student gets updated status and receipt path

### E. VC Use Case: Monitor Live Financial Health

Steps:
1. Login as VC.
2. Open dashboard panels for KPIs, collection trends, and department performance.
3. Keep live feed open to receive payment updates through SSE.
4. Review generated insights and risk signals.

Outcome:
- live institutional visibility without manual report lag

### F. HOD Use Case: Department Visibility

Steps:
1. Login as HOD.
2. View department-specific student/fee status.
3. Track pending, overdue, and payment behavior in own department scope.

Outcome:
- department-level oversight aligned with tenant and role access rules

## 9. Key API Surface (High-Level)

Authentication:
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/changepassword
- GET /api/auth/me

Admin domain groups:
- /api/admin/users
- /api/admin/students
- /api/admin/departments
- /api/admin/programs
- /api/admin/sessions
- /api/admin/fees/structures
- /api/admin/fees/assignments

Student domain:
- /api/student/me/fees

VC domain:
- /api/vc/dashboard
- /api/vc/analytics
- /api/vc/insights
- /api/vc/students
- /api/vc/live (SSE)

Platform and webhooks:
- /api/superadmin/tenants
- /api/webhooks/stripe

## 10. Payment and Webhook Lifecycle (Detailed)

1. Payment initiation
- backend creates PaymentIntent with metadata including tenantId, studentId, feeAssignmentId
- local payment record is created with pending state

2. Stripe event
- Stripe sends event to /api/webhooks/stripe
- webhook signature is verified

3. Idempotent processing
- event id is checked/stored in webhook event log to prevent duplicate fulfillment

4. Fulfillment
- payment status updated
- fee assignment amountPaid and status updated
- student denormalized fee totals refreshed

5. Broadcasting
- payment update is published to Redis channel
- VC/Admin live page receives SSE event

## 11. Multi-Tenant and Security Rules

- every data-bearing model is tenant scoped
- tenant context is derived from verified auth token, never trusted from request body
- role restrictions enforced in middleware and service/controller guards
- password hashes stored, never plain passwords
- payment amounts stored as integers (PKR), not floats
- audit and activity logs are append-oriented for traceability

## 12. ML Integration Usage

The frontend must call Next.js proxy routes, not the ML service directly from browser.

Pattern:
- Browser -> Next.js API -> ML service (internal network) -> PostgreSQL

Reference:
- [ML/INTEGRATION.md](ML/INTEGRATION.md)

## 13. Development Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run seed
npm run seed:registration
npm run seed:all
```

## 14. Docker Deployment Overview

Current docker composition includes:
- postgres
- redis
- fastapi-ml
- nextjs
- nginx
- certbot

Use this for VPS-style deployment where app and supporting services run continuously.

## 15. Troubleshooting

Prisma type mismatch after schema updates:
- run prisma generate
- restart Next.js dev server
- if needed clear .next and restart

Redis connection failures:
- verify REDIS_URL and Redis password
- confirm redis container/service health

Stripe webhook not firing locally:
- run Stripe CLI forwarding to /api/webhooks/stripe
- ensure STRIPE_WEBHOOK_SECRET matches forwarded endpoint secret

Missing env crash on startup:
- check lib/env.ts required schema
- set all mandatory variables in .env

## 16. Test Status

No automated test suite is currently configured in this repository.

Recommended next step:
- add integration tests for auth, tenant isolation, and Stripe webhook idempotency.

## 17. Operational Summary

This project is a production-oriented, multi-tenant fee management platform with secure role-based access, end-to-end digital fee payment flow, and real-time plus predictive intelligence for university leadership.
