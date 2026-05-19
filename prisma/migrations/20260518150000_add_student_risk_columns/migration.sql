-- Add Student columns introduced in the current Prisma schema.
-- Use IF NOT EXISTS so this migration can run on databases that already have some of these fields.

ALTER TABLE "Student"
  ADD COLUMN IF NOT EXISTS "riskLevel" TEXT NOT NULL DEFAULT 'LOW',
  ADD COLUMN IF NOT EXISTS "riskScore" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "lastPredictionAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "latePaymentCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "lastPaymentDate" TIMESTAMP(3);