import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'issuer', title: 'Issuer', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'issueDate', title: 'Issue date (YYYY-MM)', type: 'string' }),
    defineField({ name: 'url', title: 'Verification URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'issuer' },
  },
})
