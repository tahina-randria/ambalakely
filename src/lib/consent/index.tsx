'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Consent management — GDPR-compliant opt-in for PostHog + Sentry.
 *
 * Categories:
 *  - analytics     : PostHog (autocapture, pageviews)
 *  - errorTracking : Sentry (errors + session replay)
 *
 * Vercel Analytics and Speed Insights are first-party, cookieless and
 * privacy-friendly per Vercel's docs — they don't require consent and
 * stay always-on.
 *
 * Storage: localStorage key `ambalakely.consent.v1`. Bump the version
 * suffix if the categories ever change; previous choices then re-prompt.
 */

export type ConsentCategory = 'analytics' | 'errorTracking';

export type Consent = {
  analytics: boolean;
  errorTracking: boolean;
  timestamp: number;
};

const STORAGE_KEY = 'ambalakely.consent.v1';

export const CONSENT_ALL: Consent = {
  analytics: true,
  errorTracking: true,
  timestamp: 0,
};

export const CONSENT_NONE: Consent = {
  analytics: false,
  errorTracking: false,
  timestamp: 0,
};

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.errorTracking !== 'boolean' ||
      typeof parsed.timestamp !== 'number'
    ) {
      return null;
    }
    return {
      analytics: parsed.analytics,
      errorTracking: parsed.errorTracking,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage disabled (private mode, quota) — silently degrade
  }
}

type ConsentContextValue = {
  consent: Consent | null;
  hasChosen: boolean;
  accept: (categories?: Partial<Pick<Consent, ConsentCategory>>) => void;
  refuse: () => void;
  reset: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readConsent());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Consent) => {
    writeConsent(next);
    setConsentState(next);
  }, []);

  const accept = useCallback<ConsentContextValue['accept']>(
    (categories) => {
      const next: Consent = {
        analytics: categories?.analytics ?? true,
        errorTracking: categories?.errorTracking ?? true,
        timestamp: Date.now(),
      };
      persist(next);
    },
    [persist],
  );

  const refuse = useCallback(() => {
    persist({ ...CONSENT_NONE, timestamp: Date.now() });
  }, [persist]);

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setConsentState(null);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasChosen: hydrated && consent !== null,
      accept,
      refuse,
      reset,
    }),
    [consent, hydrated, accept, refuse, reset],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
