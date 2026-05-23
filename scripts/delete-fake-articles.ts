/**
 * One-shot cleanup: removes the 3 invented "Hasina-voice" articles from Sanity.
 * These were seeded by `migrate-to-sanity.ts` from `src/lib/data/articles.ts`
 * before the truth pass flagged them as fabricated.
 *
 * Idempotent: deleting an already-missing _id is a no-op.
 * After running, `/journal` falls back to the empty state.
 *
 * Run: pnpm tsx scripts/delete-fake-articles.ts
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

const FAKE_ARTICLE_IDS = [
  'article-ten-years-of-community',
  'article-what-the-garden-gives-in-april',
  'article-koselig-in-the-highlands',
];

async function main() {
  // First: list all article docs so we don't miss any with a different _id.
  const existing = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "article"]{ _id, "title": coalesce(title.fr, title.en, "<no title>") }`,
  );
  console.log(`Found ${existing.length} article doc(s) in Sanity:`);
  existing.forEach((a) => console.log(`  - ${a._id}  ::  ${a.title}`));

  // Delete every article doc — the dataset will be empty after this.
  const idsToDelete = existing.map((a) => a._id);
  if (idsToDelete.length === 0) {
    console.log('Nothing to delete.');
    return;
  }

  const tx = client.transaction();
  for (const id of idsToDelete) tx.delete(id);
  const result = await tx.commit();
  console.log(`Deleted ${idsToDelete.length} article doc(s). Transaction:`, result.transactionId);

  // Cross-check the original 3 expected IDs
  const unexpected = idsToDelete.filter((id) => !FAKE_ARTICLE_IDS.includes(id));
  if (unexpected.length > 0) {
    console.log('Note: also deleted unexpected article docs:', unexpected);
  }
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
