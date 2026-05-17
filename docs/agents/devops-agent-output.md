# DevOps Agent Documentation
## Tattoo Artist Portfolio & Booking Site

> **Agent Note**: This document is the infrastructure and deployment source of truth. It defines the hosting architecture, environment strategy, CI/CD pipeline, monitoring, and operational runbooks for this project. Read alongside `product-manager-output.md`, `frontend-agent-output.md`, and `uxui-designer-output.md`. Update Version History when this document changes.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js on Vercel                    │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │    UI    │  │  app/api/*   │  │   Vercel Cron    │  │
│  │ (React)  │  │Route Handlers│  │   /api/cron/*    │  │
│  └──────────┘  └──────────────┘  └──────────────────┘  │
│        │              │                   │             │
└────────┼──────────────┼───────────────────┼─────────────┘
         │              │                   │
         ▼              ▼                   ▼
┌─────────────────────────────────────────────────────────┐
│                      Supabase                           │
│                                                         │
│  ┌──────────┐  ┌──────┐  ┌─────────┐  ┌───────────┐   │
│  │ Postgres │  │ Auth │  │ Storage │  │ Realtime  │   │
│  └──────────┘  └──────┘  └─────────┘  └───────────┘   │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│                   External Services                     │
│                                                         │
│  ┌────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ Resend │  │ Telegram Bot │  │ Google Calendar API│  │
│  │(Emails)│  │(Notifications│  │  (v2 - future)    │  │
│  └────────┘  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Core principle**: Supabase is the data platform. Next.js is the application server. All business logic, integrations, notifications, and orchestration live in `app/api/*`. No separate backend process — ever.

---

## Tech Stack (Infrastructure Layer)

| Concern | Tool | Tier / Cost |
|---------|------|-------------|
| Hosting + CDN | **Vercel** | Hobby (free) → Pro ($20/mo) when needed |
| Database + Auth + Storage + Realtime | **Supabase** | Free tier → Pro ($25/mo) |
| Scheduled Jobs | **Vercel Cron** | Included in Hobby/Pro |
| Transactional Email | **Resend** | Free (3k emails/mo) |
| Notifications (v1) | **Telegram Bot API** | Free |
| Notifications (v2) | **WhatsApp Cloud API** | Pay-per-message |
| Calendar Integration (v2) | **Google Calendar API** | Free quota |
| DNS / Domain | **Namecheap / Porkbun** | ~$10/year |
| Secrets Management | **Vercel Environment Variables** | Included |
| Error Monitoring | **Vercel Analytics + Logs** | Included in Hobby |

---

## Repository & Project Structure

```
tattoo-portfolio/                  ← single Next.js app, single repo
├── app/
│   ├── (site)/                    # Public pages (UI)
│   ├── (admin)/                   # Protected admin (UI)
│   └── api/                       # ALL backend logic lives here
│       ├── bookings/
│       │   └── route.ts           # POST — create booking
│       ├── availability/
│       │   └── route.ts           # GET — public slots / POST|DELETE — admin
│       ├── notifications/
│       │   └── route.ts           # POST — internal: send Telegram/WhatsApp
│       ├── cron/
│       │   ├── reminders/
│       │   │   └── route.ts       # Cron: send booking reminders
│       │   └── cleanup/
│       │       └── route.ts       # Cron: clean past unbooked slots
│       └── auth/
│           └── callback/
│               └── route.ts       # Supabase auth callback
├── components/
├── lib/
│   ├── supabase/
│   ├── resend/
│   ├── telegram/
│   └── validations/
├── middleware.ts                  # Auth guard for /admin/*
├── next.config.ts
├── vercel.json                    # Cron job schedules
└── .env.local                     # Local only — NEVER committed
```

---

## Environment Strategy

### Three Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| **Development** | `main` (local) | `localhost:3000` | Daily development |
| **Preview** | any PR branch | `*.vercel.app` (auto) | Review before merge |
| **Production** | `main` (merged) | `yourdomain.com` | Live site |

Vercel auto-deploys:
- Every push to `main` → Production
- Every Pull Request → unique Preview URL

---

## Environment Variables

### Complete Variable Reference

```bash
# ─── SUPABASE ───────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...          # Safe for browser
SUPABASE_SERVICE_ROLE_KEY=eyJ...              # SERVER ONLY — never NEXT_PUBLIC_

# ─── RESEND ─────────────────────────────────────────────
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=turnos@yourdomain.com       # Verified sender domain

# ─── TELEGRAM ───────────────────────────────────────────
TELEGRAM_BOT_TOKEN=123456789:AAF...
TELEGRAM_CHAT_ID=-100...                      # Artist's chat or group ID

# ─── SITE ───────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://yourdomain.com   # Used in emails, OG tags
NEXT_PUBLIC_ARTIST_WHATSAPP=+54926100000      # WhatsApp deeplink number

# ─── CRON SECURITY ──────────────────────────────────────
CRON_SECRET=a-long-random-string-here         # Protects cron endpoints

# ─── GOOGLE CALENDAR (v2 — not MVP) ─────────────────────
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GOOGLE_REFRESH_TOKEN=
```

### Security Rules — Non-Negotiable

- `SUPABASE_SERVICE_ROLE_KEY` → **server-only**. Never prefix with `NEXT_PUBLIC_`. If leaked, it bypasses all RLS.
- `CRON_SECRET` → generated with `openssl rand -base64 32`. Rotated if ever exposed.
- `TELEGRAM_BOT_TOKEN` → server-only. Never in client code.
- `.env.local` → in `.gitignore`. Never committed. Ever.
- Production secrets → set **only** in Vercel Dashboard, never in `vercel.json` or any committed file.

### Variable Setup Per Environment

```
Vercel Dashboard → Settings → Environment Variables

Production:     All variables above (real values)
Preview:        All variables (can use Supabase staging project)
Development:    .env.local (local file only)
```

---

## Vercel Configuration (`vercel.json`)

```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 3 * * 1"
    }
  ]
}
```

### Cron Job Specifications

#### `/api/cron/reminders` — Daily at 09:00 UTC
- Runs every morning
- Queries bookings for the next 24 hours
- Sends Telegram notification to artist with the day's schedule
- Sends WhatsApp/Telegram reminder to clients (when WhatsApp Cloud API is integrated)

#### `/api/cron/cleanup` — Every Monday at 03:00 UTC
- Removes `availability_slots` where `date < today` AND `is_booked = FALSE`
- Keeps the DB clean without manual maintenance
- Logs count of removed rows to Vercel logs

### Cron Endpoint Security Pattern

Every cron route handler must validate the secret header:

```typescript
// app/api/cron/reminders/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ... cron logic here

  return NextResponse.json({ ok: true, processed: n })
}
```

Vercel automatically sends `Authorization: Bearer {CRON_SECRET}` when triggering cron jobs.

---

## Supabase Configuration

### Project Setup Checklist

```
Supabase Dashboard → New Project
  Name:     tattoo-portfolio-prod
  Region:   South America (São Paulo) — closest to Argentina
  Password: strong, saved in password manager
```

### Local Development with Supabase CLI

```bash
# Install
brew install supabase/tap/supabase    # macOS
# or
npm install -g supabase

# Initialize in project
supabase init

# Start local Supabase stack (Postgres + Auth + Storage + Studio)
supabase start

# Output:
# API URL:     http://localhost:54321
# Studio URL:  http://localhost:54323
# DB URL:      postgresql://postgres:postgres@localhost:54322/postgres

# Link to remote project
supabase link --project-ref [your-ref]

# Push local migrations to remote
supabase db push

# Pull remote schema changes
supabase db pull
```

### Migration Workflow

```bash
# Create a new migration
supabase migration new create_bookings_table

# This creates:
# supabase/migrations/20240612000000_create_bookings_table.sql

# Edit the migration file, then apply locally:
supabase db reset    # resets local DB and applies all migrations

# When ready for production:
supabase db push     # applies pending migrations to remote
```

**Rule**: Never edit the Supabase schema via the Dashboard Table Editor in production. All schema changes go through migration files committed to the repo.

### Supabase Storage Buckets

```
Bucket: portfolio-images
  Public: true
  Allowed MIME types: image/jpeg, image/png, image/webp
  Max file size: 10MB
  Folder structure:
    portfolio-images/
    ├── eyebrows/
    ├── lips/
    └── tattoos/
```

---

## Notification Architecture (`app/api/notifications/`)

All notification sending is centralized through one internal API route. Other routes call this internally — they never call Telegram/WhatsApp directly.

```typescript
// lib/telegram/index.ts
export async function sendTelegramMessage(text: string): Promise<void> {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })
}
```

### Notification Events

| Event | Channel (MVP) | Channel (v2) |
|-------|--------------|--------------|
| New booking received | Telegram → artist | WhatsApp → artist |
| Booking reminder (24h before) | Telegram → artist | WhatsApp → client |
| Slot conflict (booking failed) | Vercel logs only | — |
| Cron job summary | Telegram → artist | — |

### Telegram Bot Setup (One-time)

```
1. Message @BotFather on Telegram → /newbot
2. Name: [ArtistName] Turnos Bot
3. Username: artistname_turnos_bot
4. Copy the token → TELEGRAM_BOT_TOKEN env var

5. Get Chat ID:
   - Artist starts a chat with the bot
   - Fetch: https://api.telegram.org/bot{TOKEN}/getUpdates
   - Copy "chat": {"id": ...} → TELEGRAM_CHAT_ID env var
```

---

## Deployment Pipeline

### Git Branching Strategy (Simple — Solo Developer)

```
main          ← production branch (always deployable)
  └── feat/gallery-section    ← feature branches
  └── feat/booking-flow
  └── fix/calendar-mobile
  └── chore/add-resend
```

**Workflow:**
```
1. Create branch from main:    git checkout -b feat/gallery-section
2. Develop and commit locally
3. Push branch:                git push origin feat/gallery-section
4. Vercel auto-creates Preview URL → test it
5. Merge to main:              git merge feat/gallery-section (or PR)
6. Vercel auto-deploys to Production
7. Delete branch:              git branch -d feat/gallery-section
```

### Commit Convention

Follow Conventional Commits:

```
feat:     new feature
fix:      bug fix
chore:    tooling, deps, config (no production code change)
style:    formatting, no logic change
refactor: code restructure, no behavior change
docs:     documentation only
perf:     performance improvement

Examples:
feat: add booking confirmation email via Resend
fix: resolve concurrent slot booking race condition
chore: add TELEGRAM_BOT_TOKEN to env vars
feat(admin): add slot bulk deletion
fix(cron): correct reminder query date range
```

---

## Production Launch Checklist

### Domain & DNS
- [ ] Domain purchased (`artistname.com.ar` or `.studio` recommended)
- [ ] Domain added to Vercel: `Project → Settings → Domains`
- [ ] DNS A record pointed to Vercel (`76.76.21.21`)
- [ ] SSL auto-provisioned by Vercel (happens automatically, ~2 min)
- [ ] `www` redirect configured (www → non-www or vice versa)

### Supabase Production
- [ ] Production project created in São Paulo region
- [ ] All migrations pushed (`supabase db push`)
- [ ] RLS policies verified (test with anon key — booking should work; reading all bookings should fail)
- [ ] Storage bucket `portfolio-images` created and set to public
- [ ] Auth email templates customized (in Supabase Dashboard → Auth → Email Templates)
- [ ] Auth site URL set to production domain

### Vercel Production
- [ ] All environment variables set for Production environment
- [ ] `NEXT_PUBLIC_SITE_URL` set to actual domain (not vercel.app)
- [ ] Cron jobs enabled (requires Vercel Hobby or Pro)
- [ ] `vercel.json` committed with cron schedules
- [ ] Build succeeds with zero TypeScript errors (`tsc --noEmit`)

### External Services
- [ ] Resend: domain verified (add DNS TXT records for DKIM/SPF)
- [ ] Resend: `from` email address confirmed
- [ ] Telegram bot created, token and chat ID saved to env vars
- [ ] Test booking end-to-end: client books → Telegram notification arrives → confirmation email arrives

### Performance & SEO
- [ ] `next/image` used for all portfolio images (`priority={true}` on hero image)
- [ ] Open Graph meta tags set (title, description, image) — critical for Instagram/TikTok link previews
- [ ] `robots.txt` allows indexing of public pages, disallows `/admin/*`
- [ ] `sitemap.xml` generated (static pages only)
- [ ] Lighthouse mobile score ≥ 90 (Performance, Accessibility, SEO)
- [ ] Test on real mobile device (not just browser DevTools)

### Security
- [ ] `/admin/*` returns 401/redirect for unauthenticated requests (test in incognito)
- [ ] All cron endpoints return 401 without correct `CRON_SECRET`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` never appears in client bundle (`next build` output)
- [ ] No secrets in `vercel.json` or any committed file

---

## Monitoring & Observability

### Vercel Built-in (Free)
- **Logs**: `Vercel Dashboard → Project → Logs` — real-time function logs
- **Analytics**: basic web vitals, visitor count (enable in Project Settings)
- **Deployments**: full history, instant rollback to any previous deployment

### Logging Pattern for Route Handlers

```typescript
// Consistent logging in all API routes
console.log('[bookings] New booking attempt', { slotId, serviceType })
console.error('[bookings] Slot conflict', { slotId, error: e.message })
console.log('[cron/reminders] Sent', { count: bookings.length, date })
```

Tag every log with the route name in brackets — makes Vercel log filtering fast.

### Instant Rollback

If production breaks after a deploy:
```
Vercel Dashboard → Project → Deployments
→ Find last working deployment
→ Click "..." → "Promote to Production"
Done in ~30 seconds, zero downtime.
```

---

## Operational Runbooks

### Runbook: Artist Can't Log In to Admin

```
1. Check Supabase Dashboard → Authentication → Users
   → Verify the email exists
2. If email not found: create user manually
   Supabase Dashboard → Auth → Users → Invite User
3. If email exists but login fails: send password reset
   Supabase Dashboard → Auth → Users → [user] → Send Password Reset
4. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   in Vercel env vars — must match the production Supabase project
```

### Runbook: Booking Notification Not Arriving (Telegram)

```
1. Check Vercel Logs for [notifications] entries
2. Verify TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel env vars
3. Test manually: call Telegram API directly in browser:
   https://api.telegram.org/bot{TOKEN}/getMe
   → Should return bot info. If 401: token is wrong.
4. Verify artist started a conversation with the bot
   → Artist must send /start to the bot first
5. Re-fetch Chat ID:
   https://api.telegram.org/bot{TOKEN}/getUpdates
```

### Runbook: Slot Conflict Occurring Frequently

```
1. Check Vercel Logs for [bookings] Slot conflict entries
2. Review the atomic transaction in app/api/bookings/route.ts
   → Must use Supabase .update() with .eq('is_booked', false) filter
   → Row must update 0 rows on conflict (use .select() to verify)
3. If issue persists: add Postgres advisory lock or use Supabase Edge Function
   with serializable transaction isolation
```

### Runbook: Vercel Build Failing

```
1. Check build logs in Vercel Dashboard → Deployments → [failed deploy]
2. Common causes:
   a. TypeScript error: fix locally (npx tsc --noEmit), push fix
   b. Missing env var: add to Vercel Dashboard → Settings → Env Variables
   c. Dependency issue: delete node_modules + .next, npm install, test locally
3. Never force-push to main to skip CI — fix the error
```

### Runbook: Supabase Free Tier Limits Approaching

```
Free tier limits:
  Database: 500MB
  Storage:  1GB
  Auth:     50,000 MAU
  Bandwidth: 5GB/month

Actions:
  1. Database: run cleanup cron more aggressively, archive old bookings
  2. Storage: optimize portfolio images before upload (target <200KB each)
  3. Bandwidth: enable Vercel's CDN caching for /api/availability responses
  4. If limits consistently hit: upgrade Supabase to Pro ($25/mo)
```

---

## v2 Integration Notes

### WhatsApp Cloud API (Future)
- Requires Meta Business Account verification (~1 week process)
- Free tier: 1,000 conversations/month
- Replace Telegram notifications with WhatsApp once verified
- Keep Telegram as fallback — don't remove it
- Add `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` env vars

### Google Calendar API (Future)
- OAuth2 flow: artist connects their Google Calendar once via admin settings
- Store refresh token in Supabase (encrypted column)
- On booking confirmed: create Google Calendar event via `app/api/integrations/calendar/`
- Requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` env vars
- Use `googleapis` npm package — do not call REST directly

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | Initial | Full infrastructure definition — Vercel + Supabase + Resend + Telegram. Aligned with PM v0.1, Frontend v0.1, UX/UI v0.1 |

---

> **For agents using this document**: This doc owns infrastructure, deployment, environment variables, and operational concerns. Never hardcode secrets. Never bypass the cron secret check. Never edit Supabase schema via the Dashboard in production — always use migrations. When in doubt about a variable name or service, this doc is the reference.
