/**
 * Next.js instrumentation — runs at server boot for both Node and Edge runtimes.
 * https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Forward errors thrown in React Server Components / route handlers to Sentry
export { captureRequestError as onRequestError } from '@sentry/nextjs';
