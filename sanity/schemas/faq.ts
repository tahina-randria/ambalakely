import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'localeText', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'Réservation',
          'Chambres',
          'Restaurant',
          'Transferts',
          'Excursions',
          'Pratique',
          'Famille',
          'Paiement',
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Ordre d\'affichage dans la catégorie',
    }),
  ],
  preview: {
    select: { title: 'question.fr', subtitle: 'category' },
  },
});
