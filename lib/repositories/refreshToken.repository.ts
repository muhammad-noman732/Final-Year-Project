import type { Redis } from "ioredis"

export class RefreshTokenRepository {
  private static readonly PREFIX = "refresh_token:"
  private static readonly TTL_SECONDS = 7 * 24 * 60 * 60

  constructor(private readonly redis: Redis) {}

  async save(token: string, userId: string): Promise<void> {
    await this.redis.set(
      `${RefreshTokenRepository.PREFIX}${token}`,
      userId,
      "EX",
      RefreshTokenRepository.TTL_SECONDS,
    )
  }

  async getUserId(token: string): Promise<string | null> {
    return this.redis.get(`${RefreshTokenRepository.PREFIX}${token}`)
  }

  async revoke(token: string): Promise<void> {
    await this.redis.del(`${RefreshTokenRepository.PREFIX}${token}`)
  }

  async revokeAll(userId: string): Promise<void> {
    const pattern = `${RefreshTokenRepository.PREFIX}*`
    let cursor = "0"

    do {
      const [nextCursor, keys] = await this.redis.scan(cursor, "MATCH", pattern, "COUNT", 100)
      cursor = nextCursor

      if (keys.length > 0) {
        const values = await this.redis.mget(...keys)
        const toDelete = keys.filter((_, i) => values[i] === userId)
        if (toDelete.length > 0) {
          await this.redis.del(...toDelete)
        }
      }
    } while (cursor !== "0")
  }
}
