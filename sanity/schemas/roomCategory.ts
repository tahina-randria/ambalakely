import { defineType, defineField } from 'sanity';

export const roomCategory = defineType({
  name: 'roomCategory',
  title: 'Catégorie de chambre',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name.fr' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'number', title: 'N° d\'ordre (01/02/03)', type: 'string' }),
    defineField({ name: 'name', type: 'localeString', validation: (r) => r.required() }),
    defineField({
      name: 'suiteNames',
      title: 'Noms de suites (Supérieure seulement)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'roomNumbers',
      title: 'Numéros des chambres',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'size', type: 'string', description: 'Ex. "43 m²"' }),
    defineField({ name: 'capacity', type: 'string', description: 'Ex. "1 à 4 personnes"' }),
    defineField({ name: 'count', type: 'string', description: 'Ex. "2 chambres"' }),
    defineField({ name: 'countNum', type: 'number' }),
    defineField({ name: 'priceMga', title: 'Prix public (MGA)', type: 'number' }),
    defineField({ name: 'priceMgaDayUse', title: 'Prix Day Use (MGA)', type: 'number' }),
    defineField({ name: 'shortDescription', type: 'localeText' }),
    defineField({ name: 'longDescription', type: 'localeText' }),
    defineField({ name: 'bedSetup', type: 'localeText' }),
    defineField({ name: 'view', type: 'localeString' }),
    defineField({ name: 'bestFor', type: 'localeString' }),
    defineField({
      name: 'features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string' },
            { name: 'label', type: 'localeString' },
          ],
        },
      ],
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'concierge',
      type: 'object',
      fields: [
        { name: 'body', type: 'localeText' },
        {
          name: 'signed',
          type: 'string',
          options: { list: ['Mamy', 'Hasina'] },
        },
      ],
    }),
    defineField({ name: 'pullQuote', type: 'localeString' }),
  ],
  preview: {
    select: { title: 'name.fr', subtitle: 'priceMga', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle.toLocaleString('fr-FR')} Ar` : undefined,
        media,
      };
    },
  },
});
