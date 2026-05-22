'use client';

/**
 * Root error boundary — catches React render errors and reports to Sentry.
 * Required by next-sanity for App Router; replaces the default Next.js
 * error page when the entire app crashes (rare).
 *
 * https://nextjs.org/docs/app/getting-started/error-handling#handling-global-errors
 */

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1rem', maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
          Something went wrong.
        </h1>
        <p style={{ marginTop: '1.5rem', color: '#666', lineHeight: 1.6 }}>
          An unexpected error occurred. The team has been notified.
          If you came here from a booking link, please try again or
          write to hello@hotelambalakely.com.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            background: '#1A1815',
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.95rem',
          }}
        >
          Back to homepage
        </a>
      </body>
    </html>
  );
}
