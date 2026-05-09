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
          <h1 className="mt-8 font-display font-light text-[var(--color-text)] text-[64px] leading-[0.95] md:text-[112px] md:leading-[0.9] lg:text-[160px] lg:leading-[0.9] tracking-[-0.04em] balance">
            Off the path.
          </h1>
          <p className="mt-12 prose-editorial max-w-[480px]">
            The page you were looking for may have moved or never existed. Below
            are the well-trodden ways back.
          </p>

          <ul className="mt-16 border-t border-[var(--color-border-subtle)] max-w-[640px]">
            {[
              { href: '/', label: 'Home' },
              { href: '/rooms', label: 'The rooms' },
              { href: '/dining', label: 'Toko Telo, the restaurant' },
              { href: '/plan-your-trip', label: 'Plan your trip' },
              { href: '/journal', label: 'The journal' },
              { href: '/about', label: 'About Mamy and Hasina' },
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
