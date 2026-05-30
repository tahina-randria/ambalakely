'use client';
import { useFormStatus } from 'react-dom';
import {
  confirmReservation,
  cancelReservation,
  checkInReservation,
  checkOutReservation,
} from './actions';

function Submit({ label, className }: { label: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? '…' : label}
    </button>
  );
}

// Tiers visuels : « avancer le cycle » (ink) > Confirmer (vert) > Annuler (muet).
const BTN_BASE = 'border px-2.5 py-1 text-[12px] transition-colors disabled:opacity-50';
const BTN_ADVANCE = `${BTN_BASE} border-[var(--color-sand-12)] font-medium text-[var(--color-sand-12)] hover:bg-[var(--color-sand-3)]`;
const BTN_CONFIRM = `${BTN_BASE} border-[#7aa384] font-medium text-[#2f6b3e] hover:bg-[#eef4ef]`;
const BTN_CANCEL = `${BTN_BASE} border-[var(--color-sand-5)] text-[var(--color-sand-9)] hover:bg-[var(--color-sand-3)]`;

export function ReservationActions({ id, status }: { id: string; status: string }) {
  const canConfirm = status === 'pending';
  const canCheckIn = status === 'confirmed';
  const canCheckOut = status === 'checked_in';
  const canCancel = status === 'pending' || status === 'confirmed';

  if (!canConfirm && !canCheckIn && !canCheckOut && !canCancel) {
    return <span className="text-[var(--color-sand-7)]">—</span>;
  }

  return (
    <div className="flex justify-end gap-2">
      {canConfirm ? (
        <form action={confirmReservation}>
          <input type="hidden" name="id" value={id} />
          <Submit label="Confirmer" className={BTN_CONFIRM} />
        </form>
      ) : null}
      {canCheckIn ? (
        <form action={checkInReservation}>
          <input type="hidden" name="id" value={id} />
          <Submit label="Arrivée" className={BTN_ADVANCE} />
        </form>
      ) : null}
      {canCheckOut ? (
        <form action={checkOutReservation}>
          <input type="hidden" name="id" value={id} />
          <Submit label="Départ" className={BTN_ADVANCE} />
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
          <Submit label="Annuler" className={BTN_CANCEL} />
        </form>
      ) : null}
    </div>
  );
}
