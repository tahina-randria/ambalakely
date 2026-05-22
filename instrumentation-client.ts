/**
 * Sentry — browser client bootstrap.
 *
 * Defers actual SDK init to `src/lib/analytics/sentry.ts` so the consent
 * banner (ConsentSync component) can gate it. Here we only fire init if
 * the user has already opted in on a previous visit; otherwise the
 * banner controls when init runs.
 */

import { readConsent } from '@/lib/consent';
import { initSentryClient, onRouterTransitionStart } from '@/lib/analytics/sentry';

const consent = readConsent();
if (consent?.errorTracking) {
  initSentryClient();
}

export { onRouterTransitionStart };
