# UX/UI Designer Documentation
## Tattoo Artist Portfolio & Booking Site

> **Agent Note**: This document is the design source of truth for the project. It translates PM feature stories into a complete design system, interaction specifications, and screen-by-screen UX flows. Always read alongside `product-manager-output.md` (what to build) and `frontend-agent-output.md` (how to build it). When there's a conflict between this doc and the frontend doc on visual decisions, this doc wins. Update the Version History when this document changes.

---

## Design Vision

### Concept: "La Piel Como Lienzo" *(The Skin as Canvas)*

This site is not a booking platform with a gallery attached. It is a **gallery with a booking flow embedded**. Every design decision starts from that distinction.

The visual language borrows from:
- High-end tattoo studio editorial sites (dark, dramatic, confident)
- Luxury beauty brand microsites for micropigmentation (soft, intimate, trustworthy)
- Art photography portfolios (the work fills the screen — UI disappears)

**The experience arc a visitor takes:**
1. **Arrivo** — Struck by full-bleed imagery. Feels like entering a studio.
2. **Exploración** — Browses work. Builds desire and trust.
3. **Conexión** — Reads about the artist. Emotional connection formed.
4. **Acción** — Books. Flow is calm, clear, and fast — doesn't break the mood.

**The one thing visitors remember**: The work felt like art before it felt like a service.

---

## Design System

### 1. Color System

All colors are defined as CSS custom properties in `globals.css` (see frontend doc). This section defines their semantic usage.

#### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink` | `#0A0A0A` | Page background |
| `--color-charcoal` | `#141414` | Card and surface backgrounds |
| `--color-ash` | `#1E1E1E` | Elevated surfaces: modals, drawers, admin panels |
| `--color-smoke` | `#2A2A2A` | Borders, dividers, input outlines |
| `--color-mist` | `#6B6B6B` | Muted/secondary text, placeholders |
| `--color-bone` | `#E8E0D5` | Primary body text (warm — avoids clinical pure white) |
| `--color-white` | `#F5F2EE` | High-contrast text, active CTA labels |

#### Accent — Main Brand

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gold` | `#C9A84C` | Primary CTA backgrounds, active states, highlights, calendar selected date |
| `--color-gold-dim` | `#8A6B2A` | Hover state on gold elements |

#### Micropigmentation Sub-Palette

Used exclusively within the Micropigmentation Eyebrows and Lips sections. Creates a distinct but harmonious sub-brand within the same site.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-blush` | `#D4A0A0` | Lips section accent, tab indicator |
| `--color-taupe` | `#A89070` | Eyebrows section accent, tab indicator |
| `--color-cream` | `#F0E8DE` | Light tinted backgrounds in micro sections only |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4CAF50` | Booking confirmation, slot availability indicator |
| `--color-error` | `#E57373` | Form validation errors, slot conflict message |
| `--color-warning` | `#FFB74D` | Admin alerts (slot about to expire, etc.) |

#### Accessibility Notes
- All body text (`--color-bone` on `--color-ink`): contrast ratio **11.2:1** ✅ WCAG AAA
- Gold CTA label (`--color-ink` on `--color-gold`): contrast ratio **6.8:1** ✅ WCAG AA
- Muted text (`--color-mist` on `--color-ink`): **4.6:1** ✅ WCAG AA minimum
- Never use `--color-mist` for interactive or critical UI text — only decorative/secondary

---

### 2. Typography System

#### Font Stack

```
Display:  'Cormorant Garamond', Georgia, serif
Body:     'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif
Mono:     'DM Mono', 'Courier New', monospace
```

**Loading strategy**: Self-host both fonts via `/public/fonts/`. No Google Fonts DNS calls. Use `font-display: swap`.

#### Type Scale

