import Image from 'next/image'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

type Rating = {
  source: string
  score: string
  count: number
  href: string
  logo: string
}

const DEFAULTS = {
  googleUrl: 'https://www.google.com/search?q=Tustin+Village+Animal+Hospital',
  yelpUrl: 'https://www.yelp.com/biz/tustin-village-animal-hospital-tustin',
}

function buildRatings(reviews?: SiteSettings['reviews']): Rating[] {
  const ratings: Rating[] = []
  if (reviews?.googleRating != null && reviews?.googleCount != null) {
    ratings.push({
      source: 'Google',
      score: reviews.googleRating.toFixed(1),
      count: reviews.googleCount,
      href: reviews.googleUrl || DEFAULTS.googleUrl,
      logo: '/images/logos/google.svg',
    })
  }
  if (reviews?.yelpRating != null && reviews?.yelpCount != null) {
    ratings.push({
      source: 'Yelp',
      score: reviews.yelpRating.toFixed(1),
      count: reviews.yelpCount,
      href: reviews.yelpUrl || DEFAULTS.yelpUrl,
      logo: '/images/logos/yelp.svg',
    })
  }
  return ratings
}

function Stars() {
  return (
    <span aria-hidden className="tracking-tighter text-[var(--color-brand-700)]">
      ★★★★★
    </span>
  )
}

export default async function HeroReviewsBar() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const ratings = buildRatings(settings?.reviews)
  if (!ratings.length) return null

  return (
    <div
      className="mt-10 flex flex-col items-start gap-y-3 text-sm lg:flex-row lg:items-center lg:gap-x-6"
      aria-label="Customer ratings"
    >
      {ratings.map((r, i) => (
        <div key={r.source} className="flex items-center gap-3">
          <a
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <Image
              src={r.logo}
              alt={`${r.source} logo`}
              width={16}
              height={16}
              className="h-4 w-4 shrink-0"
              unoptimized
            />
            <Stars />
            <span>
              <span className="font-semibold text-[var(--color-ink)]">{r.score}</span> on{' '}
              {r.source} · {r.count} reviews
            </span>
          </a>
          {i < ratings.length - 1 && (
            <span aria-hidden className="hidden text-[var(--color-line)] lg:inline">
              |
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
