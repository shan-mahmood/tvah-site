/**
 * One-off patch: update canonical phone number to the real business line.
 *
 * The previous default (714-909-1338) is actually a CallRail tracking number
 * for Yelp. The real business line is 714-660-7710. CallRail's swap.js will
 * dynamically replace this with tracking numbers based on visitor source.
 *
 * Patches:
 *  - siteSettings.phone
 *  - homePage section CTAs (promo banner, hero secondary CTA, closing CTA)
 *
 * Usage: node --env-file=.env.local scripts/patch-phone.mjs
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

const NEW_PHONE_DISPLAY = '(714) 660-7710'
const NEW_PHONE_TEL = 'tel:7146607710'
const NEW_CTA_LABEL = `Call ${NEW_PHONE_DISPLAY}`
const OLD_PHONE_FRAGMENT = '909-1338'

// ---- 1. siteSettings ----
const settingsResult = await client
  .patch('siteSettings')
  .set({ phone: NEW_PHONE_DISPLAY })
  .commit()
console.log('✓ Patched siteSettings.phone →', NEW_PHONE_DISPLAY)
console.log('  doc:', settingsResult._id)

// ---- 2. homePage section CTAs ----
const home = await client.getDocument('homePage')
if (!home) {
  console.warn('! homePage document not found — skipping section patch')
  process.exit(0)
}

const sections = Array.isArray(home.sections) ? home.sections : []
let touchedSections = 0
const updated = sections.map((section) => {
  const next = { ...section }
  for (const key of ['cta', 'primaryCta', 'secondaryCta']) {
    const cta = next[key]
    if (!cta) continue
    const labelHasOld = typeof cta.label === 'string' && cta.label.includes(OLD_PHONE_FRAGMENT)
    const hrefHasOld = typeof cta.href === 'string' && cta.href.includes('7149091338')
    if (labelHasOld || hrefHasOld) {
      next[key] = {
        ...cta,
        ...(labelHasOld && { label: NEW_CTA_LABEL }),
        ...(hrefHasOld && { href: NEW_PHONE_TEL }),
      }
      touchedSections += 1
    }
  }
  return next
})

if (touchedSections > 0) {
  await client.patch('homePage').set({ sections: updated }).commit()
  console.log(`✓ Patched ${touchedSections} CTA(s) in homePage.sections`)
} else {
  console.log('· No homePage section CTAs needed updating')
}

console.log('\nDone. Visible default number is now', NEW_PHONE_DISPLAY)
console.log('CallRail swap.js will replace this dynamically based on visitor source.')
