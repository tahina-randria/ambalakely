'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Compact booking bar — sits right after the Hero so availability
 * check is visible within the first scroll. Routes to full Book flow
 * on submit (including group-booking routing for 5+ guests).
 */
export function QuickBook() {
  const [guests, setGuests] = useState('2');
  const isGroup = Number(guests) >= 5;

  return (
    <section
      aria-label="Quick booking"
      className="relative border-y border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12">
        <form
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-5 md:gap-8 items-end py-7 md:py-9"
          onSubmit={(e) => {
            e.preventDefault();
            // Routing handled by the full Book section on submit
            const target = isGroup ? '#book' : '#book';
            window.location.hash = target;
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Arrival
            </span>
            <input type="date" className="input-base" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Departure
            </span>
            <input type="date" className="input-base" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="input-base"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'guest' : 'guests'}
                </option>
              ))}
              <option value="5">5+ · group</option>
            </select>
          </label>

          <div className="flex items-end">
            {isGroup ? (
              <Link
                href="#book"
                className="group inline-flex items-center justify-center gap-2 h-12 w-full md:w-auto px-7 border border-[var(--color-sand-12)] text-[var(--color-text)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-12)] hover:text-[var(--color-sand-1)]"
              >
                Contact for group
                <ArrowRight
                  size={16}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 h-12 w-full md:w-auto px-7 bg-[var(--color-sand-12)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-11)]"
              >
                Check availability
                <ArrowRight
                  size={16}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
