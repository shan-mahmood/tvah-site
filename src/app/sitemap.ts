import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { allServiceSlugsQuery } from '@/sanity/queries'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tustinvillageah.com'

const STATIC_PATHS = [
  '/',
  '/about-us',
  '/our-doctors',
  '/our-services',
  '/walk-ins',
  '/contact-us',
  '/payment-options',
  '/hospital-policies',
  '/new-puppy-info',
  '/new-kitten-info',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await client.fetch<string[]>(allServiceSlugsQuery)
  const now = new Date()

  return [
    ...STATIC_PATHS.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: now,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${SITE}/${slug}`,
      lastModified: now,
    })),
  ]
}
