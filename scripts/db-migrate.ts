/**
 * Applique les migrations SQL de drizzle/*.sql, dans l'ordre, sur le session
 * pooler (DIRECT_URL). Suivi des migrations dans la table `_migrations` :
 *  • idempotent — relançable sans risque, n'applique que les fichiers nouveaux ;
 *  • chaque fichier + son enregistrement sont appliqués dans UNE transaction
 *    (atomique : tout ou rien) ;
 *  • auto-baseline — si le schéma existe déjà mais que 0000 n'est pas tracé
 *    (cas d'une base créée avant ce runner), on le marque comme appliqué.
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

  try {
    await sql`create table if not exists _migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    )`;

    const applied = new Set(
      (await sql`select filename from _migrations`).map((r) => r.filename as string),
    );

    // auto-baseline : base déjà créée avant le suivi → marque 0000 sans le rejouer
    const schemaExists =
      (await sql`select to_regclass('public.reservation_room') as t`)[0].t != null;
    if (schemaExists && !applied.has('0000_init.sql')) {
      await sql`insert into _migrations (filename) values ('0000_init.sql') on conflict do nothing`;
      applied.add('0000_init.sql');
      console.log('baseline: 0000_init.sql marqué comme déjà appliqué');
    }

    const files = readdirSync(dir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    let n = 0;
    for (const f of files) {
      if (applied.has(f)) {
        console.log(`skip   ${f}`);
        continue;
      }
      process.stdout.write(`apply  ${f} … `);
      await sql.begin(async (tx) => {
        await tx.unsafe(readFileSync(join(dir, f), 'utf8'));
        await tx`insert into _migrations (filename) values (${f})`;
      });
      console.log('ok');
      n++;
    }
    console.log(n ? `${n} migration(s) appliquée(s)` : 'à jour');
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
