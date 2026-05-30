import { listReservations, type AdminReservation } from '@/lib/db/admin-reservations';
import { ReservationActions } from './ReservationActions';

export const dynamic = 'force-dynamic';

const fmtMga = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'À confirmer', cls: 'border-[#caa64e] text-[#8a6a1e]' },
  confirmed: { label: 'Confirmée', cls: 'border-[#7aa384] text-[#2f6b3e]' },
  checked_in: { label: 'Arrivée', cls: 'border-[#7aa384] text-[#2f6b3e]' },
  checked_out: { label: 'Partie', cls: 'border-[var(--color-sand-5)] text-[var(--color-sand-9)]' },
  cancelled: { label: 'Annulée', cls: 'border-[var(--color-sand-4)] text-[var(--color-sand-8)]' },
  no_show: { label: 'No-show', cls: 'border-[var(--color-sand-4)] text-[var(--color-sand-8)]' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { label: status, cls: 'border-[var(--color-sand-5)] text-[var(--color-sand-9)]' };
  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

/** Compte à rebours du hold sur une résa pending — dit au staff quoi confirmer en priorité. */
function HoldHint({ secondsLeft }: { secondsLeft: number }) {
  if (secondsLeft <= 0) {
    return <div className="mt-1 whitespace-nowrap text-[11px] text-[var(--color-sand-8)]">hold expiré</div>;
  }
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const label = h >= 1 ? `expire dans ${h} h` : m >= 1 ? `expire dans ${m} min` : 'expire dans <1 min';
  const urgent = secondsLeft < 6 * 3600;
  return (
    <div
      className={`mt-1 whitespace-nowrap text-[11px] ${urgent ? 'font-medium text-[#8a6a1e]' : 'text-[var(--color-sand-9)]'}`}
    >
      {label}
    </div>
  );
}

function Row({ r }: { r: AdminReservation }) {
  return (
    <tr className="border-b border-[var(--color-sand-3)] align-top">
      <td className="py-3 pr-4 font-display text-[14px] tabular-nums">{r.reference}</td>
      <td className="py-3 pr-4">
        <StatusBadge status={r.status} />
        {r.status === 'pending' && r.holdSecondsLeft != null ? (
          <HoldHint secondsLeft={r.holdSecondsLeft} />
        ) : null}
      </td>
      <td className="py-3 pr-4">
        <div className="text-[14px] text-[var(--color-sand-12)]">
          {r.firstName} {r.lastName}
        </div>
        <div className="text-[12px] text-[var(--color-sand-9)]">{r.email ?? r.phone ?? '—'}</div>
      </td>
      <td className="py-3 pr-4 text-[14px] text-[var(--color-sand-11)]">{r.rooms}</td>
      <td className="py-3 pr-4 whitespace-nowrap text-[14px] text-[var(--color-sand-11)]">
        {fmtDate(r.checkIn)} → {fmtDate(r.checkOut)}
        <span className="ml-1 text-[12px] text-[var(--color-sand-9)]">
          · {r.nights} nuit{r.nights > 1 ? 's' : ''}
        </span>
      </td>
      <td className="py-3 pr-4 whitespace-nowrap text-right font-display text-[14px] tabular-nums">
        {fmtMga(r.totalMinor)} {r.currency === 'MGA' ? 'Ar' : r.currency}
      </td>
      <td className="py-3 pl-2">
        <ReservationActions id={r.id} status={r.status} />
      </td>
    </tr>
  );
}

export default async function ReservationsPage() {
  const rows = await listReservations();
  const pending = rows.filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-[1100px]">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="font-display font-light text-[28px] tracking-[-0.01em]">Réservations</h1>
        <div className="text-[13px] text-[var(--color-sand-9)]">
          {rows.length} au total · <span className="text-[#8a6a1e]">{pending} à confirmer</span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-[15px] text-[var(--color-sand-9)]">Aucune réservation pour l’instant.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-sand-4)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">
              <th className="py-2 pr-4 font-medium">Réf.</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Client</th>
              <th className="py-2 pr-4 font-medium">Chambre</th>
              <th className="py-2 pr-4 font-medium">Séjour</th>
              <th className="py-2 pr-4 text-right font-medium">Total</th>
              <th className="py-2 pl-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <Row key={r.id} r={r} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
