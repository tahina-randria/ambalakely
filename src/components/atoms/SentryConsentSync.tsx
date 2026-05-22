'use client';

import { useEffect } from 'react';
import { disableSentryClient, initSentryClient } from '@/lib/analytics/sentry';
import { useConsent } from '@/lib/consent';

/**
 * Bridges consent state to the Sentry SDK lifecycle. When the user opts
 * in to error tracking, Sentry initializes; when they opt out, the
 * client is closed. Renders nothing.
 */
export function SentryConsentSync() {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent?.errorTracking) {
      initSentryClient();
    } else if (consent && !consent.errorTracking) {
      disableSentryClient();
    }
  }, [consent?.errorTracking, consent]);

  return null;
}
