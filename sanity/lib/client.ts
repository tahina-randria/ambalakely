import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

/**
 * Shared Sanity client. Use in Server Components or build-time data fetches.
 * - Reads with token NOT included (data is public).
 * - useCdn=false in dev for fresh data; flip to true for prod via env.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});
