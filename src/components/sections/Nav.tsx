'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { BookingDrawer } from '@/components/molecules/BookingDrawer';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';

const linkKeys = [
  { href: '/rooms', key: 'rooms' },
  { href: '/dining', key: 'dining' },
  { href: '/experiences', key: 'experiences' },
  { href: '/community', key: 'community' },
  { href: '/journal', key: 'journal' },
  { href: '/about', key: 'about' },
] as const;

export function Nav() {
  const t = useTranslations('Nav');
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
            aria-label={t('homeAriaLabel')}
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
            {linkKeys.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'text-[15px] transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)] opacity-80 hover:opacity-100',
                    scrolled ? 'text-[var(--color-text)]' : 'text-white',
                  )}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-5">
            <LanguageSwitcher scrolled={scrolled} />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={cn(
                'inline-flex items-center justify-center h-10 px-5 text-[15px] font-medium transition-[color,background-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                scrolled
                  ? 'text-[var(--color-sand-1)] bg-[var(--color-sand-12)] hover:bg-[var(--color-sand-11)]'
                  : 'text-black bg-white hover:bg-white/90',
              )}
            >
              {t('book')}
            </button>
          </div>
        </div>
      </nav>

      <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
