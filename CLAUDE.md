# Tustin Village Animal Hospital — Project Memory

This file is the context any new Claude Code session needs to be productive on this project. Read it before making changes.

## What this project is

Marketing site for **Tustin Village Animal Hospital** (TVAH), a walk-in veterinary clinic in Tustin, CA. Replaces an existing WordPress + Elementor site at https://www.tustinvillageah.com. Owner has direct edit access via Sanity Studio at `/studio`.

**Goal**: faster, more credible, mobile-first site. Match (or improve on) the visual quality of evodigitaladvertising.com but in a warmer healthcare register.

## Stack

| Layer | Tech | Why |
|---|---|---|
| Frontend | Next.js 15 (App Router) + React 19 | Static-first, ISR for content changes |
| Styling | Tailwind v4 (CSS-first `@theme` in `globals.css`) | Tokens in one place, easy to retune |
| Animation | Framer Motion | Used only for subtle scroll-reveal (`Reveal` component) |
| CMS | Sanity v3 (studio embedded at `/studio`) | Editable by the practice partner, structured content |
| Hosting | Vercel (not deployed yet) | — |
| Typography | Inter (single typeface), weight + tracking for hierarchy | Initial Fraunces/Inter combo was dropped — felt too "AI design" |

## Architecture decisions worth knowing

1. **Route groups split site from studio.** `src/app/(site)/` holds everything with the public header/footer/site-settings fetch. `src/app/studio/` is outside the group and inherits only the minimal root layout, so the studio renders full-screen with no site chrome bleeding in. **Don't move pages out of `(site)/` unless you also wrap them with `TopBar/Header/Footer`.**

2. **Service URLs are at root** (`/wellness-exams`, `/emergency-care`, …) not `/services/[slug]`. This matches the existing WordPress URL structure to preserve SEO. **Do not change service slugs.**

3. **Homepage is composable sections.** `homePage` document in Sanity has an ordered array of sections. Components in `src/components/sections/` render each section type. The `SectionRenderer` dispatches by `_type`. Adding a new section type = new schema in `src/sanity/schemas/objects/sections/` + new component + registered in `SectionRenderer`.

4. **`siteSettings` is the single source of truth** for phone, address, hours, booking URL, socials. Header, footer, mobile CTA, JSON-LD schema, sitemap, and contact page all read from it. Don't hard-code these anywhere.

5. **`promoBanner` has `startsAt`/`endsAt`.** The GROQ query in `src/sanity/queries.ts` computes an `isActive` boolean. The frontend hides expired banners automatically. **Don't repeat the "Free First Exam ended April 30" problem the WordPress site had.**

6. **Don't name specific doctors in body copy.** Doctor names live in the `doctor` Sanity documents only. If a doctor leaves, we update one place. Copy that says "Drs. Nguyen, Larkin, and Madan..." is fragile and should be rewritten generically.

## Visual system

Tokens in `src/app/globals.css` under `@theme`. Don't fight these — they came from the actual logo. To retune the design, change variables here; everything else follows.

- **Primary**: `#306956` (`--color-brand-500`) — extracted from logo line color. Ramp from `--color-brand-50` to `--color-brand-900` are luminance steps of the same hue.
- **Accent**: `#b85530` (`--color-accent-600`) — warm clay for CTAs. Complementary to teal, clears WCAG AA on white text.
- **Page background**: `#faf7f2` (`--color-cream`) — warm off-white. Subtle but it's the difference between "veterinary office" and "dentist office."
- **Surface**: `#f3ede2` (`--color-surface`) — used for alternating section backgrounds.
- **Ink/muted**: `#1c2a25` body, `#5a6c64` muted text.

**Owner asked early about flipping the page to dark teal background. We discussed it and decided against** — too much body copy for a dark page to be readable, and the clay CTA loses its anchor role. Use teal as the dominant *accent* color (hero, CTA banner, promo banner) but keep reading surfaces light.

## File map (key files)

