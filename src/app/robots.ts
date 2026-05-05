import type { MetadataRoute } from 'next';
import { HOTEL } from '@/lib/data/hotel';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
