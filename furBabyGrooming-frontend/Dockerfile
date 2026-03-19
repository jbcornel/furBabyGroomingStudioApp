# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build for production (SSR)
COPY . .
RUN npm run build

# ── Stage 2: Run ────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Only copy the built output
COPY --from=builder /app/dist/fur-baby-grooming-angular-app ./dist/fur-baby-grooming-angular-app
COPY --from=builder /app/package*.json ./

# Install only production deps needed by the SSR server
RUN npm ci --omit=dev --ignore-scripts

EXPOSE 4000

CMD ["node", "dist/fur-baby-grooming-angular-app/server/server.mjs"]
