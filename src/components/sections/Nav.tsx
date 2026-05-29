'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { BookingDrawer } from '@/components/molecules/BookingDrawer';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { List, X } from '@phosphor-icons/react/dist/ssr';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // §42 (2026-05-28) — drop auto-hide entirely. Le pattern Substack/Apple
  // qui cachait la nav sur scroll-down et la faisait réapparaître sur
  // scroll-up rendait le booking button inaccessible quand le visiteur
  // était au milieu de la page. Les sites luxe hôtels (Aman, Como,
  // Singita, Belmond) gardent leur nav toujours visible — c'est le
  // levier de conversion principal. On garde juste la transition
  // transparent → solid sand-1+blur quand on dépasse 40 px de scroll.
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
    };
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

  // Lock body scroll when the mobile menu is open ; release on close.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Close mobile menu on escape — keyboard accessibility.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 motion-safe:transition-[background-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
          // 95 % opaque sand-1 + backdrop blur once scrolled, so the nav
          // stays legible over every section. §42 : plus d'auto-hide,
          // donc plus de risque que le visiteur "perde" la nav en
          // descendant. Always visible.
          scrolled
            ? 'bg-[color-mix(in_srgb,var(--color-bg)_95%,transparent)] backdrop-blur-[12px] border-b border-[var(--color-border-subtle)]'
            : 'bg-transparent',
        )}
      >
        <div
          className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 h-[88px] flex items-center justify-between"
          style={{ mixBlendMode: scrolled ? 'normal' : 'difference' }}
        >
          {/* §41ter — stacked logo, version display serif titlecase
              comme le Footer. Favicon plus gros (40 px) + wordmark
              display font-light (15 px) titlecase. Cohérent top + bottom. */}
          <Link
            href="/"
            aria-label={t('homeAriaLabel')}
            className={cn(
              'flex flex-col items-center gap-1 leading-none',
              scrolled ? 'text-[var(--color-text)]' : 'text-white',
            )}
          >
            <Image
              src="/brand/logo-white.png"
              alt=""
              width={48}
              height={48}
              priority
              className={cn(
                'h-12 w-12 transition-[filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                scrolled && 'invert',
              )}
            />
            <span className="hidden sm:inline font-display font-light text-[15px] tracking-[-0.015em]">
              Hôtel Ambalakely
            </span>
          </Link>

          {/* Desktop links — hidden until lg (≥1024) ; the burger picks
              them up below that. Bumped from md (768) to lg §35 #117
              after the responsive sweep showed the inline layout
              overflowed by ~110 px at 768. Tablet portrait now gets the
              burger like phone. */}
          <ul className="hidden lg:flex items-center gap-8">
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

          <div className="flex items-center gap-3 lg:gap-5">
            <div className="hidden lg:block">
              <LanguageSwitcher scrolled={scrolled} />
            </div>
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
            {/* Mobile / tablet burger — lg:hidden ; opens the full-screen
                menu (bumped from md §35 #117 — tablets at 768 didn't fit
                the inline desktop layout). */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t('menuOpen')}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className={cn(
                'lg:hidden inline-flex items-center justify-center h-10 w-10 transition-colors',
                scrolled ? 'text-[var(--color-text)]' : 'text-white',
              )}
            >
              <List size={22} weight="regular" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu — sand-12 dark editorial overlay, slides
          in on burger click.  Closes on link click / X / Escape / backdrop
          tap.  Body scroll locked while open. */}
      {menuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('homeAriaLabel')}
          className="fixed inset-0 z-[60] bg-[var(--color-sand-12)] text-[var(--color-sand-1)] lg:hidden flex flex-col"
        >
          {/* Top bar — wordmark + close button */}
          <div className="h-[72px] px-5 flex items-center justify-between border-b border-[var(--color-sand-10)]">
            <span className="font-display font-normal text-[18px] tracking-[-0.01em]">
              Hôtel Ambalakely
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t('menuClose')}
              className="inline-flex items-center justify-center h-10 w-10 text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors"
            >
              <X size={22} weight="regular" />
            </button>
          </div>

          {/* Links — big editorial typography, one per line */}
          <ul className="flex-1 flex flex-col gap-6 md:gap-8 px-5 pt-12 overflow-y-auto">
            {linkKeys.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-light text-[36px] leading-[1.05] tracking-[-0.025em] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom — language switcher */}
          <div className="px-5 py-8 border-t border-[var(--color-sand-10)]">
            <LanguageSwitcher scrolled />
          </div>
        </div>
      ) : null}

      <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
