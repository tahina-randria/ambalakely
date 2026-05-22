import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { HotelJsonLd } from '@/components/atoms/JsonLd';
import { fetchHotel } from '@/sanity/lib/fetch';
import '@/styles/globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export async function generateMetadata(): Promise<Metadata> {
  const HOTEL = await fetchHotel();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url),
    title: {
      default: `${HOTEL.name} · Ten rooms in the highlands of Madagascar`,
      template: `%s · ${HOTEL.name}, Fianarantsoa`,
    },
    description: HOTEL.description,
    applicationName: HOTEL.name,
    authors: [{ name: HOTEL.legalName, url: HOTEL.url }],
    generator: 'Next.js',
    keywords: [
      'Hotel Ambalakely',
      'Fianarantsoa hotel',
      'Madagascar hotel',
      'RN7 hotel',
      'Highlands Madagascar',
      'Betsileo hotel',
      'small hotel Madagascar',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${HOTEL.name} · Madagascar`,
      description: HOTEL.tagline,
      url: '/',
      siteName: HOTEL.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${HOTEL.name} · Madagascar`,
      description: HOTEL.tagline,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="dns-prefetch" href="https://images.squarespace-cdn.com" />
        <HotelJsonLd />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
