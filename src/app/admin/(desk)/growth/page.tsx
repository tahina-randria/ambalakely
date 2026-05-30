import {
  getFunnel,
  getBookingCohorts,
  getRetention,
  type Funnel,
} from '@/lib/db/admin-metrics';
import { money, pct, Kpi } from '../ui';

export const dynamic = 'force-dynamic';

function monthLabel(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return ym;
  return new Date(y, m - 1, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-[var(--color-sand-4)] bg-[var(--color-sand-1)] p-4 text-[14px] text-[var(--color-sand-8)]">
      {children}
    </p>
  );
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-3 mt-9 first:mt-0">
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">{title}</h2>
      {sub ? <p className="mt-0.5 text-[12px] text-[var(--color-sand-8)]">{sub}</p> : null}
    </div>
  );
}

function FunnelStage({ label, n, base, accent }: { label: string; n: number; base: number; accent?: boolean }) {
  const share = base > 0 ? n / base : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="text-[var(--color-sand-12)]">{label}</span>
        <span className="tabular-nums text-[var(--color-sand-9)]">
          <span className="font-display text-[var(--color-sand-12)]">{n}</span>
          {base > 0 ? ` · ${pct(share)}` : ''}
        </span>
      </div>
      <div className="mt-1 h-2 bg-[var(--color-sand-3)]">
        <div
          className={`h-2 ${accent ? 'bg-[#7aa384]' : 'bg-[var(--color-sand-9)]'}`}
          style={{ width: `${Math.round(share * 100)}%` }}
        />
      </div>
    </div>
  );
}

function FunnelCard({ f }: { f: Funnel }) {
  return (
    <div className="space-y-3 border border-[var(--color-sand-4)] bg-[var(--color-sand-1)] p-4">
      <FunnelStage label="Demandes" n={f.demandes} base={f.demandes} />
      <FunnelStage label="Confirmées" n={f.confirmees} base={f.demandes} accent />
      <FunnelStage label="Honorées (séjour terminé)" n={f.honorees} base={f.demandes} accent />
      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--color-sand-3)] pt-3 text-[12px] text-[var(--color-sand-9)]">
        <span>En attente : {f.enAttente}</span>
        <span className={f.holdsExpires > 0 ? 'text-[#8a6a1e]' : undefined}>Holds expirés : {f.holdsExpires}</span>
        <span>Annulées : {f.annulees}</span>
        <span>No-show : {f.noShow}</span>
      </div>
    </div>
  );
}

export default async function GrowthPage() {
  const [funnel, cohorts, ret] = await Promise.all([getFunnel(), getBookingCohorts(), getRetention()]);

  return (
    <div className="max-w-[1000px]">
      <div className="mb-6">
        <h1 className="font-display font-light text-[28px] tracking-[-0.01em]">Croissance</h1>
        <p className="mt-1 text-[13px] text-[var(--color-sand-9)]">
          Entonnoir, cohortes et fidélisation — sur la vraie donnée. Encore creux, c&rsquo;est normal : ça se
          remplit à chaque réservation.
        </p>
      </div>

      <SectionTitle title="Entonnoir d'acquisition" sub="tout l'historique · Demande → Confirmée → Honorée" />
      {funnel.demandes === 0 ? (
        <Empty>Aucune demande encore — l&rsquo;entonnoir démarre à la première réservation.</Empty>
      ) : (
        <FunnelCard f={funnel} />
      )}

      <SectionTitle title="Cohortes de réservation" sub="par mois de réservation · 12 derniers mois" />
      {cohorts.length === 0 ? (
        <Empty>Pas encore de cohorte — la première apparaît dès ce mois-ci.</Empty>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-sand-4)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-sand-9)]">
              <th className="py-2 pr-4 font-medium">Mois</th>
              <th className="py-2 pr-4 text-right font-medium">Demandes</th>
              <th className="py-2 pr-4 text-right font-medium">Confirmées</th>
              <th className="py-2 pr-4 text-right font-medium">Conversion</th>
              <th className="py-2 pr-4 text-right font-medium">Revenu engagé</th>
              <th className="py-2 text-right font-medium">Lead-time</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((c) => (
              <tr key={c.month} className="border-b border-[var(--color-sand-3)]">
                <td className="py-3 pr-4 text-[14px] capitalize text-[var(--color-sand-12)]">{monthLabel(c.month)}</td>
                <td className="py-3 pr-4 text-right text-[14px] tabular-nums text-[var(--color-sand-11)]">{c.demandes}</td>
                <td className="py-3 pr-4 text-right text-[14px] tabular-nums text-[var(--color-sand-11)]">{c.confirmees}</td>
                <td className="py-3 pr-4 text-right text-[14px] tabular-nums text-[var(--color-sand-11)]">
                  {c.conversion != null ? pct(c.conversion) : '—'}
                </td>
                <td className="py-3 pr-4 text-right font-display text-[14px] tabular-nums text-[var(--color-sand-12)]">
                  {money(c.revenueMinor, 'MGA')}
                </td>
                <td className="py-3 text-right text-[14px] tabular-nums text-[var(--color-sand-11)]">
                  {c.avgLeadDays != null ? `${c.avgLeadDays} j` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <SectionTitle title="Clients" sub="fidélisation — un client = un même profil invité" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Clients" value={`${ret.guests}`} hint="≥ 1 séjour confirmé" muted={ret.guests === 0} />
        <Kpi label="Récurrents" value={`${ret.returning}`} hint="≥ 2 séjours" muted={ret.returning === 0} />
        <Kpi
          label="Taux de retour"
          value={ret.repeatRate != null && ret.returning > 0 ? pct(ret.repeatRate) : '—'}
          hint="clients récurrents"
          muted={ret.returning === 0}
        />
        <Kpi
          label="Valeur moyenne / client"
          value={ret.guests > 0 ? money(ret.avgRevenueMinor, 'MGA') : '—'}
          hint="revenu engagé"
          muted={ret.guests === 0}
        />
      </div>
    </div>
  );
}
