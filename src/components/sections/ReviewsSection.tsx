import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import type { ReviewsSection as ReviewsSectionType } from '@/lib/types'

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="text-[var(--color-accent-600)]">
      {'★'.repeat(rating)}
      <span className="text-[var(--color-line)]">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

export default function ReviewsSection(props: ReviewsSectionType) {
  const { eyebrow, heading, description, displayReviews, googleReviewsCta } = props

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
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
          {displayReviews?.map((r, i) => (
            <Reveal key={r._id} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-ink)]/85">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-[var(--color-brand-700)]">
                  {r.authorName}
                  {r.source && (
                    <span className="ml-2 font-normal text-[var(--color-muted)]">· {r.source}</span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {googleReviewsCta?.href && googleReviewsCta.label && (
          <div className="mt-10">
            <Button href={googleReviewsCta.href} variant="ghost" openInNewTab>
              {googleReviewsCta.label} →
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
