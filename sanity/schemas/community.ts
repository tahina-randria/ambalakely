import { defineType, defineField } from 'sanity';

export const community = defineType({
  name: 'community',
  title: 'Communauté (Hope for the Future) — singleton',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', initialValue: 'Hope for the Future' }),
    defineField({ name: 'founded', type: 'string', initialValue: '2014' }),
    defineField({ name: 'location', type: 'string', description: 'Ex. "Tanambao, Ambalakely"' }),
    defineField({ name: 'activeChildren', type: 'number' }),
    defineField({ name: 'communePopulation', type: 'number' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({
      name: 'programs',
      title: 'Programmes (publics uniquement — exclure évangélisation, voir règle 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'localeString' },
            { name: 'description', type: 'localeText' },
          ],
        },
      ],
    }),
    defineField({
      name: 'akanimamy',
      title: 'Akanimamy (le bâtiment)',
      type: 'object',
      fields: [
        { name: 'meaning', type: 'string', description: 'Ex. "doux foyer / nid douillet"' },
        { name: 'landAcquired', type: 'string', description: 'Ex. "2019"' },
        { name: 'landSizeSqm', type: 'number' },
        { name: 'buildingSizeSqm', type: 'number' },
        { name: 'constructionStarted', type: 'string' },
        {
          name: 'plannedFeatures',
          type: 'array',
          of: [{ type: 'localeString' }],
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
  },
});