```
src/
├── app/
│   ├── layout.tsx                            Minimal root: html, body, font vars. No header/footer.
│   ├── globals.css                           Tailwind v4 + design tokens.
│   ├── (site)/
│   │   ├── layout.tsx                        Header, footer, sticky CTA, site settings fetch.
│   │   ├── page.tsx                          Homepage — section renderer pulling from Sanity.
│   │   ├── [slug]/page.tsx                   Dynamic service pages.
│   │   ├── about-us/page.tsx                 Static about page.
│   │   ├── our-doctors/page.tsx              Pulls doctors from Sanity.
│   │   ├── our-services/page.tsx             Services hub, pulls all services.
│   │   ├── patient-center/page.tsx           Static (currently). Move to Sanity later if needed.
│   │   └── contact-us/page.tsx               Pulls site settings, embeds Google Maps.
│   ├── studio/[[...tool]]/
│   │   ├── page.tsx                          Server component, exports metadata.
│   │   └── Studio.tsx                        Client component, mounts NextStudio. SPLIT IS REQUIRED.
│   ├── api/draft/route.ts                    Draft mode for Sanity Presentation.
│   ├── api/revalidate/route.ts               Sanity webhook → on-demand ISR.
│   ├── sitemap.ts                            Generates from Sanity service slugs.
│   └── robots.ts
├── components/
│   ├── layout/                               TopBar, Header, Footer, StickyMobileCta.
│   ├── sections/                             One per section type + SectionRenderer.
│   ├── ui/                                   Container, Button, SanityImage, Reveal, PortableText.
│   └── seo/LocalBusinessSchema.tsx           VeterinaryCare JSON-LD on every page.
├── sanity/
│   ├── client.ts                             Published + draft clients.
│   ├── queries.ts                            GROQ queries (homePage joins refs).
│   ├── structure.ts                          Studio sidebar (singletons pinned at top).
│   ├── image.ts                              Image URL builder.
│   └── schemas/                              Document + section schemas.
├── lib/types.ts                              Hand-rolled types for GROQ shapes.
scripts/
└── seed.mjs                                  Idempotent content seed.
```

## Sanity schemas

**Documents**: `homePage` (singleton), `siteSettings` (singleton), `service`, `doctor`, `review`.

**Section objects** (used in `homePage.sections[]`):
- `heroSection` — eyebrow, headline, subheadline, 2 CTAs, background image
- `promoBanner` — message, optional CTA, `startsAt`/`endsAt`, tone
- `featuredServicesSection` — 3-4 service references
- `aboutSection` — image + portable text + CTA, configurable image position
- `doctorsSection` — references doctors or auto-shows all
- `reviewsSection` — curated featured reviews or hand-picked
- `ctaSection` — closing CTA banner
- `richTextSection` — escape hatch

**Reusable objects**: `cta`, `seoMeta`, `hoursOfOperation`.

## Editorial conventions

- **Voice**: calm, informed, slightly anti-upsell. The existing WordPress copy uses "Drs. Nguyen, Larkin, and Madan" — owner asked to drop that because the doctors may change. Rewrite generic.
- **Tone**: warm but not saccharine. Healthcare, not boutique.
- **CTAs**: "Book an appointment", "Walk in or book online", "Call (714) 909-1338". Always action verbs.
- **50% off first exams promo**: currently active. Lives as a `promoBanner` section on the homepage. Set `endsAt` when it expires.

## Current state (as of handoff)

