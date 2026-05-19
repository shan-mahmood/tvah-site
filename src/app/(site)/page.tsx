import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Container from '@/components/ui/Container'
import type { Section } from '@/lib/types'

type HomePageData = { sections?: Section[]; seo?: any } | null

export const revalidate = 60

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
