/**
 * Schema definitions for bilingual fields (used by Sanity Studio).
 */
import { defineType, defineField } from 'sanity';

export const SUPPORTED_LANGUAGES = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]['id'];

export const BASE_LANGUAGE: SupportedLocale = 'fr';

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

/**
 * Runtime helpers — unwrap { fr, en } objects from Sanity to flat strings
 * for component consumption. Falls back to the other locale if the requested
 * one is empty (FR is the canonical fallback per HANDOFF rule 7).
 */

export type LocaleString = { fr?: string | null; en?: string | null } | null | undefined;

export function pickLocale(
  value: LocaleString,
  locale: SupportedLocale = BASE_LANGUAGE,
): string {
  if (!value) return '';
  const primary = value[locale];
  if (primary) return primary;
  // Fallback: try the other locale
  const fallback = locale === 'fr' ? value.en : value.fr;
  return fallback || '';
}
