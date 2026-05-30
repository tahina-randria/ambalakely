'use client';
import { useFormStatus } from 'react-dom';
import { confirmReservation, cancelReservation } from './actions';

function Submit({ label, className }: { label: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? '…' : label}
    </button>
  );
}

export function ReservationActions({ id, status }: { id: string; status: string }) {
  const canConfirm = status === 'pending';
  const canCancel = status === 'pending' || status === 'confirmed';

  if (!canConfirm && !canCancel) {
    return <span className="text-[var(--color-sand-7)]">—</span>;
  }

  return (
    <div className="flex justify-end gap-2">
      {canConfirm ? (
        <form action={confirmReservation}>
          <input type="hidden" name="id" value={id} />
          <Submit
            label="Confirmer"
            className="border border-[#7aa384] px-2.5 py-1 text-[12px] font-medium text-[#2f6b3e] transition-colors hover:bg-[#eef4ef] disabled:opacity-50"
          />
        </form>
      ) : null}
      {canCancel ? (
        <form
          action={cancelReservation}
          onSubmit={(e) => {
            if (!window.confirm('Annuler cette réservation ? La chambre sera relâchée.')) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={id} />
          <Submit
            label="Annuler"
            className="border border-[var(--color-sand-5)] px-2.5 py-1 text-[12px] text-[var(--color-sand-9)] transition-colors hover:bg-[var(--color-sand-3)] disabled:opacity-50"
          />
        </form>
      ) : null}
    </div>
  );
}
