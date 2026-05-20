/**
 * Populate siteSettings.hours: Mon–Fri 8AM–6PM, Sat 8AM–4PM, Sun closed.
 *
 * Usage: node --env-file=.env.local scripts/patch-hours.mjs
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

const hours = [
  { _type: 'hoursOfOperation', _key: 'mon', day: 'monday',    opens: '08:00', closes: '18:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'tue', day: 'tuesday',   opens: '08:00', closes: '18:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'wed', day: 'wednesday', opens: '08:00', closes: '18:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'thu', day: 'thursday',  opens: '08:00', closes: '18:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'fri', day: 'friday',    opens: '08:00', closes: '18:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'sat', day: 'saturday',  opens: '08:00', closes: '16:00', isClosed: false },
  { _type: 'hoursOfOperation', _key: 'sun', day: 'sunday',    isClosed: true },
]

const result = await client.patch('siteSettings').set({ hours }).commit()
console.log('✓ Patched siteSettings.hours on', result._id)
for (const h of hours) {
  const range = h.isClosed ? 'Closed' : `${h.opens} – ${h.closes}`
  console.log(`  ${h.day.padEnd(10)} ${range}`)
}
