import Container from '@/components/ui/Container'
import PortableText from '@/components/ui/PortableText'
import Reveal from '@/components/ui/Reveal'
import type { RichTextSection as RichTextSectionType } from '@/lib/types'

export default function RichTextSection(props: RichTextSectionType) {
  const { heading, body, maxWidth = 'narrow' } = props

  return (
    <section className="py-16">
      <Container width={maxWidth === 'narrow' ? 'narrow' : 'default'}>
        <Reveal>
          {heading && <h2 className="mb-6 text-3xl md:text-4xl">{heading}</h2>}
          {body && <PortableText value={body} />}
        </Reveal>
      </Container>
    </section>
  )
}
