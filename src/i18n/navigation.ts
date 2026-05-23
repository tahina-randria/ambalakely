import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Wrappers locale-aware autour des navigations Next.js.
 * À utiliser à la place de `next/link` et `next/navigation` dans les
 * composants serveur et client (sauf API routes / sitemap).
 *
 * `Link` ajoute automatiquement le préfixe de locale courante.
 * `redirect` / `useRouter` / `usePathname` / `getPathname` font pareil.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
