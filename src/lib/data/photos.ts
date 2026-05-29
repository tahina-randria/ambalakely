import { HOTEL } from './hotel';

/**
 * Local photo paths and absolute URLs.
 *
 * The 47 originals are in /public/photos/p**.webp (33 MB total, optimised
 * to ~75 % from the JPG masters). Each slot below maps a semantic role
 * (hero, story, rooms, etc.) to one of the 47.
 *
 * `path` is the relative URL for use in <img src> / next/image src.
 * `url` is the absolute URL (needed by JSON-LD, OG metadata, sitemaps).
 *
 * When the domain migrates to hotelambalakely.com, update HOTEL.vercelUrl
 * or swap to HOTEL.url everywhere and the absolute URLs follow.
 */

const BASE = HOTEL.vercelUrl;

function photo(file: string) {
  const path = `/photos/${file}` as const;
  return { path, url: `${BASE}${path}` } as const;
}

export const PHOTOS = {
  hero: photo('p23_hotel_ambalakely_dsc6429.webp'),
  story: photo('p22_hotel_ambalakely_dsc6428.webp'),
  diningSection: photo('p41_hotel_ambalakely_dsc6381.webp'),
  diningHero: photo('p41_hotel_ambalakely_dsc6381.webp'),
  rooms: photo('p45_hotel_ambalakely_dsc6388.webp'),
  about: photo('p23_hotel_ambalakely_dsc6429.webp'),
  // §44 — founders section stand-in. The 47-photo set has no portraits,
  // so the /about FOUNDERS block used to repeat the hero shot (p23). The
  // fireside lounge reads as a warm, family-run house and is visually
  // distinct from the exterior hero. ⚠️ NEEDS REAL CONTENT : swap to an
  // actual Hasina + Mamy portrait once one is available.
  founders: photo('p44_hotel_ambalakely_dsc6387.webp'),
  experiences: photo('p23_hotel_ambalakely_dsc6429.webp'),
  planTrip: photo('p05_hotel_ambalakely_dsc6402.webp'),
  faq: photo('p32_hotel_ambalakely_dsc6361.webp'),
  diningLounge: photo('p44_hotel_ambalakely_dsc6387.webp'),
  // §40 — dining gallery (4 photos asymétriques sur /dining). Choix
  // provisoire dans la plage p40-p46 du dossier dining-cluster. À
  // affiner par la suite si certaines photos ne sont pas dining.
  diningGallery1: photo('p40_hotel_ambalakely_dsc6378.webp'),
  diningGallery2: photo('p42_hotel_ambalakely_dsc6382.webp'),
  diningGallery3: photo('p43_hotel_ambalakely_dsc6386.webp'),
  diningGallery4: photo('p46_hotel_ambalakely_dsc6389.webp'),
} as const;
