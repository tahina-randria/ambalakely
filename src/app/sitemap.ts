import type { MetadataRoute } from 'next';
import { HOTEL } from '@/lib/data/hotel';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url;

const ROOM_CATEGORIES = ['superieure', 'confort', 'standard'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/rooms`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/dining`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const roomPages: MetadataRoute.Sitemap = ROOM_CATEGORIES.map((slug) => ({
    url: `${BASE}/rooms/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...roomPages];
}
