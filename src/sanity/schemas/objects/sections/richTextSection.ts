import {defineField, defineType} from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'internalLabel',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
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
      name: 'maxWidth',
      title: 'Max width',
      type: 'string',
      options: {
        list: [
          {title: 'Narrow (reading width)', value: 'narrow'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
      initialValue: 'narrow',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'internalLabel'},
    prepare: ({title, subtitle}) => ({
      title: 'Rich text — ' + (title ?? subtitle ?? ''),
    }),
  },
})
