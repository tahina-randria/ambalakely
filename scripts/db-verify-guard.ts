/**
 * Empirical proof of the no-overbooking guard. Everything runs inside one
 * transaction that is rolled back at the end → no test data is persisted.
 * Asserts: (A) overlapping occupancy on the same room is REJECTED by the DB,
 * (B) adjacent (touching, non-overlapping) is allowed, (C) a morning day-use
 * and an evening overnight on the same room/date coexist.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';

const TZ = '+03'; // Indian/Antananarivo (EAT, UTC+3)

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL / DATABASE_URL absent');
  const sql = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });

  const results: string[] = [];
  try {
    await sql.begin(async (sql) => {
      const [room] = await sql`select id, room_type_id, property_id from room where code = '14' limit 1`;
      const [g] = await sql`
        insert into guest (property_id, first_name, last_name)
        values (${room.property_id}, 'Test', 'Guard') returning id`;
      const [r] = await sql`
        insert into reservation (property_id, reference, guest_id, check_in, check_out)
        values (${room.property_id}, ${'TEST-' + Date.now()}, ${g.id}, '2026-07-01', '2026-07-03')
        returning id`;

      const occ = (start: string, end: string, stay = 'overnight') => sql`
        insert into reservation_room (reservation_id, room_type_id, room_id, stay_type, check_in_at, check_out_at)
        values (${r.id}, ${room.room_type_id}, ${room.id}, ${stay}, ${start}, ${end})`;

      // baseline occupancy: 1–3 Jul
      await occ(`2026-07-01 13:00${TZ}`, `2026-07-03 11:00${TZ}`);

      // (A) overlapping 2–4 Jul → must be rejected (SQLSTATE 23P01)
      let blocked = false;
      try {
        await sql.savepoint((sql) =>
          sql`insert into reservation_room (reservation_id, room_type_id, room_id, check_in_at, check_out_at)
              values (${r.id}, ${room.room_type_id}, ${room.id}, ${`2026-07-02 13:00${TZ}`}, ${`2026-07-04 11:00${TZ}`})`,
        );
      } catch (e: unknown) {
        blocked = (e as { code?: string }).code === '23P01';
      }
      results.push(`A. double-booking qui chevauche → ${blocked ? 'REJETÉ ✓' : 'ACCEPTÉ ✗ (bug!)'}`);

      // (B) adjacent 3–5 Jul (checkout 11:00 ≤ next checkin... here touches at [) bound) → allowed
      let adjacentOk = true;
      try {
        await sql.savepoint(() => occ(`2026-07-03 13:00${TZ}`, `2026-07-05 11:00${TZ}`));
      } catch {
        adjacentOk = false;
      }
      results.push(`B. nuitée adjacente (sans chevauchement) → ${adjacentOk ? 'ACCEPTÉ ✓' : 'REJETÉ ✗'}`);

      // (C) same day: day-use 09–13 then overnight 13→next-day on the same room
      let sameDayOk = true;
      try {
        await sql.savepoint(async (sql) => {
          await sql`insert into reservation_room (reservation_id, room_type_id, room_id, stay_type, check_in_at, check_out_at)
                    values (${r.id}, ${room.room_type_id}, ${room.id}, 'day_use', ${`2026-07-20 09:00${TZ}`}, ${`2026-07-20 13:00${TZ}`})`;
          await sql`insert into reservation_room (reservation_id, room_type_id, room_id, check_in_at, check_out_at)
                    values (${r.id}, ${room.room_type_id}, ${room.id}, ${`2026-07-20 13:00${TZ}`}, ${`2026-07-21 11:00${TZ}`})`;
        });
      } catch {
        sameDayOk = false;
      }
      results.push(`C. day-use matin + nuitée soir (même chambre, même jour) → ${sameDayOk ? 'ACCEPTÉ ✓' : 'REJETÉ ✗'}`);

      // discard all test data
      throw new Error('__rollback__');
    });
  } catch (e: unknown) {
    if ((e as Error).message !== '__rollback__') throw e;
  } finally {
    await sql.end();
  }

  console.log(results.join('\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
