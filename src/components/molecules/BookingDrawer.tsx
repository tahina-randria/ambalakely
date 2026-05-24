'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { fr as frLocale, enUS, nb } from 'date-fns/locale';
import { differenceInCalendarDays, format } from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  X,
  WhatsappLogo,
  Envelope,
  Users,
  CircleNotch,
  CaretDown,
  Check,
  Minus,
  Plus,
} from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';
import { HOTEL } from '@/lib/data/hotel';

const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');
const MAX_INDIVIDUAL = 4;

type Props = { open: boolean; onClose: () => void };
type Status = 'idle' | 'submitting' | 'success' | 'error';
type Step = 1 | 2;

const ROOM_TYPES = [
  { slug: 'any', label: { fr: 'Indifférent', en: 'Any room', no: 'Hvilket som helst' } },
  { slug: 'superieure', label: { fr: 'Supérieure', en: 'Supérieure', no: 'Supérieure' } },
  { slug: 'confort', label: { fr: 'Confort', en: 'Confort', no: 'Confort' } },
  { slug: 'standard', label: { fr: 'Standard', en: 'Standard', no: 'Standard' } },
] as const;

const INITIAL_FORM = {
  roomType: 'any',
  range: undefined as DateRange | undefined,
  guests: '2',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  company: '',
};

const DATE_LOCALES = { fr: frLocale, en: enUS, no: nb } as const;

