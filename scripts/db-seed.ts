/**
 * Seeds the real Ambalakely inventory (idempotent — safe to re-run).
 * Source: src/lib/data/categories.ts + docs (PDF tarifs 2026). No invented data.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import * as schema from '../src/lib/db/schema';

const ROOM_TYPES = [
  { slug: 'superieure', name: 'Supérieure', maxOccupancy: 4, sizeSqm: 43, basePriceMinor: 255000, dayUsePriceMinor: 192000, sort: 1 },
  { slug: 'confort', name: 'Confort', maxOccupancy: 3, sizeSqm: 29, basePriceMinor: 226000, dayUsePriceMinor: 170000, sort: 2 },
  { slug: 'standard', name: 'Standard', maxOccupancy: 2, sizeSqm: 21, basePriceMinor: 182000, dayUsePriceMinor: 137000, sort: 3 },
] as const;

const ROOMS: { code: string; name?: string; type: (typeof ROOM_TYPES)[number]['slug'] }[] = [
  { code: '14', name: 'Rogaland Suite', type: 'superieure' },
  { code: '15', name: 'Kristiansand Suite', type: 'superieure' },
  { code: '1', type: 'confort' },
  { code: '2', type: 'confort' },
  { code: '11', type: 'confort' },
  { code: '12', type: 'confort' },
  { code: '4', type: 'standard' },
  { code: '5', type: 'standard' },
  { code: '6', type: 'standard' },
  { code: '7', type: 'standard' },
];

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL / DATABASE_URL absent');
  const client = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const db = drizzle(client, { schema });

  try {
    await db
      .insert(schema.property)
      .values({ name: 'Hôtel Ambalakely', slug: 'ambalakely' })
      .onConflictDoNothing();
    const [prop] = await db
      .select()
      .from(schema.property)
      .where(eq(schema.property.slug, 'ambalakely'));

    for (const t of ROOM_TYPES) {
      await db
        .insert(schema.roomType)
        .values({ propertyId: prop.id, ...t })
        .onConflictDoNothing();
    }
    const typeRows = await db
      .select()
      .from(schema.roomType)
      .where(eq(schema.roomType.propertyId, prop.id));
    const idBySlug = new Map(typeRows.map((r) => [r.slug, r.id]));

    let sort = 0;
    for (const r of ROOMS) {
      await db
        .insert(schema.room)
        .values({
          propertyId: prop.id,
          roomTypeId: idBySlug.get(r.type)!,
          code: r.code,
          name: r.name ?? null,
          sort: sort++,
        })
        .onConflictDoNothing();
    }

    await db
      .insert(schema.ratePlan)
      .values({ propertyId: prop.id, code: 'public', name: 'Public', isDefault: true })
      .onConflictDoNothing();

    const rooms = await db.select().from(schema.room).where(eq(schema.room.propertyId, prop.id));
    console.log(`property: ${prop.name} (${prop.id})`);
    console.log(`room types: ${typeRows.length} | rooms: ${rooms.length}`);
    for (const t of typeRows.sort((a, b) => a.sort - b.sort)) {
      const codes = rooms
        .filter((x) => x.roomTypeId === t.id)
        .map((x) => x.code)
        .join(', ');
      console.log(`  ${t.name.padEnd(11)} ${t.basePriceMinor} MGA  rooms[${codes}]`);
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
