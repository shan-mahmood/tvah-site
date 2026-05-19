import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Visit Tustin Village Animal Hospital at 13942 Newport Ave, Tustin, CA 92780. Call (714) 909-1338 or book online for same-day appointments.',
}

export const revalidate = 3600

const DAY_LABEL: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

function formatTime(t?: string) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'
  const addr = settings?.address
  const phone = settings?.phone
  const email = settings?.email
  const mapsUrl =
    addr?.mapUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(
      `${addr?.street ?? ''} ${addr?.city ?? ''} ${addr?.state ?? ''} ${addr?.zip ?? ''}`.trim()
    )}`
  const mapEmbedQuery = encodeURIComponent(
    `${addr?.street ?? ''}, ${addr?.city ?? ''}, ${addr?.state ?? ''} ${addr?.zip ?? ''}`
  )

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Contact us
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">Come see us.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Walk-ins welcome six days a week. Call ahead to reduce your wait, or book online
              anytime.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="space-y-10">
                <div>
                  <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                    Visit
                  </p>
                  {addr && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-lg text-[var(--color-ink)] hover:text-[var(--color-brand-500)]"
                    >
                      {addr.street}
                      <br />
                      {addr.city}, {addr.state} {addr.zip}
                    </a>
                  )}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]"
                  >
                    Get directions &rarr;
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                    Call
                  </p>
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="mt-3 block text-lg text-[var(--color-ink)] hover:text-[var(--color-brand-500)]"
                    >
                      {phone}
                    </a>
                  )}
                </div>

                {email && (
                  <div>
                    <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="mt-3 block text-lg text-[var(--color-ink)] hover:text-[var(--color-brand-500)]"
                    >
                      {email}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                    Hours
                  </p>
                  {settings?.hours && settings.hours.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {settings.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex justify-between gap-4 text-[var(--color-ink)]/85"
                        >
                          <span className="font-medium">{DAY_LABEL[h.day] ?? h.day}</span>
                          <span className="text-[var(--color-muted)]">
                            {h.isClosed
                              ? 'Closed'
                              : `${formatTime(h.opens)} – ${formatTime(h.closes)}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 italic text-[var(--color-muted)]">
                      Hours not yet configured.
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button href={bookingUrl} variant="primary" openInNewTab>
                    Book an appointment
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] md:aspect-auto md:h-full md:min-h-[480px]">
                <iframe
                  src={`https://www.google.com/maps?q=${mapEmbedQuery}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing Tustin Village Animal Hospital location"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="mt-20 bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">After-hours emergencies</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              If your pet has an emergency outside our hours, call us first if possible &mdash;
              we&rsquo;ll help you assess severity and direct you to the right 24-hour facility.
              We coordinate follow-up care once your pet is stable.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              For poisoning emergencies, ASPCA Animal Poison Control is available 24/7 at{' '}
              <a
                href="tel:8884264435"
                className="font-medium text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]"
              >
                (888) 426-4435
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
