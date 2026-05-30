import { listReservations, type AdminReservation } from '@/lib/db/admin-reservations';

export const dynamic = 'force-dynamic';

const fmtMga = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'À confirmer', cls: 'border-[#b58900] text-[#d9a800]' },
  confirmed: { label: 'Confirmée', cls: 'border-[#3f7d4e] text-[#5aa36c]' },
  checked_in: { label: 'Arrivée', cls: 'border-[#3f7d4e] text-[#5aa36c]' },
  checked_out: { label: 'Partie', cls: 'border-[var(--color-sand-8)] text-[var(--color-sand-6)]' },
  cancelled: { label: 'Annulée', cls: 'border-[var(--color-sand-9)] text-[var(--color-sand-7)]' },
  no_show: { label: 'No-show', cls: 'border-[var(--color-sand-9)] text-[var(--color-sand-7)]' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { label: status, cls: 'border-[var(--color-sand-9)] text-[var(--color-sand-6)]' };
  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

function Row({ r }: { r: AdminReservation }) {
  return (
    <tr className="border-b border-[var(--color-sand-11)] align-top">
      <td className="py-3 pr-4 font-display text-[14px] tabular-nums">{r.reference}</td>
      <td className="py-3 pr-4">
        <StatusBadge status={r.status} />
      </td>
      <td className="py-3 pr-4">
        <div className="text-[14px] text-[var(--color-sand-1)]">
          {r.firstName} {r.lastName}
        </div>
        <div className="text-[12px] text-[var(--color-sand-6)]">{r.email ?? r.phone ?? '—'}</div>
      </td>
      <td className="py-3 pr-4 text-[14px] text-[var(--color-sand-2)]">{r.rooms}</td>
      <td className="py-3 pr-4 whitespace-nowrap text-[14px] text-[var(--color-sand-2)]">
        {fmtDate(r.checkIn)} → {fmtDate(r.checkOut)}
        <span className="ml-1 text-[12px] text-[var(--color-sand-6)]">
          · {r.nights} nuit{r.nights > 1 ? 's' : ''}
        </span>
      </td>
      <td className="py-3 pr-4 whitespace-nowrap text-right font-display text-[14px] tabular-nums">
        {fmtMga(r.totalMinor)} {r.currency === 'MGA' ? 'Ar' : r.currency}
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
        <div className="text-[13px] text-[var(--color-sand-6)]">
          {rows.length} au total · <span className="text-[#d9a800]">{pending} à confirmer</span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-[15px] text-[var(--color-sand-6)]">Aucune réservation pour l’instant.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-sand-10)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-6)]">
              <th className="py-2 pr-4 font-medium">Réf.</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Client</th>
              <th className="py-2 pr-4 font-medium">Chambre</th>
              <th className="py-2 pr-4 font-medium">Séjour</th>
              <th className="py-2 pr-4 text-right font-medium">Total</th>
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
