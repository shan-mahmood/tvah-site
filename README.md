# Tustin Village Animal Hospital — Web

Next.js 15 + Sanity v3 + Tailwind v4. Sanity studio embedded at `/studio` so editors log in at the same domain. Hosted on Vercel.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first config in `globals.css`) |
| Animation | Framer Motion |
| CMS | Sanity v3 (embedded studio at `/studio`) |
| Hosting | Vercel |
| Typography | Fraunces (serif headings), Inter (body) |

## Project layout

```
src/
├── app/
│   ├── layout.tsx                 Root layout (loads site settings, header, footer)
│   ├── page.tsx                   Homepage — composed of Sanity sections
│   ├── globals.css                Tailwind v4 + design tokens
│   ├── [slug]/page.tsx            Dynamic service pages (/wellness-exams, /dental-care, …)
│   ├── studio/[[...tool]]/        Sanity studio mount
│   ├── api/draft/                 Draft mode entry (Sanity Presentation tool)
│   ├── api/revalidate/            Sanity webhook → on-demand ISR
│   ├── sitemap.ts                 sitemap.xml
│   ├── robots.ts                  robots.txt
│   └── not-found.tsx              404
├── components/
│   ├── layout/                    Header, Footer, StickyMobileCta
│   ├── sections/                  One component per Sanity section type
│   ├── ui/                        Container, Button, SanityImage, Reveal, PortableText
│   └── seo/                       LocalBusinessSchema (VeterinaryCare JSON-LD)
├── sanity/
│   ├── client.ts                  Published + draft clients
│   ├── image.ts                   Image URL builder
│   ├── queries.ts                 GROQ queries
│   ├── structure.ts               Studio sidebar layout (singletons)
│   └── schemas/                   Document + section schemas
└── lib/
    └── types.ts                   Hand-rolled types (run typegen to replace)
```

## Setup

1. **Create a Sanity project**
   ```bash
   npm create sanity@latest -- --bare --create-project "TVAH" --dataset production
   ```
   Or create one at https://sanity.io/manage and note the `projectId`.

2. **Install deps**
   ```bash
   pnpm install
   ```

3. **Environment**
   Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=...
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=...        # Viewer token from sanity.io/manage
   SANITY_REVALIDATE_SECRET=...     # Random string; matches the Sanity webhook
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Add the studio's localhost origin to Sanity CORS**
   At https://sanity.io/manage → API → CORS Origins, add `http://localhost:3000` with credentials.

5. **Run**
   ```bash
   pnpm dev
   ```
   - Site: http://localhost:3000
   - Studio: http://localhost:3000/studio
   - Create the singleton `Home page` and `Site settings` documents, then add a hero section to see something render.

## Initial content checklist (Sanity studio)

1. **Site settings** — phone, address, hours, booking URL (`https://tvill.usw2.ezyvet.com/external/portal/main/login?id=2`), socials.
2. **Doctors** — 3 docs: Dr. Nguyen, Dr. Larkin, Dr. Madan. Add their photos.
3. **Services** — 9 docs matching existing slugs (don't change these — preserves SEO):
   - `wellness-exams`, `internal-medicine`, `veterinary-surgery`, `diagnostics`, `dental-care`, `palliative-care`, `pet-travel`, `emergency-care`, `telemedicine`
4. **Home page** — add sections: Hero, Featured Services, About, Doctors, Reviews, CTA.

## Inviting the business partner

1. https://sanity.io/manage → your project → Members → Invite.
2. Role: **Editor** (not Administrator). They can publish content but not change schema or roles.
3. Send them `https://your-domain/studio`. Five-minute Loom showing them how to edit the hero gets them productive.

## Editing the design system

All tokens live in `src/app/globals.css` under the `@theme` block. Want a different accent? Change `--color-accent-600` and every CTA on the site swaps. No other files need to change.

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo at https://vercel.com/new.
3. Add the same env vars from `.env.local` in Vercel project settings.
4. After the first deploy, set up the Sanity → Vercel webhook for on-demand revalidation:
   - In Sanity manage → API → Webhooks → Create.
   - URL: `https://your-domain/api/revalidate`
   - Trigger on: Create, Update, Delete.
   - Filter: `_type in ["homePage","siteSettings","service","doctor","review"]`
   - Secret: the same `SANITY_REVALIDATE_SECRET` value.

## SEO migration notes

- Service slugs match WordPress URLs (`/wellness-exams/`, `/internal-medicine/`, etc.). Don't change them.
- `LocalBusinessSchema` injects `VeterinaryCare` JSON-LD into every page from the site settings doc.
- `sitemap.xml` and `robots.txt` are generated at build time.
- After DNS cutover, resubmit the sitemap in Google Search Console.

## Typegen (optional, recommended)

The types in `src/lib/types.ts` are hand-rolled to keep the scaffold simple. To switch to generated types from your schema:

```bash
pnpm typegen
```

Then replace imports from `@/lib/types` with imports from the generated `sanity-types.ts`.

## TODO before launch

- [ ] Replace placeholder bookings link if it changes
- [ ] Real photography for non-doctor imagery (exterior, interior, treatment rooms)
- [ ] Pull Google reviews via an API integration (or paste curated ones into Sanity)
- [ ] Configure Google Tag Manager (existing container: `GTM-MQCLK47V`) in `layout.tsx`
- [ ] Set up Vercel Analytics or keep GA4 via GTM
- [ ] Audit current WordPress site for any content not in this scaffold
- [ ] DNS cutover (WordPress stays live until then)
