import { PortableText as Renderer, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-12 mb-4 text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-2xl">{children}</h3>,
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-[var(--color-ink)]/85">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-[var(--color-brand-500)] underline decoration-[var(--color-brand-100)] underline-offset-4 hover:decoration-[var(--color-brand-500)]"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal pl-6">{children}</ol>,
  },
}

export default function PortableText({ value }: { value: any }) {
  if (!value) return null
  return <Renderer value={value} components={components} />
}
