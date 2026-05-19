import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import type { DoctorsSection as DoctorsSectionType } from '@/lib/types'

export default function DoctorsSection(props: DoctorsSectionType) {
  const { eyebrow, heading, description, doctors, cta } = props

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {doctors?.map((d, i) => (
            <Reveal key={d._id} delay={i * 0.08}>
              <div className="flex flex-col">
                {d.photo && (
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                    <SanityImage
                      image={d.photo}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="mt-5 font-serif text-xl text-[var(--color-brand-700)]">
                  {d.name}
                  {d.credentials && (
                    <span className="text-[var(--color-muted)]">, {d.credentials}</span>
                  )}
                </p>
                {d.title && (
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{d.title}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {cta?.href && cta.label && (
          <div className="mt-12">
            <Button href={cta.href} variant="ghost">
              {cta.label} →
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
