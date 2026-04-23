'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

const links = [
  { href: '/#stay', label: 'Stay' },
  { href: '/#dining', label: 'Dining' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/#journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
        scrolled
          ? 'bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-[12px] border-b border-[var(--color-border-subtle)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-normal text-[18px] tracking-[-0.01em] text-[var(--color-text)]"
        >
          Ambalakely
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[14px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden md:inline-flex text-[13px] font-mono uppercase tracking-[0.08em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-[var(--duration-fast)]"
          >
            EN
          </button>
          <Link
            href="/#book"
            className="inline-flex items-center justify-center h-10 px-5 text-[14px] font-medium text-[var(--color-sand-1)] bg-[var(--color-sand-12)] hover:bg-[var(--color-sand-11)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
          >
            Book
          </Link>
        </div>
      </div>
    </nav>
  );
}