export function BookingDrawer({ open, onClose }: Props) {
  const t = useTranslations('BookingDrawer');
  const locale = useLocale() as 'fr' | 'en' | 'no';
  const dateLocale = DATE_LOCALES[locale] ?? frLocale;

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
  // Match Airbnb/Expedia pattern : 2 months side-by-side on md+, 1 on mobile.
  const [twoMonths, setTwoMonths] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setTwoMonths(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Group flow triggered only for "11+" (we ship up to 10 individual slots).
  const isGroup = Number(form.guests) >= 11;
  const nightCount = useMemo(() => {
    if (!form.range?.from || !form.range?.to) return 0;
    return differenceInCalendarDays(form.range.to, form.range.from);
  }, [form.range]);

  const canContinue = !!(form.range?.from && form.range?.to);

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
      // Defer reset until the drawer is animated out (300ms slide)
      const timer = setTimeout(() => {
        setStatus('idle');
        setErrorMsg(null);
        setForm(INITIAL_FORM);
        setStep(1);
      }, 350);
      return () => clearTimeout(timer);
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
          arrival: form.range?.from?.toISOString().slice(0, 10) ?? '',
          departure: form.range?.to?.toISOString().slice(0, 10) ?? '',
          guests: Number(form.guests),
          roomType: form.roomType,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? t('successBody'));
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('successBody'));
    }
  };

  if (!mounted) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const roomTypeLabel = ROOM_TYPES.find((r) => r.slug === form.roomType)?.label[locale] ?? '';

  const dateRangeSummary = form.range?.from && form.range?.to
    ? `${format(form.range.from, 'd MMM', { locale: dateLocale })} – ${format(form.range.to, 'd MMM yyyy', { locale: dateLocale })}`
    : form.range?.from
      ? format(form.range.from, 'd MMM', { locale: dateLocale })
      : t('datesHint');

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
        aria-label={t('ariaLabel')}
        className={cn(
          'absolute top-0 right-0 h-full w-full max-w-[480px] md:max-w-[640px] bg-[var(--color-sand-12)] text-[var(--color-sand-1)]',
          'transform transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
          'overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col min-h-full">
          {/* HEADER — step indicator + close */}
          <div className="flex items-center justify-between px-6 md:px-8 h-[72px] border-b border-[var(--color-sand-10)] sticky top-0 bg-[var(--color-sand-12)] z-10">
            <div className="flex items-center gap-3">
              {step === 2 && status !== 'success' ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  aria-label={t('back')}
                  className="h-8 w-8 -ml-2 inline-flex items-center justify-center text-[var(--color-sand-1)] hover:text-[var(--color-sand-6)] transition-colors duration-[var(--duration-fast)]"
                >
                  <ArrowLeft size={18} weight="regular" />
                </button>
              ) : null}
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
                {status === 'success'
                  ? t('successH2')
                  : `${t('step')} ${step} ${t('of')} 2 · ${step === 1 ? t('stepStay') : t('stepContact')}`}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('successClose')}
              className="h-9 w-9 inline-flex items-center justify-center text-[var(--color-sand-1)] hover:text-[var(--color-sand-6)] transition-colors duration-[var(--duration-fast)]"
            >
              <X size={20} weight="regular" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 px-6 md:px-8 py-8">
            {status === 'success' ? (
              <SuccessPanel onClose={onClose} />
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {/* ════ STEP 1 ════ */}
                {step === 1 ? (
                  <>
                    {/* Room type — big custom dropdown */}
                    <div className="relative">
                      <label className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-6)] mb-3">
                        {t('roomType')}
                      </label>
                      <button
                        type="button"
                        onClick={() => setRoomDropdownOpen((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={roomDropdownOpen}
                        className="w-full flex items-center justify-between gap-3 h-14 px-4 border border-[var(--color-sand-10)] hover:border-[var(--color-sand-7)] text-left transition-colors duration-[var(--duration-fast)]"
                      >
                        <span className="font-display font-light text-[20px] tracking-[-0.01em]">
                          {roomTypeLabel}
                        </span>
                        <CaretDown
                          size={14}
                          weight="regular"
                          className={cn(
                            'text-[var(--color-sand-6)] transition-transform duration-[var(--duration-fast)]',
                            roomDropdownOpen && 'rotate-180',
                          )}
                        />
                      </button>
                      {roomDropdownOpen ? (
                        <ul
                          role="listbox"
                          className="absolute left-0 right-0 top-full mt-1 z-20 bg-[var(--color-sand-12)] border border-[var(--color-sand-10)] py-1"
                        >
                          {ROOM_TYPES.map((rt) => (
                            <li key={rt.slug}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={form.roomType === rt.slug}
                                onClick={() => {
                                  setForm((f) => ({ ...f, roomType: rt.slug }));
                                  setRoomDropdownOpen(false);
                                }}
                                className={cn(
                                  'w-full flex items-center justify-between gap-3 px-4 py-3 text-left',
                                  'font-display font-light text-[16px] tracking-[-0.005em]',
                                  'hover:bg-[var(--color-sand-10)] transition-colors duration-[var(--duration-fast)]',
                                  form.roomType === rt.slug
                                    ? 'text-[var(--color-sand-1)]'
                                    : 'text-[var(--color-sand-3)]',
                                )}
                              >
                                <span>{rt.label[locale]}</span>
                                {form.roomType === rt.slug ? (
                                  <Check size={14} weight="regular" />
                                ) : null}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    {/* Calendar */}
                    <div>
                      <div className="flex items-baseline justify-between mb-3">
                        <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
                          {t('datesLabel')}
                        </label>
                        <span className="font-display font-light text-[14px] text-[var(--color-sand-5)] tabular-nums">
                          {nightCount > 0 ? t('nights', { count: nightCount }) : ''}
                        </span>
                      </div>
                      <div className="border border-[var(--color-sand-10)] p-3 md:p-4">
                        <DayPicker
                          mode="range"
                          selected={form.range}
                          onSelect={(range) => setForm((f) => ({ ...f, range }))}
                          disabled={{ before: today }}
                          locale={dateLocale}
                          weekStartsOn={1}
                          numberOfMonths={twoMonths ? 2 : 1}
                          showOutsideDays={false}
                          classNames={{
                            root: 'rdp-root-dark',
                          }}
                          modifiersClassNames={{
                            range_start: 'is-range-start',
                            range_middle: 'is-range-middle',
                            range_end: 'is-range-end',
                            selected: 'is-selected',
                          }}
                          labels={{
                            labelPrevious: () => t('calendarPrev'),
                            labelNext: () => t('calendarNext'),
                          }}
                        />
                      </div>
                      <p className="mt-2 text-[12px] text-[var(--color-sand-7)]">
                        {dateRangeSummary}
                      </p>
                    </div>

                    {/* Guests — stepper. Airbnb / Six Senses / Aman pattern. */}
                    <Field label={t('guests')}>
                      <GuestStepper
                        value={Number(form.guests)}
                        onChange={(n) => setForm((f) => ({ ...f, guests: String(n) }))}
                        min={1}
                        max={10}
                        labelOne={t('guestOne', { n: 1 })}
                        labelMany={(n) => t('guestMany', { n })}
                        labelMax={t('guestGroup', { n: 10, plus: 'true' })}
                      />
                    </Field>

                    {isGroup ? (
                      <GroupCTA guests={form.guests} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!canContinue}
                        className="group mt-2 inline-flex items-center justify-center gap-3 h-12 px-6 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('continue')}
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                        />
                      </button>
                    )}
                  </>
                ) : (
                  /* ════ STEP 2 ════ */
                  <>
                    {/* Summary card */}
                    <div className="bg-[var(--color-sand-11)] border border-[var(--color-sand-10)] px-4 py-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-sand-6)] mb-1.5">
                        {t('summarize')}
                      </div>
                      <div className="font-display font-light text-[15px] leading-[1.4] tracking-[-0.005em]">
                        {roomTypeLabel} · {dateRangeSummary}
                        {nightCount > 0 ? ` · ${t('nights', { count: nightCount })}` : ''}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label={t('firstName')}>
                        <input
                          type="text"
                          required
                          minLength={1}
                          maxLength={60}
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                          className="input-dark w-full"
                        />
                      </Field>
                      <Field label={t('lastName')}>
                        <input
                          type="text"
                          required
                          minLength={1}
                          maxLength={60}
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                          className="input-dark w-full"
                        />
                      </Field>
                    </div>

                    <Field label={t('phoneLabel')}>
                      <PhoneInput
                        defaultCountry={locale === 'no' ? 'no' : locale === 'en' ? 'us' : 'fr'}
                        value={form.phone}
                        onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                        forceDialCode
                        inputClassName="!w-full !h-12 !bg-transparent !border !border-[var(--color-sand-10)] !text-[var(--color-sand-1)] !text-[15px] !rounded-none focus:!border-[var(--color-sand-1)]"
                        countrySelectorStyleProps={{
                          buttonClassName: 'phone-country-button !h-12 !bg-transparent !border !border-[var(--color-sand-10)] !rounded-none hover:!bg-[var(--color-sand-11)]',
                          dropdownStyleProps: {
                            className: '!bg-[var(--color-sand-12)] !text-[var(--color-sand-1)] !border-[var(--color-sand-10)]',
                          },
                        }}
                      />
                    </Field>

                    <Field label={t('email')}>
                      <input
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="input-dark w-full"
                      />
                    </Field>

                    <Field label={t('message')}>
                      <textarea
                        rows={3}
                        maxLength={2000}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={t('messagePlaceholder')}
                        className="input-dark w-full py-3 resize-none"
                      />
                    </Field>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
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
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          {t('send')}
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>

                    {status === 'error' && errorMsg ? (
                      <p role="alert" className="text-[13px] leading-[1.5] text-[#ef4444]">
                        {errorMsg}
                      </p>
                    ) : (
                      <p className="text-[13px] leading-[1.5] text-[var(--color-sand-7)]">
                        {t('footer', { max: MAX_INDIVIDUAL })}
                      </p>
                    )}
                  </>
                )}
              </form>
            )}
          </div>

          {/* FOOTER — direct contact */}
          <div className="px-6 md:px-8 py-8 border-t border-[var(--color-sand-10)]">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-7)] mb-4">
              {t('writeUs')}
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
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-6)]">
        {label}
      </span>
      {children}
    </label>
  );
}

