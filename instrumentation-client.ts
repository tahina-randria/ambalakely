/**
 * Sentry — browser/client config.
 * Loaded by Next.js automatically for all client components.
 */

import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: !!dsn && process.env.NODE_ENV === 'production',

  // Performance — sample 10% of transactions in prod
  tracesSampleRate: 0.1,

  // Replay — record 10% of sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Ignore noisy errors
  ignoreErrors: [
    // Browser extensions / third-party scripts
    'top.GLOBALS',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Network noise we can't act on
    /^Network request failed$/,
    /^Failed to fetch$/,
  ],

  // Filter PII — never send IP addresses, never send raw URLs as breadcrumbs
  sendDefaultPii: false,

  // Only record replays for users who opt in (or in prod with sample rates above)
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});

// Instrument client-side navigations (App Router)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
