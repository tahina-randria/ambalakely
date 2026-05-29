import { ImageSquare } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';

/**
 * On-brand placeholder for an image slot awaiting a real photo. Interim only.
 *
 * §45 (2026-05-29) — replaces the external Squarespace "Hope for the Future"
 * hotlink (HFF2.jpg) across /about, /community and the home Trust band, so
 * the site stops depending on Squarespace. To be swapped for real, locally
 * hosted Tanambao school photos once the owner supplies them.
 *
 * Fills its (relative/absolute) parent. `tone="dark"` is meant for full-bleed
 * heroes that carry a white text overlay — the dark sand ground keeps that
 * text readable. `bare` drops the icon/label for those overlay contexts.
 */
export function ImagePlaceholder({
  tone = 'light',
  bare = false,
  label,
  className,
}: {
  tone?: 'light' | 'dark';
  bare?: boolean;
  label?: string;
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center gap-3',
        dark
          ? 'bg-[var(--color-sand-12)] text-[var(--color-sand-6)]'
          : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]',
        className,
      )}
    >
      {!bare ? (
        <>
          <ImageSquare size={30} weight="light" />
          {label ? <span className="caption">{label}</span> : null}
        </>
      ) : null}
    </div>
  );
}
