/**
 * Helper i18n pour les `alternates` Next.js Metadata.
 *
 * Architecture i18n :
 *  - localePrefix: 'as-needed' → FR (locale par défaut) n'a pas de préfixe
 *  - EN : /en/...
 *  - NO : /no/...
 *
 * Avant ce helper, les child pages déclaraient `alternates: { canonical: '/about' }`
 * — un chemin neutre vu strictement pareil sur /fr/about, /en/about, /no/about.
 * Google y voyait le signal "seule /fr est canonique" → risque de désindexation
 * des versions EN/NO. Cf. audit i18n du 2026-05-28.
 *
 * Convention hreflang : `nb` (Bokmål) pour le norvégien, en miroir du layout.tsx.
 */
import { routing } from '@/i18n/routing';

export type LocalizedAlternates = {
  canonical: string;
  languages: Record<string, string>;
};

/** Construit l'objet `alternates` pour une page localisée.
 *
 * @param locale  locale courante (fr | en | no)
 * @param path    chemin canonique sans préfixe locale, ex. `/about`, `/rooms/superieure`
 *                — utiliser `/` pour la home
 */
export function localizedAlternates(locale: string, path: string): LocalizedAlternates {
  // Normalise : "/" devient "", sinon assure le slash initial
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  const canonical =
    locale === routing.defaultLocale ? cleanPath || '/' : `/${locale}${cleanPath}`;

  return {
    canonical,
    languages: {
      fr: cleanPath || '/',
      en: `/en${cleanPath}`,
      nb: `/no${cleanPath}`,
      'x-default': cleanPath || '/',
    },
  };
}
