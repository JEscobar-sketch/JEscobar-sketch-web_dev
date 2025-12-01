# JEscobar-sketch-web_dev

This repository contains a minimal fullstack demo built using Next.js + TypeScript + Prisma + PostgreSQL.

Features
- Next.js (app router) frontend
- Prisma ORM + PostgreSQL datasource
- Minimal CRUD: create and list notes
- Docker Compose for running a local PostgreSQL instance

Quick start (recommended development flow)

1. Copy the example environment file and start Postgres with Docker:

```bash
cp .env.example .env
docker compose up -d
```

2. Install dependencies and generate Prisma client:

```bash
npm install
npm run prisma:generate
```

3. Run Prisma migrations (creates the tables) and seed example data:

```bash
npm run prisma:migrate
npm run seed
```

4. Start the Next.js dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

If you'd rather connect to an existing Postgres database, update `DATABASE_URL` in `.env`.

Docker quick-start (app + Postgres)
If you don't want to run npm locally you can start both Postgres and the app in Docker using the included Dockerfile and Compose configuration.

```bash
# build and start app + postgres
docker compose up --build -d

# then open http://localhost:3000
```

Troubleshooting / remote preview (Codespaces / GitHub.dev)
- If you're previewing the app in a remote Codespace or via `github.dev`, you must make the dev server reachable from outside the container. Start the dev server bound to 0.0.0.0:

```bash
# from the project root — dev server bound to 0.0.0.0 so remote previews can reach it
npm run dev:host
```

- If you see a 502 Bad Gateway in the browser the likely causes are:
	- dependencies were not installed (run `npm install`)
	- the dev server hasn't started (check `npm run dev` logs)
	- the server is bound to localhost instead of 0.0.0.0 for remote previews



