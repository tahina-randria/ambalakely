/**
 * Présentation partagée du desk (liste + détail) — badges de statut, compte à
 * rebours du hold, formatage monnaie/dates. Composants serveur purs (aucun
 * hook client) : importables depuis n'importe quelle page du groupe (desk).
 */
const fmtMga = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

/** Montant en minor units → « 510 000 Ar ». */
export function money(totalMinor: number, currency: string): string {
  return `${fmtMga(totalMinor)} ${currency === 'MGA' ? 'Ar' : currency}`;
}

/** Fraction 0..1 → « 38 % ». */
export function pct(fraction: number): string {
  return `${Math.round(fraction * 100)} %`;
}

export const CHANNEL_LABELS: Record<string, string> = {
  direct: 'Site web',
  email: 'E-mail',
  phone: 'Téléphone',
  walk_in: 'Sur place',
  ota: 'OTA',
};

/** Date ISO 'YYYY-MM-DD' → « 30 mai » (courte, pour les lignes). */
export function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

/** Date ISO 'YYYY-MM-DD' → « samedi 30 mai 2026 » (longue, pour le détail). */
export function fmtDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'À confirmer', cls: 'border-[#caa64e] text-[#8a6a1e]' },
  confirmed: { label: 'Confirmée', cls: 'border-[#7aa384] text-[#2f6b3e]' },
  checked_in: { label: 'Arrivée', cls: 'border-[#7aa384] text-[#2f6b3e]' },
  checked_out: { label: 'Partie', cls: 'border-[var(--color-sand-5)] text-[var(--color-sand-9)]' },
  cancelled: { label: 'Annulée', cls: 'border-[var(--color-sand-4)] text-[var(--color-sand-8)]' },
  no_show: { label: 'No-show', cls: 'border-[var(--color-sand-4)] text-[var(--color-sand-8)]' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { label: status, cls: 'border-[var(--color-sand-5)] text-[var(--color-sand-9)]' };
  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

/** Compte à rebours du hold sur une résa pending — dit au staff quoi confirmer en priorité. */
export function HoldHint({ secondsLeft }: { secondsLeft: number }) {
  if (secondsLeft <= 0) {
    return <span className="whitespace-nowrap text-[11px] text-[var(--color-sand-8)]">hold expiré</span>;
  }
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const label = h >= 1 ? `expire dans ${h} h` : m >= 1 ? `expire dans ${m} min` : 'expire dans <1 min';
  const urgent = secondsLeft < 6 * 3600;
  return (
    <span
      className={`whitespace-nowrap text-[11px] ${urgent ? 'font-medium text-[#8a6a1e]' : 'text-[var(--color-sand-9)]'}`}
    >
      {label}
    </span>
  );
}
