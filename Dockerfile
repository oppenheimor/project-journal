# 阶段 1：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9 --activate && pnpm install --frozen-lockfile
COPY . .
ENV DATABASE_URL="skip"
RUN pnpm prisma generate && pnpm build && \
    mkdir /prisma-files && \
    cp -rL node_modules/.prisma /prisma-files/.prisma && \
    cp -rL node_modules/@prisma/engines /prisma-files/engines && \
    cp -rL node_modules/prisma /prisma-files/cli

# 阶段 2：运行
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /prisma-files/.prisma ./node_modules/.prisma
COPY --from=builder /prisma-files/engines ./node_modules/@prisma/engines
COPY --from=builder /prisma-files/cli ./node_modules/prisma

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
