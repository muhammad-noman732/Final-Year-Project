import Redis from "ioredis"

const globalForRedis = globalThis as unknown as {
  __redisPublisher?: Redis
  __redisClient?: Redis
}

export function createClient(): Redis {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("REDIS_URL environment variable is not set")

  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    retryStrategy: (times) => Math.min(times * 100, 3_000),
    tls: {},
  })

  client.on("error", (err: Error) => {
    console.error("[Redis] connection error:", err.message)
  })

  return client
}

export const redisPublisher: Redis =
  globalForRedis.__redisPublisher ??
  (globalForRedis.__redisPublisher = createClient())

export const redisClient: Redis =
  globalForRedis.__redisClient ??
  (globalForRedis.__redisClient = createClient())

export function createRedisSubscriber(): Redis {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("REDIS_URL environment variable is not set")

  return new Redis(url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy: (times) => Math.min(times * 100, 3_000),
    tls: {},
  })
}

export function sseChannel(tenantId: string): string {
  return `sse:payments:${tenantId}`
}

export function notificationChannel(userId: string): string {
  return `sse:notifications:${userId}`
}
