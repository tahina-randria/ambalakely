'use client';

import { useEffect } from 'react';

/**
 * Dev-only a11y audit. Reports axe-core violations to the browser
 * console while you click around. Stripped from production builds
 * by the `NODE_ENV === 'development'` guard.
 *
 * Renders nothing — sits in the layout next to other providers.
 */
export function AxeReport() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof window === 'undefined') return;
    // Skip during SSR-rehydrated render — only mount once on the client.
    let cancelled = false;
    void (async () => {
      try {
        const [{ default: axe }, React, ReactDOM] = await Promise.all([
          import('@axe-core/react'),
          import('react'),
          import('react-dom'),
        ]);
        if (cancelled) return;
        // 1000ms debounce so we only audit once per route change burst.
        await axe(React, ReactDOM, 1000, {
          rules: [
            // The phone selector library injects unlabeled <button>s for the
            // country dropdown — suppress the rule we cannot fix without
            // patching the upstream lib.
            { id: 'button-name', enabled: false },
          ],
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[axe] init failed', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
