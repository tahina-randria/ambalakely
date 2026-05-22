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
  experiences: photo('p23_hotel_ambalakely_dsc6429.webp'),
  planTrip: photo('p05_hotel_ambalakely_dsc6402.webp'),
  faq: photo('p32_hotel_ambalakely_dsc6361.webp'),
  diningLounge: photo('p44_hotel_ambalakely_dsc6387.webp'),
} as const;
