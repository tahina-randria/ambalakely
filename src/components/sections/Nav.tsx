'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { BookingDrawer } from '@/components/molecules/BookingDrawer';

const links = [
  { href: '/#stay', label: 'Stay' },
  { href: '/#dining', label: 'Dining' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/#location', label: 'Location' },
  { href: '/#journal', label: 'Journal' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Listen for global booking events (Hero CTA, etc.)
  useEffect(() => {
    const onOpen = () => setDrawerOpen(true);
    window.addEventListener('open-booking', onOpen);
    return () => window.removeEventListener('open-booking', onOpen);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
          scrolled
            ? 'bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-[12px] border-b border-[var(--color-border-subtle)]'
            : 'bg-transparent',
        )}
      >
        <div
          className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 h-[72px] flex items-center justify-between"
          style={{ mixBlendMode: scrolled ? 'normal' : 'difference' }}
        >
          <Link
            href="/"
            className={cn(
              'font-display font-normal text-[18px] tracking-[-0.01em]',
              scrolled ? 'text-[var(--color-text)]' : 'text-white',
            )}
          >
            Ambalakely
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'text-[14px] transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)] opacity-70 hover:opacity-100',
                    scrolled ? 'text-[var(--color-text)]' : 'text-white',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className={cn(
                'hidden md:inline-flex text-[12px] font-mono uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity duration-[var(--duration-fast)]',
                scrolled ? 'text-[var(--color-text)]' : 'text-white',
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={cn(
                'inline-flex items-center justify-center h-10 px-5 text-[14px] font-medium transition-[color,background-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                scrolled
                  ? 'text-[var(--color-sand-1)] bg-[var(--color-sand-12)] hover:bg-[var(--color-sand-11)]'
                  : 'text-black bg-white hover:bg-white/90',
              )}
            >
              Book
            </button>
          </div>
        </div>
      </nav>

      <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
