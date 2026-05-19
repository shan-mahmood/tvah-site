import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'internalLabel',
      title: 'Internal label',
      type: 'string',
      description: 'Helps you find this section in the homepage list. Not shown on site.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow text',
      type: 'string',
      description: 'Small text above the headline (optional).',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'primaryCta',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      type: 'cta',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'headline', subtitle: 'internalLabel', media: 'backgroundImage'},
    prepare({title, subtitle, media}) {
      return {title: 'Hero — ' + (title ?? ''), subtitle, media}
    },
  },
})
