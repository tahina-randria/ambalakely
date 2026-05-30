'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import {
  CountrySelector,
  FlagImage,
  usePhoneInput,
  type CountryIso2,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { fr as frLocale, enUS, nb } from 'date-fns/locale';
import {
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  WhatsappLogo,
  Envelope,
  Users,
  CircleNotch,
  CaretDown,
  Minus,
  Plus,
  PencilSimple,
} from '@phosphor-icons/react/dist/ssr';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils/cn';
import { HOTEL } from '@/lib/data/hotel';
import type { TypeAvailability } from '@/lib/db/availability';

const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

/**
 * Build a placeholder for the phone input from the selected country's
 * formatting mask. RIP exposes `country.format` either as a string
 * (e.g. ". .. .. .. .." for France) or as a Record with a `default`
 * key when several mobile/landline masks exist. Each `.` in the mask
 * stands for one digit ; we replace them by sequential 1-0 so the
 * placeholder reads as obviously fake but country-shaped (e.g.
 * "1 23 45 67 89" for FR, "(123) 456-7890" for US, "12 34 56 78" for NO).
 */
const PLACEHOLDER_DIGITS = '1234567890';
/**
 * Some countries in the RIP dataset have no `format` field (e.g.
 * Madagascar). Fall back to RIP's own internal `defaultMask` of 12
 * dots so the placeholder still gives the user a sense of how long
 * the number should be.
 */
const FALLBACK_MASK = '............';
function buildPhonePlaceholder(format: string | Record<string, string> | undefined): string {
  const mask =
    (typeof format === 'string' ? format : format?.default) || FALLBACK_MASK;
  let digitIdx = 0;
  let result = '';
  for (const ch of mask) {
    if (ch === '.') {
      result += PLACEHOLDER_DIGITS[digitIdx % PLACEHOLDER_DIGITS.length];
      digitIdx++;
    } else {
      result += ch;
    }
  }
  return result;
}

type Props = { open: boolean; onClose: () => void };
type Status = 'idle' | 'submitting' | 'success' | 'error';
type Step = 1 | 2;

const ROOM_TYPES = [
  { slug: 'any', label: { fr: 'Indifférent', en: 'Any room', no: 'Hvilket som helst' } },
  { slug: 'superieure', label: { fr: 'Supérieure', en: 'Supérieure', no: 'Supérieure' } },
  { slug: 'confort', label: { fr: 'Confort', en: 'Confort', no: 'Confort' } },
  { slug: 'standard', label: { fr: 'Standard', en: 'Standard', no: 'Standard' } },
] as const;

const AVAIL_T = {
  fr: {
    title: 'Disponibilités',
    loading: 'Recherche des disponibilités…',
    none: 'Complet sur ces dates.',
    error: 'Impossible de charger les disponibilités.',
    perNight: '/ nuit',
    last: 'Dernière chambre',
    left: (n: number) => `${n} chambres disponibles`,
  },
  en: {
    title: 'Availability',
    loading: 'Checking availability…',
    none: 'No rooms available for these dates.',
    error: 'Couldn’t load availability.',
    perNight: '/ night',
    last: 'Last room',
    left: (n: number) => `${n} rooms available`,
  },
  no: {
    title: 'Tilgjengelighet',
    loading: 'Sjekker tilgjengelighet…',
    none: 'Fullt på disse datoene.',
    error: 'Kunne ikke laste tilgjengelighet.',
    perNight: '/ natt',
    last: 'Siste rom',
    left: (n: number) => `${n} rom tilgjengelig`,
  },
} as const;

