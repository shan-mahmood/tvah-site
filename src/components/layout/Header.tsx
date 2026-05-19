'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/types'

type NavItem = {
  label: string
  href: string
  children?: Array<{ label: string; href: string; external?: boolean }>
}

const SERVICE_LINKS = [
  { label: 'Wellness Exams', href: '/wellness-exams' },
  { label: 'Internal Medicine', href: '/internal-medicine' },
  { label: 'Veterinary Surgery', href: '/veterinary-surgery' },
  { label: 'Diagnostics', href: '/diagnostics' },
  { label: 'Dental Care', href: '/dental-care' },
  { label: 'Palliative Care', href: '/palliative-care' },
  { label: 'Pet Travel', href: '/pet-travel' },
  { label: 'Emergency Care', href: '/emergency-care' },
  { label: 'Telemedicine', href: '/telemedicine' },
]

function buildNav(bookingUrl: string): NavItem[] {
  return [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/about-us',
      children: [{ label: 'Our Doctors', href: '/our-doctors' }],
    },
    {
      label: 'Our Services',
      href: '/our-services',
      children: SERVICE_LINKS,
    },
    {
      label: 'Patient Center',
      href: '/patient-center',
      children: [
        { label: 'Online Booking', href: bookingUrl, external: true },
        { label: 'Payment Information', href: '/payment-options' },
        { label: 'Hospital Policies', href: '/hospital-policies' },
        { label: 'New Puppy Info', href: '/new-puppy-info' },
        { label: 'New Kitten Info', href: '/new-kitten-info' },
      ],
    },
    { label: 'Contact Us', href: '/contact-us' },
  ]
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const menuId = useId()
  const [open, setOpen] = useState(false)
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-brand-500)]"
      >
        {item.label}
      </Link>
    )
  }
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex items-center gap-1 text-sm text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-brand-500)]"
      >
        {item.label}
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className={`h-2 w-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
      <div
        id={menuId}
        role="menu"
        className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-opacity duration-150 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <ul className="overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-cream)] py-2 shadow-lg">
          {item.children.map((c) => (
            <li key={c.href} role="none">
              {c.external ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-[var(--color-ink)]/80 transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-brand-500)]"
                >
                  {c.label}
                </a>
              ) : (
                <Link
                  href={c.href}
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-[var(--color-ink)]/80 transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-brand-500)]"
                >
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MobileMenu({
  nav,
  bookingUrl,
  open,
  onClose,
}: {
  nav: NavItem[]
  bookingUrl: string
  open: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-[var(--color-cream)] pb-8 shadow-xl">
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/" onClick={onClose} aria-label="Tustin Village Animal Hospital — Home">
            <Image
              src="/images/logo.png"
              alt=""
              width={169}
              height={123}
              priority
              className="h-10 w-auto"
            />
            <span className="sr-only">Tustin Village Animal Hospital</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-md p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="px-6 pb-6">
          <ul className="divide-y divide-[var(--color-line)]">
            {nav.map((item) => (
              <li key={item.href} className="py-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block flex-1 py-3 text-base text-[var(--color-ink)] hover:text-[var(--color-brand-500)]"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`${expanded[item.href] ? 'Collapse' : 'Expand'} ${item.label}`}
                      aria-expanded={!!expanded[item.href]}
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [item.href]: !prev[item.href] }))
                      }
                      className="ml-2 rounded-md p-2 text-[var(--color-ink)]/70 hover:bg-[var(--color-surface)]"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 12 8"
                        className={`h-2 w-3 transition-transform duration-150 ${expanded[item.href] ? 'rotate-180' : ''}`}
                      >
                        <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && expanded[item.href] && (
                  <ul className="mb-2 ml-3 border-l-2 border-[var(--color-brand-500)] pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        {c.external ? (
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="block py-2 text-sm text-[var(--color-ink)]/80 hover:text-[var(--color-brand-500)]"
                          >
                            {c.label}
                          </a>
                        ) : (
                          <Link
                            href={c.href}
                            onClick={onClose}
                            className="block py-2 text-sm text-[var(--color-ink)]/80 hover:text-[var(--color-brand-500)]"
                          >
                            {c.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[var(--color-accent-600)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-800)]"
          >
            Book an appointment
          </a>
        </nav>
      </div>
    </div>
  )
}

export default function Header({ settings }: { settings?: SiteSettings | null }) {
  const bookingUrl = settings?.bookingUrl || '#'
  const nav = buildNav(bookingUrl)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label="Tustin Village Animal Hospital — Home" className="block">
          <Image
            src="/images/logo.png"
            alt=""
            width={169}
            height={123}
            priority
            className="h-11 w-auto"
          />
          <span className="sr-only">Tustin Village Animal Hospital</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <DesktopNavItem key={item.href} item={item} />
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

        <div className="flex items-center gap-2 md:hidden">
          <Button href={bookingUrl} variant="primary" openInNewTab>
            Book
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        nav={nav}
        bookingUrl={bookingUrl}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  )
}
