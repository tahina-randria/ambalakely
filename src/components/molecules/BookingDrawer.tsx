'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X, WhatsappLogo, Envelope, Users } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';
import { HOTEL } from '@/lib/data/hotel';

const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

type Props = {
  open: boolean;
  onClose: () => void;
};

const MAX_INDIVIDUAL = 4;

export function BookingDrawer({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [guests, setGuests] = useState('2');
  const isGroup = Number(guests) >= 5;

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC to close + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-[200] transition-[visibility]',
        open ? 'visible' : 'invisible delay-300',
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-[rgba(12,10,9,0.5)] backdrop-blur-[2px] transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Reserve a stay"
        className={cn(
          'absolute top-0 right-0 h-full w-full max-w-[480px] bg-[var(--color-sand-12)] text-[var(--color-sand-1)]',
          'transform transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
          'overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 h-[72px] border-b border-[var(--color-sand-10)]">
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
              Reserve
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="h-9 w-9 inline-flex items-center justify-center text-[var(--color-sand-1)] hover:text-[var(--color-sand-6)] transition-colors duration-[var(--duration-fast)]"
            >
              <X size={20} weight="regular" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 px-6 md:px-8 py-10">
            <h2 className="font-display font-light tracking-[-0.03em] text-[32px] leading-[1.05] md:text-[40px] md:leading-[1.02] balance">
              Tell us when.
            </h2>

            <form className="mt-10 flex flex-col gap-5">
              <Field label="Arrival">
                <input type="date" className="input-dark w-full" />
              </Field>

              <Field label="Departure">
                <input type="date" className="input-dark w-full" />
              </Field>

              <Field label="Guests">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input-dark w-full"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                  <option value="5">5 guests · group</option>
                  <option value="6">6 guests · group</option>
                  <option value="7">7 guests · group</option>
                  <option value="8">8+ guests · group</option>
                </select>
              </Field>

              {isGroup ? (
                <div className="mt-2 pt-6 border-t border-[var(--color-sand-10)]">
                  <div className="flex items-start gap-3">
                    <Users size={18} weight="light" className="text-[var(--color-sand-1)] shrink-0 mt-1" />
                    <p className="text-[15px] leading-[1.55] text-[var(--color-sand-5)]">
                      For groups, we pair rooms and tailor the stay. Write to us
                      directly.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${WA_DIGITS}?text=Group%20booking%20request%20for%20Ambalakely`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 h-12 px-6 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
                    >
                      <WhatsappLogo size={18} weight="regular" />
                      WhatsApp Hasina
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                      />
                    </a>
                    <a
                      href={`mailto:${HOTEL.email}?subject=Group%20booking%20(${guests}%20guests)`}
                      className="group inline-flex items-center justify-center gap-3 h-12 px-6 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
                    >
                      <Envelope size={18} weight="regular" />
                      Email us
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="group mt-2 inline-flex items-center justify-center gap-3 h-12 px-7 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
                >
                  Check availability
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                  />
                </button>
              )}

              {!isGroup && (
                <p className="text-[13px] leading-[1.5] text-[var(--color-sand-7)]">
                  Up to {MAX_INDIVIDUAL} guests. Free cancellation up to 30 days
                  before arrival.
                </p>
              )}
            </form>
          </div>

          {/* Footer — direct contact */}
          <div className="px-6 md:px-8 py-8 border-t border-[var(--color-sand-10)]">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-7)] mb-4">
              Or write directly
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${WA_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[15px] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
              >
                <WhatsappLogo size={18} weight="regular" />
                <span>{HOTEL.phone}</span>
              </a>
              <a
                href={`mailto:${HOTEL.email}`}
                className="inline-flex items-center gap-3 text-[15px] text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
              >
                <Envelope size={18} weight="regular" />
                <span>{HOTEL.email}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
        {label}
      </span>
      {children}
    </label>
  );
}
