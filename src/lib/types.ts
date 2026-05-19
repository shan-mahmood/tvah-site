// Hand-rolled types for the section data shapes returned by GROQ queries.
// Replace with `sanity typegen generate` output once schemas stabilize.

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type Cta = {
  label?: string
  href?: string
  openInNewTab?: boolean
}

export type HeroSection = {
  _type: 'heroSection'
  _key: string
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  backgroundImage?: SanityImage
}

export type PromoBanner = {
  _type: 'promoBanner'
  _key: string
  message: string
  cta?: Cta
  startsAt?: string
  endsAt?: string
  tone?: 'neutral' | 'promo' | 'urgent'
  isActive?: boolean
}

export type ServiceSummary = {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  icon?: SanityImage
}

export type FeaturedServicesSection = {
  _type: 'featuredServicesSection'
  _key: string
  eyebrow?: string
  heading: string
  description?: string
  services: ServiceSummary[]
  viewAllCta?: Cta
}

export type AboutSection = {
  _type: 'aboutSection'
  _key: string
  eyebrow?: string
  heading: string
  body?: any[]
  image?: SanityImage
  cta?: Cta
  imagePosition?: 'left' | 'right'
}

export type DoctorSummary = {
  _id: string
  name: string
  credentials?: string
  title?: string
  photo?: SanityImage
  slug: string
}

export type DoctorsSection = {
  _type: 'doctorsSection'
  _key: string
  eyebrow?: string
  heading: string
  description?: string
  doctors: DoctorSummary[]
  cta?: Cta
}

export type Review = {
  _id: string
  authorName: string
  rating?: number
  quote: string
  source?: string
  date?: string
}

export type ReviewsSection = {
  _type: 'reviewsSection'
  _key: string
  eyebrow?: string
  heading: string
  description?: string
  displayReviews: Review[]
  googleReviewsCta?: Cta
}

export type CtaSection = {
  _type: 'ctaSection'
  _key: string
  eyebrow?: string
  heading: string
  description?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  backgroundImage?: SanityImage
}

export type RichTextSection = {
  _type: 'richTextSection'
  _key: string
  heading?: string
  body?: any[]
  maxWidth?: 'narrow' | 'wide'
}

export type Section =
  | HeroSection
  | PromoBanner
  | FeaturedServicesSection
  | AboutSection
  | DoctorsSection
  | ReviewsSection
  | CtaSection
  | RichTextSection

export type SiteSettings = {
  businessName: string
  phone: string
  email?: string
  bookingUrl: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
    mapUrl?: string
  }
  socials?: {
    instagram?: string
    facebook?: string
    google?: string
    yelp?: string
  }
  hours?: Array<{ day: string; isClosed?: boolean; opens?: string; closes?: string }>
  reviews?: {
    googleRating?: number
    googleCount?: number
    googleUrl?: string
    yelpRating?: number
    yelpCount?: number
    yelpUrl?: string
  }
  defaultSeo?: { title?: string; description?: string; ogImage?: SanityImage }
}
