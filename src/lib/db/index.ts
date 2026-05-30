import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Server-only DB client. Connects over the Supabase transaction pooler
 * (DATABASE_URL, port 6543) → `prepare: false` is required. Cached on
 * globalThis so Next.js HMR doesn't open a new pool on every reload.
 *
 * `max: 1` : en serverless (Vercel) le pooler transaction multiplexe déjà ;
 * une grande pool par instance × N instances épuise le pooler. 1 conn/instance
 * est le réglage Supabase recommandé. (Sur un serveur long-running dédié, on
 * pourrait monter ce nombre.)
 */
const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL absent');

const globalForDb = globalThis as unknown as {
  _pgClient?: ReturnType<typeof postgres>;
  _pgWriteClient?: ReturnType<typeof postgres>;
};

const client =
  globalForDb._pgClient ?? postgres(url, { prepare: false, ssl: 'require', max: 1 });

if (process.env.NODE_ENV !== 'production') globalForDb._pgClient = client;

export const db = drizzle(client, { schema });

/**
 * Client d'écriture sur le session pooler (DIRECT_URL, port 5432). Les
 * transactions interactives (BEGIN..COMMIT, isolation serializable) ne sont
 * PAS fiables sur le pooler transaction (6543) qui change de connexion entre
 * requêtes. Les écritures (réservations) passent donc par celui-ci.
 */
const writeUrl = process.env.DIRECT_URL ?? url;
const writeClient =
  globalForDb._pgWriteClient ?? postgres(writeUrl, { prepare: false, ssl: 'require', max: 1 });

if (process.env.NODE_ENV !== 'production') globalForDb._pgWriteClient = writeClient;

export const dbWrite = drizzle(writeClient, { schema });
export { schema };
