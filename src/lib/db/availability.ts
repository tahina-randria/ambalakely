import { sql, type SQL } from 'drizzle-orm';

/**
 * Disponibilité par type de chambre sur un intervalle.
 *
 * Méthode = concurrence-pic (standard PMS) : pour un séjour contigu, le nombre
 * de chambres réservables d'un type = (chambres actives du type) − (nombre
 * maximum d'occupations simultanées du type à un instant de l'intervalle).
 * Le pic est calculé par balayage (sweep-line) sur les bornes des occupations,
 * en semi-ouvert `[)` (une chambre libérée à 11h et reprise à 13h ne compte pas
 * comme un conflit). Compte les occupations assignées ET non assignées (résa
 * par type non encore attribuée), car chacune consomme une unité d'inventaire.
 *
 * Exécuteur injecté (db ou tx) → testable dans une transaction annulée.
 * Lecture en une seule requête → OK sur le pooler transaction.
 */
export type TypeAvailability = {
  typeId: string;
  slug: string;
  name: string;
  maxOccupancy: number;
  totalRooms: number;
  available: number;
  nights: number;
  pricePerNightMinor: number;
  totalMinor: number;
  currency: string;
};

type Executor = { execute: (query: SQL) => Promise<unknown> };

type Row = {
  type_id: string;
  slug: string;
  name: string;
  max_occupancy: number;
  base_price_minor: string;
  currency: string;
  total_rooms: string;
  available: string;
};

export async function getAvailability(
  exec: Executor,
  opts: { checkIn: string; checkOut: string; guests?: number; propertySlug?: string },
): Promise<TypeAvailability[]> {
  const { checkIn, checkOut, guests = 1, propertySlug = 'ambalakely' } = opts;
  const nights = Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000);
  if (!Number.isFinite(nights) || nights < 1) {
    throw new Error('check_out doit être strictement après check_in');
  }

  const query = sql`
    with p as (
      select id, timezone, check_in_time, check_out_time
      from property where slug = ${propertySlug}
    ),
    itv as (
      select
        ((${checkIn}::date  + (select check_in_time  from p)) at time zone (select timezone from p)) as i_start,
        ((${checkOut}::date + (select check_out_time from p)) at time zone (select timezone from p)) as i_end,
        (select id from p) as property_id
    ),
    totals as (
      select rt.id as type_id, rt.slug, rt.name, rt.max_occupancy,
             rt.base_price_minor, rt.currency,
             count(r.id) filter (where r.is_active) as total_rooms
      from room_type rt
      left join room r on r.room_type_id = rt.id
      where rt.property_id = (select property_id from itv)
      group by rt.id
    ),
    occ as (
      select rr.room_type_id,
             greatest(lower(rr.occupancy), (select i_start from itv)) as s,
             least(upper(rr.occupancy),  (select i_end   from itv)) as e
      from reservation_room rr
      join reservation res on res.id = rr.reservation_id
      where rr.blocks_inventory
        and rr.occupancy && tstzrange((select i_start from itv), (select i_end from itv), '[)')
        and rr.room_type_id in (select type_id from totals)
        -- a pending hold past its expiry stops blocking inventory (self-releasing,
        -- so an abandoned request frees the room without a background sweep)
        and not (res.status = 'pending' and res.hold_expires_at is not null and res.hold_expires_at < now())
    ),
    events as (
      select room_type_id, s as t,  1 as delta from occ
      union all
      select room_type_id, e as t, -1 as delta from occ
    ),
    running as (
      select room_type_id,
             sum(delta) over (partition by room_type_id order by t asc, delta asc) as concurrent
      from events
    ),
    peaks as (select room_type_id, max(concurrent) as peak from running group by room_type_id)
    select t.type_id, t.slug, t.name, t.max_occupancy, t.base_price_minor, t.currency,
           t.total_rooms,
           greatest(t.total_rooms - coalesce(pk.peak, 0), 0) as available
    from totals t
    left join peaks pk on pk.room_type_id = t.type_id
    order by t.base_price_minor desc
  `;

  const rows = (await exec.execute(query)) as unknown as Row[];

  return rows
    .map((r) => {
      const pricePerNightMinor = Number(r.base_price_minor);
      return {
        typeId: r.type_id,
        slug: r.slug,
        name: r.name,
        maxOccupancy: Number(r.max_occupancy),
        totalRooms: Number(r.total_rooms),
        available: Number(r.available),
        nights,
        pricePerNightMinor,
        totalMinor: pricePerNightMinor * nights,
        currency: r.currency,
      };
    })
    .filter((t) => t.available > 0 && t.maxOccupancy >= guests);
}
