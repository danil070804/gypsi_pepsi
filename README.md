# GYPSEY EMPLOYMENT AGENCY LTD — Website (RU/EN) + Admin CMS (Railway-ready)

This repository implements the full spec:
- Public site: Home, About, Services (6), Service detail, Contact (manager picker), Blog, Article, Privacy, Cookies, 404/500
- RU/EN in URL: `/ru/...` and `/en/...` + language switcher
- SEO: SSR metadata, OG, hreflang alternates, sitemap, robots
- Admin CMS at `/admin` (auth): manage Pages, Services, Managers, Reviews, FAQ, Blog, Site settings
- Managers: CRUD, active/inactive, sortOrder; contacts show only if filled (WhatsApp/Telegram/Instagram/Email)

## Tech
Next.js (App Router) + PostgreSQL + Prisma + NextAuth (Credentials) + Tailwind.

---

## Quick start (cheat sheet)

### Local (PowerShell, Windows)
```powershell
copy .env.example .env
npm i
npx prisma migrate dev
npm run db:seed
npm run dev
```

### Local production check (same flow as deploy)
```powershell
npm ci
npm run build
npm start
```

### Railway
- Push code to repo
- Set env vars in Railway: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_URL`
- Deploy (commands are read from `railway.json` automatically)
- Run one-off DB setup once: `npm run db:push && npm run db:seed`

## 1) Local setup

### Requirements
- Node 20+
- PostgreSQL

### Install
```bash
npm i
```

### Env
Copy `.env.example` to `.env` and fill values:
```bash
cp .env.example .env
```

Or create `.env` manually:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
AUTH_SECRET="replace_with_long_random_string"
NEXT_PUBLIC_SITE_URL="https://siteemploymentltd1-production.up.railway.app"
AUTH_URL="https://siteemploymentltd1-production.up.railway.app"
NEXTAUTH_URL="https://siteemploymentltd1-production.up.railway.app"

# Admin seed (run once)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me-strong"
```

### DB migrate + seed
```bash
npx prisma migrate dev
npm run db:seed
```

### Run
```bash
npm run dev
```

Admin: `/admin` (redirects to login)

---

## 2) Railway deploy

1. Create a new Railway project and add **PostgreSQL**.
2. Add repo and enable **Deploy on push**.
   - Repo already includes `railway.json`, so Railway uses fixed build/start commands from code.
3. Set variables in Railway:
   - `DATABASE_URL` (Railway provides)
   - `AUTH_SECRET`
   - `AUTH_URL` (your Railway domain, later your custom domain)
   - `NEXT_PUBLIC_SITE_URL` (same value as `AUTH_URL`)
   - `NEXTAUTH_URL` (same value as `AUTH_URL`)
   - `ADMIN_EMAIL` (optional, for first admin)
   - `ADMIN_PASSWORD` (optional, for first admin)
   - `RUN_DB_SETUP_ON_START` (optional, default off; set `true` only if you intentionally want db push/seed on every start)

4. Build command:
   - `npm run build`
5. Start command:
   - `node scripts/railway-start.mjs`
6. Healthcheck path:
   - `/api/health`

### Important runtime notes
- `npm start` runs `scripts/railway-start.mjs`.
- `railway-start.mjs` launches `next start` on `0.0.0.0:$PORT`.
- By default app does **not** run `prisma db push/seed` on startup (faster and safer startup on Railway).
- For first setup, run one-off command in Railway service: `npm run db:push && npm run db:seed`.
- If you still need auto setup on every boot, set `RUN_DB_SETUP_ON_START=true`.

---

## 3) Media uploads (simple, Railway Volume)

This project includes a minimal upload endpoint storing files into `public/uploads`.
For production on Railway:
- Mount a Railway Volume to `/app/public/uploads` so uploads persist across deployments.

Env (optional):
- `UPLOAD_DIR="/app/public/uploads"`

---

## 4) Content model

Most pages use **blocksJson** (JSON array). Admin allows editing as JSON.
Services and blog content are also JSON blocks for RU/EN so you can insert CTA blocks in the middle.

---

## Default content
Seed creates:
- Site settings (legal info)
- 6 services with required slugs
- basic Home/About/Privacy/Cookies pages
- sample FAQ/Reviews/Blog post


## New: Drag&Drop sorting + Admin image uploads
- Admin lists for Managers/Services/FAQ/Reviews support drag&drop ordering; it auto-saves and updates sortOrder.
- Upload images from admin via upload button (uses `/api/upload`). In production on Railway mount a Volume to persist `/app/public/uploads`.
- TipTap editor supports inserting images by URL.
