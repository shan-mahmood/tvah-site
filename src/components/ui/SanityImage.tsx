import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SanityImage as SanityImageType } from '@/lib/types'

export default function SanityImage({
  image,
  width,
  height,
  className,
  priority,
  sizes,
  fill,
}: {
  image: SanityImageType
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
}) {
  if (!image?.asset) return null

  const builder = urlFor(image).auto('format').fit('max')
  const src = (width ? builder.width(width) : builder).url()
  const alt = image.alt || ''

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={
          image.hotspot
            ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` }
            : undefined
        }
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}
