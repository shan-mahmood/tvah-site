import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feedback',
  title: 'Client feedback',
  type: 'document',
  fields: [
    defineField({ name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true }),
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'petName', title: 'Pet name', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 6, readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Resolved', value: 'resolved' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal notes',
      type: 'text',
      rows: 4,
      description:
        'Manager-only notes about how this was handled. Not visible to the submitter.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'message', status: 'status' },
    prepare({ title, subtitle, status }) {
      const statusBadge =
        status === 'new' ? '🔴 NEW' : status === 'reviewed' ? '🟡' : '✅'
      return {
        title: `${statusBadge} ${title || 'Anonymous'}`,
        subtitle: subtitle ? subtitle.slice(0, 80) : '(no message)',
      }
    },
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
