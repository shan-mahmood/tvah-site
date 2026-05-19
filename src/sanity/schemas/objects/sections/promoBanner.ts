import {defineField, defineType} from 'sanity'

export const promoBanner = defineType({
  name: 'promoBanner',
  title: 'Promo banner',
  type: 'object',
  fields: [
    defineField({
      name: 'message',
      type: 'string',
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      description: 'Optional button.',
    }),
    defineField({
      name: 'startsAt',
      title: 'Starts at',
      type: 'datetime',
      description: 'Banner is hidden before this date. Leave blank to show immediately.',
    }),
    defineField({
      name: 'endsAt',
      title: 'Ends at',
      type: 'datetime',
      description: 'Banner is hidden after this date. Leave blank to show indefinitely.',
    }),
    defineField({
      name: 'tone',
      type: 'string',
      options: {
        list: [
          {title: 'Neutral', value: 'neutral'},
          {title: 'Promotional', value: 'promo'},
          {title: 'Urgent', value: 'urgent'},
        ],
      },
      initialValue: 'neutral',
    }),
  ],
  preview: {
    select: {title: 'message', subtitle: 'endsAt'},
    prepare({title, subtitle}) {
      return {
        title: 'Promo — ' + (title ?? ''),
        subtitle: subtitle ? `Ends ${new Date(subtitle).toLocaleDateString()}` : 'No end date',
      }
    },
  },
})
