# Frontend Engineer Documentation
## Tattoo Artist Portfolio & Booking Site

> **Agent Note**: This document defines the complete frontend architecture, design system, component structure, and implementation standards for this project. Read this alongside `product-manager-output.md` before writing any code. Update the Version History when this document changes.

---

## Tech Stack (Locked)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 15** (App Router) | SSR for fast first paint on social traffic, built-in image optimization, file-based routing, middleware auth |
| Language | **TypeScript** | Type safety for API contracts and component props |
| Styling | **Tailwind CSS v4** + OKLCH tokens | "Museumcore" design token layer |
| Typography | **Syne + Manrope + Geist Mono** | Avant-garde pairing with brutalist mono |
| Texture | **SVG Filter Grain** | Global tactile noise overlay |
| Animations | **Framer Motion** | Scroll-triggered reveals, page transitions, gallery interactions |
| Forms | **React Hook Form** + **Zod** | Booking form validation, type-safe schemas |
| State | **Zustand** (lightweight) | Booking flow state, admin calendar state |
| Data Fetching | **TanStack Query v5** | Caching, loading states, refetch on booking confirmation |
| Backend/DB | **Supabase** (Postgres + Auth + Realtime) | Availability slots, bookings, artist login, concurrent slot locking |
| API Layer | **Next.js API Routes** (App Router Route Handlers) | Booking endpoints, admin endpoints — Hono upgrade path if needed |
| Image CDN | **next/image** + Supabase Storage | Portfolio assets, automatic WebP, lazy loading |
| Email | **Resend** | Booking confirmation emails (artist + client) |
| Deployment | **Vercel** | Hobby (free) → Pro |

---

## Repository Structure

```
tattoo-portfolio/
├── app/
│   ├── (site)/                    # Public-facing routes
│   │   ├── page.tsx               # Homepage entry (imports from @/pages/site/sitePage)
│   │   ├── booking/
│   │   │   └── page.tsx           # Multi-step booking flow
│   │   └── layout.tsx             # Site layout (nav, footer, analytics)
│   ├── (admin)/                   # Protected admin routes
│   │   ├── login/
│   │   │   └── page.tsx           # Artist login
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Dashboard entry
│   │   └── layout.tsx             # Admin layout (auth guard, minimal chrome)
│   ├── api/
│   │   ├── bookings/
│   │   │   └── route.ts           # POST /api/bookings (create booking)
│   │   ├── availability/
│   │   │   └── route.ts           # GET /api/availability, POST (admin set), DELETE (admin remove)
│   │   └── auth/
│   │       └── route.ts           # Supabase auth callback
│   ├── globals.css                # Tailwind v4 base, OKLCH variables, @theme blocks
│   └── layout.tsx                 # Root layout (fonts, metadata, providers)
│
├── pages/                         # Complex page-level components (App Router)
│   ├── site/
│   │   └── sitePage.tsx           # Homepage implementation
│   └── admin/
│       └── dashboardPage.tsx      # Dashboard implementation
│
├── components/
│   ├── ui/                        # Primitive, reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Calendar.tsx
│   │   ├── Badge.tsx
│   │   └── LoadingSpinner.tsx
│   ├── site/                      # Page-level section components
│   │   ├── HeroSection.tsx
│   │   ├── Gallery.tsx
│   │   ├── GalleryImage.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactBar.tsx
│   │   └── Footer.tsx
│   ├── booking/                   # Booking flow components
│   │   ├── BookingFlow.tsx        # Orchestrator (step state machine)
│   │   ├── StepServiceSelect.tsx
│   │   ├── StepDatePicker.tsx
│   │   ├── StepTimePicker.tsx
│   │   ├── StepContactForm.tsx
│   │   └── StepConfirmation.tsx
│   └── admin/                     # Admin-only components
│       ├── AvailabilityCalendar.tsx
│       ├── SlotManager.tsx
│       └── BookingsList.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser Supabase client
│   │   ├── server.ts              # Server-side Supabase client (route handlers)
│   │   └── types.ts               # Generated DB types (supabase gen types)
│   ├── validations/
│   │   ├── booking.ts             # Zod schema for booking form
│   │   └── availability.ts        # Zod schema for slot management
│   ├── motion.ts                  # Shared Framer Motion variants
│   └── utils.ts                   # Shared utilities (date formatting, cn(), etc.)
│
├── hooks/
│   ├── useAvailability.ts         # TanStack Query: fetch available slots by date
│   ├── useBooking.ts              # Booking mutation + state
│   └── useAdminAuth.ts            # Auth guard for admin routes
│
├── store/
│   └── bookingStore.ts            # Zustand: multi-step booking flow state
│
├── types/
│   └── index.ts                   # Shared TypeScript types (ServiceType, Booking, Slot)
│
├── public/
│   └── fonts/                     # Self-hosted font files
│
├── middleware.ts                  # Auth guard: redirects /admin/* if not authenticated
├── next.config.ts
├── postcss.config.mjs             # Tailwind v4 uses PostCSS
└── .env.local                     # Local secrets (never committed)
```

