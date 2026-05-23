import { defineRouting } from 'next-intl/routing';

/**
 * Locales du site Hôtel Ambalakely.
 *
 * - fr : langue primaire (no prefix, /rooms, /dining…)
 * - en : voyageurs internationaux (/en/rooms, /en/dining…)
 * - no : clientèle norvégienne via Trans Groupe Hasina (TGH)
 *
 * Le défaut est FR per HANDOFF rule 13.
 */
export const routing = defineRouting({
  locales: ['fr', 'en', 'no'] as const,
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

export type AppLocale = (typeof routing.locales)[number];
