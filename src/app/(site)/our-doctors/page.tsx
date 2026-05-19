import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SanityImage from '@/components/ui/SanityImage'
import PortableText from '@/components/ui/PortableText'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { allDoctorsQuery, siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings, DoctorSummary, SanityImage as SanityImageType } from '@/lib/types'

type Doctor = DoctorSummary & {
  bio?: any
  specialties?: string[]
}

export const metadata: Metadata = {
  title: 'Our Doctors',
  description:
    'Meet the veterinarians at Tustin Village Animal Hospital. Our doctor owned and operated practice brings decades of combined experience to every visit.',
}

export const revalidate = 3600

export default async function DoctorsPage() {
  const [doctors, settings] = await Promise.all([
    client.fetch<Doctor[]>(allDoctorsQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Our team
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">Veterinarians who take the time.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Same caring doctors every visit. We build long-term relationships with our patients
              and their families &mdash; the kind of continuity of care that&rsquo;s harder and
              harder to find.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="space-y-20">
            {doctors?.map((d, i) => {
              const imageSide = i % 2 === 0 ? 'left' : 'right'
              return (
                <Reveal key={d._id} delay={i * 0.05}>
                  <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[260px_1fr] md:gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
                    {d.photo && (
                      <div
                        className={`relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-[var(--color-surface)] md:mx-0 lg:max-w-[300px] ${imageSide === 'right' ? 'md:order-2' : ''}`}
                      >
                        <SanityImage
                          image={d.photo as SanityImageType}
                          fill
                          sizes="(max-width: 768px) 260px, 300px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-3xl md:text-4xl">
                        {d.name}
                        {d.credentials && (
                          <span className="text-[var(--color-muted)]">, {d.credentials}</span>
                        )}
                      </h2>
                      {d.title && (
                        <p className="mt-2 text-sm font-medium tracking-wide text-[var(--color-brand-500)] uppercase">
                          {d.title}
                        </p>
                      )}
                      {d.specialties && d.specialties.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {d.specialties.map((s) => (
                            <span
                              key={s}
                              className="rounded-md bg-[var(--color-brand-100)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      {d.bio ? (
                        <div className="mt-6">
                          <PortableText value={d.bio} />
                        </div>
                      ) : (
                        <p className="mt-6 italic text-[var(--color-muted)]">
                          Bio coming soon.
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Ready to meet your pet&rsquo;s next vet?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                Book online or walk in &mdash; new clients get 50% off first exams on weekdays.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={bookingUrl} variant="primary" openInNewTab>
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
