import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="min-h-[100vh] pt-[160px] md:pt-[200px] pb-32 md:pb-48"
      >
        <div className="mx-auto max-w-[920px] px-5 md:px-8">
          <div className="caption">404</div>
          <h1 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
            Hors des sentiers.
          </h1>
          <p className="mt-12 prose-editorial max-w-[480px]">
            La page que vous cherchiez a peut-être déménagé, ou n&apos;a
            jamais existé. Voici les chemins habituels pour revenir.
          </p>

          <ul className="mt-16 border-t border-[var(--color-border-subtle)] max-w-[640px]">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/rooms', label: 'Les chambres' },
              { href: '/dining', label: 'Toko Telo, le restaurant' },
              { href: '/plan-your-trip', label: 'Préparer le voyage' },
              { href: '/journal', label: 'Le journal' },
              { href: '/about', label: 'Mamy et Hasina' },
            ].map((link) => (
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
