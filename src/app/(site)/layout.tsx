import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import type { SiteSettings } from '@/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()
  const settings = await (isDraft ? draftClient : client).fetch<SiteSettings | null>(
    siteSettingsQuery
  )

  return (
    <>
      <LocalBusinessSchema settings={settings} />
      <TopBar settings={settings} />
      <Header settings={settings} />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer settings={settings} />
      <StickyMobileCta settings={settings} />
    </>
  )
}