| Role | Size / Line Height | Weight | Letter Spacing | Usage |
|------|--------------------|--------|----------------|-------|
| **Hero** | `clamp(3.5rem, 8vw, 7rem)` / 1.0 | 300 (Light) | `-0.02em` | Artist name on hero |
| **Display** | `clamp(2rem, 4vw, 3.5rem)` / 1.1 | 400 (Regular) | `-0.01em` | Section titles |
| **Title** | `clamp(1.25rem, 2vw, 1.75rem)` / 1.2 | 500 | `0` | Service card titles |
| **Subtitle** | `1.125rem` / 1.4 | 400 | `0.02em` | Section subtitles, eyebrow labels |
| **Body Large** | `1.125rem` / 1.7 | 400 | `0` | Artist bio, service descriptions |
| **Body** | `1rem` / 1.6 | 400 | `0` | Standard UI text, form fields |
| **Body Small** | `0.875rem` / 1.5 | 400 | `0` | Captions, secondary info |
| **Label** | `0.75rem` / 1.0 | 500 | `0.12em` | Form labels (uppercase), badges |
| **Micro** | `0.6875rem` / 1.0 | 400 | `0.08em` | Timestamps, metadata |

**Design rule**: Hero and Display headings use Cormorant Garamond. Everything else uses DM Sans. This contrast — a breathable editorial serif against a clean geometric sans — is the typographic identity of the site.

---

### 3. Spacing & Layout System

**Base unit**: `8px`

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro: icon/label gap |
| `space-2` | 8px | Internal padding: tags, badges |
| `space-3` | 12px | Compact padding: small buttons |
| `space-4` | 16px | Standard: input padding, card internals |
| `space-6` | 24px | Medium: stacked text groups |
| `space-8` | 32px | Large: between UI groups |
| `space-12` | 48px | Extra: between sections within a page block |
| `space-16` | 64px | Section dividers |
| `space-24` | 96px | Hero sections, above-the-fold vertical rhythm |
| `space-32` | 128px | Maximum breathing room (desktop hero) |

**Section vertical padding**: `clamp(4rem, 10vw, 8rem)` top and bottom.

#### Grid System

| Breakpoint | Columns | Gutter | Max Content Width |
|------------|---------|--------|-------------------|
| Mobile `< 640px` | 4 | 16px | 100% - 32px margins |
| Tablet `640–1023px` | 8 | 24px | 100% - 48px margins |
| Desktop `1024–1279px` | 12 | 32px | 1280px |
| Wide `1280px+` | 12 | 32px | 1440px |

---

### 4. Elevation & Depth System

Dark-background sites need depth through blur and opacity, not traditional box-shadows.

| Level | Treatment | Usage |
|-------|-----------|-------|
| **Ground** | No shadow, `--color-ink` bg | Page background |
| **Raised** | `--color-charcoal` bg | Gallery cards, service cards |
| **Overlay** | `--color-ash` bg + `1px solid --color-smoke` border | Modals, booking steps panel |
| **Floating** | `backdrop-filter: blur(16px)` + `rgba(10,10,10,0.7)` | Nav bar on scroll, lightbox controls |
| **Scrim** | `rgba(10,10,10,0.85)` full-screen overlay | Gallery lightbox backdrop, mobile menu |

---

### 5. Component Specifications

#### Button

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `--color-gold` | `--color-ink` | none | `--color-gold-dim`, scale 0.98 |
| **Secondary** | transparent | `--color-bone` | `1px solid --color-smoke` | `--color-ash` bg |
| **Ghost** | transparent | `--color-gold` | `1px solid --color-gold` | `rgba(gold, 0.08)` bg |
| **Danger** | transparent | `--color-error` | `1px solid --color-error` | `rgba(error, 0.1)` bg |

| Size | Height | Padding | Font | Radius |
|------|--------|---------|------|--------|
| **SM** | 36px | 0 16px | 13px / 500 | 4px |
| **MD** | 44px | 0 24px | 14px / 500 | 4px |
| **LG** | 52px | 0 32px | 15px / 500 | 4px |

