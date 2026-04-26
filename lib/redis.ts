import Redis from "ioredis"

const globalForRedis = globalThis as unknown as { __redisPublisher?: Redis }

function createClient(): Redis {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("REDIS_URL environment variable is not set")

  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    retryStrategy: (times) => Math.min(times * 100, 3_000),
    // Upstash uses rediss:// for TLS — ioredis handles it automatically via the URL scheme
  })

  client.on("error", (err: Error) => {
    console.error("[Redis] connection error:", err.message)
  })

  return client
}

/**
 * Singleton publisher client — shared across all route invocations in this process.
 * Survives hot-reloads in development via globalThis.
 */
export const redisPublisher: Redis =
  globalForRedis.__redisPublisher ??
  (globalForRedis.__redisPublisher = createClient())

/**
 * Create a dedicated subscriber connection.
 * Each SSE client needs its own subscriber because ioredis in subscribe mode
 * can only issue subscribe/unsubscribe commands.
 */
export function createRedisSubscriber(): Redis {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("REDIS_URL environment variable is not set")

  return new Redis(url, {
    maxRetriesPerRequest: null, // subscriber should retry indefinitely
    enableReadyCheck: false,
    retryStrategy: (times) => Math.min(times * 100, 3_000),
  })
}

/** Redis pub/sub channel name for a given tenant's payment events. */
export function sseChannel(tenantId: string): string {
  return `sse:payments:${tenantId}`
}

/** Redis pub/sub channel name for a given user's notification events. */
export function notificationChannel(userId: string): string {
  return `sse:notifications:${userId}`
}
