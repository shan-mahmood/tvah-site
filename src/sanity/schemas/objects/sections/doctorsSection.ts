import {defineField, defineType} from 'sanity'

export const doctorsSection = defineType({
  name: 'doctorsSection',
  title: 'Doctors',
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
      name: 'doctors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'doctor'}]}],
      description: 'Leave empty to auto-show all doctors in their display order.',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: 'Doctors — ' + (title ?? '')}),
  },
})
