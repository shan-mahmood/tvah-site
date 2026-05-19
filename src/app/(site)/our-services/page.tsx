import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { allServicesQuery, siteSettingsQuery } from '@/sanity/queries'
import type { ServiceSummary, SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Wellness exams, internal medicine, surgery, dental, diagnostics, palliative care, pet travel, emergency care, and telemedicine for dogs and cats in Tustin.',
  openGraph: {
    images: [
      {
        url: '/images/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'A woman warmly hugging a brown and white spotted puppy outdoors',
      },
    ],
  },
}

export const revalidate = 3600

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    client.fetch<ServiceSummary[]>(allServicesQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Our services
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">
              Full-spectrum care for dogs and cats.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              From wellness exams to emergency surgery, we provide comprehensive veterinary care
              in-house &mdash; with modern diagnostics, experienced doctors, and same-day walk-ins
              when you need them.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] md:aspect-[16/9]">
              <Image
                src="/images/services-hero.jpg"
                alt="A woman gently hugging a brown and white spotted puppy outdoors in a garden"
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
            {services?.map((s, i) => (
              <Reveal key={s._id} delay={i * 0.04}>
                <Link
                  href={`/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors duration-200 hover:border-[var(--color-brand-500)]"
                >
                  <h2 className="text-xl text-[var(--color-brand-700)]">{s.title}</h2>
                  {s.shortDescription && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                      {s.shortDescription}
                    </p>
                  )}
                  <span className="mt-5 text-sm font-medium text-[var(--color-brand-500)] transition-transform duration-200 group-hover:translate-x-1">
                    Learn more &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Not sure what you need? Just walk in.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                We triage every visit, recommend the right level of care, and never push services
                your pet doesn&rsquo;t need.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={bookingUrl} variant="onDark" openInNewTab>
                  Book an appointment
                </Button>
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Call {settings.phone}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
