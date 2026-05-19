/**
 * Audit Sanity images for missing alt text.
 * Usage: node --env-file=.env.local scripts/audit-alts.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-01',
  useCdn: false,
})

const issues = []

const doctorsMissing = await client.fetch(`
  *[_type == "doctor" && defined(photo) && !defined(photo.alt)]{_id, name}
`)
doctorsMissing.forEach((d) => issues.push({ kind: 'doctor.photo', _id: d._id, name: d.name }))

const servicesHeroMissing = await client.fetch(`
  *[_type == "service" && defined(heroImage) && !defined(heroImage.alt)]{_id, title}
`)
servicesHeroMissing.forEach((s) =>
  issues.push({ kind: 'service.heroImage', _id: s._id, title: s.title })
)

const servicesIconMissing = await client.fetch(`
  *[_type == "service" && defined(icon) && !defined(icon.alt)]{_id, title}
`)
servicesIconMissing.forEach((s) =>
  issues.push({ kind: 'service.icon', _id: s._id, title: s.title })
)

const homeHero = await client.fetch(`
  *[_type == "homePage"][0]{
    sections[]{
      _type,
      _key,
      "missingHeroAlt": _type == "heroSection" && defined(backgroundImage) && !defined(backgroundImage.alt),
      "missingAboutAlt": _type == "aboutSection" && defined(image) && !defined(image.alt)
    }
  }
`)
if (homeHero?.sections) {
  homeHero.sections.forEach((s) => {
    if (s.missingHeroAlt)
      issues.push({ kind: 'homePage.heroSection.backgroundImage', _key: s._key })
    if (s.missingAboutAlt)
      issues.push({ kind: 'homePage.aboutSection.image', _key: s._key })
  })
}

const siteSeo = await client.fetch(`
  *[_type == "siteSettings"][0]{
    "missingOgAlt": defined(defaultSeo.ogImage) && !defined(defaultSeo.ogImage.alt)
  }
`)
if (siteSeo?.missingOgAlt) {
  issues.push({ kind: 'siteSettings.defaultSeo.ogImage' })
}

if (!issues.length) {
  console.log('✓ All Sanity images have alt text.')
} else {
  console.log(`✗ ${issues.length} image(s) missing alt text:\n`)
  for (const i of issues) console.log(' ', JSON.stringify(i))
}
