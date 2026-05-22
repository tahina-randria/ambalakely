/**
 * PostHog initialization for the browser.
 *
 * Loaded by PostHogProvider on the client. Disabled in dev (NODE_ENV !== prod)
 * and when NEXT_PUBLIC_POSTHOG_KEY is not set.
 *
 * Privacy:
 * - person_profiles: 'identified_only' → no profile until we call identify()
 * - autocapture: true (clicks, page views) but session_recording: false by default
 * - mask_all_text: false (we want to see what people clicked, not type)
 */

import posthog from 'posthog-js';

let initialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (!key || process.env.NODE_ENV !== 'production') return;

  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
    respect_dnt: true,
  });

  initialized = true;
}

export { posthog };
