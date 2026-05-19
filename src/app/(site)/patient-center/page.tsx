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
  title: 'Patient Center',
  description:
    'New client information, forms, payment options, hospital policies, and puppy/kitten care guides for Tustin Village Animal Hospital.',
  openGraph: {
    images: [
      {
        url: '/images/patient-center-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'A man warmly embracing a happy golden retriever outdoors at sunset',
      },
    ],
  },
}

export const revalidate = 3600

type Card = {
  title: string
  href: string
  description: string
  external?: boolean
}

export default async function PatientCenterPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'

  const cards: Card[] = [
    {
      title: 'Online booking',
      href: bookingUrl,
      description:
        'Schedule a wellness exam, dental cleaning, or follow-up through our patient portal — anytime, day or night.',
      external: true,
    },
    {
      title: 'Payment information',
      href: '/payment-options',
      description:
        'Accepted payment methods, pet insurance recommendations, and CareCredit financing for unexpected expenses.',
    },
    {
      title: 'Hospital policies',
      href: '/hospital-policies',
      description:
        'Appointments, cancellations, drop-offs, prescription requirements, and other procedural details.',
    },
    {
      title: 'New puppy info',
      href: '/new-puppy-info',
      description:
        'Vaccination schedules, parasite prevention, diet guidance, and spay/neuter timing for your new dog.',
    },
    {
      title: 'New kitten info',
      href: '/new-kitten-info',
      description:
        'Vaccinations, fecal exam guidance, feline-specific toxins to avoid, and spay/neuter timing for your new cat.',
    },
  ]

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Patient center
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">
              Everything you need before your visit.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Booking, policies, payment, and care guides &mdash; in one place. Anything we
              haven&rsquo;t covered, just ask.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] md:aspect-[16/9]">
              <Image
                src="/images/patient-center-hero.jpg"
                alt="A man warmly embracing a happy golden retriever outdoors at sunset"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const cardClass =
                'group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors duration-200 hover:border-[var(--color-brand-500)]'
              const inner = (
                <>
                  <h2 className="text-xl text-[var(--color-brand-700)]">{c.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {c.description}
                  </p>
                  <span className="mt-5 text-sm font-medium text-[var(--color-brand-500)] transition-transform duration-200 group-hover:translate-x-1">
                    {c.external ? 'Open portal' : 'Learn more'} &rarr;
                  </span>
                </>
              )
              return (
                <Reveal key={c.title} delay={i * 0.04}>
                  {c.external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={c.href} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              )
            })}
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
