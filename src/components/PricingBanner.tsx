'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Bump this when fees change. Dismissal stores the version it dismissed, so
 * bumping re-shows the banner to everyone who previously closed it — a price
 * change is never hidden behind a stale dismissal.
 */
const BANNER_VERSION = 'v1'
const STORAGE_KEY = 'tvah_pricing_banner_dismissed'

/**
 * Site-wide pricing-transparency bar. Client component so returning visitors
 * can dismiss it (persisted per-device in localStorage — a fresh device or
 * cleared storage shows it again, preserving the "everyone sees it" intent).
 *
 * Intentionally thin and muted: a calm honesty signal, not an alarm.
 *
 * TODO: Link target is /hospital-policies, the closest existing page that
 * lists fees. A dedicated /pricing page with the full fee schedule should be
 * created and this href pointed at it.
 */
export default function PricingBanner() {
  // Until mounted we don't know the stored dismissal, so we render an
  // invisible placeholder of equal height. Server and first client render
  // agree (no hydration mismatch) and the height is reserved (no layout shift).
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === BANNER_VERSION)
    } catch {
      // localStorage blocked (e.g. private mode) — leave it visible.
    }
    setMounted(true)
  }, [])

  function handleDismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, BANNER_VERSION)
    } catch {
      // Ignore persistence failure; still hide for this session.
    }
    setDismissed(true)
  }

  if (mounted && dismissed) return null

  return (
    <div
      role="note"
      aria-label="Pricing information"
      className={`border-b border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] ${
        mounted ? '' : 'invisible'
      }`}
    >
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-2 pr-12 text-center text-sm md:px-10 md:pr-14">
        <span>
          <span className="font-medium text-[var(--color-ink)]">Upfront pricing:</span>{' '}
          Walk-in exams $150 &middot; ER visits $200
        </span>
        <Link
          href="/hospital-policies"
          className="font-medium text-[var(--color-brand-500)] underline underline-offset-2 transition-colors hover:text-[var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
        >
          See full fee schedule
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss pricing notice"
          className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
