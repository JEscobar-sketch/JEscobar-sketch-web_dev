FROM node:20-alpine

WORKDIR /app
# install netcat for start script to test DB readiness
RUN apk add --no-cache netcat-openbsd

# copy package metadata first so Docker can reuse cached layers for install
COPY package.json package-lock.json* ./

# copy prisma schema early so prisma generate can run
COPY prisma ./prisma

# install deps (include dev for build / prisma CLI)
# use npm install here (no package-lock may exist in dev) and allow legacy peer deps for reproducible build
RUN npm install --legacy-peer-deps --no-audit --no-fund

# copy the rest of the source
COPY . .

# generate prisma client (db not available at build time)
RUN npx prisma generate

# build Next app
RUN npm run build

EXPOSE 3000

COPY scripts/start.sh /app/scripts/start.sh
RUN chmod +x /app/scripts/start.sh

CMD ["/app/scripts/start.sh"]
