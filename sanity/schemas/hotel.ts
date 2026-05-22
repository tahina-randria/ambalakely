import { defineType, defineField } from 'sanity';

export const hotel = defineType({
  name: 'hotel',
  title: 'Hôtel (singleton)',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortName', type: 'string' }),
    defineField({ name: 'legalName', type: 'string' }),
    defineField({ name: 'tagline', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'founded', type: 'string' }),
    defineField({
      name: 'founders',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'url', type: 'url' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'whatsapp', type: 'string' }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string' },
        { name: 'locality', type: 'string' },
        { name: 'region', type: 'string' },
        { name: 'postalCode', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'countryName', type: 'string' },
      ],
    }),
    defineField({
      name: 'geo',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
        { name: 'altitude', type: 'number' },
      ],
    }),
    defineField({ name: 'rooms', type: 'number' }),
    defineField({ name: 'totalCapacity', type: 'string' }),
    defineField({ name: 'priceRange', type: 'string' }),
    defineField({
      name: 'concept',
      type: 'object',
      fields: [
        { name: 'phrase', type: 'string' },
        { name: 'translation', type: 'string' },
        { name: 'description', type: 'localeText' },
      ],
    }),
    defineField({
      name: 'tgh',
      title: 'Trans Groupe Hasina (sister agency)',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'abbreviation', type: 'string' },
        { name: 'tagline', type: 'string' },
        { name: 'taglineFr', type: 'string' },
        { name: 'foundedYearsAgo', type: 'number' },
        { name: 'description', type: 'localeText' },
      ],
    }),
    defineField({
      name: 'hours',
      type: 'object',
      fields: [
        { name: 'checkIn', type: 'string' },
        { name: 'checkOut', type: 'string' },
        { name: 'breakfast', type: 'string' },
        { name: 'lunch', type: 'string' },
        { name: 'dinner', type: 'string' },
        { name: 'pizzaTerrace', type: 'string' },
      ],
    }),
    defineField({
      name: 'amenities',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'languages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'rating',
      type: 'object',
      fields: [
        { name: 'value', type: 'string' },
        { name: 'count', type: 'number' },
        { name: 'sources', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'facebook', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline.fr' },
  },
});
