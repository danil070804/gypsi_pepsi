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

## 1) Local setup

### Requirements
- Node 18+
- PostgreSQL

### Install
```bash
npm i
```

### Env
Create `.env`:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
AUTH_SECRET="replace_with_long_random_string"
AUTH_URL="http://localhost:3000"

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

Admin: `http://localhost:3000/admin` (redirects to login)

---

## 2) Railway deploy

1. Create a new Railway project and add **PostgreSQL**.
2. Add repo and enable **Deploy on push**.
3. Set variables in Railway:
   - `DATABASE_URL` (Railway provides)
   - `AUTH_SECRET`
   - `AUTH_URL` (your Railway domain, later your custom domain)
   - (optional) `ADMIN_EMAIL`, `ADMIN_PASSWORD` to run initial seed locally or via one-off command

4. Build command is already set via `package.json`:
   - `prisma migrate deploy && next build`
5. Start command:
   - `next start`

### Seeding on Railway
Railway does not run seeds automatically. Do it once:
- locally against Railway DB, or
- run a one-off command:
```bash
npm run db:seed
```

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
