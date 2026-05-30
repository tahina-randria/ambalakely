/**
 * Applies the hand-written SQL migrations in drizzle/*.sql, in order, over the
 * session pooler (DIRECT_URL). Each .sql file is sent as one simple-query batch
 * → Postgres wraps it in an implicit transaction (atomic: all-or-nothing).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DIRECT_URL / DATABASE_URL absent de .env.local');

  const sql = postgres(url, { max: 1, prepare: false, ssl: 'require', onnotice: () => {} });
  const dir = join(process.cwd(), 'drizzle');
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  try {
    for (const f of files) {
      process.stdout.write(`applying ${f} … `);
      await sql.unsafe(readFileSync(join(dir, f), 'utf8'));
      console.log('ok');
    }
    console.log('migrations done');
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
