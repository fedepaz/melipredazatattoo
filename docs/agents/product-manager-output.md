# Product Manager Documentation
## Tattoo Artist Portfolio & Booking Site

> **Agent Note**: This document serves as the living product specification for the project. Update it as scope evolves, features are validated, or the client's requirements change. It is structured to be consumed by any agent (design, dev, QA) participating in this project.

---

## Executive Summary

- **Elevator Pitch**: A beautiful online portfolio for a tattoo artist specializing in micropigmentation (eyebrows & lips) and custom tattoos — where potential clients discover the work and book their appointment, all in one place.
- **Problem Statement**: The artist currently relies on Instagram/TikTok to attract clients, but social media has no reliable booking flow — interested followers drop off before making contact or scheduling.
- **Target Audience**:
  - **Primary**: Women aged 20–40 interested in eyebrow or lip micropigmentation, discovered via Instagram/TikTok ads or organic posts.
  - **Secondary**: General tattoo enthusiasts (any gender, 18–45) looking for a skilled local artist.
  - **Tertiary**: Future paid ad traffic redirected from Instagram directly to the site.
- **Unique Selling Proposition**: Unlike generic tattoo studio sites, this is a curated artistic portfolio that combines the visual impact of social media with a direct, frictionless booking experience — no DMs, no back-and-forth.
- **Success Metrics**:
  - Conversion rate: visitors → booking requests (target ≥ 5%)
  - Reduction in "lost" Instagram inquiries
  - Number of confirmed appointments per month through the site
  - Page bounce rate (target < 50%)
  - Instagram/TikTok → site traffic referral volume

---

## Business Context & Strategic Vision

### The Funnel This Site Must Power

```
Instagram / TikTok Post or Ad
        ↓
Portfolio Site (first impression — must wow)
        ↓
Browse Work by Category (tattoo / micropigmentation)
        ↓
Booking Page (select type, date, hour)
        ↓
Confirmed Appointment (client & artist both notified)
        ↓
[Future] Payment for reservation
```

### Stakeholders
| Role | Person | Goal |
|------|--------|------|
| End Client | Tattoo Artist | Gain new clients, reduce admin time for scheduling |
| Project Owner | You (developer/partner) | Deliver the site; also gain visibility via the ad campaigns |
| End Users | Potential tattoo/micropigmentation clients | Discover work, feel confident, book easily |

---

## MVP Scope (v1.0)

### In Scope
- Portfolio site with artistic design (non-generic, visually expressive)
- Work gallery organized by category (micropigmentation eyebrows, micropigmentation lips, other tattoos)
- Booking/scheduling flow: client selects service type, picks an available date/time
- Admin panel (simple): artist can set available dates and time slots
- Confirmation flow: booking confirmation displayed to client (+ email TBD)
- Mobile-first responsive design (most traffic from social media = mobile)
- SEO basics: meta tags, Open Graph (for link previews when shared from Instagram)

### Out of Scope for MVP (v2.0+)
- Payment / reservation deposit
- Client accounts / login
- Reviews or testimonials system
- Multi-artist support
- CRM or advanced admin dashboard

---

## Feature Specifications

---

### FEATURE 1 — Portfolio Gallery

- **User Story**: As a potential client arriving from Instagram, I want to browse the artist's work organized by style, so I can feel confident in the quality before booking.
- **Acceptance Criteria**:
  - Given I land on the site, when I scroll the gallery section, then I see high-quality images organized by category (Micropigmentation Eyebrows / Micropigmentation Lips / Tattoos).
  - Given I tap/click an image, when it opens, then I see a full-screen view with no distractions.
  - Edge case: if no images are uploaded for a category, that category tab is hidden or shows a "coming soon" state.
- **Priority**: P0 — core reason the site exists
- **Dependencies**: Artist provides photo assets
- **Technical Constraints**: Images must be optimized for fast load (WebP preferred, lazy loading); heavy imagery = slow mobile load without optimization
- **UX Considerations**:
  - Artistic, editorial feel — not a generic grid. Consider masonry layout or full-bleed imagery.
  - Category filter tabs should be prominent but not clinical.
  - Visual hierarchy: micropigmentation should be featured prominently (differentiator).

---

### FEATURE 2 — Service Sections

- **User Story**: As a visitor, I want to understand what services the artist offers and what makes them unique, so I can decide if this is the right artist for me.
- **Acceptance Criteria**:
  - Given I land on the site, when I navigate to the services section, then I see distinct sections for: (1) Micropigmentation Eyebrows, (2) Micropigmentation Lips, (3) Custom Tattoos.
  - Each section includes: a short description, key details (e.g. healing time, technique), and a call-to-action to book.
  - Edge case: copy must be written in the artist's voice — content must be provided or approved by client.
