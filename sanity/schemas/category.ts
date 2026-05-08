import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Blog category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'color',
      title: 'Accent color',
      type: 'string',
      description: 'Optional Tailwind color or hex (e.g. "#00ff9c")',
    }),
  ],
})
