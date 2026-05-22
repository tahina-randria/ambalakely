import type { MetadataRoute } from 'next';
import { fetchHotel } from '@/sanity/lib/fetch';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const HOTEL = await fetchHotel();
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url;
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
