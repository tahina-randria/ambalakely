'use client';

import type { ReactNode } from 'react';

/**
 * Page-level template — remounts on every route change.
 * Wraps each page in a subtle fade-up animation for a cinematic
 * route transition. Nav + Footer (in layout) stay still; only
 * page content fades.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
