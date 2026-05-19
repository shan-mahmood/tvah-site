import {defineField, defineType} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA banner',
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
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'backgroundImage'},
    prepare: ({title, media}) => ({title: 'CTA — ' + (title ?? ''), media}),
  },
})