- **Priority**: P0
- **Dependencies**: Artist provides copy/descriptions
- **UX Considerations**: Sections should feel more like editorial spreads than product cards. Use large imagery, minimal text, expressive typography.

---

### FEATURE 3 — Booking / Scheduling Flow (Client Side)

- **User Story**: As a potential client, I want to select the type of service I want, choose an available date and time, and submit a booking request, so I can secure my appointment without needing to message the artist directly.
- **Acceptance Criteria**:
  - Given I click "Book Now", when the booking flow opens, then I see a step-by-step form: (1) Select service type → (2) Select available date from calendar → (3) Select available time slot → (4) Enter name, contact info, optional notes → (5) Confirm.
  - Given I select a date, when I view time slots, then I only see slots the artist has marked as available.
  - Given I submit the form, when submission succeeds, then I see a clear confirmation message with my booking summary.
  - Edge case: if no slots are available for a selected date, the calendar disables that date or shows a "no availability" state.
  - Edge case: if two clients try to book the same slot simultaneously, the second receives a "slot no longer available" message.
- **Priority**: P0
- **Dependencies**: Feature 4 (Admin availability setting) must exist for calendar to show real slots
- **Technical Constraints**: Concurrency handling for simultaneous bookings; consider a simple lock/reservation mechanism
- **UX Considerations**:
  - Mobile-optimized calendar picker (native-feel date selection)
  - Progress indicator for multi-step flow
  - Form validation with clear, friendly error messages
  - CTA ("Book Now") should be visible throughout the site — sticky or repeated in each section

---

### FEATURE 4 — Artist Admin: Availability Management

- **User Story**: As the tattoo artist, I want to log in to a simple admin area and set which dates and time slots I'm available, so that clients only see real availability when booking.
- **Acceptance Criteria**:
  - Given I am authenticated as the artist, when I access the admin area, then I can view a monthly calendar.
  - Given I select a date, when I add availability, then I can set one or more time slots (e.g. 10:00, 12:00, 15:00).
  - Given a client books a slot, when I view the admin calendar, then that slot is marked as booked and no longer selectable by other clients.
  - Given I need to block a day, when I mark it as unavailable, then no clients can book that date.
  - Edge case: admin can cancel/remove a booked appointment (v1 can be manual — just unblock the slot).
- **Priority**: P0
- **Dependencies**: Authentication system (simple, single-user — artist only)
- **Technical Constraints**: Simple auth (username + password sufficient for MVP — no OAuth required)
- **UX Considerations**: Admin UI can be functional/minimal — it's internal. Prioritize clarity over aesthetics here. Mobile access is a plus (artist may need to update from phone).

---

### FEATURE 5 — Booking Notifications

- **User Story**: As the tattoo artist, I want to be notified when a client books an appointment, so I don't miss new requests.
- **Acceptance Criteria**:
  - Given a client completes a booking, when confirmed, then the artist receives an email notification with booking details (client name, contact, service, date/time).
  - Given a client completes a booking, when confirmed, then the client receives a confirmation email with their booking summary.
  - Edge case: if email delivery fails, the booking is still saved and visible in the admin panel.
- **Priority**: P1 — important but not blocking launch if deferred by 1–2 days
- **Dependencies**: Email service (e.g. SendGrid, Resend, or similar free tier)
- **Technical Constraints**: Use a transactional email service — don't rely on SMTP directly
- **UX Considerations**: Email templates should match the site's artistic brand (not generic system emails)

---

### FEATURE 6 — About / Artist Story Section

- **User Story**: As a potential client, I want to learn about the artist — their background, style, and personality — so I feel a human connection before booking.
- **Acceptance Criteria**:
  - Given I scroll to the About section, when I read it, then I find: artist photo, short bio, style/philosophy, and any certifications or notable details.
- **Priority**: P1
- **Dependencies**: Artist provides bio and photo
- **UX Considerations**: Personal, warm tone. This is a trust-building section — especially important for micropigmentation clients who are making a semi-permanent decision.

---

### FEATURE 7 — Social & Contact Links

- **User Story**: As a visitor, I want to easily find the artist's Instagram/TikTok and a way to contact them, so I can follow their work and reach out with questions.
- **Acceptance Criteria**:
  - Given I am on any page of the site, when I look for social links, then I find visible links to Instagram and TikTok.
  - Given I want to contact the artist, when I look for contact info, then I find at least one method (WhatsApp link, email, or contact form).
