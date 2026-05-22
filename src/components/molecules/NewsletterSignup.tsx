'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';

/**
 * Newsletter signup. Quarterly letter from Hasina, garden + journal.
 *
 * UI only for now. Phase tech : POST to /api/newsletter (Resend audiences).
 * Honeypot field to deter bots.
 */
export function NewsletterSignup({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === 'submitting' || status === 'done') return;
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Inscription impossible.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Inscription impossible.');
    }
  };

  const isDark = variant === 'dark';

  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'caption',
          isDark ? 'text-[var(--color-sand-6)]' : 'text-[var(--color-text-muted)]',
        )}
      >
        Quarterly letter
      </div>
      <p
        className={cn(
          'text-[15px] leading-[1.55] max-w-[420px]',
          isDark ? 'text-[var(--color-sand-5)]' : 'text-[var(--color-text-muted)]',
        )}
      >
        A short note from Hasina each season. The garden, the menu, the people who
        passed through. No marketing, no offers.
      </p>

      {status === 'done' ? (
        <p
          className={cn(
            'mt-2 text-[15px] font-display font-light',
            isDark ? 'text-[var(--color-sand-1)]' : 'text-[var(--color-text)]',
          )}
        >
          Saved. Talk to you in a season.
        </p>
      ) : (
        <div className="mt-2 flex items-center gap-3 max-w-[420px]">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email for newsletter"
            className={cn(
              'flex-1 h-12 px-4 bg-[var(--color-bg)] border border-solid text-[15px] focus:outline-none transition-colors',
              isDark
                ? 'border-[var(--color-sand-7)] text-[var(--color-sand-1)] placeholder-[var(--color-sand-7)] focus:border-[var(--color-sand-1)]'
                : 'border-[var(--color-sand-12)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-sand-12)]',
            )}
          />
          {/* Honeypot — hidden field that bots fill, humans don't see */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute -left-[9999px] w-0 h-0"
            aria-hidden="true"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-label="Subscribe"
            className={cn(
              'h-12 w-12 inline-flex items-center justify-center transition-colors disabled:opacity-50',
              isDark
                ? 'bg-[var(--color-sand-1)] text-[var(--color-sand-12)] hover:bg-[var(--color-sand-3)]'
                : 'bg-[var(--color-sand-12)] text-[var(--color-sand-1)] hover:bg-[var(--color-sand-11)]',
            )}
          >
            <ArrowRight size={18} weight="regular" />
          </button>
        </div>
      )}
      {status === 'error' && errorMsg ? (
        <p
          role="alert"
          className={cn(
            'text-[13px] leading-[1.5]',
            isDark ? 'text-[#fca5a5]' : 'text-[#dc2626]',
          )}
        >
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