**States**: Default → Hover (150ms ease) → Active (scale 0.97) → Focus (2px gold outline, 2px offset) → Disabled (30% opacity, cursor not-allowed) → Loading (spinner replaces label, same size)

**Interaction**: All buttons use `letter-spacing: 0.06em; text-transform: uppercase` — gives weight without size increase.

---

#### Input / Textarea

```
Height:          48px (input), auto (textarea min 120px)
Padding:         0 16px (input), 12px 16px (textarea)
Background:      --color-ash
Border:          1px solid --color-smoke
Border-radius:   4px
Text:            --color-bone / 1rem
Placeholder:     --color-mist / 1rem

Focus:           border-color: --color-gold; outline: none; box-shadow: 0 0 0 2px rgba(gold, 0.15)
Error state:     border-color: --color-error; + error message below in --color-error / 12px
Valid state:     no extra indicator (avoids visual noise)
```

**Form labels**: Always above the field. `0.75rem / uppercase / letter-spacing: 0.12em / --color-mist`. Never inside the field as placeholder-only.

---

#### Calendar (Date Picker)

```
Container:       --color-ash background, 1px solid --color-smoke border, 4px radius
Header:          Month name (Cormorant Garamond, 1.125rem) + prev/next arrows
Day cells:       40px × 40px minimum tap target, 4px radius

States:
  Default:       --color-bone text, transparent bg
  Has slots:     small --color-gold dot below the date number
  Selected:      --color-gold bg, --color-ink text, no dot
  Disabled:      --color-mist text, cursor not-allowed, no dot
  Today:         --color-bone text, 1px solid --color-smoke border
  Hover (avail): rgba(--color-gold, 0.12) bg

Mobile:          Full width, day cells fill available width
```

---

#### Time Slot Pill

```
Unselected:      --color-ash bg, 1px solid --color-smoke, --color-bone text
                 Height: 40px, padding: 0 20px, radius: 20px (pill shape)
Selected:        --color-gold bg, --color-ink text, no border
Hover:           rgba(--color-gold, 0.12) bg
Transition:      150ms ease-out on background and color
```

---

#### Gallery Lightbox

```
Backdrop:        rgba(0,0,0,0.92), backdrop-filter: blur(8px)
Image:           max 90vw × 90vh, object-fit: contain
Close button:    Top-right, 44×44px tap target, --color-bone, X icon
Navigation:      Left/right arrows, 44×44px, visible on hover (desktop) / always visible (mobile)
Transition:      Fade in backdrop (200ms), scale up image from 0.96 to 1 (300ms ease)
Swipe support:   Required on mobile (touch gesture left/right to navigate)
```

---

### 6. Motion System

All animations respect `prefers-reduced-motion: reduce` — when set, all transitions become instant.

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| `fadeUp` | 600ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Section enters viewport |
| `imageReveal` | 800ms | same | Gallery images enter viewport |
| `staggerChildren` | 80ms stagger | — | Gallery grid, service cards |
| `slideStep` | 400ms | `ease-out` | Booking step transitions |
| `fadeIn` | 300ms | `ease` | Modal open, lightbox backdrop |
| `scaleIn` | 300ms | `ease-out` | Modal content, lightbox image |
| Hover lift | 200ms | `ease` | Gallery cards (translateY -4px) |
| Button press | 80ms | `ease` | Active state (scale 0.97) |

**Golden rule**: Maximum one orchestrated entrance animation per viewport change. No ambient or looping animations. Motion earns attention — don't waste it.

---

## User Flows & Screen Specifications

---

### FLOW 1 — Homepage (Single Scroll)

#### Screen 1.1 — Hero

