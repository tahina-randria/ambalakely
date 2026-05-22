'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initPostHog, posthog } from '@/lib/analytics/posthog';
import { useConsent } from '@/lib/consent';

/**
 * Mounts PostHog client + tracks Next.js App Router navigation, gated on
 * the user's analytics consent.
 *
 * - If consent.analytics is false (or no choice yet), PostHog never inits.
 * - If consent flips on, init fires and subsequent path changes are
 *   captured as $pageview events.
 * - If consent flips off after init, opt_out_capturing stops capture
 *   without unloading the SDK (cheap state toggle).
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { consent } = useConsent();
  const analyticsAllowed = consent?.analytics === true;

  useEffect(() => {
    if (!analyticsAllowed) return;
    initPostHog();
    posthog.opt_in_capturing?.();
  }, [analyticsAllowed]);

  useEffect(() => {
    if (!analyticsAllowed) {
      posthog.opt_out_capturing?.();
    }
  }, [analyticsAllowed]);

  useEffect(() => {
    if (!analyticsAllowed) return;
    if (!pathname) return;
    posthog.capture?.('$pageview');
  }, [pathname, analyticsAllowed]);

  return <>{children}</>;
}
