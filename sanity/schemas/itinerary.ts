import { defineType, defineField } from 'sanity';

export const itinerary = defineType({
  name: 'itinerary',
  title: 'Itinéraire RN7',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title.fr' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'duration', type: 'string', description: 'Ex. "3 jours"' }),
    defineField({ name: 'summary', type: 'localeText' }),
    defineField({
      name: 'days',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'number' },
            { name: 'title', type: 'localeString' },
            { name: 'body', type: 'localeText' },
          ],
          preview: {
            select: { title: 'title.fr', subtitle: 'day' },
            prepare({ title, subtitle }) {
              return { title: `Jour ${subtitle} — ${title || ''}` };
            },
          },
        },
      ],
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'duration', media: 'heroImage' },
  },
});
