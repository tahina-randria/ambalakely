import 'server-only';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';

/**
 * Couche métriques du desk (Tableau de bord). Calcule les KPI hôteliers
 * standards (occupation, ADR, RevPAR, revenu) sur une fenêtre de nuitées, plus
 * l'acquisition (conversion, lead-time, canal) et le snapshot du jour.
 *
 * Tout est calculé sur la VRAIE donnée — aucun chiffre inventé. Quand il n'y a
 * rien, les fonctions renvoient 0 / null et l'UI affiche un état vide honnête.
 * Les horodatages « aujourd'hui » sont évalués dans le fuseau de l'hôtel.
 */

const TZ = 'Indian/Antananarivo';

export type DashRange = 'next30' | 'next90' | 'last30' | 'last90';

export type ResolvedRange = {
  key: DashRange;
  label: string;
  start: string; // 'YYYY-MM-DD' inclus
  end: string; // 'YYYY-MM-DD' exclu
  days: number;
  future: boolean;
};

const DAY = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Aujourd'hui dans le fuseau de l'hôtel (UTC+3, sans DST) → minuit local. */
function hotelToday(): Date {
  const now = new Date();
  const local = new Date(now.getTime() + 3 * 3600 * 1000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

export function resolveRange(key: string | undefined): ResolvedRange {
  const t = hotelToday();
  const mk = (k: DashRange, label: string, fromOffset: number, days: number, future: boolean): ResolvedRange => {
    const start = new Date(t.getTime() + fromOffset * DAY);
    const end = new Date(start.getTime() + days * DAY);
    return { key: k, label, start: iso(start), end: iso(end), days, future };
  };
  switch (key) {
    case 'next90':
      return mk('next90', '90 prochains jours', 0, 90, true);
    case 'last30':
      return mk('last30', '30 derniers jours', -30, 30, false);
    case 'last90':
      return mk('last90', '90 derniers jours', -90, 90, false);
    case 'next30':
    default:
      return mk('next30', '30 prochains jours', 0, 30, true);
  }
}

export type Kpis = {
  range: ResolvedRange;
  rooms: number;
  soldNights: number;
  availableNights: number;
  roomRevenueMinor: number;
  occupancy: number | null; // 0..1
  adrMinor: number | null;
  revparMinor: number | null;
  currency: string;
};

/**
 * Occupation / ADR / RevPAR / revenu sur la fenêtre. Méthode standard :
 *  • on ne compte que les nuitées qui TOMBENT dans la fenêtre (intersection
 *    [check_in, check_out) ∩ [start, end)) ;
 *  • le revenu d'un séjour est proraté à ces nuitées ;
 *  • statuts pris en compte = confirmé / arrivé / parti (le « on the books »),
 *    jamais pending (hold) ni annulé ; séjours overnight uniquement.
 */
export async function getKpis(range: ResolvedRange): Promise<Kpis> {
  const rows = (await db.execute(sql`
    with stays as (
      select rr.amount_minor::numeric as amt,
             (r.check_out - r.check_in) as total_nights,
             greatest(0, least(r.check_out, ${range.end}::date) - greatest(r.check_in, ${range.start}::date)) as niw
      from reservation_room rr
      join reservation r on r.id = rr.reservation_id
      where r.status in ('confirmed', 'checked_in', 'checked_out')
        and rr.stay_type = 'overnight'
        and r.check_in < ${range.end}::date
        and r.check_out > ${range.start}::date
    )
    select
      (select count(*) from room where is_active) as rooms,
      coalesce(sum(niw), 0)::int as sold_nights,
      coalesce(round(sum(amt * niw / nullif(total_nights, 0))), 0)::bigint as revenue
    from stays
  `)) as unknown as { rooms: string; sold_nights: number; revenue: string }[];

  const r = rows[0];
  const rooms = Number(r.rooms);
  const soldNights = Number(r.sold_nights);
  const availableNights = rooms * range.days;
  const roomRevenueMinor = Number(r.revenue);

  return {
    range,
    rooms,
    soldNights,
    availableNights,
    roomRevenueMinor,
    occupancy: availableNights > 0 ? soldNights / availableNights : null,
    adrMinor: soldNights > 0 ? Math.round(roomRevenueMinor / soldNights) : null,
    revparMinor: availableNights > 0 ? Math.round(roomRevenueMinor / availableNights) : null,
    currency: 'MGA',
  };
}

export type Acquisition = {
  windowDays: number;
  created: number;
  confirmed: number;
  lost: number;
  pending: number;
  conversion: number | null; // confirmé / décidé (hors pending)
  avgLeadDays: number | null;
  channels: { channel: string; count: number }[];
};

/** Acquisition sur les réservations CRÉÉES dans la fenêtre glissante (jours). */
export async function getAcquisition(windowDays = 30): Promise<Acquisition> {
  const since = sql`((now() at time zone ${TZ})::date - ${windowDays})`;
  const rows = (await db.execute(sql`
    select
      count(*)::int as created,
      count(*) filter (where status in ('confirmed', 'checked_in', 'checked_out'))::int as confirmed,
      count(*) filter (where status in ('cancelled', 'no_show'))::int as lost,
      count(*) filter (where status = 'pending')::int as pending,
      round(avg(check_in - created_at::date) filter (where status in ('confirmed', 'checked_in', 'checked_out')))::int as avg_lead
    from reservation
    where created_at >= ${since}
  `)) as unknown as {
    created: number;
    confirmed: number;
    lost: number;
    pending: number;
    avg_lead: number | null;
  }[];
  const channels = (await db.execute(sql`
    select channel, count(*)::int as n
    from reservation
    where created_at >= ${since} and status <> 'cancelled'
    group by channel
    order by n desc
  `)) as unknown as { channel: string; n: number }[];

  const a = rows[0];
  const decided = a.confirmed + a.lost;
  return {
    windowDays,
    created: a.created,
    confirmed: a.confirmed,
    lost: a.lost,
    pending: a.pending,
    conversion: decided > 0 ? a.confirmed / decided : null,
    avgLeadDays: a.avg_lead != null ? Number(a.avg_lead) : null,
    channels: channels.map((c) => ({ channel: c.channel, count: Number(c.n) })),
  };
}

export type Today = {
  arrivals: number;
  departures: number;
  inHouse: number;
  roomsTotal: number;
  occupiedTonight: number;
  pending: number;
  soonestHoldSeconds: number | null;
};

/** Snapshot opérationnel du jour (fuseau hôtel). */
export async function getToday(): Promise<Today> {
  const rows = (await db.execute(sql`
    with t as (select (now() at time zone ${TZ})::date as today)
    select
      (select count(*)::int from reservation
        where check_in = (select today from t) and status in ('confirmed', 'checked_in')) as arrivals,
      (select count(*)::int from reservation
        where check_out = (select today from t) and status in ('checked_in', 'checked_out')) as departures,
      (select count(*)::int from reservation where status = 'checked_in') as in_house,
      (select count(*)::int from room where is_active) as rooms_total,
      (select count(*)::int
         from reservation_room rr join reservation r on r.id = rr.reservation_id
        where r.status in ('confirmed', 'checked_in', 'checked_out') and rr.blocks_inventory
          and r.check_in <= (select today from t) and r.check_out > (select today from t)) as occupied_tonight,
      (select count(*)::int from reservation where status = 'pending') as pending,
      (select extract(epoch from (min(hold_expires_at) - now()))::int
         from reservation where status = 'pending' and hold_expires_at > now()) as soonest_hold_seconds
  `)) as unknown as Record<string, number | null>[];

  const r = rows[0];
  return {
    arrivals: Number(r.arrivals),
    departures: Number(r.departures),
    inHouse: Number(r.in_house),
    roomsTotal: Number(r.rooms_total),
    occupiedTonight: Number(r.occupied_tonight),
    pending: Number(r.pending),
    soonestHoldSeconds: r.soonest_hold_seconds != null ? Number(r.soonest_hold_seconds) : null,
  };
}
