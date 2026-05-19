import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-4 text-[var(--color-muted)]">
        The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-[var(--color-accent-600)] px-5 py-3 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </Container>
  )
}
