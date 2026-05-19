import type { SiteSettings } from '@/lib/types'

const DAY_MAP: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

export default function LocalBusinessSchema({
  settings,
}: {
  settings?: SiteSettings | null
}) {
  if (!settings) return null

  const openingHours = settings.hours
    ?.filter((h) => !h.isClosed && h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_MAP[h.day] ?? h.day,
      opens: h.opens,
      closes: h.closes,
    }))

  const reviews = settings.reviews
  const googleCount = reviews?.googleCount ?? 0
  const yelpCount = reviews?.yelpCount ?? 0
  const totalCount = googleCount + yelpCount
  const weightedRating =
    totalCount > 0
      ? ((reviews?.googleRating ?? 0) * googleCount +
          (reviews?.yelpRating ?? 0) * yelpCount) /
        totalCount
      : null

  const aggregateRating = weightedRating
    ? {
        '@type': 'AggregateRating',
        ratingValue: weightedRating.toFixed(1),
        reviewCount: totalCount,
        bestRating: 5,
        worstRating: 1,
      }
    : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: settings.businessName,
    telephone: settings.phone,
    email: settings.email,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    address: settings.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.address.street,
          addressLocality: settings.address.city,
          addressRegion: settings.address.state,
          postalCode: settings.address.zip,
          addressCountry: 'US',
        }
      : undefined,
    openingHoursSpecification: openingHours,
    aggregateRating,
    sameAs: settings.socials
      ? Object.values(settings.socials).filter(Boolean)
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
