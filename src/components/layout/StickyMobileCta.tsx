import type { SiteSettings } from '@/lib/types'

export default function StickyMobileCta({ settings }: { settings?: SiteSettings | null }) {
  const phone = settings?.phone
  const tel = phone ? phone.replace(/[^0-9+]/g, '') : ''
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-cream)]/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 p-3">
        {phone && (
          <a
            href={`tel:${tel}`}
            className="flex items-center justify-center gap-2 rounded-md border border-[var(--color-brand-500)] py-3 text-sm font-medium text-[var(--color-brand-700)]"
          >
            Call
          </a>
        )}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-md bg-[var(--color-accent-600)] py-3 text-sm font-medium text-white"
        >
          Book now
        </a>
      </div>
    </div>
  )
}
