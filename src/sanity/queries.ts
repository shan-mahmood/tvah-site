import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    seo,
    sections[]{
      _type,
      _key,
      ...,
      _type == "featuredServicesSection" => {
        ...,
        services[]->{
          _id,
          title,
          "slug": slug.current,
          shortDescription,
          icon
        }
      },
      _type == "doctorsSection" => {
        ...,
        "doctors": coalesce(doctors[]->{
          _id, name, credentials, title, photo, "slug": slug.current
        }, *[_type == "doctor"] | order(order asc){
          _id, name, credentials, title, photo, "slug": slug.current
        })
      },
      _type == "reviewsSection" => {
        ...,
        "displayReviews": select(
          source == "picked" => reviews[]->{ _id, authorName, rating, quote, source, date },
          *[_type == "review" && featured == true] | order(date desc){ _id, authorName, rating, quote, source, date }
        )
      },
      _type == "promoBanner" => {
        ...,
        "isActive": (startsAt == null || dateTime(startsAt) <= dateTime(now())) &&
                    (endsAt == null || dateTime(endsAt) >= dateTime(now()))
      }
    }
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    businessName,
    phone,
    email,
    bookingUrl,
    address,
    socials,
    hours[]{day, isClosed, opens, closes},
    defaultSeo
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon
  }
`

export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)][].slug.current
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    ...,
    seo,
    relatedServices[]->{
      _id, title, "slug": slug.current, shortDescription, icon
    }
  }
`

export const allDoctorsQuery = groq`
  *[_type == "doctor"] | order(order asc){
    _id, name, credentials, title, photo, bio, specialties, "slug": slug.current
  }
`
