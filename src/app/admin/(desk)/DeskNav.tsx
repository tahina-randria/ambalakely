'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// L'architecture du desk (façon Mews) — Tableau de bord + Réservations sont
// live ; le reste signale où ça grandit (ops → growth → finance).
const NAV: { label: string; href: string; soon?: boolean }[] = [
  { label: 'Tableau de bord', href: '/admin' },
  { label: 'Réservations', href: '/admin/reservations' },
  { label: 'Croissance', href: '/admin/growth' },
  { label: 'Finance', href: '/admin/finance' },
  { label: "Aujourd'hui", href: '#', soon: true },
  { label: 'Tarifs', href: '#', soon: true },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DeskNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col px-3">
      {NAV.map((item) =>
        item.soon ? (
          <span
            key={item.label}
            className="flex items-center justify-between rounded px-3 py-2 text-[14px] text-[var(--color-sand-8)]"
          >
            {item.label}
            <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-sand-7)]">bientôt</span>
          </span>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            className={`rounded px-3 py-2 text-[14px] font-medium transition-colors ${
              isActive(pathname, item.href)
                ? 'bg-[var(--color-sand-3)] text-[var(--color-sand-12)]'
                : 'text-[var(--color-sand-12)] hover:bg-[var(--color-sand-3)]'
            }`}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
