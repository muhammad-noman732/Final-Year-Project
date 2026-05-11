
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN NODE_OPTIONS="--max-old-space-size=1536" npm run build

FROM base AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HOME=/home/nextjs

# Setup users and folders
RUN mkdir -p /home/nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs --home /home/nextjs --shell /bin/false nextjs

# Copy built Next.js output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/app/generated ./app/generated

# Copy prisma schema and config for migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

# Install Prisma CLI directly in the runner (Fixes Prisma 7 "missing module" issues)
RUN npm install prisma@7.8.0

# Ensure everything is owned by nextjs user
RUN chown -R nextjs:nodejs /app && chown -R nextjs:nodejs /home/nextjs

USER nextjs

EXPOSE 3000

HEALTHCHECK \
    --interval=30s \
    --timeout=10s \
    --start-period=60s \
    --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000', (res) => process.exit(res.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["dumb-init", "node", "server.js"]