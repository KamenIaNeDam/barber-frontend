# 1. Install dependencies
FROM node:lts AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Build the app
FROM node:lts AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 3. Prune devDependencies
RUN npm prune --production

# 4. Run
FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build"]
