
import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "@/types/auth"
import { UnauthorizedError } from "@/lib/utils/AppError"

// Lazy getter so this module is safe to import in Edge middleware
// (process.env is available in Edge; TextEncoder is a Web API)
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET environment variable is not set.")
  return new TextEncoder().encode(secret)
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d"
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
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
