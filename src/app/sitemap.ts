import type { MetadataRoute } from 'next';
import { fetchHotel, fetchArticles } from '@/sanity/lib/fetch';
import { routing } from '@/i18n/routing';

const ROOM_CATEGORIES: { slug: string; priority: number }[] = [
  { slug: 'superieure', priority: 0.9 },
  { slug: 'confort', priority: 0.85 },
  { slug: 'standard', priority: 0.8 },
];

// Stable lastModified — only changes when content actually changes
const LAST_UPDATE = new Date('2026-05-23');

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Build one sitemap entry that lists every locale variant of a path.
 *
 * - FR (defaultLocale) lives at the bare path (e.g. /rooms) because
 *   `localePrefix: 'as-needed'`. Other locales are prefixed (/en/rooms, /no/rooms).
 * - `alternates.languages` carries hreflang for Google. `x-default` is FR.
 * - `url` itself points to the FR canonical so each location appears once
 *   in the index, but every alternate is reachable.
 */
function localizedEntry(
  base: string,
  path: string,
  opts: { priority: number; changeFrequency: SitemapEntry['changeFrequency']; lastModified?: Date },
): SitemapEntry {
  const buildUrl = (locale: string) => {
    const localePart = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${base}${localePart}${path}`;
  };

  const languages: Record<string, string> = {
    'x-default': buildUrl(routing.defaultLocale),
  };
  for (const loc of routing.locales) {
    // Use nb (Norwegian Bokmål) for the standard hreflang on /no
    const hreflang = loc === 'no' ? 'nb' : loc;
    languages[hreflang] = buildUrl(loc);
  }

  return {
    url: buildUrl(routing.defaultLocale),
    lastModified: opts.lastModified ?? LAST_UPDATE,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [HOTEL, articles] = await Promise.all([fetchHotel(), fetchArticles()]);
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url;

  const staticPaths: { path: string; priority: number; changeFrequency: SitemapEntry['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/rooms', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/dining', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/experiences', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/plan-your-trip', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/community', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/journal', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.65, changeFrequency: 'monthly' },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) =>
    localizedEntry(BASE, p.path, { priority: p.priority, changeFrequency: p.changeFrequency }),
  );

  const roomPages: MetadataRoute.Sitemap = ROOM_CATEGORIES.map(({ slug, priority }) =>
    localizedEntry(BASE, `/rooms/${slug}`, { priority, changeFrequency: 'monthly' }),
  );

  const articlePages: MetadataRoute.Sitemap = articles.map((a) =>
    localizedEntry(BASE, `/journal/${a.slug}`, {
      priority: 0.6,
      changeFrequency: 'yearly',
      lastModified: new Date(a.datePublished),
    }),
  );

  return [...staticPages, ...roomPages, ...articlePages];
}
