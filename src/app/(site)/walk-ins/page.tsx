import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'
import { WALK_IN_EXAM, EMERGENCY_VISIT, formatPrice } from '@/lib/fees'

export const metadata: Metadata = {
  title: 'Walk-In Visits',
  description:
    'No appointment needed. Walk in during open hours and we’ll get your pet seen. Wait times vary with availability; walk-in and emergency fees listed upfront.',
}

export const revalidate = 3600

const FEES = [WALK_IN_EXAM, EMERGENCY_VISIT]

export default async function WalkInsPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Patient center
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">Walk-In Visits</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              No appointment needed. Walk in during open hours and we&rsquo;ll get your pet seen.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">What to expect</h2>
            <p className="mt-6 leading-relaxed text-[var(--color-ink)]/85">
              Walk-ins are seen based on availability. Pets are seen in order of arrival, with
              urgent and critical cases taken first, so wait times vary with how busy we are. If an
              emergency comes in, it may be seen ahead of routine visits &mdash; which means your
              pet is prioritized the same way if it&rsquo;s ever the urgent one.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Walk-in fees</h2>
            <dl className="mt-8 space-y-4">
              {FEES.map((fee) => (
                <div
                  key={fee.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4"
                >
                  <dt className="text-lg text-[var(--color-ink)]">{fee.label}</dt>
                  <dd className="text-lg font-semibold text-[var(--color-brand-700)]">
                    {formatPrice(fee.price)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 leading-relaxed text-[var(--color-muted)]">
              These cover the visit and exam. Any diagnostics, treatment, or medication are billed
              separately based on your pet&rsquo;s needs.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 pb-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Walk in or book online.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                New clients save 50% on first exams on weekdays.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={bookingUrl} variant="onDark" openInNewTab>
                  Book an appointment
                </Button>
                {settings?.phone && (
                  <Link
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-white/90 hover:text-white"
                  >
                    Call {settings.phone}
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