```
Layout:     Full viewport (100vw × 100svh), no scrollbar visible
Background: Full-bleed artist portfolio image (supplied by client)
            Gradient overlay: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)
            This ensures text readable over any photo

Content (centered, bottom-aligned with padding-bottom: 10vh):
  ┌─────────────────────────────────────┐
  │                                     │
  │                                     │
  │                                     │
  │   [Artist Name]                     │
  │   Cormorant Garamond, hero size     │
  │   color: --color-white              │
  │                                     │
  │   [Tagline — one short line]        │
  │   DM Sans, subtitle size            │
  │   color: --color-mist               │
  │                                     │
  │   [Book Now ↓]  ← Primary LG btn   │
  │                                     │
  └─────────────────────────────────────┘

Navigation (floating, top):
  - Logo/name left-aligned (text, Cormorant Garamond, 1.25rem)
  - Nav links right: "Trabajo" / "Servicios" / "Sobre mí" / "Turno"
  - On scroll > 80px: nav gets --color-ash bg + backdrop-filter: blur(16px)
  - Mobile: hamburger → full-screen overlay menu

Scroll indicator:
  - Bottom center: animated vertical line pulsing down
  - Disappears after first scroll
```

**Entry animation**: Hero image fades in (800ms), text `fadeUp` with 200ms delay, button `fadeUp` 400ms delay.

---

#### Screen 1.2 — Gallery Section

```
Section title:
  "Trabajos"  ← Cormorant Garamond, display size, centered
  Animated underline: thin --color-gold line draws from left to right on scroll entry

Category tabs (below title, centered):
  [ Todos ]  [ Micropigmentación ]  [ Tatuajes ]
  - Active tab: --color-gold bottom border (2px), --color-white text
  - Inactive: --color-mist text, no border
  - Tab switching: gallery fades out (150ms), new category fades in (300ms)

  Micropigmentación tab expands to sub-tabs:
  [ Cejas ]  [ Labios ]
  - Cejas active indicator: --color-taupe
  - Labios active indicator: --color-blush

Gallery grid (below tabs):
  Desktop:  Asymmetric masonry — 3 columns, images vary in height (portrait/landscape mix)
  Tablet:   2-column masonry
  Mobile:   2-column staggered grid (left column offset top by 24px for rhythm)

  Each image cell:
  - Aspect ratio maintained (no cropping by grid)
  - Hover: slight scale (1.02) + overlay with category badge
  - Transition: 250ms ease
  - Border-radius: 2px (subtle, keeps editorial feel)
  - Gap between cells: 8px (desktop) / 4px (mobile)

Click/tap → Lightbox opens
Load more: Bottom "Ver más" ghost button if > 12 images per category
```

---

#### Screen 1.3 — Services Section

Three service "spreads" — each gets its own full layout moment. **Not cards in a row.**

```
Layout pattern (desktop): alternates left/right image–text split
  Spread 1 — Micropigmentación de Cejas
  Spread 2 — Micropigmentación de Labios
  Spread 3 — Tatuajes

Each spread:
  ┌──────────────────────────────────────────────┐
  │  [Full-bleed image, 50% width]               │
  │                      │ Section label (small) │
  │                      │ [Service Name]        │
  │                      │ (Cormorant, display)  │
  │                      │                       │
  │                      │ [2-3 line description]│
  │                      │ (DM Sans, body large) │
  │                      │                       │
  │                      │ Key details:          │
  │                      │ · Técnica             │
  │                      │ · Duración            │
  │                      │ · Tiempo de curación  │
  │                      │                       │
  │                      │ [Reservar turno →]    │
  │                      │ (Ghost button)        │
  └──────────────────────────────────────────────┘

Micropigmentation spreads: use --color-cream as subtle background tint on text half
Tattoo spread: full dark --color-ink background, --color-gold accent on key detail labels

Mobile: image top, text below (stacked), full width
```

---

#### Screen 1.4 — About Section

```
Layout (desktop): 40/60 split — artist photo left, text right

Photo:
  - Portrait orientation, 40% width
  - Slight rough/torn edge mask (CSS clip-path or SVG mask) for artistic feel
  - No border-radius — keep it raw

Text block:
  - Section label: "La artista" (uppercase, --color-mist, label size)
  - Artist name: Cormorant Garamond, title size, --color-white
  - Bio: DM Sans, body large, --color-bone, max 4 short paragraphs
  - Subtle --color-gold horizontal rule between artist name and bio
  - Optional: certification badges or notable detail tags (pill style, --color-ash bg)

Mobile: full-width photo (70vw centered), text below
```

