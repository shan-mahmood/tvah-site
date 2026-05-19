'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    CallTrk?: { swap: () => void }
  }
}

export function CallRailRouteHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.CallTrk?.swap) {
      window.CallTrk.swap()
    }
  }, [pathname, searchParams])

  return null
}
