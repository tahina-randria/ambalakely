import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import '@/styles/globals.css';

// /admin is the staff back-office: its own <html>/<body> (the public site's
// live under [locale]), dark editorial shell, and crucially noindex.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: 'Hôtel Ambalakely',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={newsreader.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[var(--color-sand-12)]! text-[var(--color-sand-1)]! antialiased">
        {children}
      </body>
    </html>
  );
}
