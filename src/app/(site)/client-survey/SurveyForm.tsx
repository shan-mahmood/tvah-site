'use client'

import Image from 'next/image'
import { useState } from 'react'
type Step = 'ask' | 'positive' | 'negative' | 'submitted' | 'submitting'

export default function SurveyForm({
  googleUrl,
  yelpUrl,
}: {
  googleUrl: string
  yelpUrl: string
}) {
  const [step, setStep] = useState<Step>('ask')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setStep('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      petName: String(data.get('petName') || '').trim(),
      message: String(data.get('message') || '').trim(),
    }
    if (!payload.message) {
      setError('Please share a few details about your experience.')
      setStep('negative')
      return
    }
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed (${res.status})`)
      }
      setStep('submitted')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStep('negative')
    }
  }

  if (step === 'ask') {
    return (
      <div className="text-center">
        <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
          Client survey
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-balance text-[var(--color-ink)] md:text-4xl">
          Did you enjoy your experience with Tustin Village Animal Hospital?
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
          Your feedback helps us provide the best possible care for our patients.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep('positive')}
            className="inline-flex min-w-40 items-center justify-center rounded-md bg-[var(--color-accent-600)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-800)]"
          >
            Yes, I did
          </button>
          <button
            type="button"
            onClick={() => setStep('negative')}
            className="inline-flex min-w-40 items-center justify-center rounded-md border border-[var(--color-brand-500)] px-5 py-3 text-sm font-medium text-[var(--color-brand-700)] transition-colors hover:bg-[var(--color-brand-500)] hover:text-white"
          >
            Not quite
          </button>
        </div>
      </div>
    )
  }

  if (step === 'positive') {
    return (
      <div className="text-center">
        <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
          Thank you!
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-balance text-[var(--color-ink)] md:text-4xl">
          Would you mind sharing a review?
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
          A few words on Google or Yelp helps other pet owners find caring veterinary
          care in Tustin. It only takes a minute.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-8 text-[var(--color-ink)] transition-shadow hover:shadow-lg"
            >
              <Image
                src="/images/logos/google.svg"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="text-base font-medium">Review on Google</span>
              <span className="text-xs uppercase tracking-widest text-[var(--color-brand-500)] group-hover:text-[var(--color-brand-700)]">
                Open Google →
              </span>
            </a>
          )}
          {yelpUrl && (
            <a
              href={yelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-8 text-[var(--color-ink)] transition-shadow hover:shadow-lg"
            >
              <Image
                src="/images/logos/yelp.svg"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="text-base font-medium">Review on Yelp</span>
              <span className="text-xs uppercase tracking-widest text-[var(--color-brand-500)] group-hover:text-[var(--color-brand-700)]">
                Open Yelp →
              </span>
            </a>
          )}
        </div>
      </div>
    )
  }

  if (step === 'submitted') {
    return (
      <div className="text-center">
        <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
          Thank you
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-balance text-[var(--color-ink)] md:text-4xl">
          We appreciate you sharing this with us.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
          A manager will review your feedback and may reach out if a follow-up would
          help. Thank you for trusting us with your pet&apos;s care.
        </p>
      </div>
    )
  }

  // 'negative' or 'submitting' — show the feedback form
  const submitting = step === 'submitting'
  return (
    <div>
      <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
        We&apos;d like to do better
      </p>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-balance text-[var(--color-ink)] md:text-4xl">
        Tell us what happened.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        Your message goes directly to our practice manager. We&apos;ll read every word
        and reach out if you&apos;d like to talk.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--color-ink)]/80">Your name</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--color-ink)]/80">Email (optional)</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--color-ink)]/80">Pet&apos;s name (optional)</span>
          <input
            name="petName"
            type="text"
            className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--color-ink)]/80">
            What can we do better? <span className="text-[var(--color-muted)]">(required)</span>
          </span>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none"
          />
        </label>

        {error && (
          <p className="rounded-md border border-[var(--color-danger)]/20 bg-[var(--color-danger)]/5 px-3 py-2 text-sm text-[var(--color-danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-accent-600)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-800)] disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send feedback'}
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null)
              setStep('ask')
            }}
            className="text-sm text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
