'use client';

import { useEffect, useState } from 'react';

/**
 * Thin 1px progress line at top of viewport that fills as user scrolls.
 * Subtle, always visible, signature world-class detail.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? scrollTop / height : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      raf = 0;
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-px pointer-events-none"
    >
      <div
        className="h-full bg-[var(--color-text)] origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: 'transform 80ms linear',
        }}
      />
    </div>
  );
}
