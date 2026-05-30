import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // /admin is the staff back-office — not localized, gated by Supabase auth.
  // Everything else flows through next-intl as before.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return updateSession(request);
  }
  return intlMiddleware(request);
}

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