---

## Design System

### Aesthetic Direction

> **Concept: Dark Editorial Ink**
> The site must feel like a high-end art publication, not a service directory. Think: tattoo culture meets editorial fashion photography. Dark, dramatic, confident. The micropigmentation sections get a secondary palette — softer, more intimate, beauty-brand influenced — while sharing the same typographic DNA.

**The one thing visitors will remember**: Full-bleed photography with almost no UI chrome — the work takes over the entire viewport. Navigation and CTAs appear as whispers, not shouting.

---

### Typography

```css
/* Display font — Cormorant Garamond (Editorial Serif) */
--font-display: 'Cormorant Garamond', serif;

/* Accent font — Syne (Avant-Garde) */
--font-accent: 'Syne', sans-serif;

/* Body font — Manrope (Modern Clean) */
--font-body: 'Manrope', sans-serif;

/* Technical / Monospace — Geist Mono (Brutalist) */
--font-mono: 'Geist Mono', monospace;
```

**Type Scale:**
```css
--text-ultra:   clamp(5rem, 12vw, 10rem);    /* Hero name */
--text-display: clamp(3rem, 6vw, 5rem);      /* Section titles */
--text-accent:  2rem;                        /* Syne accents */
--text-body:    1rem;                        /* Body copy */
--text-label:   10px;                        /* Geist labels */
```

---

### Color Tokens

```css
:root {
  /* === CORE PALETTE === */
  --color-ink:        #0A0A0A;   /* Near-black background */
  --color-charcoal:   #141414;   /* Card/surface background */
  --color-ash:        #1E1E1E;   /* Elevated surface (modals, admin panels) */
  --color-smoke:      #2A2A2A;   /* Borders, dividers */
  --color-mist:       #6B6B6B;   /* Muted text, placeholders */
  --color-bone:       #E8E0D5;   /* Primary text (warm white, not pure white) */
  --color-white:      #F5F2EE;   /* High-contrast text, CTAs */

  /* === ACCENT — Main tattoo brand === */
  --color-gold:       #C9A84C;   /* Primary accent: CTAs, active states, highlights */
  --color-gold-dim:   #8A6B2A;   /* Hover states, secondary accents */

  /* === MICROPIGMENTATION sub-palette === */
  /* Used in micropigmentation sections — softer, warmer */
  --color-blush:      #D4A0A0;   /* Lip micropigmentation accent */
  --color-taupe:      #A89070;   /* Eyebrow micropigmentation accent */
  --color-cream:      #F0E8DE;   /* Light backgrounds in micro sections */

  /* === FUNCTIONAL === */
  --color-success:    #4CAF50;
  --color-error:      #E57373;
  --color-warning:    #FFB74D;
  --color-info:       #64B5F6;
}
```

---

### Spacing & Layout

```css
/* Spacing scale (8px base) */
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */

/* Section vertical rhythm */
--section-padding-y: clamp(4rem, 10vw, 8rem);

/* Content max-width */
--content-max:       1280px;
--content-narrow:    800px;   /* Text-heavy sections */
--content-wide:      1440px;  /* Full-bleed gallery */

/* Breakpoints (Tailwind default — document for reference) */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */
```

---

### Motion System

