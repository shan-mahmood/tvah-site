import {defineField, defineType} from 'sanity'

export const doctor = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'credentials',
      type: 'string',
      description: 'e.g. DVM, DACVIM',
    }),
    defineField({
      name: 'title',
      title: 'Role / title',
      type: 'string',
      description: 'e.g. Medical Director, Associate Veterinarian',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', validation: (r) => r.required()}],
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'specialties',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'photo'},
  },
})
