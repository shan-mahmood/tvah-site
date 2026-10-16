/**
 * Canonical production origin.
 *
 * Fixed in code (not read from NEXT_PUBLIC_SITE_URL) so canonicals, sitemap,
 * robots and JSON-LD can never drift to a second host. The apex is canonical:
 * Google already indexes it, and the Google Business Profile and Google Ads
 * links point at it. www.tustinvillageah.com 308-redirects here (next.config.ts).
 */
export const SITE_URL = 'https://tustinvillageah.com'

/**
 * Map pin for 13942 Newport Ave, taken from the clinic's Google Business
 * Profile listing. Update if the clinic moves.
 */
export const GEO = { latitude: 33.7382213, longitude: -117.8211394 }

/** Cities the clinic draws most of its clients from (used for schema areaServed). */
export const AREA_SERVED = ['Tustin', 'North Tustin', 'Irvine', 'Santa Ana', 'Orange']