- **Priority**: P1
- **UX Considerations**: Social links should be subtly persistent (footer or floating icon). WhatsApp link is high-value for this market (Argentina/LATAM context).

---

## Requirements Documentation

### Functional Requirements

**User Flows:**
1. **Discovery Flow**: Visitor lands from social → views gallery → reads about → clicks Book Now
2. **Booking Flow**: Select service → pick date → pick time → fill contact info → confirm
3. **Admin Flow**: Artist logs in → views calendar → sets/removes availability → views booked appointments

**State Management:**
- Available slots: stored server-side, updated in real-time when booked
- Booking status: pending → confirmed (v1 can treat submit = confirmed)
- Admin session: stateful login with session/token

**Data Validation Rules:**
- Client name: required, min 2 chars
- Contact (phone or email): required, format validated
- Date/time: must be from available slots only — no free-form entry
- Service type: required selection

**Integration Points:**
- Email service (SendGrid / Resend)
- [v2] Payment gateway (Stripe or MercadoPago — relevant for Argentina)

---

### Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time (mobile, 4G) | < 3 seconds |
| Image load (gallery) | Lazy-loaded, WebP, < 200KB per image |
| Concurrent booking conflict window | < 500ms lock check |
| Uptime | 99.5% (standard hosting SLA) |
| Authentication | Password-protected admin, HTTPS enforced |
| GDPR / data privacy | Collect minimum data; no 3rd party tracking beyond analytics |
| Accessibility | WCAG 2.1 AA for key flows (booking form) |
| Mobile responsiveness | 100% — primary device is mobile (social traffic) |

---

### User Experience Requirements

**Information Architecture (Page Structure):**
```
/ (Homepage)
├── Hero — visual impact, CTA to book
├── Gallery — work by category
├── Services — micropigmentation eyebrows, lips, tattoos
├── About — artist story
├── Booking — calendar + form
└── Footer — social links, contact, credits

/admin (password protected)
├── Calendar view
├── Set availability
└── View bookings
```

**Progressive Disclosure:**
- Homepage hero: single CTA ("Book Now" or "See My Work")
- Gallery before services — let the work speak first
- Booking form: multi-step, not all fields at once

**Error Prevention:**
- Calendar greys out unavailable/past dates
- Time slots disappear once booked
- Form shows inline validation before submit

**Feedback Patterns:**
- Loading states on form submission
- Success screen with booking summary (not just a toast)
- Clear error messages in plain language (no "Error 422")

---

## Design Direction

> For the designer/frontend agent: this site must feel **artistic and editorial**, not like a service directory. Reference: high-end tattoo studio sites, beauty brand microsites, editorial fashion photography sites.

**Aesthetic Guidelines:**
- Dark palette recommended (black/deep charcoal base) — common in tattoo culture, makes imagery pop
- Expressive typography: mix of a strong serif or display font with clean sans-serif body text
- Large, full-bleed imagery — the work is the hero
- Minimal UI chrome — let the art breathe
- Subtle animations (fade-in on scroll, smooth transitions) — but never at the cost of performance
- The micropigmentation sections may warrant a softer, more elegant sub-aesthetic (this is a beauty/cosmetic service)

**Brand Inputs Needed from Client:**
- [ ] Artist name / studio name
- [ ] Logo (if exists) or preference for text-based logotype
- [ ] Color preferences or mood board
- [ ] Photo assets (portfolio images, artist photo)
- [ ] Bio copy

---

## Critical Questions Checklist

- [x] Are there existing solutions we're improving upon? — Yes: most tattoo artist sites are generic WordPress/Wix templates. This will be custom and visually distinctive.
- [x] What's the minimum viable version? — Portfolio gallery + booking calendar with admin availability control + email notifications.
- [ ] Payment flow details — Confirm preferred gateway for v2 (Stripe vs MercadoPago for Argentina market).
- [ ] Hosting/domain — Where will this be hosted? Does the client have a domain?
- [ ] Language — Spanish primary? Spanish + English?
- [ ] WhatsApp number — For contact link (high-value in LATAM).
- [ ] Instagram/TikTok handles — For social links and future ad attribution.
- [ ] Will the site credit the developer? — Discussed as part of the business arrangement (referral/visibility for you).
- [ ] Analytics — Google Analytics or privacy-first alternative (Plausible, Fathom)?

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | Initial | First draft based on client brief — portfolio + booking, MVP scope defined |

---

> **For agents using this document**: Always refer to the MVP Scope section before implementing features. Features marked P0 are required for launch. P1 features should be discussed with the project owner before deferring. Update the Version History table when this document is modified.
