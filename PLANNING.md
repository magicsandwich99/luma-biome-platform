# LUMA Biome Platform — Product Planning

## Overview

This platform is three products in one shell, unified by a single codebase and login system. Different roles unlock different layers.

```
1. luma.earth (public site)     → brand + conversion funnel
2. BIOME (customer platform)    → green asset management
3. LUMA Ops (internal tool)     → workforce + mission management
```

---

## The Conversion Funnel

```
YouTube video
   ↓
luma.earth landing page
  (project stories, teaser video, trust signals)
   ↓
"Explore BIOME" CTA  ──→  Demo/guest access (public map view)
   ↓
Contact / Book a call
   ↓
Customer onboarding → full BIOME access
   ↓
Ongoing platform use + upsell
  (book sensor setup, drone survey, acoustic monitoring etc.)
```

The key conversion moment is the **public map** — visitors see all LUMA projects without logging in. Logged-in customers see their own projects layered on top. This is compelling, shareable, and demonstrates the platform's value before any signup.

---

## Current State (May 2026 prototype)

**What exists:**
- React 19 + Vite frontend with Tailwind/shadcn/ui
- Pages: Home, Services, Projects, About, Contact, Privacy, Map, Refine, Reports
- i18n (EN/DE toggle), dark/light theme
- Leaflet map component
- Express backend skeleton (`/api/health` only)
- Prisma schema (PostgreSQL, no models defined yet)
- 15 real project photo sets in assets

**What's missing:**
- Real auth (admin toggle is a placeholder)
- Prisma DB models
- Any working API routes
- Actual content / copy
- High-quality project photos and teaser video

---

## Phased Roadmap

### Phase 1 — Polish the Public Site
*Priority: HIGH — direct business value for current outreach (WBM, Gewobag)*

- [ ] Hero section with teaser video placeholder + dual CTA ("Enter BIOME" / "Get in touch")
- [ ] Project pages: rich stories with photos, descriptions, outcomes, years active
- [ ] Services subpages: one page per service with examples and capabilities
- [ ] Trust signals section: X projects installed, Y years of stewardship, Z customers returning
- [ ] Contact form that works (form → email to Malte)
- [ ] YouTube channel linked from nav/footer
- [ ] Full EN/DE translations
- [ ] SEO basics: meta tags, Open Graph, structured data for projects
- [ ] Responsive / mobile optimized

**Content needed (from Malte):**
- High-quality project photos and videos (photoshoot ~June 2026)
- Teaser video (separate production project)
- Final copy for services pages
- Testimonials / customer quotes

### Phase 2 — BIOME MVP (LUMA internal only)
*Goal: replace whatever LUMA currently uses to track projects*

- [ ] Real authentication (login for Malte + Lukas, role-based)
- [ ] Prisma DB models: Project, Location, MediaAsset, SensorReading, Note
- [ ] Map: draw project shapes/polygons, link to project record
- [ ] Project record: title, description, photos, PDFs, notes, dates
- [ ] Load all 15 existing LUMA projects into the system
- [ ] Basic project list/search view

### Phase 3 — Customer-Facing BIOME
*Goal: deliver value to existing customers, create upsell path*

- [ ] Customer accounts with scoped project access
- [ ] Green Asset dashboard: impact metrics, project stats with filters
- [ ] Shareable project reports (PDF export or public link)
- [ ] Public project pages (opt-in per project — good for press, funding)
- [ ] Guest/demo access to public map view (funnel entry point)

### Phase 4 — Booking + Ops Platform
*Goal: operational efficiency + potential SaaS product for other companies*

- [ ] In-platform service booking (acoustic sensor, drone survey etc.)
- [ ] LUMA technician calendar + availability view
- [ ] Mission assignment and work order management
- [ ] Commissioning / contracting workflow
- [ ] Employee-facing mission log-in (separate role)

---

## Key Architectural Decisions

### 1. Domain structure
**Option A:** Single domain `luma.earth` — public site + authenticated platform
**Option B:** `luma.earth` (public) + `app.luma.earth` (BIOME)
→ Recommendation: Option B. Cleaner separation, better SEO for public site, easier to evolve independently.

### 2. Database hosting
Prisma is ready but needs Postgres. Options:
- **Supabase** (free tier, 500MB) — easiest to start, includes auth
- **Railway** (~$5/mo) — more flexible
- **Hetzner VPS** — cheapest long-term, already familiar infra
→ Recommendation: Supabase for Phase 2 (free, fast to set up, built-in auth)

### 3. Authentication
- Supabase Auth covers most needs (email/password, magic link, OAuth)
- Role system: `luma_admin`, `luma_staff`, `customer`, `guest`
- Guest = read-only access to public projects on map

### 4. Map data layers
- Base map: OpenStreetMap via Leaflet (already in repo, free)
- Climate overlays (temperature, precipitation, soil): OpenMeteo API (free)
- Biodiversity data: GBIF API (free, global species occurrence data)
- Satellite imagery: Mapbox free tier or OpenAerialMap

### 5. Green Assets metric — core unit of value
This needs to be defined before building the dashboard. Candidates:
- m² of installed habitat
- Estimated CO2 sequestered (kg/year)
- Temperature reduction (°C delta, measurable with sensors)
- Species diversity index (requires monitoring data)
- Combined "BIOME Score" (proprietary index)
→ Recommendation: Start with m² + species count (easy to enter manually), add sensor-derived metrics later.

---

## Content & Media Gaps

| Item | Status | Needed for |
|------|--------|-----------|
| Project photos (high quality) | Photoshoot ~June 2026 | Phase 1 |
| Teaser video | Separate production project | Phase 1 hero |
| Services copy (EN + DE) | To be written | Phase 1 |
| Customer testimonials | To be collected | Phase 1 trust signals |
| Team photos | Unknown | About page |
| Project data (coordinates, dates, species) | To be entered | Phase 2 |

---

## Current Website (luma.earth) vs. Platform

The current luma.earth is a simpler static/CMS site. The prototype repo will replace it entirely in Phase 1. Key improvements over current site:
- Project stories with actual context and outcomes (not just photos)
- Services depth — each service gets its own subpage
- Metrics and trust signals are front and center
- Clear CTAs driving toward BIOME and contact
- Bilingual (EN/DE) from day one
- Funnel-aware structure

---

## Notes

- Dev capacity: Malte + Claude (AI-assisted development)
- All outreach copy must be written in German (see team conventions)
- Photos/assets TBD — working with placeholders until photoshoot
