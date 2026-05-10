import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "@/types/server/auth.types"
import { UnauthorizedError } from "@/lib/utils/AppError"

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET environment variable is not set.")
  return new TextEncoder().encode(secret)
}

export async function signJWT(
  payload: JWTPayload,
  expiresIn?: string,
): Promise<string> {
  const ttl = expiresIn ?? process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m"
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
