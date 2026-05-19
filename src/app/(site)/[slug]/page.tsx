import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/client'
import { serviceBySlugQuery, allServiceSlugsQuery } from '@/sanity/queries'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import PortableText from '@/components/ui/PortableText'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

type Service = {
  title: string
  shortDescription?: string
  heroImage?: any
  body?: any
  whatToExpect?: Array<{ heading: string; description: string }>
  faqs?: Array<{ question: string; answer: any }>
  relatedServices?: Array<{ _id: string; title: string; slug: string; shortDescription?: string }>
  seo?: { title?: string; description?: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allServiceSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await client.fetch<Service | null>(serviceBySlugQuery, { slug })
  if (!service) return {}
  return {
    title: service.seo?.title || service.title,
    description: service.seo?.description || service.shortDescription,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const service = await (isDraft ? draftClient : client).fetch<Service | null>(
    serviceBySlugQuery,
    { slug }
  )

  if (!service) notFound()

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-20">
        <Container width="narrow">
          <Reveal>
            <h1 className="text-4xl md:text-6xl">{service.title}</h1>
            {service.shortDescription && (
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {service.shortDescription}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      {service.heroImage && (
        <Container>
          <Reveal delay={0.05}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <SanityImage
                image={service.heroImage}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      )}

      <section className="py-16">
        <Container width="narrow">
          <PortableText value={service.body} />
        </Container>
      </section>

      {service.whatToExpect?.length ? (
        <section className="bg-[var(--color-surface)] py-20">
          <Container width="narrow">
            <Reveal>
              <h2 className="mb-8 text-3xl md:text-4xl">What to expect</h2>
            </Reveal>
            <div className="space-y-6">
              {service.whatToExpect.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="border-l-2 border-[var(--color-brand-500)] pl-6">
                    <h3 className="text-xl text-[var(--color-brand-700)]">{item.heading}</h3>
                    <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {service.faqs?.length ? (
        <section className="py-20">
          <Container width="narrow">
            <Reveal>
              <h2 className="mb-8 text-3xl md:text-4xl">Frequently asked</h2>
            </Reveal>
            <dl className="space-y-6">
              {service.faqs.map((f, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="border-b border-[var(--color-line)] pb-6">
                    <dt className="font-semibold text-lg text-[var(--color-brand-700)]">
                      {f.question}
                    </dt>
                    <dd className="mt-3 text-[var(--color-muted)]">
                      <PortableText value={f.answer} />
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {service.relatedServices?.length ? (
        <section className="py-16">
          <Container>
            <h2 className="mb-8 text-2xl">Related services</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {service.relatedServices.map((r) => (
                <Link
                  key={r._id}
                  href={`/${r.slug}`}
                  className="group rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-brand-500)]"
                >
                  <h3 className="text-lg text-[var(--color-brand-700)]">{r.title}</h3>
                  {r.shortDescription && (
                    <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-2">
                      {r.shortDescription}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm font-medium text-[var(--color-brand-500)] transition-transform group-hover:translate-x-1">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
