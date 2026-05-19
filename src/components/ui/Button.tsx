import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'

const styles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent-600)] text-white hover:bg-[var(--color-accent-800)] focus-visible:outline-[var(--color-accent-600)]',
  secondary:
    'bg-transparent text-[var(--color-brand-500)] border border-[var(--color-brand-500)] hover:bg-[var(--color-brand-500)] hover:text-white focus-visible:outline-[var(--color-brand-500)]',
  ghost:
    'bg-transparent text-[var(--color-ink)] hover:text-[var(--color-brand-500)] focus-visible:outline-[var(--color-ink)]',
  onDark:
    'bg-[var(--color-cream)] text-[var(--color-brand-700)] hover:bg-white focus-visible:outline-white',
}

export default function Button({
  href,
  variant = 'primary',
  children,
  openInNewTab,
  className = '',
}: {
  href?: string
  variant?: Variant
  children: ReactNode
  openInNewTab?: boolean
  className?: string
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`

  if (!href) return <button className={cls}>{children}</button>

  const isExternal = /^(https?:|tel:|mailto:)/.test(href)
  if (isExternal || openInNewTab) {
    return (
      <a
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
