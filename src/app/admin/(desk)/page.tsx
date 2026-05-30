import Link from 'next/link';
import {
  resolveRange,
  getKpis,
  getAcquisition,
  getToday,
  type DashRange,
} from '@/lib/db/admin-metrics';
import { money, pct, CHANNEL_LABELS, HoldHint } from './ui';

export const dynamic = 'force-dynamic';

const RANGES: { key: DashRange; label: string }[] = [
  { key: 'next30', label: 'À venir 30 j' },
  { key: 'next90', label: 'À venir 90 j' },
  { key: 'last30', label: '30 derniers j' },
  { key: 'last90', label: '90 derniers j' },
];

function RangeTabs({ active }: { active: DashRange }) {
  return (
    <div className="flex flex-wrap gap-1">
      {RANGES.map((r) => {
        const on = r.key === active;
        return (
          <Link
            key={r.key}
            href={`/admin?range=${r.key}`}
            className={`border px-2.5 py-1 text-[12px] transition-colors ${
              on
                ? 'border-[var(--color-sand-12)] bg-[var(--color-sand-12)] text-[var(--color-sand-1)]'
                : 'border-[var(--color-sand-5)] text-[var(--color-sand-9)] hover:bg-[var(--color-sand-3)]'
            }`}
          >
            {r.label}
          </Link>
        );
      })}
    </div>
  );
}

function Kpi({ label, value, hint, muted }: { label: string; value: string; hint?: string; muted?: boolean }) {
  return (
    <div className="border border-[var(--color-sand-4)] bg-[var(--color-sand-1)] p-4">
      <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">{label}</div>
      <div
        className={`mt-2 font-display text-[26px] tabular-nums ${
          muted ? 'text-[var(--color-sand-7)]' : 'text-[var(--color-sand-12)]'
        }`}
      >
        {value}
      </div>
      {hint ? <div className="mt-1 text-[12px] text-[var(--color-sand-9)]">{hint}</div> : null}
    </div>
  );
}

function ChannelCard({ channels }: { channels: { channel: string; count: number }[] }) {
  const total = channels.reduce((s, c) => s + c.count, 0);
  return (
    <div className="border border-[var(--color-sand-4)] bg-[var(--color-sand-1)] p-4">
      <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">Canal</div>
      {total === 0 ? (
        <div className="mt-2 font-display text-[26px] text-[var(--color-sand-7)]">—</div>
      ) : (
        <div className="mt-3 space-y-2">
          {channels.map((c) => {
            const share = c.count / total;
            return (
              <div key={c.channel}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--color-sand-11)]">{CHANNEL_LABELS[c.channel] ?? c.channel}</span>
                  <span className="tabular-nums text-[var(--color-sand-9)]">{pct(share)}</span>
                </div>
                <div className="mt-1 h-1 bg-[var(--color-sand-3)]">
                  <div className="h-1 bg-[var(--color-sand-9)]" style={{ width: `${Math.round(share * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TodayStat({ n, label }: { n: number; label: string }) {
  return (
    <span className="text-[var(--color-sand-11)]">
      <span className="font-display text-[18px] tabular-nums text-[var(--color-sand-12)]">{n}</span> {label}
      {n > 1 ? 's' : ''}
    </span>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const { range: rangeParam } = await searchParams;
  const range = resolveRange(rangeParam);
  const [kpis, acq, today] = await Promise.all([getKpis(range), getAcquisition(30), getToday()]);
  const empty = kpis.soldNights === 0;

  return (
    <div className="max-w-[1000px]">
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display font-light text-[28px] tracking-[-0.01em]">Tableau de bord</h1>
        <RangeTabs active={range.key} />
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi
          label="Occupation"
          value={kpis.occupancy != null ? pct(kpis.occupancy) : '—'}
          hint={`${kpis.soldNights} / ${kpis.availableNights} nuitées`}
          muted={empty}
        />
        <Kpi
          label="ADR"
          value={kpis.adrMinor != null ? money(kpis.adrMinor, kpis.currency) : '—'}
          hint="prix moyen / nuit"
          muted={kpis.adrMinor == null}
        />
        <Kpi
          label="RevPAR"
          value={kpis.revparMinor != null ? money(kpis.revparMinor, kpis.currency) : '—'}
          hint="revenu / chambre dispo"
          muted={empty}
        />
        <Kpi
          label="Revenu chambres"
          value={money(kpis.roomRevenueMinor, kpis.currency)}
          hint={`${kpis.soldNights} nuitée${kpis.soldNights > 1 ? 's' : ''} vendue${kpis.soldNights > 1 ? 's' : ''}`}
          muted={empty}
        />
      </div>

      {empty ? (
        <p className="mt-3 text-[12px] text-[var(--color-sand-8)]">
          Aucune nuitée confirmée sur {range.label.toLowerCase()} — les chiffres se remplissent à mesure des
          réservations confirmées.
        </p>
      ) : null}

      <h2 className="mb-3 mt-9 text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">
        Acquisition · 30 derniers jours
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Kpi
          label="Conversion"
          value={acq.conversion != null ? pct(acq.conversion) : '—'}
          hint={acq.created > 0 ? `${acq.confirmed} confirmées · ${acq.created} demandes` : 'aucune demande'}
          muted={acq.conversion == null}
        />
        <Kpi
          label="Lead-time moyen"
          value={acq.avgLeadDays != null ? `${acq.avgLeadDays} j` : '—'}
          hint="réservation → arrivée"
          muted={acq.avgLeadDays == null}
        />
        <ChannelCard channels={acq.channels} />
      </div>

      <h2 className="mb-3 mt-9 text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">Aujourd&rsquo;hui</h2>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border border-[var(--color-sand-4)] bg-[var(--color-sand-1)] p-4 text-[14px]">
        <TodayStat n={today.arrivals} label="arrivée" />
        <TodayStat n={today.departures} label="départ" />
        <TodayStat n={today.inHouse} label="en cours" />
        <span className="text-[var(--color-sand-11)]">
          occupation ce soir{' '}
          <span className="font-display tabular-nums text-[var(--color-sand-12)]">
            {today.occupiedTonight}/{today.roomsTotal}
          </span>
        </span>
        {today.pending > 0 ? (
          <span className="text-[#8a6a1e]">
            {today.pending} à traiter
            {today.soonestHoldSeconds != null ? (
              <>
                {' · '}
                <HoldHint secondsLeft={today.soonestHoldSeconds} />
              </>
            ) : null}
          </span>
        ) : null}
        <Link
          href="/admin/reservations"
          className="ml-auto text-[13px] text-[var(--color-sand-9)] underline-offset-2 hover:text-[var(--color-sand-12)] hover:underline"
        >
          Réservations →
        </Link>
      </div>
    </div>
  );
}
