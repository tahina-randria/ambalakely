import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  const links = [
    { href: '/', label: t('linkHome') },
    { href: '/rooms', label: t('linkRooms') },
    { href: '/dining', label: t('linkDining') },
    { href: '/plan-your-trip', label: t('linkPlan') },
    { href: '/journal', label: t('linkJournal') },
    { href: '/about', label: t('linkAbout') },
  ];

  return (
    <>
      <Nav />
      <main
        id="main"
        className="min-h-[100vh] pt-[160px] md:pt-[200px] pb-32 md:pb-48"
      >
        <div className="mx-auto max-w-[920px] px-5 md:px-8">
          <div className="caption">{t('code')}</div>
          <h1 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
            {t('h1')}
          </h1>
          <p className="mt-12 prose-editorial max-w-[480px]">{t('body')}</p>

          <ul className="mt-16 border-t border-[var(--color-border-subtle)] max-w-[640px]">
            {links.map((link) => (
              <li
                key={link.href}
                className="border-b border-[var(--color-border-subtle)]"
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-between py-6 md:py-8"
                >
                  <span className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] tracking-[-0.025em] leading-[1.05] group-hover:translate-x-1.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                    {link.label}
                  </span>
                  <ArrowRight
                    size={22}
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-[var(--duration-base)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
