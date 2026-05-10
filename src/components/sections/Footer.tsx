import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup';
import { HOTEL } from '@/lib/data/hotel';

const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

const columns = [
  {
    title: 'Stay',
    links: [
      { label: 'All ten rooms', href: '/rooms' },
      { label: 'Supérieure', href: '/rooms/superieure' },
      { label: 'Confort', href: '/rooms/confort' },
      { label: 'Standard', href: '/rooms/standard' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Dining', href: '/dining' },
      { label: 'Experiences', href: '/experiences' },
      { label: 'Plan your trip', href: '/plan-your-trip' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'The house', href: '/about' },
      { label: 'Mamy and Hasina', href: '/about#founders' },
      { label: 'Community', href: '/community' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: HOTEL.phone, href: `tel:${HOTEL.whatsapp}` },
      { label: 'WhatsApp', href: `https://wa.me/${WA_DIGITS}` },
      { label: HOTEL.email, href: `mailto:${HOTEL.email}` },
      { label: 'Instagram', href: 'https://instagram.com/hotelambalakely' },
    ],
  },
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

          {/* Newsletter signup — growth lever */}
          <div className="mt-12 md:mt-16 max-w-[480px]">
            <NewsletterSignup />
          </div>

          {/* Columns */}
          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
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

          {/* Bottom legal */}
          <div className="mt-20 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            <div>© 2026 Hotel Ambalakely · Fianarantsoa, Madagascar</div>
            <div>RN7 · 21°27′15″S 47°05′10″E</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
