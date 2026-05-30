/**
 * Prouve le cycle de vie des réservations côté staff contre la vraie base.
 * Reproduit FIDÈLEMENT la transaction de `setReservationStatus`
 * (src/lib/db/admin-reservations.ts) — update gardé par `expectedFrom` + event
 * d'audit — puis vérifie : confirm depuis pending, garde anti-stale, annulation
 * qui RELÂCHE la chambre (trigger `reservation_sync_blocks`), et le cycle
 * complet confirmed → checked_in → checked_out où arrivée/départ NE relâchent
 * PAS la chambre. Marqueur 'VerifyStatus' → nettoyable.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import { getAvailability } from '../src/lib/db/availability';
import { createReservation } from '../src/lib/db/reservations';

const IN = '2027-04-01';
const OUT = '2027-04-03'; // 2 nuits

type Db = ReturnType<typeof drizzle>;

/** Miroir exact de setReservationStatus() — testé ici contre la vraie base. */
async function setStatus(
  db: Db,
  id: string,
  status: 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out' | 'no_show',
  actor: string,
  expectedFrom?: string,
): Promise<void> {
  await db.transaction(async (tx) => {
    const updated = (await tx.execute(sql`
      update reservation set status = ${status}
      where id = ${id}::uuid
        ${expectedFrom ? sql`and status = ${expectedFrom}` : sql``}
      returning id
    `)) as unknown as { id: string }[];
    if (updated.length === 0) {
      throw new Error('réservation introuvable ou déjà dans un autre état');
    }
    await tx.execute(sql`
      insert into reservation_event (reservation_id, type, actor, data)
      values (${id}::uuid, ${status}, ${actor}, ${JSON.stringify({ via: 'admin' })}::jsonb)
    `);
  });
}

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL absent');
  const client = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const db = drizzle(client);

  const cleanup = async () => {
    await client`delete from reservation where guest_id in (select id from guest where last_name = 'VerifyStatus')`;
    await client`delete from guest where last_name = 'VerifyStatus'`;
  };
  const sup = (rows: Awaited<ReturnType<typeof getAvailability>>) =>
    rows.find((x) => x.slug === 'superieure')?.available ?? 0;
  const avail = async () => sup(await getAvailability(db, { checkIn: IN, checkOut: OUT }));
  const statusOf = async (id: string) =>
    ((await client`select status from reservation where id = ${id}`) as unknown as { status: string }[])[0]
      ?.status;
  const eventsOf = async (id: string, type: string) =>
    Number(
      (
        (await client`select count(*)::int as n from reservation_event where reservation_id = ${id} and type = ${type}`) as unknown as {
          n: number;
        }[]
      )[0].n,
    );
  const out: string[] = [];
  const check = (label: string, ok: boolean) => out.push(`${ok ? '✓' : '✗ FAIL'} ${label}`);

  try {
    await cleanup();
    const base = await avail();
    check(`dispo initiale Supérieure = ${base} (attendu 2)`, base === 2);

    // 1) Résa pending → tient la chambre
    const r = await createReservation(db, {
      checkIn: IN,
      checkOut: OUT,
      guest: { firstName: 'V', lastName: 'VerifyStatus', email: 'v@example.com' },
      rooms: [{ roomTypeSlug: 'superieure', adults: 2 }],
    });
    check(`résa pending créée — réf ${r.reference}`, r.status === 'pending');
    check(`hold pending → Supérieure ${await avail()} (attendu 1)`, (await avail()) === 1);

    // 2) Confirmer depuis pending (garde expectedFrom='pending')
    await setStatus(db, r.id, 'confirmed', 'verify@test', 'pending');
    check(`statut après confirm = ${await statusOf(r.id)}`, (await statusOf(r.id)) === 'confirmed');
    check(`event 'confirmed' écrit`, (await eventsOf(r.id, 'confirmed')) === 1);
    check(`confirmée tient toujours la chambre → Supérieure ${await avail()} (attendu 1)`, (await avail()) === 1);

    // 3) Garde anti-stale : re-confirmer depuis pending doit échouer (déjà confirmed)
    let guarded = false;
    try {
      await setStatus(db, r.id, 'confirmed', 'verify@test', 'pending');
    } catch (e) {
      guarded = (e as Error).message.includes('déjà dans un autre état');
    }
    check(`garde expectedFrom : re-confirm rejetée`, guarded);
    check(`pas de 2e event 'confirmed' (rollback)`, (await eventsOf(r.id, 'confirmed')) === 1);

    // 4) Annuler → trigger reservation_sync_blocks relâche la chambre
    await setStatus(db, r.id, 'cancelled', 'verify@test');
    check(`statut après annulation = ${await statusOf(r.id)}`, (await statusOf(r.id)) === 'cancelled');
    check(`event 'cancelled' écrit`, (await eventsOf(r.id, 'cancelled')) === 1);
    check(`annulation RELÂCHE la chambre → Supérieure ${await avail()} (attendu 2)`, (await avail()) === 2);

    // 5) Cycle de vie complet : confirmed → checked_in → checked_out.
    //    Arrivée/Départ NE relâchent PAS la chambre (≠ annulation).
    const r2 = await createReservation(db, {
      checkIn: IN,
      checkOut: OUT,
      guest: { firstName: 'V2', lastName: 'VerifyStatus', email: 'v2@example.com' },
      rooms: [{ roomTypeSlug: 'superieure', adults: 2 }],
    });
    await setStatus(db, r2.id, 'confirmed', 'verify@test', 'pending');
    await setStatus(db, r2.id, 'checked_in', 'verify@test', 'confirmed');
    check(`check-in : statut = ${await statusOf(r2.id)}`, (await statusOf(r2.id)) === 'checked_in');
    check(`event 'checked_in' écrit`, (await eventsOf(r2.id, 'checked_in')) === 1);
    check(`arrivée NE relâche PAS → Supérieure ${await avail()} (attendu 1)`, (await avail()) === 1);

    await setStatus(db, r2.id, 'checked_out', 'verify@test', 'checked_in');
    check(`check-out : statut = ${await statusOf(r2.id)}`, (await statusOf(r2.id)) === 'checked_out');
    check(`event 'checked_out' écrit`, (await eventsOf(r2.id, 'checked_out')) === 1);
    check(`départ NE relâche PAS → Supérieure ${await avail()} (attendu 1)`, (await avail()) === 1);

    let g2 = false;
    try {
      await setStatus(db, r2.id, 'checked_in', 'verify@test', 'confirmed');
    } catch (e) {
      g2 = (e as Error).message.includes('déjà dans un autre état');
    }
    check(`garde : check-in depuis checked_out rejeté`, g2);

    await cleanup();
    check(`après nettoyage → Supérieure ${await avail()} (attendu 2)`, (await avail()) === 2);
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
