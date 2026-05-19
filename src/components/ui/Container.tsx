import type { ReactNode } from 'react'

type Width = 'narrow' | 'default' | 'wide'

const widths: Record<Width, string> = {
  narrow: 'max-w-2xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}

export default function Container({
  children,
  width = 'default',
  className = '',
}: {
  children: ReactNode
  width?: Width
  className?: string
}) {
  return (
    <div className={`mx-auto px-6 md:px-10 ${widths[width]} ${className}`}>{children}</div>
  )
}