const fmtMga = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

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

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [avail, setAvail] = useState<TypeAvailability[] | null>(null);
  const [availStatus, setAvailStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  // Hover preview : when arrival is picked but no departure yet, paint a
  // softer band on the dates the cursor sweeps. Cleared on selection /
  // mouse leave. Set only via onDayMouseEnter (touch devices won't
  // trigger this — they just tap the dates directly, no harm).
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [editingDates, setEditingDates] = useState(false);
  // Single month on mobile, two months side-by-side on md+ so the
  // calendar actually uses the 640 px desktop drawer width (was 36 % of
  // it before). Detected with matchMedia so SSR returns false and we
  // don't hydration-mismatch ; effect bumps it client-side.
  const [twoMonths, setTwoMonths] = useState(false);

  // Phone input — custom layout so the dial code (+33) sits IN the
  // country selector button next to the flag, not as a prefix inside
  // the phone input. `disableDialCodeAndPrefix: true` removes it
  // from the inputValue ; we paint it ourselves inside renderButtonWrapper
  // below. usePhoneInput keeps the full E.164 phone in `form.phone`
  // via the onChange callback, which is what the API expects.
  const defaultPhoneCountry: CountryIso2 =
    locale === 'no' ? 'no' : locale === 'en' ? 'us' : 'fr';
  const phoneInput = usePhoneInput({
    defaultCountry: defaultPhoneCountry,
    value: form.phone,
    disableDialCodeAndPrefix: true,
    onChange: ({ phone }) => setForm((f) => ({ ...f, phone })),
  });

  // Group flow triggered only for "11+" (we ship up to 10 individual slots).
  const isGroup = Number(form.guests) >= 11;
  const nightCount = useMemo(() => {
    if (!form.range?.from || !form.range?.to) return 0;
    return differenceInCalendarDays(form.range.to, form.range.from);
  }, [form.range]);

  const canContinue = !!(form.range?.from && form.range?.to);
  // Calendar shows until both dates are picked, or when the guest taps "Modifier".
  const showCalendar = !canContinue || editingDates;

  // Reset form when drawer closes — Sheet animation handles its own timing
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStatus('idle');
        setErrorMsg(null);
        setForm(INITIAL_FORM);
        setStep(1);
        setAvail(null);
        setAvailStatus('idle');
        setHoverDate(undefined);
        setEditingDates(false);
        setSuccessRef(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Wire up the md breakpoint listener for the calendar two-month layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setTwoMonths(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Fetch real availability whenever a complete date range (+ guests) is set;
  // aborts the in-flight request when the inputs change or the drawer closes.
  useEffect(() => {
    const from = form.range?.from;
    const to = form.range?.to;
    if (!from || !to) {
      setAvail(null);
      setAvailStatus('idle');
      return;
    }
    const checkIn = format(from, 'yyyy-MM-dd');
    const checkOut = format(to, 'yyyy-MM-dd');
    const guests = Math.min(Number(form.guests), 10);
    const ctrl = new AbortController();
    setAvailStatus('loading');
    fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http'))))
      .then((d: { availability: TypeAvailability[] }) => {
        setAvail(d.availability);
        setAvailStatus('loaded');
        // Drop a previously-picked category that's no longer offered for the new dates/guests.
        setForm((f) =>
          f.roomType !== 'any' && !d.availability.some((a) => a.slug === f.roomType)
            ? { ...f, roomType: 'any' }
            : f,
        );
      })
      .catch((e: unknown) => {
        if ((e as Error)?.name !== 'AbortError') setAvailStatus('error');
      });
    return () => ctrl.abort();
  }, [form.range?.from, form.range?.to, form.guests]);

  // The react-international-phone country list dropdown lives inside
  // the Radix Dialog's overflow-y:auto container. Even with the
  // dropdown declaring overflow-y:scroll + overscroll-behavior:contain,
  // wheel events were not natively driving its scrollTop (browser
  // wasn't picking the UL as the scroll target — verified via wheel
  // trace, deltaY was hitting the LI but neither dropdown nor sheet
  // scrolled). This document-level capture listener intercepts wheel
  // when the target is inside the dropdown, calls preventDefault to
  // stop the sheet from scrolling, and drives the dropdown scrollTop
  // by hand. Net result : trackpad / mouse-wheel now scroll the
  // country list as expected. Touch users are unaffected (touch fires
  // scroll, not wheel).
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const dropdown = target.closest(
        '.react-international-phone-country-selector-dropdown',
      ) as HTMLElement | null;
      if (!dropdown) return;
      e.preventDefault();
      e.stopPropagation();
      dropdown.scrollTop += e.deltaY;
    };
    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () =>
      document.removeEventListener('wheel', onWheel, { capture: true } as AddEventListenerOptions);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    setStatus('submitting');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // format() keeps the LOCAL calendar date; toISOString() would shift it
          // a day west of UTC (Madagascar is UTC+3) and book the wrong night.
          checkIn: form.range?.from ? format(form.range.from, 'yyyy-MM-dd') : '',
          checkOut: form.range?.to ? format(form.range.to, 'yyyy-MM-dd') : '',
          guests: Number(form.guests),
          roomType: form.roomType,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
          locale,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; reference?: string };
      if (!res.ok) throw new Error(data.error ?? t('successBody'));
      setSuccessRef(data.reference ?? null);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('successBody'));
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const roomTypeLabel = ROOM_TYPES.find((r) => r.slug === form.roomType)?.label[locale] ?? '';
  const availT = AVAIL_T[locale] ?? AVAIL_T.fr;

  const dateRangeSummary = form.range?.from && form.range?.to
    ? `${format(form.range.from, 'd MMM', { locale: dateLocale })} – ${format(form.range.to, 'd MMM yyyy', { locale: dateLocale })}`
    : form.range?.from
      ? format(form.range.from, 'd MMM', { locale: dateLocale })
      : t('datesHint');

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        aria-label={t('ariaLabel')}
        aria-describedby={undefined}
        showCloseButton={false}
        className={cn(
          // mobile up to md : caps at 480 px ; md+ : 640 px to host
          // the two-month calendar without crops. Dropped the earlier
          // sm:max-w-none which made the drawer full-screen between
          // 640–767 px (broken UX).
          'w-full max-w-[480px] md:max-w-[640px]',
          'bg-[var(--color-sand-12)]! text-[var(--color-sand-1)] border-l border-[var(--color-sand-10)]',
          'p-0 gap-0 overflow-hidden',
        )}
      >
        <div className="flex h-full flex-col">
          {/* Accessible dialog name for screen readers (Radix DialogTitle
              requirement). Visually hidden — the visible step indicator
              below carries the on-screen context. */}
          <SheetTitle className="sr-only">{t('ariaLabel')}</SheetTitle>
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
              <div className="font-medium text-[13px] tracking-[0] text-[var(--color-sand-6)]">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* BODY — scrolls between the fixed header and the pinned action bar */}
          <div className="flex flex-1 flex-col min-h-0">
            {status === 'success' ? (
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6" data-lenis-prevent>
                <SuccessPanel onClose={onClose} reference={successRef} />
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-1 flex-col min-h-0">
                <div
                  className="flex flex-1 flex-col gap-4 min-h-0 overflow-y-auto px-6 md:px-8 py-4"
                  data-lenis-prevent
                >
                  {step === 1 ? (
                  <>
                    {/* Calendar */}
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <label className="font-medium text-[13px] tracking-[0] text-[var(--color-sand-6)]">
                          {t('datesLabel')}
                        </label>
                        <span className="font-display font-light text-[14px] text-[var(--color-sand-5)] tabular-nums">
                          {nightCount > 0 ? t('nights', { count: nightCount }) : ''}
                        </span>
                      </div>
                      {/* Calendar — folds away smoothly once both dates are chosen */}
                      <div
                        className={cn(
                          'grid transition-all duration-300 ease-[var(--ease-standard)]',
                          showCalendar ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <div className="overflow-hidden" inert={!showCalendar}>
                        <div className="border border-[var(--color-sand-10)] p-3 md:p-4">
                        <DayPicker
                          mode="range"
                          // min={1} forces "first click sets from only,
                          // second click sets to". Without it RDP v9
                          // sets from=to on the first click (0-night
                          // range), which a) prevented our hover preview
                          // from ever firing because range.to was
                          // always set, and b) confused users into
                          // thinking nothing happened after the first
                          // click. Minimum 1-night stay is the right
                          // default for a hotel.
                          min={1}
                          selected={form.range}
                          onSelect={(range) => {
                            setForm((f) => ({ ...f, range }));
                            // Clear preview the moment a range completes
                            // so we don't leave a stale highlight band
                            // behind the now-committed dates.
                            if (range?.from && range?.to) {
                              setHoverDate(undefined);
                              setEditingDates(false); // collapse to the summary chip
                            }
                          }}
                          onDayMouseEnter={(day) => {
                            // Only show preview while exactly one anchor
                            // is committed (arrival, no departure yet).
                            if (form.range?.from && !form.range?.to) {
                              setHoverDate(day);
                            }
                          }}
                          onDayMouseLeave={() => setHoverDate(undefined)}
                          disabled={{ before: today }}
                          locale={dateLocale}
                          weekStartsOn={1}
                          numberOfMonths={twoMonths ? 2 : 1}
                          showOutsideDays={false}
                          classNames={{ root: 'rdp-root-dark' }}
                          modifiers={{
                            'preview-middle': (day) => {
                              if (!form.range?.from || form.range?.to || !hoverDate) return false;
                              if (!isAfter(hoverDate, form.range.from)) return false;
                              return isAfter(day, form.range.from) && isBefore(day, hoverDate);
                            },
                            'preview-end': (day) => {
                              if (!form.range?.from || form.range?.to || !hoverDate) return false;
                              if (!isAfter(hoverDate, form.range.from)) return false;
                              return isSameDay(day, hoverDate);
                            },
                          }}
                          modifiersClassNames={{
                            range_start: 'is-range-start',
                            range_middle: 'is-range-middle',
                            range_end: 'is-range-end',
                            selected: 'is-selected',
                            'preview-middle': 'is-preview-middle',
                            'preview-end': 'is-preview-end',
                          }}
                          labels={{
                            labelPrevious: () => t('calendarPrev'),
                            labelNext: () => t('calendarNext'),
                          }}
                        />
                        </div>
                        </div>
                      </div>
                      {/* Summary chip — grows in as the calendar folds (always mounted so both animate) */}
                      <div
                        className={cn(
                          'grid transition-all duration-300 ease-[var(--ease-standard)]',
                          showCalendar ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
                        )}
                      >
                        <div className="overflow-hidden" inert={showCalendar}>
                          <button
                            type="button"
                            onClick={() => setEditingDates(true)}
                            className="flex w-full items-center justify-between gap-3 border border-[var(--color-sand-10)] px-4 h-12 text-left hover:border-[var(--color-sand-7)] transition-colors duration-[var(--duration-fast)]"
                          >
                            <span className="font-display font-light text-[16px] tracking-[-0.005em] tabular-nums">
                              {dateRangeSummary}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-[var(--color-sand-6)]">
                              <PencilSimple size={13} weight="regular" />
                              {t('editDates')}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Guests — stepper */}
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

                    {/* Real availability — appears once a date range is set */}
                    {canContinue ? (
                      <div>
                        <div className="font-medium text-[13px] tracking-[0] text-[var(--color-sand-6)] mb-2">
                          {availT.title}
                        </div>
                        {availStatus === 'loading' ? (
                          <div className="flex items-center gap-2 py-3 text-[14px] text-[var(--color-sand-6)]">
                            <CircleNotch size={15} weight="regular" className="animate-spin" />
                            {availT.loading}
                          </div>
                        ) : availStatus === 'error' ? (
                          <p className="py-3 text-[14px] text-[var(--color-sand-7)]">{availT.error}</p>
                        ) : avail && avail.length === 0 ? (
                          <p className="py-3 text-[15px] text-[var(--color-sand-5)]">{availT.none}</p>
                        ) : avail ? (
                          <ul className="flex flex-col gap-2">
                            {avail.map((a) => {
                              const selected = form.roomType === a.slug;
                              return (
                                <li key={a.slug}>
                                  <button
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, roomType: a.slug }))}
                                    aria-pressed={selected}
                                    className={cn(
                                      'w-full flex items-center justify-between gap-4 px-4 py-3 border text-left transition-colors duration-[var(--duration-fast)]',
                                      selected
                                        ? 'border-[var(--color-sand-1)] bg-[var(--color-sand-11)]'
                                        : 'border-[var(--color-sand-10)] hover:border-[var(--color-sand-7)]',
                                    )}
                                  >
                                    <span className="min-w-0">
                                      <span className="block font-display font-light text-[19px] tracking-[-0.01em]">
                                        {a.name}
                                      </span>
                                      <span
                                        className={cn(
                                          'block mt-0.5 text-[13px]',
                                          a.available === 1
                                            ? 'font-medium text-[var(--color-sand-3)]'
                                            : 'text-[var(--color-sand-6)]',
                                        )}
                                      >
                                        {a.available === 1 ? availT.last : availT.left(a.available)}
                                      </span>
                                    </span>
                                    <span className="shrink-0 text-right">
                                      <span className="block font-display font-light text-[19px] tabular-nums">
                                        {fmtMga(a.pricePerNightMinor)} Ar
                                        <span className="text-[13px] text-[var(--color-sand-6)]">
                                          {' '}
                                          {availT.perNight}
                                        </span>
                                      </span>
                                      <span className="block text-[12px] text-[var(--color-sand-6)] tabular-nums">
                                        {fmtMga(a.totalMinor)} Ar · {t('nights', { count: a.nights })}
                                      </span>
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {/* Summary card */}
                    <div className="bg-[var(--color-sand-11)] border border-[var(--color-sand-10)] px-4 py-3.5">
                      <div className="font-medium text-[12px] tracking-[0] text-[var(--color-sand-6)] mb-1.5">
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
                      <div className="flex">
                        <CountrySelector
                          selectedCountry={phoneInput.country.iso2}
                          onSelect={(c) =>
                            phoneInput.setCountry(c.iso2, { focusOnInput: true })
                          }
                          dropdownStyleProps={{
                            className:
                              '!bg-[var(--color-sand-12)] !text-[var(--color-sand-1)] !border-[var(--color-sand-10)]',
                          }}
                          renderButtonWrapper={({ rootProps }) => (
                            <button
                              type="button"
                              {...rootProps}
                              // Inline style forces our border/bg over RIP's default
                              // `--react-international-phone-country-selector-border-color`
                              // (which renders as sand-6 / light) so the trigger reads
                              // as a unified "case" with the phone input next to it.
                              style={{
                                borderColor: 'var(--color-sand-10)',
                                backgroundColor: 'var(--color-sand-11)',
                              }}
                              className="inline-flex items-center gap-2 h-12 px-3 border border-r-0 hover:!bg-[var(--color-sand-10)] transition-colors duration-[var(--duration-fast)] text-[var(--color-sand-1)] shrink-0"
                            >
                              <FlagImage
                                iso2={phoneInput.country.iso2}
                                size="22px"
                                disableLazyLoading
                              />
                              <span className="text-[15px] tabular-nums font-body">
                                +{phoneInput.country.dialCode}
                              </span>
                              <CaretDown
                                size={12}
                                weight="regular"
                                className="text-[var(--color-sand-6)]"
                              />
                            </button>
                          )}
                        />
                        <input
                          type="tel"
                          autoComplete="tel-national"
                          ref={phoneInput.inputRef}
                          value={phoneInput.inputValue}
                          onChange={phoneInput.handlePhoneValueChange}
                          placeholder={buildPhonePlaceholder(phoneInput.country.format)}
                          className="input-dark w-full min-w-0"
                        />
                      </div>
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
                  </>
                )}
                </div>

                {/* ACTION BAR — pinned; the primary CTA never falls below the fold */}
                <div className="flex-none border-t border-[var(--color-sand-10)] px-6 md:px-8 py-3.5">
                  {step === 1 ? (
                    isGroup ? (
                      <GroupCTA guests={form.guests} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!canContinue || form.roomType === 'any'}
                        className="group flex w-full items-center justify-center gap-3 h-12 px-6 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('continue')}
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                        />
                      </button>
                    )
                  ) : (
                    <div className="flex flex-col gap-3">
                      {status === 'error' && errorMsg ? (
                        <p role="alert" className="text-[13px] leading-[1.5] text-[#ef4444]">
                          {errorMsg}
                        </p>
                      ) : (
                        <p className="text-[13px] leading-[1.5] text-[var(--color-sand-7)]">
                          {t('footer')}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group flex w-full items-center justify-center gap-3 h-12 px-7 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)] disabled:opacity-60 disabled:cursor-not-allowed"
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
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* FOOTER — direct contact, single inline row to free vertical space */}
          <div className="px-6 md:px-8 py-3 border-t border-[var(--color-sand-10)] flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--color-sand-5)]">
            <span className="font-medium text-[var(--color-sand-7)]">
              {t('writeUs')}
            </span>
            <a
              href={`https://wa.me/${WA_DIGITS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
            >
              <WhatsappLogo size={14} weight="regular" />
              <span>{HOTEL.phone}</span>
            </a>
            <a
              href={`mailto:${HOTEL.email}`}
              className="inline-flex items-center gap-1.5 text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
            >
              <Envelope size={14} weight="regular" />
              <span>{HOTEL.email}</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-[13px] tracking-[0] text-[var(--color-sand-6)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function GuestStepper({
  value, onChange, min, max, labelOne, labelMany, labelMax,
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

function SuccessPanel({
  onClose,
  reference,
}: {
  onClose: () => void;
  reference?: string | null;
}) {
  const t = useTranslations('BookingDrawer');
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-light tracking-[-0.03em] text-[32px] leading-[1.05] md:text-[40px] md:leading-[1.02] balance">
        {t('successH2')}
      </h2>
      <p className="text-[15px] leading-[1.6] text-[var(--color-sand-5)] max-w-[380px]">
        {t('successBody')}
      </p>
      {reference ? (
        <div className="flex items-baseline gap-3 self-start border border-[var(--color-sand-10)] px-4 py-3">
          <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-sand-6)]">
            {t('successRefLabel')}
          </span>
          <span className="font-display font-light text-[18px] tabular-nums tracking-[0.02em] text-[var(--color-sand-1)]">
            {reference}
          </span>
        </div>
      ) : null}
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
