import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'degree', title: 'Degree / Program', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'institution', title: 'Institution', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'startDate',
      title: 'Start date (YYYY-MM)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'endDate', title: 'End date (YYYY-MM)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'degree', subtitle: 'institution' },
  },
})
