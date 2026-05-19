import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import type { CtaSection as CtaSectionType } from '@/lib/types'

export default function CtaSection(props: CtaSectionType) {
  const { eyebrow, heading, description, primaryCta, secondaryCta } = props

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
            {eyebrow && (
              <p className="mb-3 text-xs font-medium tracking-widest text-[var(--color-brand-100)] uppercase">
                {eyebrow}
              </p>
            )}
            <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">{heading}</h2>
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-brand-100)]">
                {description}
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryCta?.href && primaryCta.label && (
                <Button href={primaryCta.href} variant="primary" openInNewTab={primaryCta.openInNewTab}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta?.href && secondaryCta.label && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
