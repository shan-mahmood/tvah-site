import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Walk-in veterinary care in Tustin, serving Orange County families. Doctor owned and operated, with modern medicine, individualized care, and a focus on quality of life.',
  openGraph: {
    images: [
      {
        url: '/team-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'The team at Tustin Village Animal Hospital',
      },
    ],
  },
}

export const revalidate = 3600

const VALUES = [
  {
    title: 'Cost-effective, individualized care',
    body: 'Rather than default to the most expensive solution, our veterinarians seek the most effective and appropriate one for your pet and your family. We explain our reasoning, lay out the options, and help you decide.',
  },
  {
    title: 'Walk-ins, six days a week',
    body: "Pets don't get sick on a schedule. We see same-day walk-ins for routine, urgent, and emergency visits — without requiring an appointment to get started.",
  },
  {
    title: 'Modern medicine, plain language',
    body: "In-house diagnostics, digital imaging, and partnerships with specialty labs. But you'll never leave a visit confused about what's happening or why.",
  },
  {
    title: 'Long-term relationships',
    body: "Same caring team every visit. We get to know your pet over years — their quirks, their history, what's normal for them — so we can catch what's not.",
  },
]

const SERVICES_SUMMARY = [
  'Wellness exams',
  'Veterinary surgery',
  'Emergency care',
  'Internal medicine',
  'Dental care',
  'Palliative care',
  'Diagnostics',
  'Pet travel',
]

export default async function AboutPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              About us
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">
              Compassionate care for your pets.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Tustin Village Animal Hospital is more than just a veterinary practice — we are a doctor
              owned and operated walk-in clinic serving Orange County families and their pets. We
              provide comprehensive, high-quality care tailored to each pet&rsquo;s needs at every life
              stage.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              Our mission is to keep visits low-stress for both pets and owners by prioritizing
              physical, emotional, and behavioral well-being. From routine wellness exams to
              specialized treatments and life-saving surgeries, our goal is to help your pets live
              long, healthy lives by your side.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="mb-8 text-3xl md:text-4xl">What we believe</h2>
          </Reveal>
          <div className="space-y-10">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="border-l-2 border-[var(--color-brand-500)] pl-6">
                  <h3 className="text-xl text-[var(--color-brand-700)]">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--color-ink)]/85">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                <Image
                  src="/team-photo.jpg"
                  alt="The team at Tustin Village Animal Hospital"
                  width={1440}
                  height={1442}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto w-full"
                  priority={false}
                />
              </div>
              <p className="mt-4 text-center text-sm italic text-[var(--color-muted)]">
                The team at Tustin Village Animal Hospital.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-20">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">A trusted walk-in hospital</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-[var(--color-ink)]/85">
              <p>
                We are proud to serve as a trusted walk-in veterinary hospital dedicated to your
                pet&rsquo;s lifelong health and well-being. Our team provides compassionate,
                high-quality care tailored to your pet&rsquo;s individual needs &mdash; from routine
                wellness exams to advanced diagnostics and urgent medical treatment.
              </p>
              <p>
                We&rsquo;re a full-service hospital with an in-house lab, digital X-ray, ultrasound,
                dental, and surgical suites &mdash; and we&rsquo;re also a walk-in clinic. That
                combination is unusual and deliberate. Routine care, urgent issues, and follow-ups
                all happen in the same place with the same caring team.
              </p>
              <p>
                Whether you need same-day care or preventive services, our walk-in veterinary
                hospital is here when your pet needs us most. We focus on dogs and cats so we can do
                that work well.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Comprehensive veterinary services</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              We offer a wide range of services to keep your pets healthy and thriving at every life
              stage:
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SERVICES_SUMMARY.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-brand-100)] bg-white/60 px-4 py-3 text-[var(--color-ink)]"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]"
                  />
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Walk in, call, or book online.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                Same-day appointments available for routine and urgent care, six days a week.
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
