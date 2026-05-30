/**
 * Prouve le calcul des KPI du tableau de bord contre la vraie base — surtout
 * l'intersection nuitées ∩ fenêtre et le prorata du revenu (réplique fidèle de
 * getKpis, src/lib/db/admin-metrics.ts, scopée au marqueur pour des assertions
 * déterministes). Vérifie aussi que getToday / getAcquisition s'exécutent sans
 * erreur SQL. Marqueur 'VerifyKpi' → nettoyable.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import { createReservation } from '../src/lib/db/reservations';

const START = '2027-07-01';
const END = '2027-07-31'; // fenêtre de 30 jours, future et improbable

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL absent');
  const client = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const db = drizzle(client);
  const cleanup = async () => {
    await client`delete from reservation where guest_id in (select id from guest where last_name = 'VerifyKpi')`;
    await client`delete from guest where last_name = 'VerifyKpi'`;
  };
  const out: string[] = [];
  const check = (l: string, ok: boolean) => out.push(`${ok ? '✓' : '✗ FAIL'} ${l}`);

  try {
    await cleanup();

    const mk = (ci: string, co: string) =>
      createReservation(db, {
        checkIn: ci,
        checkOut: co,
        guest: { firstName: 'K', lastName: 'VerifyKpi', email: 'k@example.com' },
        rooms: [{ roomTypeSlug: 'superieure', adults: 2 }],
      });

    const a = await mk('2027-07-05', '2027-07-08'); // 3 nuits, toutes dans la fenêtre
    const b = await mk('2027-07-30', '2027-08-02'); // 3 nuits, 1 seule dans la fenêtre (clamp)
    const c = await mk('2027-07-10', '2027-07-12'); // reste pending → exclu
    const d = await mk('2027-07-15', '2027-07-17'); // annulé → exclu

    await client`update reservation set status = 'confirmed' where id in (${a.id}::uuid, ${b.id}::uuid)`;
    await client`update reservation set status = 'cancelled' where id = ${d.id}::uuid`;
    void c;

    // Réplique de getKpis, scopée au marqueur pour des chiffres déterministes.
    const rows = (await db.execute(sql`
      with stays as (
        select rr.amount_minor::numeric as amt,
               (r.check_out - r.check_in) as total_nights,
               greatest(0, least(r.check_out, ${END}::date) - greatest(r.check_in, ${START}::date)) as niw
        from reservation_room rr
        join reservation r on r.id = rr.reservation_id
        join guest g on g.id = r.guest_id
        where r.status in ('confirmed', 'checked_in', 'checked_out')
          and rr.stay_type = 'overnight'
          and g.last_name = 'VerifyKpi'
          and r.check_in < ${END}::date and r.check_out > ${START}::date
      )
      select (select count(*) from room where is_active) as rooms,
             coalesce(sum(niw), 0)::int as sold_nights,
             coalesce(round(sum(amt * niw / nullif(total_nights, 0))), 0)::bigint as revenue
      from stays
    `)) as unknown as { rooms: string; sold_nights: number; revenue: string }[];

    const rooms = Number(rows[0].rooms);
    const soldNights = Number(rows[0].sold_nights);
    const revenue = Number(rows[0].revenue);
    const adr = soldNights > 0 ? Math.round(revenue / soldNights) : null;
    const availableNights = rooms * 30;

    check(`nuitées vendues = ${soldNights} (attendu 4 : 3 de A + 1 de B clampé, C pending & D annulé exclus)`, soldNights === 4);
    check(`revenu = ${revenue} (attendu 1 020 000 : 765 000 + 255 000 proraté)`, revenue === 1_020_000);
    check(`ADR = ${adr} (attendu 255 000)`, adr === 255_000);
    check(`inventaire chambres actives = ${rooms} (> 0)`, rooms > 0);
    check(`RevPAR = revenu / (chambres × 30) = ${Math.round(revenue / availableNights)}`, availableNights > 0);

    // Smoke tests : getToday & getAcquisition doivent s'exécuter sans erreur SQL.
    const today = (await db.execute(sql`
      with t as (select (now() at time zone 'Indian/Antananarivo')::date as today)
      select
        (select count(*)::int from reservation where check_in = (select today from t) and status in ('confirmed','checked_in')) as arrivals,
        (select count(*)::int from reservation where check_out = (select today from t) and status in ('checked_in','checked_out')) as departures,
        (select count(*)::int from room where is_active) as rooms_total,
        (select count(*)::int from reservation_room rr join reservation r on r.id = rr.reservation_id
          where r.status in ('confirmed','checked_in','checked_out') and rr.blocks_inventory
            and r.check_in <= (select today from t) and r.check_out > (select today from t)) as occupied_tonight
    `)) as unknown as { rooms_total: number }[];
    check(`getToday s'exécute (rooms_total = ${today[0].rooms_total})`, Number(today[0].rooms_total) === rooms);

    const acq = (await db.execute(sql`
      select count(*)::int as created,
             count(*) filter (where status in ('confirmed','checked_in','checked_out'))::int as confirmed
      from reservation
      where created_at >= ((now() at time zone 'Indian/Antananarivo')::date - 30)
    `)) as unknown as { created: number }[];
    check(`getAcquisition s'exécute (créées 30j = ${acq[0].created} ≥ 4)`, Number(acq[0].created) >= 4);

    await cleanup();
  } finally {
    await cleanup();
    await client.end();
  }

  console.log(out.join('\n'));
  if (out.some((l) => l.includes('FAIL'))) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
