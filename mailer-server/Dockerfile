# ── Stage 1: Install deps ───────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# ── Stage 2: Run ────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules
COPY server.js .
COPY package*.json ./

# NOTE: Do NOT copy .env — credentials are injected as Cloud Run env vars
EXPOSE 3000

CMD ["node", "server.js"]
