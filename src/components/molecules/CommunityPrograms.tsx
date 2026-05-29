import Image from 'next/image';

type Item = { title: string; body: string; image: string };

/**
 * §68 — Section programmes STATIQUE (effet waabi retiré, à redéfinir plus tard).
 * Grille éditoriale simple : 1 colonne en mobile, 2 colonnes dès md. Chaque
 * pilier = image + titre + texte. Pas de pin, pas de scrollytelling.
 */
export function CommunityPrograms({ items }: { items: Item[] }) {
  return (
    <section className="bg-[var(--color-bg-subtle)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-20 lg:gap-y-24">
          {items.map((it) => (
            <article key={it.title}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-[var(--color-bg-muted)]">
                {it.image ? (
                  <Image
                    src={it.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <h3 className="mt-6 font-display font-light text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.02em] text-[var(--color-text)]">
                {it.title}
              </h3>
              <p className="mt-3 prose-editorial max-w-[42ch]">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
