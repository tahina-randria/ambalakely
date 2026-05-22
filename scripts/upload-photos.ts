/**
 * Upload des 47 photos /public/photos/*.webp comme assets Sanity.
 *
 * Idempotent: cherche d'abord un asset existant avec le même
 * originalFilename. Si trouvé, skip. Sinon upload.
 *
 * Écrit scripts/photo-asset-map.json : { "p01_*.webp": "image-..._id" }
 * Ce mapping sera utilisé en ÉTAPE 5 pour wirer les photos aux schémas.
 *
 * Lance avec: pnpm photos:upload
 */

import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, createReadStream, writeFileSync } from 'node:fs';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

const projectRoot = resolve(__dirname, '..');
const photosDir = resolve(projectRoot, 'public', 'photos');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

interface AssetDoc {
  _id: string;
  originalFilename?: string;
}

async function uploadOne(file: string): Promise<{ filename: string; _id: string; status: 'uploaded' | 'skipped' }> {
  const filename = basename(file);

  // Idempotency: look up existing asset by originalFilename
  const existing = await client.fetch<AssetDoc | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]{ _id, originalFilename }`,
    { f: filename },
  );

  if (existing) {
    return { filename, _id: existing._id, status: 'skipped' };
  }

  const asset = await client.assets.upload('image', createReadStream(file), {
    filename,
  });

  return { filename, _id: asset._id, status: 'uploaded' };
}

async function main() {
  const files = readdirSync(photosDir)
    .filter((f) => f.endsWith('.webp'))
    .sort()
    .map((f) => resolve(photosDir, f));

  if (files.length === 0) {
    console.error(`No .webp files in ${photosDir}`);
    process.exit(1);
  }

  console.log(`Uploading ${files.length} photos to Sanity…`);

  const mapping: Record<string, string> = {};
  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const result = await uploadOne(file);
      mapping[result.filename] = result._id;
      if (result.status === 'uploaded') uploaded++;
      else skipped++;
      const flag = result.status === 'uploaded' ? '⬆' : '✓';
      console.log(`  ${flag} ${result.filename} → ${result._id}`);
    } catch (err) {
      console.error(`  ✗ ${basename(file)} FAILED:`, err);
      throw err;
    }
  }

  const mapPath = resolve(__dirname, 'photo-asset-map.json');
  writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped (already in Sanity).`);
  console.log(`Mapping written to ${mapPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
