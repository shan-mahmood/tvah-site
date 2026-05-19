import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

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

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const addr = settings?.address
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="text-base font-semibold tracking-tight text-[var(--color-brand-700)]">
            Tustin Village Animal Hospital
          </p>
          <p className="mt-4 max-w-sm text-sm text-[var(--color-muted)]">
            Walk-in veterinary care in Tustin. Wellness, surgery, dental, diagnostics, and emergency
            services.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
            Visit
          </p>
          {addr && (
            <address className="mt-3 not-italic text-sm leading-relaxed text-[var(--color-ink)]/80">
              {addr.street}
              <br />
              {addr.city}, {addr.state} {addr.zip}
            </address>
          )}
          {settings?.phone && (
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="mt-3 block text-sm text-[var(--color-brand-700)]"
            >
              {settings.phone}
            </a>
          )}
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
            Hours
          </p>
          <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink)]/80">
            {settings?.hours?.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{DAY_LABEL[h.day] ?? h.day}</span>
                <span className="text-[var(--color-muted)]">
                  {h.isClosed ? 'Closed' : `${formatTime(h.opens)} – ${formatTime(h.closes)}`}
                </span>
              </li>
            ))}
          </ul>
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
