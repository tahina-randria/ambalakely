import {
  Phone,
  WhatsappLogo,
  Envelope,
  InstagramLogo,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { CookiePrefsLink } from '@/components/atoms/CookiePrefsLink';
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup';
import { fetchHotel } from '@/sanity/lib/fetch';

type ContactLink = { label: string; href: string; Icon: PhosphorIcon };

export async function Footer() {
  const [HOTEL, t] = await Promise.all([
    fetchHotel(),
    getTranslations('Footer'),
  ]);
  const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

  const columns = [
    {
      title: t('columnStay'),
      links: [
        { label: t('linkAllRooms'), href: '/rooms' },
        { label: t('linkSuperieure'), href: '/rooms/superieure' },
        { label: t('linkConfort'), href: '/rooms/confort' },
        { label: t('linkStandard'), href: '/rooms/standard' },
      ],
    },
    {
      title: t('columnDiscover'),
      links: [
        { label: t('linkDining'), href: '/dining' },
        { label: t('linkExperiences'), href: '/experiences' },
        { label: t('linkPlanTrip'), href: '/plan-your-trip' },
        { label: t('linkJournal'), href: '/journal' },
      ],
    },
    {
      title: t('columnAbout'),
      links: [
        { label: t('linkAboutHouse'), href: '/about' },
        { label: t('linkFounders'), href: '/about#founders' },
        { label: t('linkCommunity'), href: '/community' },
        { label: t('linkFaq'), href: '/faq' },
      ],
    },
  ];

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

  const contactTitle = t('columnContact');

  return (
    <footer className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
      <Container>
        <div className="py-24 md:py-32">
          {/* Masthead */}
          <div className="font-display font-light tracking-[-0.04em] text-[var(--color-sand-1)] text-[48px] leading-[1] md:text-[88px] lg:text-[120px]">
            Hôtel Ambalakely
          </div>

          {/* Newsletter signup — growth lever */}
          <div className="mt-12 md:mt-16 max-w-[480px]">
            <NewsletterSignup variant="dark" />
          </div>

          {/* Columns */}
          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)] mb-5">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
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
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)] mb-5">
                {contactTitle}
              </div>
              <ul className="space-y-3">
                {contactLinks.map(({ label, href, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 text-[15px] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                    >
                      <Icon
                        size={16}
                        weight="regular"
                        className="text-[var(--color-sand-6)] group-hover:text-[var(--color-sand-1)] transition-colors shrink-0"
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom legal */}
          <div className="mt-20 pt-8 border-t border-[var(--color-sand-10)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
            <div>{t('legalCopyright')}</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <CookiePrefsLink />
              <span>RN7 · 21°27′15″S 47°05′10″E</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
