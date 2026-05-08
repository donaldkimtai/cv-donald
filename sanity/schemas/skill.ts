import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill group',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'category', items: 'items' },
    prepare({ title, items }) {
      return { title, subtitle: (items as string[] | undefined)?.join(', ') }
    },
  },
})
