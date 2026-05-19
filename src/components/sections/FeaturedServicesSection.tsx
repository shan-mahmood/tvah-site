import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import type { FeaturedServicesSection as FSSType } from '@/lib/types'

export default function FeaturedServicesSection(props: FSSType) {
  const { eyebrow, heading, description, services, viewAllCta } = props

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl">{heading}</h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                {description}
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services?.map((s, i) => (
            <Reveal key={s._id} delay={i * 0.06}>
              <Link
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors duration-200 hover:border-[var(--color-brand-500)]"
              >
                <h3 className="text-xl text-[var(--color-brand-700)]">{s.title}</h3>
                {s.shortDescription && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {s.shortDescription}
                  </p>
                )}
                <span className="mt-5 text-sm font-medium text-[var(--color-brand-500)] transition-transform duration-200 group-hover:translate-x-1">
                  Learn more →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {viewAllCta?.href && viewAllCta.label && (
          <div className="mt-12">
            <Button href={viewAllCta.href} variant="ghost">
              {viewAllCta.label} →
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