/**
 * GuestStepper — +/- counter matching the Airbnb / Six Senses pattern.
 * Disabled boundaries (min reached → minus disabled, max → plus disabled).
 * Shows "10+" via the labelMax prop when at the cap.
 */
function GuestStepper({
  value,
  onChange,
  min,
  max,
  labelOne,
  labelMany,
  labelMax,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  labelOne: string;
  labelMany: (n: number) => string;
  labelMax: string;
}) {
  const atMin = value <= min;
  const atMax = value >= max;
  const display = atMax ? labelMax : value === 1 ? labelOne : labelMany(value);
  return (
    <div className="flex items-center justify-between gap-3 h-12 px-4 border border-[var(--color-sand-10)]">
      <span className="font-display font-light text-[16px] tracking-[-0.005em] tabular-nums">
        {display}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={atMin}
          aria-label="−"
          className="h-9 w-9 inline-flex items-center justify-center border border-[var(--color-sand-7)] text-[var(--color-sand-1)] hover:border-[var(--color-sand-1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-[var(--duration-fast)]"
        >
          <Minus size={14} weight="regular" />
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={atMax}
          aria-label="+"
          className="h-9 w-9 inline-flex items-center justify-center border border-[var(--color-sand-7)] text-[var(--color-sand-1)] hover:border-[var(--color-sand-1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-[var(--duration-fast)]"
        >
          <Plus size={14} weight="regular" />
        </button>
      </div>
    </div>
  );
}

function GroupCTA({ guests }: { guests: string }) {
  const t = useTranslations('BookingDrawer');
  const whatsappUrl = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(t('groupWhatsappText'))}`;
  const emailSubject = encodeURIComponent(t('groupEmailSubject', { guests }));
  return (
    <div className="mt-2 pt-6 border-t border-[var(--color-sand-10)]">
      <div className="flex items-start gap-3">
        <Users size={18} weight="light" className="text-[var(--color-sand-1)] shrink-0 mt-1" />
        <p className="text-[15px] leading-[1.55] text-[var(--color-sand-5)]">{t('groupCTA')}</p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 h-12 px-6 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
        >
          <WhatsappLogo size={18} weight="regular" />
          {t('groupWhatsapp')}
          <ArrowRight
            size={14}
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
          />
        </a>
        <a
          href={`mailto:${HOTEL.email}?subject=${emailSubject}`}
          className="group inline-flex items-center justify-center gap-3 h-12 px-6 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
        >
          <Envelope size={18} weight="regular" />
          {t('groupEmail')}
        </a>
      </div>
    </div>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  const t = useTranslations('BookingDrawer');
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-light tracking-[-0.03em] text-[32px] leading-[1.05] md:text-[40px] md:leading-[1.02] balance">
        {t('successH2')}
      </h2>
      <p className="text-[15px] leading-[1.6] text-[var(--color-sand-5)] max-w-[380px]">
        {t('successBody')}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="self-start group inline-flex items-center gap-3 h-12 px-6 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
      >
        {t('successClose')}
      </button>
    </div>
  );
}
