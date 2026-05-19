import {defineField, defineType} from 'sanity'

export const featuredServicesSection = defineType({
  name: 'featuredServicesSection',
  title: 'Featured services',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      validation: (r) => r.min(2).max(6),
      description: 'Pick 3–4 services to feature.',
    }),
    defineField({
      name: 'viewAllCta',
      title: 'View-all link',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: 'Featured services — ' + (title ?? '')}),
  },
})
