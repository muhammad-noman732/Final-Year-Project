FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

FROM base AS builder

WORKDIR /app

# Get node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy prisma folder
COPY prisma ./prisma/

# Copy rest of source code
COPY . .

# Generate Prisma client
# Uses non-standard output: app/generated/prisma
RUN npx prisma generate

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN npm run build


FROM base AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser \
    --system \
    --uid 1001 \
    --ingroup nodejs \
    --no-create-home \
    --shell /bin/false \
    nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy standalone server
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/standalone ./

# Copy static files
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/static \
    ./.next/static


# Your schema outputs to app/generated/prisma
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/app/generated ./app/generated

# Switch to non-root user
USER nextjs

EXPOSE 3000

HEALTHCHECK \
    --interval=30s \
    --timeout=10s \
    --start-period=40s \
    --retries=3 \
    CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["dumb-init", "node", "server.js"]