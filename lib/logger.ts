import pino from "pino"

const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    base: { service: "gcuf-fee-management" },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: ["password", "passwordHash", "token", "tokenHash", "authorization", "cookie"],
      censor: "[REDACTED]",
    },
  },
  process.env.NODE_ENV !== "production"
    ? pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname,service",
        translateTime: "SYS:HH:MM:ss",
      },
    })
    : undefined,
)

export { logger }
