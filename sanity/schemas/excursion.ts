import { defineType, defineField } from 'sanity';

export const excursion = defineType({
  name: 'excursion',
  title: 'Excursion / Expérience',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name.fr' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'number', type: 'string', description: 'Ex. "01"' }),
    defineField({ name: 'name', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'duration', type: 'localeString' }),
    defineField({ name: 'tagline', type: 'localeString' }),
    defineField({ name: 'body', type: 'localeText' }),
    defineField({ name: 'best', title: 'Best months', type: 'localeString' }),
    defineField({ name: 'cost', type: 'localeString' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', type: 'localeString' }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Main excursion', value: 'main' },
          { title: 'Cultural circuit', value: 'cultural' },
          { title: 'Local activity', value: 'local' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'name.fr', subtitle: 'duration.fr', media: 'image' },
  },
});
