import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page (SEO + Hero)',
  type: 'document',
  description: 'Metadata éditable par page : title, description, hero',
  fields: [
    defineField({
      name: 'slug',
      title: 'Chemin (ex. "/rooms", "/dining", "/about")',
      type: 'slug',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'heroHeadline', type: 'localeString' }),
    defineField({ name: 'heroSubline', type: 'localeText' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (override)',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (override)',
      type: 'localeText',
    }),
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'slug.current', media: 'heroImage' },
  },
});
