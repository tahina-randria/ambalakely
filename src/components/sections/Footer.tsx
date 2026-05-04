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
      { label: 'Hope for the Future', href: '/hope' },
      { label: 'Directions', href: '/directions' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+261 34 11 254 34', href: 'tel:+261341125434' },
      { label: 'hello@hotelambalakely.com', href: 'mailto:hello@hotelambalakely.com' },
      { label: 'Instagram', href: 'https://instagram.com/hotelambalakely' },
    ],
  },
];

const legalLinks = [
  { label: 'Legal', href: '/legal' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]">
      <Container>
        <div className="py-24 md:py-32">
          {/* Masthead */}
          <div className="font-display font-light tracking-[-0.04em] text-[var(--color-text)] text-[64px] leading-[1] md:text-[120px] lg:text-[168px]">
            Ambalakely
          </div>

          {/* Columns */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-5">
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

          {/* Bottom legal — single row, single style */}
          <div className="mt-20 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            <div>© 2026 Ambalakely · Fianarantsoa, Madagascar</div>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--color-text)] transition-colors duration-[var(--duration-base)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
