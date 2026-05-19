import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings } from '@/lib/types'

const DAY_LABEL: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
}

function formatTime(t?: string) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

const VISIT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Doctors', href: '/our-doctors' },
  { label: 'New Puppy Info', href: '/new-puppy-info' },
  { label: 'New Kitten Info', href: '/new-kitten-info' },
  { label: 'Hospital Policies', href: '/hospital-policies' },
  { label: 'Payment Information', href: '/payment-options' },
  { label: 'Contact Us', href: '/contact-us' },
]

const SERVICE_LINKS = [
  { label: 'Wellness Exams', href: '/wellness-exams' },
  { label: 'Internal Medicine', href: '/internal-medicine' },
  { label: 'Diagnostics', href: '/diagnostics' },
  { label: 'Veterinary Surgery', href: '/veterinary-surgery' },
  { label: 'Dental Care', href: '/dental-care' },
  { label: 'Palliative Care', href: '/palliative-care' },
  { label: 'Emergency Care', href: '/emergency-care' },
  { label: 'Pet Travel', href: '/pet-travel' },
  { label: 'Telemedicine', href: '/telemedicine' },
]

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const addr = settings?.address
  const fullAddress = addr
    ? `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip || ''}`.trim()
    : ''
  const mapEmbedSrc = fullAddress
    ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
    : ''
  const mapHref =
    addr?.mapUrl ||
    (fullAddress ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}` : '#')

  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4 md:gap-8 md:px-10">
        <div>
          <Link
            href="/"
            aria-label="Tustin Village Animal Hospital — Home"
            className="inline-block"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={169}
              height={123}
              className="h-11 w-auto"
            />
            <span className="sr-only">Tustin Village Animal Hospital</span>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
            Walk-in veterinary care in Tustin. Wellness, surgery, dental, diagnostics, and
            emergency services &mdash; six days a week.
          </p>

          {addr && (
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-sm not-italic leading-relaxed text-[var(--color-ink)]/80 hover:text-[var(--color-brand-700)]"
            >
              {addr.street}
              <br />
              {addr.city}, {addr.state} {addr.zip}
            </a>
          )}

          {settings?.hours && settings.hours.length > 0 && (
            <ul className="mt-5 space-y-1 text-sm text-[var(--color-ink)]/80">
              {settings.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{DAY_LABEL[h.day] ?? h.day}</span>
                  <span className="text-[var(--color-muted)]">
                    {h.isClosed ? 'Closed' : `${formatTime(h.opens)} – ${formatTime(h.closes)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 space-y-1 text-sm">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="block text-[var(--color-brand-700)] hover:text-[var(--color-brand-500)]"
              >
                {settings.phone}
              </a>
            )}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="block text-[var(--color-brand-700)] hover:text-[var(--color-brand-500)]"
              >
                {settings.email}
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {VISIT_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-brand-500)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
            Our Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-brand-500)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:h-full">
          {mapEmbedSrc && (
            <div className="aspect-square overflow-hidden rounded-2xl bg-white md:aspect-auto md:h-full md:min-h-[320px]">
              <iframe
                src={mapEmbedSrc}
                title="Tustin Village Animal Hospital location"
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} Tustin Village Animal Hospital.</p>
          <div className="flex gap-6">
            <Link href="/hospital-policies">Hospital policies</Link>
            <Link href="/payment-options">Payment</Link>
            <Link href="/contact-us">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
