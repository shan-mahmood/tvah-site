import Link from 'next/link'
import Button from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/types'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Services', href: '/our-services' },
  { label: 'Patient Center', href: '/patient-center' },
  { label: 'Contact Us', href: '/contact-us' },
]

export default function Header({ settings }: { settings?: SiteSettings | null }) {
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="leading-tight">
          <div className="text-lg font-semibold tracking-tight text-[var(--color-brand-700)] md:text-xl">
            Tustin Village
          </div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--color-brand-500)] md:text-xs">
            Animal Hospital
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-brand-500)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center rounded-full border border-[var(--color-brand-500)] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-brand-500)] transition-colors hover:bg-[var(--color-brand-500)] hover:text-white md:inline-flex"
        >
          Appointment
        </a>

        <Button href={bookingUrl} variant="primary" className="md:hidden" openInNewTab>
          Book
        </Button>
      </div>
    </header>
  )
}
