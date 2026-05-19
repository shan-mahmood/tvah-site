import type { SiteSettings } from '@/lib/types'

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

export default function TopBar({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null
  const { address, phone, email } = settings

  return (
    <div className="hidden bg-[var(--color-brand-800)] text-[var(--color-brand-100)] md:block">
      <div className="mx-auto flex max-w-6xl items-center gap-7 px-6 py-2.5 text-xs md:px-10">
        {address?.street && (
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon />
            <span>{address.street}, {address.city}, {address.state} {address.zip}</span>
          </span>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <PhoneIcon />
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <MailIcon />
            <span>{email}</span>
          </a>
        )}
      </div>
    </div>
  )
}