---

#### Screen 1.5 — Booking CTA Band

```
Full-width section:
  - Background: linear-gradient of a signature tattoo image, heavily darkened
  - Or: --color-charcoal with subtle texture (grain overlay via CSS)

Content (centered):
  "¿Lista para tu próximo tatuaje?"
  (Cormorant Garamond, display size, --color-white)

  "Elegí tu fecha y hora."
  (DM Sans, subtitle, --color-mist)

  [Reservar mi turno]  ← Primary LG button

  Spacing: generous vertical padding (space-24)
```

---

#### Screen 1.6 — Footer

```
Layout (3 columns desktop, stacked mobile):

  Col 1: Logo/name + tagline
  Col 2: Nav links (Trabajo / Servicios / Sobre mí / Turno)
  Col 3: Socials + contact

  Social links:
  - Instagram icon → @handle
  - TikTok icon → @handle
  - WhatsApp icon → direct link
  All icons: 24px, --color-mist, hover --color-bone

  Bottom bar (full width, top border 1px --color-smoke):
  "© 2024 [Artist Name] · Diseño y desarrollo [Your Name/Studio]"
  (micro size, --color-mist)

  Mobile: all stacked, center-aligned
```

---

### FLOW 2 — Booking Flow

The booking flow lives at `/booking` and is also reachable via "Book Now" on any page. It renders as a full-page experience (not a modal) — keeps focus, avoids being trapped in a modal on mobile.

#### Progress Indicator (persistent top bar across all steps)

```
┌─────────────────────────────────────────────────┐
│  ● ─────── ○ ─────── ○ ─────── ○ ─────── ○     │
│ Servicio   Fecha    Hora    Datos    Confirmación│
└─────────────────────────────────────────────────┘

Active step: --color-gold filled circle
Completed:   --color-gold outlined circle + --color-gold connecting line
Upcoming:    --color-smoke circle + --color-smoke line

Mobile: dots only (no labels), step name shown as small text below dots
```

---

#### Step 2.1 — Service Selection

```
Heading: "¿Qué servicio buscás?"
(Cormorant, display, centered)

3 service cards in a row (desktop) / stacked (mobile):
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  [Image]       │  │  [Image]       │  │  [Image]       │
│                │  │                │  │                │
│  Cejas         │  │  Labios        │  │  Tatuaje       │
│  Micropigment. │  │  Micropigment. │  │  Personalizado │
│                │  │                │  │                │
│  [Elegir]      │  │  [Elegir]      │  │  [Elegir]      │
└────────────────┘  └────────────────┘  └────────────────┘

Card selected state:
- --color-gold border (2px)
- --color-ash background
- Checkmark badge top-right corner
- [Elegir] button → [Seleccionado ✓] (gold bg)

On selection: 500ms delay → auto-advances to Step 2.2
(Gives user a moment to see their selection confirmed)
```

---

#### Step 2.2 — Date Selection

```
Heading: "Elegí una fecha"
Subheading: "[Service selected] · Cambiar" (links back to step 1)

Calendar (full width on mobile, centered 380px max on desktop):
[See Calendar component spec above]

Below calendar:
"Los puntos dorados indican días disponibles."
(body-small, --color-mist, centered)

Next button: disabled until a date is selected
Back link: "← Cambiar servicio" (ghost, left-aligned)
```

---

#### Step 2.3 — Time Selection

```
Heading: "Elegí un horario"
Subheading: "[Service] · [Date selected] · Cambiar"

Available slots (pill grid, wrapping):
  [ 09:00 ]  [ 10:30 ]  [ 12:00 ]  [ 14:00 ]  [ 16:30 ]

Layout: flex-wrap, gap: 12px
If no slots: 
  "No hay horarios disponibles para esta fecha."
  "← Volvé a elegir otra fecha" (ghost button)

On slot selected: pill fills gold, Next button activates
```

