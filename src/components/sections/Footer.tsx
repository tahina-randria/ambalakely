import Link from 'next/link';
import { Container } from '@/components/atoms/Container';

const columns = [
  {
    title: 'Stay',
    links: [
      { label: 'Rooms', href: '/rooms' },
      { label: 'Rates', href: '/rates' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Dining', href: '/dining' },
      { label: 'Experiences', href: '/experiences' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'The house', href: '/about' },
      { label: 'Press', href: '/press' },
      { label: 'Directions', href: '/directions' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'WhatsApp', href: 'https://wa.me/261000000000' },
      { label: 'Email', href: 'mailto:hello@hotelambalakely.com' },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]">
      <Container>
        <div className="py-24 md:py-32">
          <div className="font-display font-normal text-[44px] md:text-[72px] lg:text-[96px] tracking-[-0.04em] text-[var(--color-text)]">
            Ambalakely
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-5">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-[var(--color-border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-mono text-[13px] text-[var(--color-text-muted)]">
              Fianarantsoa · Madagascar · Est. 2018
            </div>
            <div className="font-mono text-[13px] text-[var(--color-text-muted)] md:text-right">
              NIF 1000XXXX · STAT 55XXX · RCCM 2018 B XXXX
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-mono text-[13px] text-[var(--color-text-muted)]">
              © 2026 Ambalakely
            </div>
            <div className="flex gap-6 md:justify-end">
              <Link
                href="/legal"
                className="font-mono text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Legal
              </Link>
              <Link
                href="/privacy"
                className="font-mono text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-mono text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