```typescript
// lib/motion.ts — shared Framer Motion variants

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } }
}

export const imageReveal = {
  hidden:  { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

**Motion principles:**
- All section entrances: `fadeUp` on scroll (use `whileInView`, `once: true`)
- Gallery images: `imageReveal` with `staggerChildren`
- Page transitions: subtle `fadeIn` between routes
- Booking step transitions: `slideInRight` (forward) / `slideInLeft` (back)
- Never animate layout-affecting properties on mobile (use `prefers-reduced-motion`)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Page Architecture

### Homepage (`app/(site)/page.tsx`)

Single long-scroll page. Section order is intentional — do not reorder without PM approval.

```
1. <Hero />              — Full viewport, background video or signature image, artist name, single CTA
2. <Gallery />           — Work by category (tabs: All / Micropigmentation / Tattoos)
3. <ServicesSection />   — Eyebrows | Lips | Tattoos — editorial spread layout
4. <AboutSection />      — Artist photo + bio + philosophy
5. <BookingCTA />        — Full-width dark band, prominent "Book Your Session" button
6. <Footer />            — Social links, contact, credits
```

**Hero specifics:**
- Background: full-bleed portfolio image (supplied by artist) OR autoplay muted video
- Overlay: dark gradient (ink → transparent) from bottom
- Text: artist name in `--font-display` at `--text-hero` size, minimal subtitle
- Single CTA button: "Book Now" → scrolls to `#booking` or routes to `/booking`
- Subtle scroll indicator (animated chevron or line)

**Gallery specifics:**
- Category tabs: `All` | `Micropigmentation — Olhos` | `Micropigmentation — Lábios` | `Tatuagens`
- Layout: asymmetric masonry grid (not uniform grid — sizes vary for editorial feel)
- Images sourced from Supabase Storage via `next/image`
- Click/tap → full-screen lightbox modal
- Mobile: 2-column staggered grid

---

## Component Specifications

### `<BookingFlow />` — State Machine

The booking flow is a client component managing a 5-step state machine.

```typescript
// store/bookingStore.ts
type BookingStep = 'service' | 'date' | 'time' | 'contact' | 'confirmation'

type BookingState = {
  step: BookingStep
  serviceType: ServiceType | null       // 'eyebrows' | 'lips' | 'tattoo'
  selectedDate: string | null           // ISO date string
  selectedSlot: TimeSlot | null         // { id, time, date }
  contactInfo: ContactFormData | null
  confirmedBooking: Booking | null
  // actions
  setService: (s: ServiceType) => void
  setDate: (d: string) => void
  setSlot: (s: TimeSlot) => void
  setContact: (c: ContactFormData) => void
  setConfirmed: (b: Booking) => void
  goBack: () => void
  reset: () => void
}
```

**Step progression:**
```
service → date → time → contact → [API call] → confirmation
```

**Each step renders as a full panel** with:
- Progress indicator (5 dots or step labels at top)
- Back button (except step 1)
- Next/Submit button (disabled until step is valid)
- Framer Motion slide transition between steps

---

### `<StepDatePicker />` — Availability Calendar

```typescript
// hooks/useAvailability.ts
// Fetches available dates for a given month
// GET /api/availability?month=2024-06&service=eyebrows
// Returns: { availableDates: string[], slots: Record<string, TimeSlot[]> }

const useAvailability = (month: string, service: ServiceType) => {
  return useQuery({
    queryKey: ['availability', month, service],
    queryFn: () => fetchAvailability(month, service),
    staleTime: 30_000,   // Re-fetch every 30s (near real-time slot updates)
  })
}
```

**Calendar behavior:**
- Past dates: always disabled
- Dates with no available slots: disabled + visually muted
- Dates with slots: highlighted with `--color-gold` dot indicator
- Selected date: `--color-gold` background
- Mobile: full-width, large tap targets (min 44px)

---

### `<StepTimePicker />` — Slot Selection

- Fetches slots for the selected date from `availability` query cache (no extra request)
- Displays slots as pill buttons: `"10:00"`, `"12:30"`, `"15:00"`
- Booked slots: hidden (not shown as disabled — reduces confusion)
- Selected slot: `--color-gold` highlight
- If no slots: friendly message + option to go back and pick another date

---

### `<StepContactForm />` — Zod Validation

```typescript
// lib/validations/booking.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2, 'Por favor ingresá tu nombre completo'),
  phone:   z.string().regex(/^\+?[\d\s\-()]{8,}$/, 'Número de teléfono inválido'),
  email:   z.string().email('Email inválido').optional().or(z.literal('')),
  notes:   z.string().max(300, 'Máximo 300 caracteres').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

**Form fields:**
- Name (required)
- Phone / WhatsApp (required) — primary contact in Argentina/LATAM
- Email (optional)
- Notes / reference image description (optional, textarea)

---

## Database Schema (Supabase)

```sql
-- Service types enum
CREATE TYPE service_type AS ENUM ('eyebrows', 'lips', 'tattoo');

-- Available slots (set by artist via admin)
CREATE TABLE availability_slots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date        DATE NOT NULL,
  time        TIME NOT NULL,
  service     service_type,          -- NULL = available for any service
  is_booked   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Bookings (created by clients)
