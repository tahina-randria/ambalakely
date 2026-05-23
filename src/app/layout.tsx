import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { HotelJsonLd } from '@/components/atoms/JsonLd';
import { PostHogProvider } from '@/components/atoms/PostHogProvider';
import { SentryConsentSync } from '@/components/atoms/SentryConsentSync';
import { ConsentProvider } from '@/lib/consent';
import { CookieBanner } from '@/components/molecules/CookieBanner';
import { MobileBookingBar } from '@/components/molecules/MobileBookingBar';
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
      default: `${HOTEL.name} · Dix chambres dans les hautes terres de Madagascar`,
      template: `%s · ${HOTEL.name}, Fianarantsoa`,
    },
    description: HOTEL.description,
    applicationName: HOTEL.name,
    authors: [{ name: HOTEL.legalName, url: HOTEL.url }],
    generator: 'Next.js',
    keywords: [
      'Hôtel Ambalakely',
      'hôtel Fianarantsoa',
      'hôtel Madagascar',
      'hôtel RN7',
      'hautes terres Madagascar',
      'hôtel Betsileo',
      'petit hôtel Madagascar',
      'séjour Fianarantsoa',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${HOTEL.name} · Madagascar`,
      description: HOTEL.tagline,
      url: '/',
      siteName: HOTEL.name,
      locale: 'fr_FR',
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="dns-prefetch" href="https://images.squarespace-cdn.com" />
        <HotelJsonLd />
      </head>
      <body>
        <a href="#main" className="skip-link">Aller au contenu</a>
        <ScrollProgress />
        <ConsentProvider>
          <SentryConsentSync />
          <PostHogProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </PostHogProvider>
          <CookieBanner />
          <MobileBookingBar />
        </ConsentProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
