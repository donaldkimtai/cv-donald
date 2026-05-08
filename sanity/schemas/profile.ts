import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'tagline', title: 'Tagline / Hero subtitle', type: 'text', rows: 3 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'bio',
      title: 'Bio paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({ name: 'philosophy', title: 'Philosophy / Quote', type: 'text', rows: 2 }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'resumeUrl', title: 'Resume URL (PDF)', type: 'url' }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Icon (lucide-react name)',
              type: 'string',
              description: 'e.g. Github, Linkedin, Twitter, Mail, BookOpen, Shield',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
