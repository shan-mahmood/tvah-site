import Link from 'next/link'
import type { PromoBanner as PromoBannerType } from '@/lib/types'

export default function PromoBanner(props: PromoBannerType) {
  const { message, cta, tone = 'neutral' } = props

  const toneClasses: Record<string, string> = {
    neutral: 'bg-[var(--color-brand-700)] text-white',
    promo: 'bg-[var(--color-accent-600)] text-white',
    urgent: 'bg-[var(--color-danger)] text-white',
  }

  return (
    <div className={`${toneClasses[tone]} px-6 py-2.5 text-center text-sm`}>
      <span>{message}</span>
      {cta?.href && cta.label && (
        <Link
          href={cta.href}
          className="ml-3 underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  )
}
