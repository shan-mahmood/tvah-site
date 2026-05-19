import {defineField, defineType} from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About section',
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
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string'}],
    }),
    defineField({
      name: 'cta',
      type: 'cta',
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {
        list: [
          {title: 'Image left', value: 'left'},
          {title: 'Image right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare: ({title, media}) => ({title: 'About — ' + (title ?? ''), media}),
  },
})
