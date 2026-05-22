import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Avis client',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'localeText', validation: (r) => r.required() }),
    defineField({ name: 'author', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', type: 'string' }),
    defineField({
      name: 'source',
      type: 'string',
      options: { list: ['TripAdvisor', 'Booking', 'Google', 'Direct'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Ordre d\'affichage sur /reviews',
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'source', quote: 'quote.fr' },
    prepare({ title, subtitle, quote }) {
      return {
        title: `${title} — ${subtitle}`,
        subtitle: quote ? quote.slice(0, 80) : undefined,
      };
    },
  },
});
