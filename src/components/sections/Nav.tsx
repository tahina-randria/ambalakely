'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { BookingDrawer } from '@/components/molecules/BookingDrawer';

const links = [
  { href: '/rooms', label: 'Chambres' },
  { href: '/dining', label: 'Restaurant' },
  { href: '/experiences', label: 'Excursions' },
  { href: '/community', label: 'Communauté' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'La maison' },
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
            aria-label="Hôtel Ambalakely — accueil"
            className={cn(
              'flex items-center gap-3 font-display font-normal text-[18px] tracking-[-0.01em]',
              scrolled ? 'text-[var(--color-text)]' : 'text-white',
            )}
          >
            <Image
              src="/brand/logo-white.png"
              alt=""
              width={40}
              height={40}
              priority
              className={cn(
                'h-9 w-9 transition-[filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                scrolled && 'invert',
              )}
            />
            <span className="hidden sm:inline">Hôtel Ambalakely</span>
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
            {/* Lang switcher hidden until next-intl wired and /en/ routes exist. */}
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
              Réserver
            </button>
          </div>
        </div>
      </nav>

      <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
