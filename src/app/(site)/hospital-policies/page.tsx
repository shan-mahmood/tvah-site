import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'
import { WALK_IN_EXAM, EMERGENCY_VISIT, formatPrice } from '@/lib/fees'

export const metadata: Metadata = {
  title: 'Hospital Policies',
  description:
    'Appointment, cancellation, drop-off, prescription, and abandoned animal policies at Tustin Village Animal Hospital.',
  openGraph: {
    images: [
      {
        url: '/images/hospital-policies.jpg',
        width: 1200,
        height: 630,
        alt: 'A person walking a small black dog through a golden field at dusk',
      },
    ],
  },
}

export const revalidate = 3600

type Item = { heading: string; body: string }
type Section = { title: string; intro?: string; items: Item[] }

const WALK_IN_FEES = [WALK_IN_EXAM, EMERGENCY_VISIT]

const SECTIONS: Section[] = [
  {
    title: 'Appointment policy',
    intro:
      'The hospital operates primarily by appointment. Patients should arrive 10–15 minutes early. Emergency cases receive top priority, which may occasionally cause delays.',
    items: [
      {
        heading: 'Drop-off appointments',
        body: 'Pets can be dropped off in the morning for examination between scheduled appointments. Our veterinarians will call with diagnosis and discharge instructions once the exam is complete.',
      },
      {
        heading: 'New client cancellations',
        body: 'Cancellation within 24 business hours: first exam discount forfeited. No-show: $45 deposit required to reschedule.',
      },
      {
        heading: 'Existing client cancellations',
        body: 'No-show or same-day cancellation: $45 fee.',
      },
    ],
  },
  {
    title: 'Additional policies',
    items: [
      {
        heading: 'Patient behavior',
        body: 'All pets should be on a leash or in carriers before entering the facility. Staff may request pet restraint or bring animals to the treatment area to ensure comfort and safety.',
      },
      {
        heading: 'Prescription requirements',
        body: 'California law prohibits veterinarians from dispensing prescription medications without a prior examination and current health knowledge (within one year).',
      },
      {
        heading: 'Staffing & service hours',
        body: "Veterinary services during evening, weekend, and some daytime hours are provided at the veterinarian's discretion. Continuous personnel presence may not be available during these periods.",
      },
      {
        heading: 'Abandoned animal policy',
        body: 'Animals not picked up within 14 calendar days are deemed abandoned per California Civil Code Sections 1834.5–1834.6. The facility will attempt to find a new owner for 10+ days before assuming responsibility.',
      },
    ],
  },
]

export default async function HospitalPoliciesPage() {
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
              <h1 className="mt-3 text-4xl md:text-6xl">Hospital policies.</h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
                The expectations and procedures that help us deliver consistent care, on time, for
                every patient.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                <Image
                  src="/images/hospital-policies.jpg"
                  alt="A person walking a small black dog through a golden field at dusk"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-12 md:py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="mb-6 text-3xl md:text-4xl">Walk-in visits</h2>
            <p className="leading-relaxed text-[var(--color-ink)]/85">
              Walk-ins are seen based on availability. Pets are seen in order of arrival, with
              urgent and critical cases taken first, so wait times vary with how busy we are. If an
              emergency comes in, it may be seen ahead of routine visits &mdash; which means your
              pet is prioritized the same way if it&rsquo;s ever the urgent one.
            </p>
            <dl className="mt-8 space-y-4">
              {WALK_IN_FEES.map((fee) => (
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
              separately based on your pet&rsquo;s needs. For more, see our{' '}
              <Link
                href="/walk-ins"
                className="font-medium text-[var(--color-brand-500)] underline underline-offset-2 hover:text-[var(--color-brand-700)]"
              >
                walk-in visits page
              </Link>
              .
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
                  <h2 className="mb-6 text-3xl md:text-4xl">{section.title}</h2>
                  {section.intro && (
                    <p className="mb-8 leading-relaxed text-[var(--color-ink)]/85">
                      {section.intro}
                    </p>
                  )}
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div
                        key={item.heading}
                        className="border-l-2 border-[var(--color-brand-500)] pl-6"
                      >
                        <p className="font-semibold text-lg text-[var(--color-brand-700)]">
                          {item.heading}
                        </p>
                        <p className="mt-3 leading-relaxed text-[var(--color-ink)]/85">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Need to reschedule?</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              Give us a call as early as you can. We&rsquo;ll find another time that works.
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
                Walk in or book online.
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
