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
  title: 'New Kitten Information',
  description:
    'Vaccinations, parasite prevention, diet, and spay/neuter guidance for new kittens at Tustin Village Animal Hospital.',
  openGraph: {
    images: [
      {
        url: '/images/new-kitten-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'A small orange and white kitten resting on a weathered wooden bench in warm afternoon light',
      },
    ],
  },
}

export const revalidate = 3600

type Item = { heading: string; body: string }
type Section = { title: string; intro?: string; items: Item[] }

const SECTIONS: Section[] = [
  {
    title: 'Vaccines for new kittens',
    intro:
      'Vaccinations are essential for protecting your young cat from serious diseases.',
    items: [
      {
        heading: 'FVRCP vaccine',
        body: 'A combination vaccine administered in 2–4 doses that protects against viral upper respiratory infections and gastrointestinal diseases common in young cats.',
      },
      {
        heading: 'FeLV vaccine (feline leukemia virus)',
        body: 'Protects against a potentially life-threatening virus spread through blood and saliva. Indoor-only kittens may not need this vaccine — talk to our veterinarians about your kitten\'s lifestyle.',
      },
      {
        heading: 'Rabies vaccine',
        body: 'Required by California law for kittens over 16 weeks of age due to public health concerns.',
      },
      {
        heading: 'Vaccine reactions',
        body: 'Kittens may experience sleepiness, soreness, or a low-grade fever after vaccination. We use what we consider the safest vaccines available, though there is a slight risk of vaccine-related tumors.',
      },
    ],
  },
  {
    title: 'Additional care',
    items: [
      {
        heading: 'Flea prevention',
        body: 'Revolution (for kittens over 6 weeks) is a topical treatment that kills fleas, some ticks, and internal parasites.',
      },
      {
        heading: 'Fecal exam',
        body: 'A microscopic stool sample evaluation is critical to identify intestinal parasites, some of which can transmit to humans.',
      },
      {
        heading: 'Diet',
        body: 'Feed kittens a balanced, commercially available diet until one year old. Meal feeding is recommended to prevent obesity. Raw and grain-free diets are not currently recommended.',
      },
      {
        heading: 'Toxins to avoid',
        body: 'Radiator fluid, lilies, garlic, onions, grapes, and raisins are extremely toxic to cats. Keep them out of reach.',
      },
      {
        heading: 'Spay and neuter',
        body: 'We recommend sterilization at 5–6 months of age to prevent spraying/marking behaviors and support responsible pet population control.',
      },
    ],
  },
]

export default async function NewKittenInfoPage() {
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
            <h1 className="mt-3 text-4xl md:text-6xl">Welcome to your new kitten.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Welcoming a new kitty home is an exciting time. To ensure your kitten gets the best
              start, provide a cozy sleeping area, a balanced diet, regular healthcare, and plenty
              of playtime.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] md:aspect-[16/9]">
              <Image
                src="/images/new-kitten-hero.jpg"
                alt="A small orange and white kitten resting on a weathered wooden bench in warm afternoon light"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
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
            <h2 className="text-3xl md:text-4xl">Questions about your kitten?</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              Every kitten is different. Our veterinarians can build a vaccination, nutrition, and
              prevention plan tailored to your kitten&rsquo;s lifestyle.
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
                Book your kitten&rsquo;s first visit.
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