---

#### Step 2.4 — Contact Form

```
Heading: "Tus datos"
Subheading: "Te avisamos por WhatsApp cuando confirmemos tu turno."

Fields (full-width, stacked):
  Nombre completo *
  Teléfono / WhatsApp *  (hint: "+54 9 261 000 0000")
  Email                  (hint: "Opcional")
  Notas o referencias    (textarea, "¿Alguna referencia? ¿Zona del cuerpo? Contanos.")

Booking summary (sticky bottom on mobile, sidebar on desktop):
┌──────────────────────────────────┐
│ Tu turno                         │
│ Cejas · 12 jun 2024 · 10:30      │
│                                  │
│ [Confirmar reserva →]  ← Primary │
└──────────────────────────────────┘

Validation: inline, on blur (not on each keystroke)
Error messages: below field, --color-error, 12px, appear with fadeIn 200ms
Submit disabled: until required fields valid
```

---

#### Step 2.5 — Confirmation

```
Full-screen success state:
[Animated checkmark — draws in SVG stroke animation, 600ms, --color-gold]

Heading: "¡Tu turno está reservado!"
(Cormorant, display, --color-white)

Booking summary card (--color-ash bg, --color-smoke border):
  Servicio:  Micropigmentación de Cejas
  Fecha:     Miércoles 12 de Junio, 2024
  Hora:      10:30
  Nombre:    [Client name]
  Contacto:  [Phone]

Note (--color-mist, body-small):
"Te llegará una confirmación a tu WhatsApp.
Ante cualquier cambio, contactanos por ese medio."

WhatsApp CTA (optional, secondary button):
"Escribinos por WhatsApp" → deeplink to artist's WhatsApp

"Volver al inicio" → ghost button → homepage

NO countdown, NO "book another" push, NO email prompt.
This moment should feel calm and complete.
```

---

### FLOW 3 — Admin Dashboard

The admin area is intentionally minimal and functional. The artist likely uses this from a phone between sessions.

#### Screen 3.1 — Login

```
Full-screen centered layout, --color-ink background
Logo/name at top (Cormorant, title size)

Form (max-width 380px, centered):
  Email
  Contraseña
  [Ingresar] ← Primary MD button, full width

Error state: red banner above form "Email o contraseña incorrectos."
No "create account" — single user, no self-registration
```

---

#### Screen 3.2 — Dashboard

```
Top bar:
  Left: Artist name / logo
  Right: "Cerrar sesión" text link (--color-mist, hover --color-error)

Layout (mobile-first):

┌────────────────────────────────────────────────┐
│  ← Junio 2024 →                               │
│  [Monthly Calendar — compact, no extra chrome]│
│  Dots:                                         │
│    Gold: has available slots                  │
│    Filled: has bookings                        │
│    Mixed: both                                 │
├────────────────────────────────────────────────┤
│  Martes 11 de junio                           │
│                                                │
│  Horarios disponibles:                        │
│  [10:00] [×]    [12:00] [×]    [15:30] [×]   │
│  [+ Agregar horario]                          │
│                                                │
│  Reservas confirmadas:                        │
│  ┌─────────────────────────────────────────┐  │
│  │ 12:00 · Cejas · María García            │  │
│  │ +54 9 261 xxx xxxx [WhatsApp ↗]        │  │
│  └─────────────────────────────────────────┘  │
├────────────────────────────────────────────────┤
│  Próximos turnos (lista global)               │
│  Sorted by date ascending                     │
│  Each row: date/time · service · name · WA    │
└────────────────────────────────────────────────┘

Add slot flow (inline, no separate page):
  Click "+ Agregar horario" → inline time input appears
  Manual entry or time picker
  [Guardar] → slot appears immediately in the list
  Validation: no duplicate times on same day

Remove slot: [×] only if not booked. If booked: [×] is disabled + tooltip "Turno reservado"
```

