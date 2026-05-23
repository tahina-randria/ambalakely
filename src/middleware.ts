import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  /**
   * Matche tout sauf :
   *  - les routes API (/api/*)
   *  - les internes Next (/_next, /_vercel)
   *  - les fichiers statiques (favicons, icons, sitemap, robots)
   *  - le Sanity studio cloud redirect (/studio*)
   */
  matcher: [
    '/((?!api|_next|_vercel|studio|.*\\.(?:ico|png|jpg|jpeg|svg|webp|mp4|webm|gif|txt|xml|json)).*)',
  ],
};
