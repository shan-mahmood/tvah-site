'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Bump this when the wait-time / triage wording changes. Dismissal stores the
 * version it dismissed, so bumping re-shows the banner to everyone who
 * previously closed it — a policy change is never hidden behind a stale
 * dismissal.
 */
const BANNER_VERSION = 'v1'
const STORAGE_KEY = 'tvah_walkin_banner_dismissed'

/**
 * Site-wide walk-in expectations bar. Client component so returning visitors
 * can dismiss it (persisted per-device in localStorage — a fresh device or
 * cleared storage shows it again).
 *
 * Sets wait-time expectations before someone arrives: walk-ins are seen by
 * availability, urgent cases first. Wording is kept consistent with the
 * /walk-ins page and /hospital-policies. Calm surface, not an alarm — but the
 * expectation text itself is the payload, so it stays fully legible (ink,
 * weight 500), not muted.
 */
export default function WalkInBanner() {
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
      aria-label="Walk-in information"
      className={`border-b border-[var(--color-line)] bg-[var(--color-surface)] ${
        mounted ? '' : 'invisible'
      }`}
    >
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-2 pr-12 text-center text-sm md:px-10 md:pr-14">
        <span className="font-medium text-[var(--color-ink)]">
          Walk-ins are seen by availability — urgent cases first, so wait times vary.
        </span>
        <Link
          href="/walk-ins"
          className="inline-flex items-center gap-1 font-medium text-[var(--color-brand-700)] underline underline-offset-2 transition-colors hover:text-[var(--color-brand-800)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-700)]"
        >
          What to expect
          <span aria-hidden>&rarr;</span>
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss walk-in notice"
          className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-700)]"
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
