/**
 * One-off patch: set siteSettings.reviews (Google + Yelp aggregate).
 * Usage: node --env-file=.env.local scripts/patch-reviews.mjs
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-12-01',
  useCdn: false,
})

const reviews = {
  googleRating: 4.9,
  googleCount: 138,
  googleUrl: 'https://www.google.com/search?q=Tustin+Village+Animal+Hospital',
  yelpRating: 4.9,
  yelpCount: 108,
  yelpUrl: 'https://www.yelp.com/biz/tustin-village-animal-hospital-tustin',
}

const result = await client.patch('siteSettings').set({ reviews }).commit()
console.log('✓ Patched siteSettings.reviews:', result._id)
console.log('  Google:', reviews.googleRating, '·', reviews.googleCount, 'reviews')
console.log('  Yelp:  ', reviews.yelpRating, '·', reviews.yelpCount, 'reviews')
