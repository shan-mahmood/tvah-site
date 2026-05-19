import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  // Treat as a singleton in your structure builder.
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Home',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      description:
        'Add, reorder, and remove sections to compose the homepage. Each section is independently editable.',
      of: [
        {type: 'heroSection'},
        {type: 'promoBanner'},
        {type: 'featuredServicesSection'},
        {type: 'aboutSection'},
        {type: 'doctorsSection'},
        {type: 'reviewsSection'},
        {type: 'ctaSection'},
        {type: 'richTextSection'},
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seoMeta',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})
