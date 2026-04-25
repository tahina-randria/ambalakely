import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { SectionRail } from '@/components/atoms/SectionRail';
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hotelambalakely.com'),
  title: {
    default: 'Ambalakely. Ten rooms in the highlands of Madagascar',
    template: '%s · Ambalakely',
  },
  description:
    'A small hotel in Fianarantsoa, Madagascar. Ten rooms, a restaurant, a garden. Mamy and Hasina, since 2018.',
  openGraph: {
    title: 'Ambalakely',
    description: 'Ten rooms in the highlands of Madagascar.',
    url: '/',
    siteName: 'Ambalakely',
    locale: 'en',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <ScrollProgress />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SectionRail />
      </body>
    </html>
  );
}