CREATE TABLE bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id       UUID REFERENCES availability_slots(id),
  service_type  service_type NOT NULL,
  client_name   TEXT NOT NULL,
  client_phone  TEXT NOT NULL,
  client_email  TEXT,
  notes         TEXT,
  status        TEXT DEFAULT 'confirmed',  -- 'confirmed' | 'cancelled'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read available (non-booked) slots
CREATE POLICY "Public read available slots"
  ON availability_slots FOR SELECT
  USING (is_booked = FALSE);

-- Only authenticated (artist) can insert/update slots
CREATE POLICY "Artist manages slots"
  ON availability_slots FOR ALL
  USING (auth.role() = 'authenticated');

-- Only authenticated (artist) can read all bookings
CREATE POLICY "Artist reads bookings"
  ON bookings FOR SELECT
  USING (auth.role() = 'authenticated');

-- Public can insert a booking (but not read others')
CREATE POLICY "Public creates booking"
  ON bookings FOR INSERT
  WITH CHECK (TRUE);
```

---

## API Route Specifications

### `POST /api/bookings`

Creates a booking and marks the slot as booked (atomic transaction).

```typescript
// Request body
{
  slotId:      string,   // UUID of the availability_slot
  serviceType: ServiceType,
  name:        string,
  phone:       string,
  email?:      string,
  notes?:      string,
}

// Success 201
{ booking: Booking, message: 'Turno confirmado' }

// Error 409 — slot already taken
{ error: 'Este horario ya fue reservado. Por favor elegí otro.' }

// Error 422 — validation failed
{ error: string, fields: Record<string, string> }
```

**Concurrency handling**: Use a Supabase transaction — check `is_booked = FALSE` and set `is_booked = TRUE` atomically. Return 409 if the slot was taken between the client's last fetch and submission.

### `GET /api/availability`

```typescript
// Query params
?month=2024-06          // required: YYYY-MM
&service=eyebrows       // optional: filter by service type

// Response
{
  availableDates: string[],          // ["2024-06-10", "2024-06-12", ...]
  slots: {
    "2024-06-10": [
      { id: "uuid", time: "10:00" },
      { id: "uuid", time: "14:00" },
    ]
  }
}
```

### `POST /api/availability` (admin, authenticated)

```typescript
// Request body
{ date: string, times: string[], service?: ServiceType }
// Creates one slot per time entry for the given date
```

### `DELETE /api/availability/[slotId]` (admin, authenticated)

Removes a slot if not booked. Returns 409 if booked (admin must cancel the booking first).

---

## Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image preloaded, `priority` on `next/image` |
| FID / INP | < 100ms | No heavy JS on initial load; defer gallery JS |
| CLS | < 0.1 | All images have explicit `width`/`height` |
| Total JS bundle | < 200KB gzipped | Dynamic imports for gallery lightbox, booking flow |
| Gallery image size | < 200KB each | WebP via Supabase image transforms or `next/image` |
| Mobile TTI | < 3.5s | SSR homepage, client-only for booking flow |

**Key optimizations:**
- Gallery images: lazy-loaded with blur placeholder (`blurDataURL`)
- Booking flow: dynamically imported (`next/dynamic`) — not in initial bundle
- Fonts: self-hosted (no Google Fonts DNS lookup), `font-display: swap`
- Hero image: `priority={true}` on `next/image`, preloaded in `<head>`

---

## Accessibility Standards (WCAG 2.1 AA)

- All interactive elements keyboard-navigable (Tab order logical)
- Focus rings visible and styled (use `focus-visible`, not `focus`)
- All images: descriptive `alt` text (portfolio: describe style/placement, not "tattoo photo")
- Color contrast: all text ≥ 4.5:1 against background
- Booking form: labels associated with inputs, error messages linked via `aria-describedby`
- Calendar: keyboard navigation (arrow keys for date selection), `aria-label` on each date cell
- Modal/lightbox: focus trapped when open, `Escape` closes, `aria-modal="true"`
- Reduced motion: all animations respect `prefers-reduced-motion`

---

## Admin Dashboard Specifications

The admin area is intentionally **functional over artistic** — the artist needs to use this quickly, possibly from a phone.

**Login page (`/admin/login`):**
- Simple centered form: email + password (Supabase Auth)
- Redirect to `/admin/dashboard` on success
- Protected by `middleware.ts` — any `/admin/*` route checks Supabase session

**Dashboard (`/admin/dashboard`):**

```
┌─────────────────────────────────────────────┐
│  [Month Nav: ← Junio 2024 →]               │
│                                             │
│  [Monthly Calendar — tap date to manage]    │
│  · Available dates: gold dot               │
│  · Booked dates: filled dot                │
│  · Today: outlined                         │
│                                             │
│  [Selected Date Panel]                      │
│  "Martes 11 de Junio"                      │
│  Time slots:                               │
│    [10:00] Available   [×]                 │
│    [12:00] BOOKED — María G.               │
│    [15:30] Available   [×]                 │
│  [+ Add time slot]                         │
│                                             │
│  [Upcoming Bookings List]                   │
│  Sorted by date, shows: name, service,     │
│  date/time, phone (tap to WhatsApp)        │
└─────────────────────────────────────────────┘
```

**WhatsApp deep link for booked clients:**
```typescript
const waLink = `https://wa.me/${phone.replace(/\D/g, '')}?text=Hola ${name}, te confirmo tu turno...`
```

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Server-only, never expose to client

RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://[domain].com  # For email links, OG tags

# Optional analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=[domain].com
```

---

## Email Templates (Resend)

### Client Confirmation Email
**Subject**: `Tu turno está confirmado — [ServiceType] el [Date]`
**Content**: Name, service, date, time, artist contact (WhatsApp), cancellation note, site link.

### Artist Notification Email
**Subject**: `Nuevo turno: [ClientName] — [ServiceType] [Date] [Time]`
**Content**: Full booking details, client phone as WhatsApp link, notes.

> Both emails should be HTML templates matching the site's dark brand — not generic transactional style.

---

## Critical Questions Checklist

- [ ] Portfolio images — who uploads them? Via Supabase Storage dashboard (MVP) or admin upload UI (v2)?
- [ ] Copy language — Spanish only for MVP. Confirm: Argentina Spanish (`vos` vs `tú`)?
- [ ] Artist's name and studio name — needed for metadata, hero text, email subjects
- [ ] Domain — has the client registered one? Recommendation: `[artistname].com.ar` or `.studio`
- [ ] WhatsApp number — needed for contact links and artist notification emails
- [ ] Instagram/TikTok handles — needed for footer links and Open Graph `site_name`
- [ ] Does the artist want a WhatsApp CTA button floating on the site? (common in LATAM, high conversion)
- [ ] Video for hero? Or static image? (affects hero component implementation)
- [ ] Google Analytics vs Plausible (privacy-first, no cookie banner needed)?

---

## Implementation Phases

### Phase 1 — Foundation (Days 1–2)
- [ ] Next.js 15 project setup with TypeScript, Tailwind v4
- [ ] Supabase project init, schema migration, RLS policies
- [ ] Font loading, CSS custom properties (design tokens)
- [ ] Folder structure and base layout components

### Phase 2 — Public Site (Days 3–5)
- [ ] Hero section
- [ ] Gallery with category tabs + lightbox
- [ ] Services section (three service spreads)
- [ ] About section
- [ ] Footer with social links

### Phase 3 — Booking Flow (Days 6–8)
- [ ] Zustand booking store (step state machine)
- [ ] API routes: availability GET, bookings POST
- [ ] StepServiceSelect, StepDatePicker, StepTimePicker, StepContactForm, StepConfirmation
- [ ] Zod validation, error handling, loading states
- [ ] Resend email integration

### Phase 4 — Admin Dashboard (Days 9–10)
- [ ] Supabase Auth login page + middleware
- [ ] Availability calendar + slot manager
- [ ] Bookings list with WhatsApp links

### Phase 5 — Polish & Deploy (Days 11–12)
- [ ] Framer Motion animations (scroll reveals, gallery, booking transitions)
- [ ] Performance audit (Lighthouse ≥ 90 on mobile)
- [ ] Accessibility pass (keyboard nav, contrast, ARIA)
- [ ] Vercel deploy + custom domain
- [ ] Open Graph meta tags (for Instagram/TikTok link previews)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | Initial | Full stack defined, design system, component specs, DB schema, API contracts — aligned with PM doc v0.1 |

---

> **For agents using this document**: The PM doc (`product-manager-output.md`) is the source of truth for *what* to build. This doc is the source of truth for *how* to build it. When in conflict, the PM doc wins on scope decisions; this doc wins on technical implementation decisions. Always check the Phase checklist before starting a session to know where the project stands.
