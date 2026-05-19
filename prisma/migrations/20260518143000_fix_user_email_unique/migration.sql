-- The current schema and seed code expect User.email to be globally unique.
-- Older databases may still have the tenant-scoped unique index from the initial migration.

DROP INDEX IF EXISTS "User_tenantId_email_key";

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");