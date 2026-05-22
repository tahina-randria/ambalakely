import { redirect } from 'next/navigation';

/**
 * Local /studio redirects to the deployed cloud Studio.
 *
 * The Sanity Studio is bundled by the Sanity CLI (`sanity deploy`) and lives
 * at https://hotel-ambalakely.sanity.studio. Embedding it inside the Next.js
 * build hits an upstream incompatibility — Sanity 5.26 imports
 * `useEffectEvent` from `react`, but Next 15 ships an older compiled React
 * that doesn't expose it. Sanity has not patched this yet.
 *
 * The local redirect keeps the `/studio` URL working for editors while
 * sidestepping the Next bundle entirely.
 */

const STUDIO_CLOUD_URL = 'https://hotel-ambalakely.sanity.studio/';

export default function StudioPage() {
  redirect(STUDIO_CLOUD_URL);
}
