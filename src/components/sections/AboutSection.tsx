import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import PortableText from '@/components/ui/PortableText'
import Reveal from '@/components/ui/Reveal'
import type { AboutSection as AboutSectionType } from '@/lib/types'

export default function AboutSection(props: AboutSectionType) {
  const { eyebrow, heading, body, image, cta, imagePosition = 'right' } = props
  const imageFirst = imagePosition === 'left'

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <Container>
        <div
          className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 ${imageFirst ? '' : ''}`}
        >
          {image && (
            <Reveal className={imageFirst ? 'md:order-1' : 'md:order-2'}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <SanityImage image={image} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          )}
          <Reveal className={imageFirst ? 'md:order-2' : 'md:order-1'} delay={0.05}>
            <div>
              {eyebrow && (
                <p className="mb-3 text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl">{heading}</h2>
              {body && (
                <div className="mt-4">
                  <PortableText value={body} />
                </div>
              )}
              {cta?.href && cta.label && (
                <div className="mt-6">
                  <Button href={cta.href} variant="secondary" openInNewTab={cta.openInNewTab}>
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
