import {defineField, defineType} from 'sanity'

export const seoMeta = defineType({
  name: 'seoMeta',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in browser tabs and search results. ~60 characters.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown in search result snippets. ~155 characters.',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: '1200×630 recommended.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
