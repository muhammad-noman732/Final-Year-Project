import { z } from "zod/v4"



const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SENDGRID_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().default("noreply@gcuf.edu.pk"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  // STRIPE_SECRET_KEY: z.string().optional(),
  // STRIPE_WEBHOOK_SECRET: z.string().optional(),
  // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  // REDIS_URL: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((issue) => `  ✗ ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")

    throw new Error(
      `\n❌ Missing or invalid environment variables:\n${formatted}\n\n` +
      `Check your .env file and ensure all required variables are set.\n`
    )
  }
  return parsed.data
}

export const env = validateEnv()
