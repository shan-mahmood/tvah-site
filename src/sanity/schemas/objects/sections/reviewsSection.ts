import {defineField, defineType} from 'sanity'

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Reviews',
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
      name: 'source',
      type: 'string',
      options: {
        list: [
          {title: 'Curated (use reviews marked Featured)', value: 'curated'},
          {title: 'Hand-picked', value: 'picked'},
        ],
        layout: 'radio',
      },
      initialValue: 'curated',
    }),
    defineField({
      name: 'reviews',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'review'}]}],
      hidden: ({parent}) => parent?.source !== 'picked',
      validation: (r) =>
        r.custom((value, ctx) => {
          const source = (ctx.parent as {source?: string} | undefined)?.source
          if (source === 'picked' && (!value || value.length === 0)) {
            return 'Pick at least one review.'
          }
          return true
        }),
    }),
    defineField({
      name: 'googleReviewsCta',
      title: '"Read more reviews" link',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: 'Reviews — ' + (title ?? '')}),
  },
})
