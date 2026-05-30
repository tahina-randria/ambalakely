import Link from 'next/link';
import { listReservations, type AdminReservation } from '@/lib/db/admin-reservations';
import { ReservationActions } from './ReservationActions';
import { StatusBadge, HoldHint, money, fmtDate } from './ui';

export const dynamic = 'force-dynamic';

function Row({ r }: { r: AdminReservation }) {
  const href = `/admin/reservations/${r.id}`;
  return (
    <tr className="border-b border-[var(--color-sand-3)] align-top transition-colors hover:bg-[var(--color-sand-2)]">
      <td className="py-3 pr-4 font-display text-[14px] tabular-nums">
        <Link href={href} className="underline-offset-2 hover:underline">
          {r.reference}
        </Link>
      </td>
      <td className="py-3 pr-4">
        <StatusBadge status={r.status} />
        {r.status === 'pending' && r.holdSecondsLeft != null ? (
          <div className="mt-1">
            <HoldHint secondsLeft={r.holdSecondsLeft} />
          </div>
        ) : null}
      </td>
      <td className="py-3 pr-4">
        <Link href={href} className="text-[14px] text-[var(--color-sand-12)] underline-offset-2 hover:underline">
          {r.firstName} {r.lastName}
        </Link>
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
        {money(r.totalMinor, r.currency)}
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
