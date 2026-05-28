import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { CookiePrefsLink } from '@/components/atoms/CookiePrefsLink';
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup';
import { fetchHotel } from '@/sanity/lib/fetch';

type ContactLink = { label: string; href: string };

export async function Footer() {
  const locale = await getLocale();
  const [HOTEL, t] = await Promise.all([
    fetchHotel(locale),
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
    { label: HOTEL.phone, href: `tel:${HOTEL.whatsapp}` },
    { label: 'WhatsApp', href: `https://wa.me/${WA_DIGITS}` },
    { label: HOTEL.email, href: `mailto:${HOTEL.email}` },
    { label: 'Instagram', href: 'https://instagram.com/hotelambalakely' },
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
                <div className="font-medium text-[15px] tracking-[0] text-[var(--color-sand-3)] mb-5">
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

            {/* Contact — text-only, Aman/Como pattern. Icons removed :
                each label already names the channel (number / "WhatsApp"
                / email / "Instagram"), so phosphor icons were duplicate
                semantics. */}
            <div>
              <div className="font-medium text-[15px] tracking-[0] text-[var(--color-sand-3)] mb-5">
                {contactTitle}
              </div>
              <ul className="space-y-3">
                {contactLinks.map(({ label, href }) => (
                  <li key={href} className="min-w-0">
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[15px] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] [overflow-wrap:anywhere]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom legal */}
          <div className="mt-20 pt-8 border-t border-[var(--color-sand-10)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-medium text-[15px] tracking-[0] text-[var(--color-sand-3)]">
            <div>{t('legalCopyright')}</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <CookiePrefsLink />
              {/* "RN7 · 21°27′15″S 47°05′10″E" removed — coordinates as
                  decoration duplicate the map. The address is in the schema.org
                  JSON-LD and in /faq, which is where guests actually look. */}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
