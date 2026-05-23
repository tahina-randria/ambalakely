import { getRequestConfig } from 'next-intl/server';
import { routing, type AppLocale } from './routing';

/**
 * Chargement des messages pour la requête en cours.
 * next-intl appelle ça automatiquement à chaque request server-side.
 * Bundle séparé par locale, lazy-loaded (ne renvoie que les messages
 * de la locale demandée).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = (routing.locales as readonly string[]).includes(
    requested ?? '',
  )
    ? (requested as AppLocale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
