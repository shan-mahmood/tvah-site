import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Internal path (e.g. /contact-us) or full URL. Use tel: for phone, mailto: for email.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