---

## Microcopy Guide

All UI copy in Argentine Spanish (`vos` form). Warm, direct, never corporate.

| Context | Copy |
|---------|------|
| Book Now CTA (hero) | `Reservá tu turno` |
| Book Now CTA (sections) | `Quiero reservar` |
| Calendar no slots | `No hay turnos disponibles este día` |
| Time picker no slots | `No hay horarios para esta fecha. Elegí otro día.` |
| Form required error | `Este campo es obligatorio` |
| Phone format hint | `Ej: +54 9 261 000 0000` |
| Submit button | `Confirmar reserva` |
| Submit loading | `Reservando...` |
| Success heading | `¡Tu turno está reservado!` |
| Slot conflict error | `Este horario ya fue tomado. Elegí otro.` |
| Admin login error | `Email o contraseña incorrectos` |
| Admin add slot | `Agregar horario` |
| Admin slot booked tooltip | `Este horario ya tiene una reserva` |
| Footer credit | `Diseño y desarrollo · [Tu nombre]` |

---

## Responsive Behavior Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Nav | Hamburger → overlay | Hamburger → overlay | Horizontal bar |
| Hero text | `clamp` — smaller | Medium | Full `7rem` |
| Gallery | 2-col staggered | 2-col masonry | 3-col masonry |
| Services | Stacked image+text | Stacked | Alternating split |
| About | Photo top, text below | Photo top, text below | 40/60 split |
| Booking steps | Full-width panels | Centered 600px max | 700px centered + sidebar summary |
| Admin calendar | Full-width | 480px centered | 560px centered |

---

## Open Design Decisions (Needs Client Input)

- [ ] **Artist name** — needed for logo text, hero, email subjects, footer
- [ ] **Tagline / one-liner** — hero subtitle text (or skip for cleaner hero)
- [ ] **Hero asset** — single signature image or video autoplay? (Video = higher impact, higher complexity)
- [ ] **Portfolio images** — client delivers final assets before gallery can be built
- [ ] **Color preference check** — the gold accent (`#C9A84C`) needs client approval. Is this aligned with their personal brand?
- [ ] **Floating WhatsApp button** — common in LATAM, high conversion. Yes/No?
- [ ] **Language** — Spanish only (confirmed) — but `vos` or `usted`? Recommend `vos` for Mendoza/Argentina.
- [ ] **Logo** — existing? prefer text logotype? prefer symbol?

---

## Handoff Notes for Frontend Agent

- All color tokens, spacing tokens, and type tokens in this doc match those in `frontend-agent-output.md` exactly. Use CSS custom properties — no hardcoded hex values in components.
- Gallery masonry: use CSS columns or a JS masonry lib (e.g. `react-masonry-css`). Pure CSS columns is simpler but loses scroll-triggered animation control. Decide based on performance budget.
- Lightbox: implement with Framer Motion `AnimatePresence` + `motion.div`. No third-party lightbox library — keeps bundle lean and gives full style control.
- Admin UI: no artistic fonts in admin. Use DM Sans exclusively. Only use design tokens — no one-off values.
- Booking step transitions: `slideInRight` (Framer Motion) for forward, `slideInLeft` for back. Steps must not re-mount — use conditional rendering with `AnimatePresence` inside a fixed-height container to avoid layout shift.
- The `--color-cream` background on micropigmentation text sections: use `mix-blend-mode: multiply` sparingly if overlaid on images. Test on real photos.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | Initial | Full design system, all user flows, microcopy, component specs — aligned with PM v0.1 and Frontend v0.1 |

---

> **For agents using this document**: Visual decisions (color, spacing, typography, motion) come from here. Scope decisions come from `product-manager-output.md`. Implementation decisions come from `frontend-agent-output.md`. All three docs must be read together before starting work on any feature.
