import { defineType, defineField } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article (Journal)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title.fr' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'localeText' }),
    defineField({ name: 'body', type: 'localePortableText' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'author',
      type: 'string',
      options: { list: ['Hasina', 'Mamy', 'Max William RAFALIARISON'] },
    }),
    defineField({
      name: 'published',
      type: 'boolean',
      initialValue: false,
      description: 'Décocher pour cacher du site',
    }),
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'date', media: 'heroImage' },
  },
});
