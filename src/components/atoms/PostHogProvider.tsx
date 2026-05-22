'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initPostHog, posthog } from '@/lib/analytics/posthog';

/**
 * Mounts PostHog client + tracks Next.js App Router navigation.
 * Drop into src/app/layout.tsx body (no props).
 *
 * Uses usePathname only (no searchParams) to avoid Suspense boundary
 * requirement. Query strings are not tracked individually; PostHog auto
 * captures the full URL via window.location anyway.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    posthog.capture?.('$pageview');
  }, [pathname]);

  return <>{children}</>;
}
