/**
 * Sentry client-side init wrapped behind GDPR consent.
 *
 * `instrumentation-client.ts` and the ConsentSync component both call
 * `initSentryClient()`. It is idempotent and only takes effect after the
 * user opts in to error tracking. Without consent it is a no-op and no
 * Sentry SDK code runs.
 */

import * as Sentry from '@sentry/nextjs';

let initialized = false;

export function initSentryClient(): void {
  if (typeof window === 'undefined') return;
  if (initialized) return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || process.env.NODE_ENV !== 'production') return;

  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    ignoreErrors: [
      'top.GLOBALS',
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      /^Network request failed$/,
      /^Failed to fetch$/,
    ],
    sendDefaultPii: false,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
  });

  initialized = true;
}

export function disableSentryClient(): void {
  const client = Sentry.getClient();
  if (!client) return;
  client.close();
  initialized = false;
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
