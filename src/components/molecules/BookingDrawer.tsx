'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  X,
  WhatsappLogo,
  Envelope,
  Users,
  CircleNotch,
} from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';
import { HOTEL } from '@/lib/data/hotel';

const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MAX_INDIVIDUAL = 4;

const INITIAL_FORM = {
  arrival: '',
  departure: '',
  guests: '2',
  name: '',
  email: '',
  phone: '',
  message: '',
  company: '',
};

export function BookingDrawer({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isGroup = Number(form.guests) >= 5;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setErrorMsg(null);
      setForm(INITIAL_FORM);
    }
  }, [open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    setStatus('submitting');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/booking-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          arrival: form.arrival,
          departure: form.departure,
          guests: Number(form.guests),
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  const update = (key: keyof typeof INITIAL_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-[200] transition-[visibility]',
        open ? 'visible' : 'invisible delay-300',
      )}
    >
      <button
        type="button"
        aria-label="Close booking"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-[rgba(12,10,9,0.5)] backdrop-blur-[2px] transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Réserver un séjour"
        className={cn(
          'absolute top-0 right-0 h-full w-full max-w-[480px] bg-[var(--color-sand-12)] text-[var(--color-sand-1)]',
          'transform transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
          'overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col min-h-full">
          <div className="flex items-center justify-between px-6 md:px-8 h-[72px] border-b border-[var(--color-sand-10)]">
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
              Réserver
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="h-9 w-9 inline-flex items-center justify-center text-[var(--color-sand-1)] hover:text-[var(--color-sand-6)] transition-colors duration-[var(--duration-fast)]"
            >
              <X size={20} weight="regular" />
            </button>
          </div>

          <div className="flex-1 px-6 md:px-8 py-10">
            {status === 'success' ? (
              <SuccessPanel onClose={onClose} />
            ) : (
              <>
                <h2 className="font-display font-light tracking-[-0.03em] text-[32px] leading-[1.05] md:text-[40px] md:leading-[1.02] balance">
                  Dites-nous quand.
                </h2>

                <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
                  <Field label="Arrivée">
                    <input
                      type="date"
                      required
                      value={form.arrival}
                      onChange={update('arrival')}
                      className="input-dark w-full"
                    />
                  </Field>

                  <Field label="Départ">
                    <input
                      type="date"
                      required
                      value={form.departure}
                      onChange={update('departure')}
                      className="input-dark w-full"
                    />
                  </Field>

                  <Field label="Voyageurs">
                    <select
                      value={form.guests}
                      onChange={update('guests')}
                      className="input-dark w-full"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'voyageur' : 'voyageurs'}
                        </option>
                      ))}
                      <option value="5">5 voyageurs · groupe</option>
                      <option value="6">6 voyageurs · groupe</option>
                      <option value="7">7 voyageurs · groupe</option>
                      <option value="8">8+ voyageurs · groupe</option>
                    </select>
                  </Field>

                  {isGroup ? (
                    <GroupCTA guests={form.guests} />
                  ) : (
                    <>
                      <Field label="Nom">
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={100}
                          autoComplete="name"
                          value={form.name}
                          onChange={update('name')}
                          className="input-dark w-full"
                        />
                      </Field>

                      <Field label="E-mail">
                        <input
                          type="email"
                          required
                          maxLength={200}
                          autoComplete="email"
                          value={form.email}
                          onChange={update('email')}
                          className="input-dark w-full"
                        />
                      </Field>

                      <Field label="Téléphone (optionnel)">
                        <input
                          type="tel"
                          maxLength={50}
                          autoComplete="tel"
                          value={form.phone}
                          onChange={update('phone')}
                          className="input-dark w-full"
                        />
                      </Field>

                      <Field label="Message (optionnel)">
                        <textarea
                          rows={3}
                          maxLength={2000}
                          value={form.message}
                          onChange={update('message')}
                          placeholder="Ce que nous devons savoir — préférences, occasions, questions."
                          className="input-dark w-full py-3 resize-none"
                        />
                      </Field>

                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={update('company')}
                        className="absolute -left-[9999px] w-0 h-0"
                        aria-hidden="true"
                      />

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group mt-2 inline-flex items-center justify-center gap-3 h-12 px-7 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <>
                            <CircleNotch size={16} weight="regular" className="animate-spin" />
                            Envoi…
                          </>
                        ) : (
                          <>
                            Envoyer la demande
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>

                      {status === 'error' && errorMsg ? (
                        <p
                          role="alert"
                          className="text-[13px] leading-[1.5] text-[#ef4444]"
                        >
                          {errorMsg}
                        </p>
                      ) : (
                        <p className="text-[13px] leading-[1.5] text-[var(--color-sand-7)]">
                          Jusqu&apos;à {MAX_INDIVIDUAL} voyageurs. Annulation
                          gratuite jusqu&apos;à 30 jours avant l&apos;arrivée.
                        </p>
                      )}
                    </>
                  )}
                </form>
              </>
            )}
          </div>

          <div className="px-6 md:px-8 py-8 border-t border-[var(--color-sand-10)]">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-7)] mb-4">
              Ou écrivez-nous directement
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

function GroupCTA({ guests }: { guests: string }) {
  return (
    <div className="mt-2 pt-6 border-t border-[var(--color-sand-10)]">
      <div className="flex items-start gap-3">
        <Users
          size={18}
          weight="light"
          className="text-[var(--color-sand-1)] shrink-0 mt-1"
        />
        <p className="text-[15px] leading-[1.55] text-[var(--color-sand-5)]">
          Pour les groupes, nous regroupons les chambres et adaptons le
          séjour. Écrivez-nous directement.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WA_DIGITS}?text=Demande%20de%20r%C3%A9servation%20de%20groupe%20%C3%A0%20Ambalakely`}
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
          href={`mailto:${HOTEL.email}?subject=R%C3%A9servation%20groupe%20(${guests}%20voyageurs)`}
          className="group inline-flex items-center justify-center gap-3 h-12 px-6 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
        >
          <Envelope size={18} weight="regular" />
          Nous écrire
        </a>
      </div>
    </div>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-light tracking-[-0.03em] text-[32px] leading-[1.05] md:text-[40px] md:leading-[1.02] balance">
        Demande reçue.
      </h2>
      <p className="text-[15px] leading-[1.6] text-[var(--color-sand-5)] max-w-[380px]">
        Merci. Hasina ou Mamy vous répondront sous 24 à 48 heures avec les
        disponibilités et un devis personnalisé. Une confirmation a été
        envoyée dans votre boîte de réception.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="self-start group inline-flex items-center gap-3 h-12 px-6 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
      >
        Fermer
      </button>
    </div>
  );
}
