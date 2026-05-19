import HeroSection from './HeroSection'
import PromoBanner from './PromoBanner'
import FeaturedServicesSection from './FeaturedServicesSection'
import AboutSection from './AboutSection'
import DoctorsSection from './DoctorsSection'
import ReviewsSection from './ReviewsSection'
import CtaSection from './CtaSection'
import RichTextSection from './RichTextSection'
import type { Section } from '@/lib/types'

const components: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  promoBanner: PromoBanner,
  featuredServicesSection: FeaturedServicesSection,
  aboutSection: AboutSection,
  doctorsSection: DoctorsSection,
  reviewsSection: ReviewsSection,
  ctaSection: CtaSection,
  richTextSection: RichTextSection,
}

export default function SectionRenderer({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null
  return (
    <>
      {sections.map((section) => {
        const Component = components[section._type]
        if (!Component) return null
        // Filter expired or pre-start banners (boolean computed in GROQ)
        if (
          section._type === 'promoBanner' &&
          'isActive' in section &&
          section.isActive === false
        ) {
          return null
        }
        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
