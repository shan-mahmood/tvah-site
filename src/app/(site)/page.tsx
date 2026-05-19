import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Container from '@/components/ui/Container'
import type { Section, HeroSection, SanityImage } from '@/lib/types'

type HomePageData = { sections?: Section[]; seo?: any } | null

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<HomePageData>(homePageQuery)
  const hero = data?.sections?.find(
    (s): s is HeroSection => s._type === 'heroSection'
  )
  const heroImage = hero?.backgroundImage as SanityImage | undefined
  if (!heroImage?.asset) return {}
  const ogImageUrl = urlFor(heroImage).width(1200).height(630).fit('crop').url()
  return {
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: heroImage.alt || 'Tustin Village Animal Hospital',
        },
      ],
    },
  }
}

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const data = await (isDraft ? draftClient : client).fetch<HomePageData>(homePageQuery)

  if (!data?.sections?.length) {
    return (
      <Container className="py-24">
        <h1 className="text-3xl">Set up the home page</h1>
        <p className="mt-4 text-[var(--color-muted)]">
          Open Sanity studio at <code>/studio</code> and add sections to the Home page document.
        </p>
      </Container>
    )
  }

  return <SectionRenderer sections={data.sections} />
}
