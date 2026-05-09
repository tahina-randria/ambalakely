import type { MetadataRoute } from 'next';
import { HOTEL } from '@/lib/data/hotel';
import { articles } from '@/lib/data/articles';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url;

const ROOM_CATEGORIES: { slug: string; priority: number }[] = [
  { slug: 'superieure', priority: 0.9 },
  { slug: 'confort', priority: 0.85 },
  { slug: 'standard', priority: 0.8 },
];

// Stable lastModified — only changes when content actually changes
const LAST_UPDATE = new Date('2026-05-08');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: LAST_UPDATE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/rooms`, lastModified: LAST_UPDATE, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/dining`, lastModified: LAST_UPDATE, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/plan-your-trip`, lastModified: LAST_UPDATE, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/journal`, lastModified: LAST_UPDATE, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE}/about`, lastModified: LAST_UPDATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: LAST_UPDATE, changeFrequency: 'monthly', priority: 0.65 },
  ];

  const roomPages: MetadataRoute.Sitemap = ROOM_CATEGORIES.map(({ slug, priority }) => ({
    url: `${BASE}/rooms/${slug}`,
    lastModified: LAST_UPDATE,
    changeFrequency: 'monthly',
    priority,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.datePublished),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...roomPages, ...articlePages];
}
