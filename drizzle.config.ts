import { config } from 'dotenv';
config({ path: '.env.local' });

import { defineConfig } from 'drizzle-kit';

// drizzle-kit (studio / future generate) uses the session pooler (DIRECT_URL).
// Note: the canonical migrations in drizzle/*.sql are hand-written and applied
// via `pnpm db:migrate` — they carry the EXCLUDE constraint, generated column,
// triggers and RLS that drizzle-kit cannot express.
export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '' },
});
