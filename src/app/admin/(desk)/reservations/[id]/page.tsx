import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getReservation,
  getReservationEvents,
  type ReservationEvent,
} from '@/lib/db/admin-reservations';
import { ReservationActions } from '../../ReservationActions';
import { StatusBadge, HoldHint, money, fmtDateLong } from '../../ui';

export const dynamic = 'force-dynamic';

const CHANNEL_LABELS: Record<string, string> = {
  direct: 'Site web',
  email: 'E-mail',
  phone: 'Téléphone',
  walk_in: 'Sur place',
  ota: 'OTA',
};

const EVENT_LABELS: Record<string, string> = {
  created: 'Créée',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  checked_in: 'Arrivée',
  checked_out: 'Départ',
  no_show: 'No-show',
};

function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(['fr'], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

function occupants(adults: number, children: number): string {
  const a = `${adults} adulte${adults > 1 ? 's' : ''}`;
  return children > 0 ? `${a} · ${children} enfant${children > 1 ? 's' : ''}` : a;
}

function eventActor(e: ReservationEvent): string | null {
  if (!e.actor) return null;
  return e.type === 'created' ? (CHANNEL_LABELS[e.actor] ?? e.actor) : e.actor;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-b border-[var(--color-sand-3)] py-2 last:border-0">
      <dt className="shrink-0 text-[13px] text-[var(--color-sand-9)]">{label}</dt>
      <dd className="text-right text-[13px] text-[var(--color-sand-12)]">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">{title}</h2>
      <dl>{children}</dl>
    </section>
  );
}

export default async function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [r, events] = await Promise.all([getReservation(id), getReservationEvents(id)]);
  if (!r) notFound();

  return (
    <div className="max-w-[820px]">
      <Link
        href="/admin"
        className="text-[13px] text-[var(--color-sand-9)] underline-offset-2 hover:text-[var(--color-sand-12)] hover:underline"
      >
        ← Réservations
      </Link>

      <header className="mb-8 mt-4 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-[26px] tracking-[-0.01em] tabular-nums">{r.reference}</h1>
            <StatusBadge status={r.status} />
          </div>
          <p className="mt-1 text-[15px] text-[var(--color-sand-11)]">
            {r.firstName} {r.lastName}
          </p>
          {r.status === 'pending' && r.holdSecondsLeft != null ? (
            <p className="mt-1">
              <HoldHint secondsLeft={r.holdSecondsLeft} />
            </p>
          ) : null}
        </div>
        <ReservationActions id={r.id} status={r.status} />
      </header>

      <section className="mb-8 border border-[var(--color-sand-4)] bg-[var(--color-sand-2)] p-4">
        <h2 className="mb-1.5 text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">
          Message du client
        </h2>
        {r.notes ? (
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[var(--color-sand-12)]">{r.notes}</p>
        ) : (
          <p className="text-[14px] text-[var(--color-sand-8)]">Aucun message laissé.</p>
        )}
      </section>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Section title="Séjour">
          <Field label="Arrivée">{fmtDateLong(r.checkIn)}</Field>
          <Field label="Départ">{fmtDateLong(r.checkOut)}</Field>
          <Field label="Durée">
            {r.nights} nuit{r.nights > 1 ? 's' : ''}
          </Field>
          <Field label="Voyageurs">{occupants(r.adults, r.children)}</Field>
          <Field label="Canal">{CHANNEL_LABELS[r.channel] ?? r.channel}</Field>
        </Section>

        <Section title="Contact">
          <Field label="E-mail">
            {r.email ? (
              <a href={`mailto:${r.email}`} className="underline-offset-2 hover:underline">
                {r.email}
              </a>
            ) : (
              <span className="text-[var(--color-sand-8)]">—</span>
            )}
          </Field>
          <Field label="Téléphone">
            {r.phone ? (
              <a href={`tel:${r.phone.replace(/\s+/g, '')}`} className="underline-offset-2 hover:underline">
                {r.phone}
              </a>
            ) : (
              <span className="text-[var(--color-sand-8)]">—</span>
            )}
          </Field>
          {r.country ? <Field label="Pays">{countryName(r.country)}</Field> : null}
          <Field label="Créée le">{r.createdAtLabel}</Field>
        </Section>

        <Section title={r.rooms.length > 1 ? 'Chambres' : 'Chambre'}>
          {r.rooms.length === 0 ? (
            <p className="py-2 text-[13px] text-[var(--color-sand-8)]">—</p>
          ) : (
            r.rooms.map((room, i) => (
              <Field key={`${room.name}-${i}`} label={room.name}>
                {occupants(room.adults, room.children)} · {money(room.amountMinor, r.currency)}
              </Field>
            ))
          )}
          <Field label="Total">
            <span className="font-display tabular-nums">{money(r.totalMinor, r.currency)}</span>
          </Field>
        </Section>

        <Section title="Historique">
          <ol className="mt-1 space-y-3">
            {events.map((e) => (
              <li key={e.id} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-sand-8)]" />
                <div>
                  <div className="text-[13px] text-[var(--color-sand-12)]">{EVENT_LABELS[e.type] ?? e.type}</div>
                  <div className="text-[12px] text-[var(--color-sand-9)]">
                    {e.createdAtLabel}
                    {eventActor(e) ? ` · ${eventActor(e)}` : ''}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  );
}
