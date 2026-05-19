import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description:
        'URL path. Keep matching the existing WordPress paths (e.g. wellness-exams) to preserve SEO.',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 3,
      description: 'One-paragraph summary used on the homepage and service hub.',
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      description: 'Optional icon shown next to the service name on the home and hub pages.',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string'}],
    }),
    defineField({
      name: 'body',
      title: 'Page content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to expect',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', type: 'string'},
            {name: 'description', type: 'text', rows: 3},
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'array', of: [{type: 'block'}]},
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedServices',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      type: 'seoMeta',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'icon'},
  },
})
