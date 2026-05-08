import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Work experience',
  type: 'document',
  fields: [
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'company', title: 'Company', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'startDate',
      title: 'Start date (YYYY-MM)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date (YYYY-MM)',
      type: 'string',
      hidden: ({ document }) => Boolean(document?.current),
    }),
    defineField({ name: 'current', title: 'Currently here', type: 'boolean' }),
    defineField({
      name: 'bullets',
      title: 'Highlights / bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'company' },
  },
})
