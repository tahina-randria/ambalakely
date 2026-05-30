/**
 * Proves the availability engine against real seeded inventory, inside one
 * rolled-back transaction (no data persisted). Checks: baseline = full
 * inventory; booking one Supérieure room drops its availability by 1 for
 * overlapping dates; non-overlapping dates are unaffected.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import { getAvailability } from '../src/lib/db/availability';

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL / DATABASE_URL absent');
  const client = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const db = drizzle(client);

  const out: string[] = [];
  const sup = (rows: Awaited<ReturnType<typeof getAvailability>>) =>
    rows.find((x) => x.slug === 'superieure')?.available ?? 0;

  try {
    await db.transaction(async (tx) => {
      const base = await getAvailability(tx, { checkIn: '2026-09-01', checkOut: '2026-09-03' });
      out.push(`baseline → Supérieure ${sup(base)} (attendu 2), ${base.length} types dispo`);

      const [room] = (await tx.execute(
        sql`select id, room_type_id, property_id from room where code = '14' limit 1`,
      )) as unknown as { id: string; room_type_id: string; property_id: string }[];
      const [g] = (await tx.execute(
        sql`insert into guest (property_id, first_name, last_name)
            values (${room.property_id}, 'Test', 'Avail') returning id`,
      )) as unknown as { id: string }[];
      const [r] = (await tx.execute(
        sql`insert into reservation (property_id, reference, guest_id, check_in, check_out)
            values (${room.property_id}, ${'TEST-' + Date.now()}, ${g.id}, '2026-09-01', '2026-09-03')
            returning id`,
      )) as unknown as { id: string }[];
      await tx.execute(
        sql`insert into reservation_room (reservation_id, room_type_id, room_id, check_in_at, check_out_at)
            values (${r.id}, ${room.room_type_id}, ${room.id}, '2026-09-01 13:00+03', '2026-09-03 11:00+03')`,
      );

      const after = await getAvailability(tx, { checkIn: '2026-09-01', checkOut: '2026-09-03' });
      out.push(`après 1 résa (chevauchant) → Supérieure ${sup(after)} (attendu 1)`);

      const other = await getAvailability(tx, { checkIn: '2026-10-01', checkOut: '2026-10-03' });
      out.push(`dates non chevauchantes → Supérieure ${sup(other)} (attendu 2)`);

      // le trigger sync_blocks_inventory doit libérer l'inventaire à l'annulation
      await tx.execute(sql`update reservation set status = 'cancelled' where id = ${r.id}`);
      const cancelled = await getAvailability(tx, { checkIn: '2026-09-01', checkOut: '2026-09-03' });
      out.push(`après annulation (trigger) → Supérieure ${sup(cancelled)} (attendu 2)`);

      throw new Error('__rollback__');
    });
  } catch (e: unknown) {
    if ((e as Error).message !== '__rollback__') throw e;
  } finally {
    await client.end();
  }

  console.log(out.join('\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
