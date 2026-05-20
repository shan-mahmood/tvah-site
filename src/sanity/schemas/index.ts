// Sanity schema registry for Tustin Village Animal Hospital
// Drop the schemas/ folder into your Sanity studio's src/ directory and
// pass `types: schemaTypes` to defineConfig in sanity.config.ts.

import {homePage} from './documents/homePage'
import {service} from './documents/service'
import {doctor} from './documents/doctor'
import {review} from './documents/review'
import {siteSettings} from './documents/siteSettings'
import feedback from './documents/feedback'

import {heroSection} from './objects/sections/heroSection'
import {promoBanner} from './objects/sections/promoBanner'
import {featuredServicesSection} from './objects/sections/featuredServicesSection'
import {aboutSection} from './objects/sections/aboutSection'
import {doctorsSection} from './objects/sections/doctorsSection'
import {reviewsSection} from './objects/sections/reviewsSection'
import {ctaSection} from './objects/sections/ctaSection'
import {richTextSection} from './objects/sections/richTextSection'

import {cta} from './objects/cta'
import {seoMeta} from './objects/seoMeta'
import {hoursOfOperation} from './objects/hoursOfOperation'

export const schemaTypes = [
  // Documents
  homePage,
  service,
  doctor,
  review,
  siteSettings,
  feedback,
  // Section objects
  heroSection,
  promoBanner,
  featuredServicesSection,
  aboutSection,
  doctorsSection,
  reviewsSection,
  ctaSection,
  richTextSection,
  // Reusable objects
  cta,
  seoMeta,
  hoursOfOperation,
]
