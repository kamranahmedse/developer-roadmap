

FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
