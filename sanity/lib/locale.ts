import { defineType, defineField } from 'sanity';

export const SUPPORTED_LANGUAGES = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
] as const;

export const BASE_LANGUAGE = 'fr';

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte court bilingue',
  type: 'object',
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'string',
    }),
  ),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Texte long bilingue',
  type: 'object',
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
      rows: 4,
    }),
  ),
});

export const localePortableText = defineType({
  name: 'localePortableText',
  title: 'Contenu riche bilingue',
  type: 'object',
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ),
});
