import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Server-only DB client. Connects over the Supabase transaction pooler
 * (DATABASE_URL, port 6543) → `prepare: false` is required. Cached on
 * globalThis so Next.js HMR doesn't open a new pool on every reload.
 */
const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL absent');

const globalForDb = globalThis as unknown as { _pgClient?: ReturnType<typeof postgres> };

const client =
  globalForDb._pgClient ?? postgres(url, { prepare: false, ssl: 'require', max: 10 });

if (process.env.NODE_ENV !== 'production') globalForDb._pgClient = client;

export const db = drizzle(client, { schema });
export { schema };
