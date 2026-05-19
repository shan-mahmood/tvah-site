import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().max(500),
    }),
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'google'},
          {title: 'Yelp', value: 'yelp'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Direct', value: 'direct'},
        ],
      },
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'authorName', subtitle: 'quote', rating: 'rating'},
    prepare({title, subtitle, rating}) {
      return {
        title,
        subtitle: `${'★'.repeat(rating ?? 0)} — ${subtitle?.slice(0, 60) ?? ''}`,
      }
    },
  },
})
