import {defineField, defineType} from 'sanity'

const DAYS = [
  {title: 'Monday', value: 'monday'},
  {title: 'Tuesday', value: 'tuesday'},
  {title: 'Wednesday', value: 'wednesday'},
  {title: 'Thursday', value: 'thursday'},
  {title: 'Friday', value: 'friday'},
  {title: 'Saturday', value: 'saturday'},
  {title: 'Sunday', value: 'sunday'},
]

export const hoursOfOperation = defineType({
  name: 'hoursOfOperation',
  title: 'Hours of operation',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      type: 'string',
      options: {list: DAYS, layout: 'dropdown'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isClosed',
      title: 'Closed this day',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'opens',
      title: 'Opens at',
      type: 'string',
      description: '24-hour format, e.g. 08:00',
      hidden: ({parent}) => parent?.isClosed,
    }),
    defineField({
      name: 'closes',
      title: 'Closes at',
      type: 'string',
      description: '24-hour format, e.g. 18:00',
      hidden: ({parent}) => parent?.isClosed,
    }),
  ],
  preview: {
    select: {day: 'day', opens: 'opens', closes: 'closes', isClosed: 'isClosed'},
    prepare({day, opens, closes, isClosed}) {
      const dayTitle = DAYS.find((d) => d.value === day)?.title ?? day
      return {
        title: dayTitle,
        subtitle: isClosed ? 'Closed' : `${opens ?? '—'} – ${closes ?? '—'}`,
      }
    },
  },
})
