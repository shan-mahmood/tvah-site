import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import Reveal from '@/components/ui/Reveal'
import HeroReviewsBar from '@/components/sections/HeroReviewsBar'
import type { HeroSection as HeroSectionType } from '@/lib/types'

export default function HeroSection(props: HeroSectionType) {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta, backgroundImage } = props

  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)] pt-16 pb-20 md:pt-24 md:pb-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20 lg:gap-24">
          <div>
            {eyebrow && (
              <Reveal>
                <p className="mb-4 text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                  {eyebrow}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="text-4xl text-[var(--color-ink)] md:text-6xl">{headline}</h1>
            </Reveal>
            {subheadline && (
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-lg text-lg text-[var(--color-muted)] leading-relaxed">
                  {subheadline}
                </p>
              </Reveal>
            )}
            {(primaryCta?.href || secondaryCta?.href) && (
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryCta?.href && primaryCta.label && (
                    <Button
                      href={primaryCta.href}
                      variant="primary"
                      openInNewTab={primaryCta.openInNewTab}
                    >
                      {primaryCta.label}
                    </Button>
                  )}
                  {secondaryCta?.href && secondaryCta.label && (
                    <Button
                      href={secondaryCta.href}
                      variant="secondary"
                      openInNewTab={secondaryCta.openInNewTab}
                    >
                      {secondaryCta.label}
                    </Button>
                  )}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.28}>
              <HeroReviewsBar />
            </Reveal>
          </div>

          {backgroundImage && (
            <Reveal delay={0.1}>
              <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-2xl bg-[var(--color-surface)] md:mx-0 md:max-h-[520px]">
                <SanityImage
                  image={backgroundImage}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 520px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
