import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { HotelJsonLd } from '@/components/atoms/JsonLd';
import { PostHogProvider } from '@/components/atoms/PostHogProvider';
import { SentryConsentSync } from '@/components/atoms/SentryConsentSync';
import { AxeReport } from '@/components/atoms/AxeReport';
import { ConsentProvider } from '@/lib/consent';
import { CookieBanner } from '@/components/molecules/CookieBanner';
import { MobileBookingBar } from '@/components/molecules/MobileBookingBar';
import { fetchHotel } from '@/sanity/lib/fetch';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

/**
 * Body text uses Satoshi via Fontshare. Loaded as a CDN <link> in the
 * <head> below — Fontshare doesn't ship a next/font plugin, but their
 * api.fontshare.com endpoint serves a stable WOFF2 with font-display:swap.
 * Wired as the CSS variable --font-satoshi via the .satoshi class on body.
 */

/**
 * Fraunces — modern editorial serif with an opsz axis. Used for display
 * (h1/h2 and any other title surfaces). Boutique-hotel signature.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
});

/**
 * Map next-intl locale codes → OG/twitter locale codes for metadata.
 */
const OG_LOCALES: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  no: 'nb_NO',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [HOTEL, t] = await Promise.all([
    fetchHotel(),
    getTranslations({ locale, namespace: 'Site' }),
  ]);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || HOTEL.url),
    title: {
      default: `${HOTEL.name} · ${t('defaultTitleSuffix')}`,
      template: `%s · ${HOTEL.name}, Fianarantsoa`,
    },
    description: t('description'),
    applicationName: HOTEL.name,
    authors: [{ name: HOTEL.legalName, url: HOTEL.url }],
    generator: 'Next.js',
    keywords: t.raw('keywords') as string[],
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        fr: '/',
        en: '/en',
        nb: '/no',
        'x-default': '/',
      },
    },
    openGraph: {
      title: `${HOTEL.name} · Madagascar`,
      description: t('description'),
      url: '/',
      siteName: HOTEL.name,
      locale: OG_LOCALES[locale] ?? 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${HOTEL.name} · Madagascar`,
      description: t('description'),
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

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as AppLocale;
  setRequestLocale(typedLocale);

  const messages = await getMessages();
  const tCommon = await getTranslations({ locale: typedLocale, namespace: 'Common' });

  return (
    <html lang={typedLocale} className={fraunces.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="dns-prefetch" href="https://images.squarespace-cdn.com" />
        <HotelJsonLd />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {tCommon('skipToContent')}
        </a>
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <SentryConsentSync />
            <AxeReport />
            <PostHogProvider>
              <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </PostHogProvider>
            <CookieBanner />
            <MobileBookingBar />
          </ConsentProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
