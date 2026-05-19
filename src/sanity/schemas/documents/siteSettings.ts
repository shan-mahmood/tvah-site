import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  // Treat as a singleton in your structure builder
  fields: [
    defineField({
      name: 'businessName',
      type: 'string',
      initialValue: 'Tustin Village Animal Hospital',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'Format: (714) 660-7710',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        {name: 'street', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'zip', type: 'string'},
        {name: 'mapUrl', title: 'Google Maps link', type: 'string'},
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Hours of operation',
      type: 'array',
      of: [{type: 'hoursOfOperation'}],
      validation: (r) => r.max(7),
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Online booking URL',
      type: 'string',
      description: 'The ezyVet portal link used by every Book button.',
    }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url'},
        {name: 'facebook', type: 'url'},
        {name: 'google', title: 'Google Business profile', type: 'url'},
        {name: 'yelp', type: 'url'},
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Review summary',
      type: 'object',
      description:
        'Used in schema markup for search result stars, and in the homepage reviews bar.',
      fields: [
        {name: 'googleRating', title: 'Google rating', type: 'number', initialValue: 4.9},
        {name: 'googleCount', title: 'Google review count', type: 'number', initialValue: 138},
        {name: 'googleUrl', title: 'Google Business profile URL', type: 'url'},
        {name: 'yelpRating', title: 'Yelp rating', type: 'number', initialValue: 4.9},
        {name: 'yelpCount', title: 'Yelp review count', type: 'number', initialValue: 108},
        {name: 'yelpUrl', title: 'Yelp page URL', type: 'url'},
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoMeta',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
