import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Patient Center',
  description:
    'New client information, forms, payment options, and policies for Tustin Village Animal Hospital.',
}

export const revalidate = 3600

const SECTIONS = [
  {
    title: 'New patients',
    items: [
      {
        heading: 'What to bring',
        body: 'Any prior medical records from a previous vet, vaccination history, and a list of current medications. If your pet is on a prescription diet, bring the brand and formula.',
      },
      {
        heading: 'First visit',
        body: 'Plan for 30–45 minutes. We do a full physical, review history, and put together a care plan together. First exams for new clients are 50% off on weekdays.',
      },
      {
        heading: 'Anxious pets',
        body: "If your dog or cat gets stressed at the vet, let us know when you book. We have low-stress handling techniques and can prescribe calming aids when it'll help.",
      },
    ],
  },
  {
    title: 'Payment & estimates',
    items: [
      {
        heading: 'What we accept',
        body: 'All major credit cards, debit, cash, CareCredit, and Scratchpay. Payment is due at the time of service.',
      },
      {
        heading: 'Estimates',
        body: "For any procedure beyond a basic exam, we provide a written estimate before we begin. You'll know the cost range upfront, with explanation of what each line item covers.",
      },
      {
        heading: 'Payment plans',
        body: 'For larger procedures, CareCredit and Scratchpay offer no-interest financing for qualified applicants. We can help you apply at the clinic.',
      },
    ],
  },
  {
    title: 'Prescriptions & refills',
    items: [
      {
        heading: 'How to request a refill',
        body: 'Call us at least 48 hours before you run out. For ongoing medications, we may need to see your pet for a rechecks before authorizing additional refills.',
      },
      {
        heading: 'Online pharmacy',
        body: 'We can fill prescriptions in-house or send them to your preferred online pharmacy. Heartworm and flea prevention often costs less through online pharmacies — we&rsquo;re happy to send the script.',
      },
    ],
  },
  {
    title: 'Policies',
    items: [
      {
        heading: 'Appointments & walk-ins',
        body: 'We see same-day walk-ins. Scheduled appointments take priority, but we work walk-ins in throughout the day as our schedule allows. Wait times depend on the day; calling ahead helps.',
      },
      {
        heading: 'Cancellations',
        body: 'Please give 24 hours notice for cancellations or reschedules. Repeated no-shows may require a deposit for future bookings.',
      },
      {
        heading: 'Medical records',
        body: "We're happy to send your pet&rsquo;s records to another vet or specialist. Email or call us with the receiving practice&rsquo;s information.",
      },
    ],
  },
]

export default async function PatientCenterPage() {
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
            <h1 className="mt-3 text-4xl md:text-6xl">
              Everything you need to know before your visit.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Forms, policies, payment options, and answers to the questions we hear most often.
              Anything we haven&rsquo;t covered &mdash; just ask.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container width="narrow">
          <div className="space-y-16">
            {SECTIONS.map((section, si) => (
              <Reveal key={section.title} delay={si * 0.05}>
                <div>
                  <h2 className="mb-8 text-3xl md:text-4xl">{section.title}</h2>
                  <dl className="space-y-6">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="border-b border-[var(--color-line)] pb-6 last:border-b-0"
                      >
                        <dt className="font-semibold text-lg text-[var(--color-brand-700)]">
                          {item.heading}
                        </dt>
                        <dd
                          className="mt-3 leading-relaxed text-[var(--color-ink)]/85"
                          dangerouslySetInnerHTML={{ __html: item.body }}
                        />
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Still have a question?</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              Our front desk is happy to help. Call us, email, or stop by &mdash; we&rsquo;ll get
              you an answer.
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
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]"
              >
                Visit contact page &rarr;
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
                <Button href={bookingUrl} variant="primary" openInNewTab>
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
