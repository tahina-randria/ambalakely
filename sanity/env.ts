/**
 * Sanity environment — defaults match the deployed project so the hosted
 * Studio (hotel-ambalakely.sanity.studio) works without env injection.
 * In Next.js builds, .env.local can override (e.g. for staging datasets).
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zfb59l35';

export const useCdn = false;
