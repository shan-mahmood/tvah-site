import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'
import SurveyForm from './SurveyForm'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description: 'Tell us about your visit to Tustin Village Animal Hospital.',
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function ClientSurveyPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const googleUrl = settings?.reviews?.googleUrl || settings?.socials?.google || ''
  const yelpUrl = settings?.reviews?.yelpUrl || settings?.socials?.yelp || ''

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container width="narrow">
        <SurveyForm googleUrl={googleUrl} yelpUrl={yelpUrl} />
      </Container>
    </section>
  )
}
