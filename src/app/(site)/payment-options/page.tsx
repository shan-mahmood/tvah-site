import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Payment Information',
  description:
    'Accepted payment methods, pet insurance options, and CareCredit financing at Tustin Village Animal Hospital.',
  openGraph: {
    images: [
      {
        url: '/images/payment-options.jpg',
        width: 1200,
        height: 630,
        alt: 'A woman kissing her golden retriever on the head outdoors',
      },
    ],
  },
}

export const revalidate = 3600

const ACCEPTED_PAYMENTS = [
  'Debit cards',
  'Credit cards (Visa, Mastercard, Discover, American Express)',
  'Cash',
  'CareCredit',
  'Apple Pay',
]

const INSURANCE_OPTIONS = [
  'Pet Insurance by Nationwide®',
  'Trupanion Pet Insurance',
  'ASPCA Pet Insurance',
  'Pet Insurance by EMBRACE',
]

export default async function PaymentOptionsPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_minmax(0,220px)] md:gap-10">
            <Reveal>
              <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                Patient center
              </p>
              <h1 className="mt-3 text-4xl md:text-6xl">Payment information.</h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
                Payment is expected when services are rendered. To focus on our patients&rsquo;
                needs, customer service, and minimizing costs, we do not bill or provide
                installment plans &mdash; but financing through CareCredit is available.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                <Image
                  src="/images/payment-options.jpg"
                  alt="A woman kissing her golden retriever on the head outdoors"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container width="narrow">
          <div className="space-y-16">
            <Reveal>
              <div>
                <h2 className="mb-6 text-3xl md:text-4xl">Accepted payment methods</h2>
                <ul className="space-y-3">
                  {ACCEPTED_PAYMENTS.map((p) => (
                    <li
                      key={p}
                      className="border-l-2 border-[var(--color-brand-500)] pl-6 leading-relaxed text-[var(--color-ink)]/85"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-6 text-3xl md:text-4xl">Pet insurance options</h2>
                <p className="mb-6 leading-relaxed text-[var(--color-ink)]/85">
                  We recommend exploring coverage through:
                </p>
                <ul className="space-y-3">
                  {INSURANCE_OPTIONS.map((p) => (
                    <li
                      key={p}
                      className="border-l-2 border-[var(--color-brand-500)] pl-6 leading-relaxed text-[var(--color-ink)]/85"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-6 text-3xl md:text-4xl">CareCredit program</h2>
                <div className="border-l-2 border-[var(--color-brand-500)] pl-6">
                  <p className="leading-relaxed text-[var(--color-ink)]/85">
                    For unexpected veterinary expenses, Tustin Village participates in CareCredit,
                    enabling clients to divide costs into six monthly payments. The application
                    process takes approximately five minutes and can be completed at the hospital
                    (with phone approval) or online at{' '}
                    <a
                      href="https://www.carecredit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-brand-700)] underline underline-offset-4"
                    >
                      CareCredit.com
                    </a>
                    .
                  </p>
                  <p className="mt-4 font-semibold text-[var(--color-brand-700)]">
                    Program features
                  </p>
                  <ul className="mt-3 space-y-2 leading-relaxed text-[var(--color-ink)]/85">
                    <li>&bull; Quick approval determination (within minutes)</li>
                    <li>&bull; No annual fee</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Questions about a bill?</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              Our front desk is happy to walk through estimates, insurance reimbursements, or
              CareCredit applications. Call us, email, or stop by.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {settings?.phone && (
                <Button
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  variant="secondary"
                >
                  Call {settings.phone}
                </Button>
              )}
              <Link
                href="/patient-center"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]"
              >
                Back to patient center &rarr;
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Ready to book?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                New clients save 50% on first exams on weekdays.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={bookingUrl} variant="onDark" openInNewTab>
                  Book an appointment
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
