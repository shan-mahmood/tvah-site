type PortableTextChild = { _type?: string; text?: string }
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] }
type Faq = { question?: string; answer?: PortableTextBlock[] }

function portableTextToPlain(blocks?: PortableTextBlock[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter((b) => b?._type === 'block' && Array.isArray(b.children))
    .map((b) =>
      (b.children || [])
        .map((c) => (typeof c?.text === 'string' ? c.text : ''))
        .join('')
    )
    .filter(Boolean)
    .join('\n\n')
    .trim()
}

export default function FaqSchema({ faqs }: { faqs?: Faq[] | null }) {
  if (!faqs?.length) return null

  const mainEntity = faqs
    .map((f) => {
      const question = f?.question?.trim()
      const answer = portableTextToPlain(f?.answer)
      if (!question || !answer) return null
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  if (!mainEntity.length) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
