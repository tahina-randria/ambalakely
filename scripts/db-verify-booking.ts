/**
 * Prouve createReservation contre la vraie base : crée des résas (persistées
 * puis nettoyées), vérifie statut pending / référence / total / hold, la baisse
 * de dispo, et le REFUS de survente. Marqueur 'VerifyBooking' → nettoyable.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { getAvailability } from '../src/lib/db/availability';
import { createReservation } from '../src/lib/db/reservations';

const IN = '2027-03-01';
const OUT = '2027-03-03'; // 2 nuits

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL absent');
  const client = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const db = drizzle(client);

  const cleanup = async () => {
    await client`delete from reservation where guest_id in (select id from guest where last_name = 'VerifyBooking')`;
    await client`delete from guest where last_name = 'VerifyBooking'`;
  };
  const sup = (rows: Awaited<ReturnType<typeof getAvailability>>) =>
    rows.find((x) => x.slug === 'superieure')?.available ?? 0;
  const out: string[] = [];
  const check = (label: string, ok: boolean) => out.push(`${ok ? '✓' : '✗ FAIL'} ${label}`);

  try {
    await cleanup();

    const r1 = await createReservation(db, {
      checkIn: IN,
      checkOut: OUT,
      guest: { firstName: 'V', lastName: 'VerifyBooking', email: 'v@example.com' },
      rooms: [{ roomTypeSlug: 'superieure', adults: 2 }],
    });
    check(`résa créée — réf ${r1.reference}, statut ${r1.status}`, r1.status === 'pending' && /^AMB-[A-Z2-9]{6}$/.test(r1.reference));
    check(`total = ${r1.totalMinor} MGA (attendu 510000 = 2×255000)`, r1.totalMinor === 510000);

    const [meta] = (await client`
      select r.hold_expires_at,
             extract(epoch from (r.hold_expires_at - now()))/3600 as hold_h,
             (select count(*) from reservation_room rr where rr.reservation_id = r.id) as rooms,
             (select count(*) from reservation_event e where e.reservation_id = r.id) as events
      from reservation r where r.id = ${r1.id}`) as unknown as {
      hold_h: number;
      rooms: string;
      events: string;
    }[];
    check(`hold ≈ 48 h (mesuré ${Number(meta.hold_h).toFixed(1)} h)`, Math.abs(Number(meta.hold_h) - 48) < 1);
    check(`1 ligne chambre + 1 event d'audit`, Number(meta.rooms) === 1 && Number(meta.events) === 1);

    check(`dispo Supérieure 2 → ${sup(await getAvailability(db, { checkIn: IN, checkOut: OUT }))} (attendu 1)`,
      sup(await getAvailability(db, { checkIn: IN, checkOut: OUT })) === 1);

    await createReservation(db, {
      checkIn: IN,
      checkOut: OUT,
      guest: { firstName: 'V2', lastName: 'VerifyBooking' },
      rooms: [{ roomTypeSlug: 'superieure', adults: 1 }],
    });
    check(`après 2e résa → Supérieure ${sup(await getAvailability(db, { checkIn: IN, checkOut: OUT }))} (attendu 0)`,
      sup(await getAvailability(db, { checkIn: IN, checkOut: OUT })) === 0);

    let refused = false;
    try {
      await createReservation(db, {
        checkIn: IN,
        checkOut: OUT,
        guest: { firstName: 'V3', lastName: 'VerifyBooking' },
        rooms: [{ roomTypeSlug: 'superieure', adults: 1 }],
      });
    } catch (e) {
      refused = (e as Error).message.includes('indisponible');
    }
    check(`survente refusée (3e Supérieure rejetée)`, refused);

    await cleanup();
    check(`après nettoyage → Supérieure ${sup(await getAvailability(db, { checkIn: IN, checkOut: OUT }))} (attendu 2)`,
      sup(await getAvailability(db, { checkIn: IN, checkOut: OUT })) === 2);
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