✅ Project scaffolded and running locally (port 3000 or 3002 depending on what's free)
✅ Sanity project: `dwqhzgl7`, dataset `production`
✅ Site settings populated (phone, address, booking URL)
✅ 9 services seeded with **placeholder** copy (need to be replaced with copy from existing site)
✅ 3 doctors seeded (Nguyen, Larkin, Madan) — **no photos, no bios yet**
✅ Homepage with 6 sections rendering (promo banner, hero, services, about, doctors, CTA)
✅ Studio working at `/studio` with full route group separation
✅ Static pages: about-us, our-doctors, our-services, patient-center, contact-us all exist

## What's next (priority order)

### 1. [HIGH] Replace service copy with content from existing WordPress site

For each of the 9 service slugs, fetch `https://tustinvillageah.com/{slug}/` and use the actual existing copy. URLs:

- https://tustinvillageah.com/wellness-exams/
- https://tustinvillageah.com/internal-medicine/
- https://tustinvillageah.com/veterinary-surgery/
- https://tustinvillageah.com/diagnostics/
- https://tustinvillageah.com/dental-care/
- https://tustinvillageah.com/palliative-care/
- https://tustinvillageah.com/pet-travel/
- https://tustinvillageah.com/emergency-care/
- https://tustinvillageah.com/telemedicine/

Update `scripts/seed.mjs` with the real copy, then re-run the seed. The `_content-from-old-site/` folder has pre-fetched markdown for the home and about-us pages already.

**Schema fields to populate per service**: `shortDescription`, `body` (Portable Text), `whatToExpect` (array of {heading, description}), `faqs` (array of {question, answer}).

### 2. [HIGH] Upload doctor photos

Owner has photos of Drs. Larkin, Nguyen, Madan in the project root folder (`C:\Users\stmah\tvah-site\`). Filenames unknown — likely `larkin.jpg`, `nguyen.jpg`, `madan.jpg` or `dr-larkin.jpg` etc.

**To do**: write a script (or extend `seed.mjs`) that:
1. Scans the project root, `public/`, and `images/` for image files
2. Matches filenames containing "larkin" / "nguyen" / "madan" (case-insensitive)
3. Uploads each to Sanity via `client.assets.upload('image', buffer, {filename})`
4. Patches the corresponding `doctor` document with the uploaded asset reference and an `alt` text

Doctor IDs in Sanity: `doctor-nguyen`, `doctor-larkin`, `doctor-madan`.

### 3. [MEDIUM] Replace homepage about section copy

The owner specifically asked to **drop** the existing "Our practice" paragraph in `src/app/(site)/about-us/page.tsx` that names doctors by name. Same logic applies to the About section in the homepage (`scripts/seed.mjs`, look for the `aboutSection` in `buildHomeSections`). Rewrite generically.

The existing WordPress about page (`_content-from-old-site/about-us.md`) has good source material — emphasizes "doctor owned and operated", "comprehensive care", "preventive medicine", and the values without leaning on specific doctor names.

### 4. [MEDIUM] Replace patient center content

The current `/patient-center` page has placeholder content I wrote. The owner wants identical-to-existing-site copy. Existing relevant pages:
- https://tustinvillageah.com/payment-options/
- https://tustinvillageah.com/hospital-policies/
- https://tustinvillageah.com/new-puppy-info/
- https://tustinvillageah.com/new-kitten-info/

Decide whether to consolidate these into one `/patient-center` page or break them out into separate routes. Owner's WordPress site has them separate. **Recommend**: separate pages for SEO (each ranks on its own) but link them all from `/patient-center` as a hub.

### 5. [MEDIUM] Real Google reviews

Owner has reviews on Google Business Profile. Manually paste the 6-8 best ones as `review` documents in Sanity (mark `featured: true`), then add a `reviewsSection` to the homepage. Reviews are the single biggest conversion driver for local healthcare.

### 6. [LOW] Deploy to Vercel

1. `git init && git add -A && git commit -m "initial"`
2. Push to a new GitHub repo
3. Import at vercel.com/new
4. Copy env vars from `.env.local` into Vercel project settings
5. After first deploy, set up Sanity → Vercel webhook for on-demand revalidation. Target: `https://[domain]/api/revalidate`, secret = `SANITY_REVALIDATE_SECRET`.

### 7. [LOW] Invite the business partner

Once deployed, https://sanity.io/manage → Members → Invite, **Editor** role. Send them `https://[domain]/studio`.

## Conventions when making changes

- **Don't run `npm audit fix --force`.** It breaks installs. The 16 vulnerabilities are in build-time transitive deps and don't ship to users.
- **Always `view` the relevant file before editing.** Don't trust your memory of what's in there.
- **Re-seeding is safe.** The seed uses `createOrReplace` — it overwrites docs by ID, doesn't duplicate.
- **When testing**, restart the dev server after any big CSS or layout change. Hot reload sometimes misses these.
- **Port conflicts**: dev server falls through to 3001, 3002 if 3000 is taken. Kill old `node` processes if you want 3000.
- **Studio fixes you don't need to re-do**: `Studio.tsx` already split out as a client component (the `createContext` fix). Don't put `'use client'` on the studio page.

## Environment

`.env.local` (already exists, don't commit):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=dwqhzgl7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=... (viewer role)
SANITY_API_WRITE_TOKEN=... (editor role, for seed)
SANITY_REVALIDATE_SECRET=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
