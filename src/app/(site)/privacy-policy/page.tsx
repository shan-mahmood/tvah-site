import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  alternates: { canonical: '/privacy-policy' },
  title: 'Privacy Policy',
  description:
    'How Tustin Village Animal Hospital collects, uses and shares client information, including advertising with Google, and how to opt out.',
}

export const revalidate = 3600

const LAST_UPDATED = 'November 18, 2026'

const linkClass =
  'font-medium text-[var(--color-brand-500)] underline underline-offset-2 hover:text-[var(--color-brand-700)]'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <div>
        <h2 className="mb-5 text-2xl md:text-3xl">{title}</h2>
        <div className="space-y-4 leading-relaxed text-[var(--color-ink)]/85">{children}</div>
      </div>
    </Reveal>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="border-l-2 border-[var(--color-brand-500)] pl-5">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function PrivacyPolicyPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const phone = settings?.phone
  const tel = phone ? `tel:${phone.replace(/[^0-9+]/g, '')}` : undefined
  const addr = settings?.address
  const callUs = phone ? (
    <>
      call us at{' '}
      <a href={tel} className={linkClass}>
        {phone}
      </a>
    </>
  ) : (
    'call us'
  )

  return (
    <>
      <section className="pt-16 pb-10 md:pt-24 md:pb-12">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Patient center
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">Privacy policy.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              What information we collect, how we use it, and the choices you have.
            </p>
            <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated {LAST_UPDATED}</p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16">
        <Container width="narrow">
          <div className="space-y-14">
            <Section title="Information we collect">
              <Bullets
                items={[
                  <>
                    <strong className="text-[var(--color-brand-700)]">
                      Client and pet information
                    </strong>{' '}
                    you give us when you register, book, call or visit: your name, email address,
                    phone number, mailing address, and your pet&rsquo;s medical and visit history.
                  </>,
                  <>
                    <strong className="text-[var(--color-brand-700)]">Website information</strong>:
                    pages viewed, device and browser details, and how you reached our site. We
                    collect this with cookies and similar tools, including Google Analytics, Google
                    Ads, and call-tracking that shows a tracking phone number and records call
                    details.
                  </>,
                ]}
              />
            </Section>

            <Section title="How we use it">
              <Bullets
                items={[
                  'To provide veterinary care, manage appointments and process payments.',
                  'To send appointment reminders, care follow-ups, satisfaction surveys and occasional clinic news by email or text.',
                  'To measure and improve our website and advertising.',
                ]}
              />
            </Section>

            <Section title="Advertising and Google">
              <p>
                We advertise on Google. So that people who are already our clients don&rsquo;t see
                ads meant for new clients, we share clients&rsquo; email addresses, phone numbers,
                names and ZIP codes with Google in hashed (encrypted) form through Google&rsquo;s
                Customer Match feature. Google uses this only to match it to Google accounts for
                our advertising. Google never receives your pet&rsquo;s medical records.{' '}
                <a
                  href="https://support.google.com/google-ads/answer/6334160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  How Google uses Customer Match data
                </a>
                .
              </p>
              <p>
                We also use Google cookies to measure which ads lead to calls and appointments. You
                can control ad personalization in your{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Google ad settings
                </a>
                .
              </p>
            </Section>

            <Section title="Who we share information with">
              <p>
                We do not sell your personal information. We share it only with service providers
                that help us run the hospital &mdash; such as our practice-management software,
                email and text messaging, call tracking, payment processing, diagnostic
                laboratories and Google &mdash; and when the law requires it.
              </p>
            </Section>

            <Section title="Your choices">
              <Bullets
                items={[
                  <>
                    <strong className="text-[var(--color-brand-700)]">
                      Opt out of marketing and advertising matching
                    </strong>
                    : {callUs} or ask at the front desk. We&rsquo;ll stop marketing emails and texts
                    and stop including your details in advertising matching. You&rsquo;ll still get
                    messages about your pet&rsquo;s care.
                  </>,
                  <>
                    <strong className="text-[var(--color-brand-700)]">Email</strong>: every
                    marketing email has an unsubscribe link.
                  </>,
                  <>
                    <strong className="text-[var(--color-brand-700)]">Text messages</strong>: reply
                    STOP to opt out.
                  </>,
                  <>
                    <strong className="text-[var(--color-brand-700)]">Cookies</strong>: you can
                    block or delete cookies in your browser settings.
                  </>,
                  <>
                    <strong className="text-[var(--color-brand-700)]">Access or correction</strong>
                    : contact us to review or update the information we hold about you.
                  </>,
                ]}
              />
            </Section>

            <Section title="Security">
              <p>
                We use reasonable safeguards to protect your information. No method of transmission
                or storage is completely secure.
              </p>
            </Section>

            <Section title="Children">
              <p>
                Our website is not directed to children under 13, and we do not knowingly collect
                information from them.
              </p>
            </Section>

            <Section title="Changes">
              <p>We may update this policy. The date at the top shows the latest version.</p>
            </Section>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-2xl md:text-3xl">Contact us</h2>
            <address className="mt-4 leading-relaxed not-italic text-[var(--color-ink)]/85">
              Tustin Village Animal Hospital
              {addr?.street && (
                <>
                  <br />
                  {addr.street}
                  <br />
                  {addr.city}, {addr.state} {addr.zip}
                </>
              )}
              {phone && (
                <>
                  <br />
                  <a href={tel} className={linkClass}>
                    {phone}
                  </a>
                </>
              )}
              {settings?.email && (
                <>
                  <br />
                  <a href={`mailto:${settings.email}`} className={linkClass}>
                    {settings.email}
                  </a>
                </>
              )}
            </address>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
