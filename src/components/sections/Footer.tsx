import Link from 'next/link';
import {
  Phone,
  WhatsappLogo,
  Envelope,
  InstagramLogo,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Container } from '@/components/atoms/Container';
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup';
import { fetchHotel } from '@/sanity/lib/fetch';

type NavColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type ContactLink = { label: string; href: string; Icon: PhosphorIcon };

const columns: NavColumn[] = [
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
];

export async function Footer() {
  const HOTEL = await fetchHotel();
  const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

  const contactLinks: ContactLink[] = [
    { label: HOTEL.phone, href: `tel:${HOTEL.whatsapp}`, Icon: Phone },
    { label: 'WhatsApp', href: `https://wa.me/${WA_DIGITS}`, Icon: WhatsappLogo },
    { label: HOTEL.email, href: `mailto:${HOTEL.email}`, Icon: Envelope },
    {
      label: 'Instagram',
      href: 'https://instagram.com/hotelambalakely',
      Icon: InstagramLogo,
    },
  ];

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

            {/* Contact — with phosphor icons for fast scan */}
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-5">
                Contact
              </div>
              <ul className="space-y-3">
                {contactLinks.map(({ label, href, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 text-[15px] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                    >
                      <Icon
                        size={16}
                        weight="regular"
                        className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0"
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
