import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "@/types/server/auth.types"
import { UnauthorizedError } from "@/lib/utils/AppError"
import { env } from "@/lib/env"

function getSecret(): Uint8Array {
  return new TextEncoder().encode(env.JWT_SECRET)
}

export async function signJWT(
  payload: JWTPayload,
  expiresIn?: string,
): Promise<string> {
  const ttl = expiresIn ?? env.ACCESS_TOKEN_EXPIRES_IN
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ttl)
    .sign(getSecret())
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as JWTPayload
  } catch {
    throw new UnauthorizedError("Session expired or invalid. Please log in again.")
  }
}
