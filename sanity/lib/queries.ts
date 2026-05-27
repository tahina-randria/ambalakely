/**
 * GROQ queries — each projects to a flat shape matching the existing
 * `src/lib/data/*.ts` exports, so components can swap imports without
 * other changes. Locale is unwrapped in GROQ from the `$locale` param.
 *
 * Locale strategy (post-§30 audit) :
 *   - Sanity has bilingual fields stored as `field.fr`, `field.en`, `field.no`.
 *   - State of the dataset as of 2026-05-27 :
 *       Group A — fr populated, en empty : hotel, roomCategory, review, community
 *       Group B — en populated, fr empty : excursion, itinerary, faq
 *       Group C — empty                 : article
 *   - To avoid the home FR showing English (because the old
 *     `coalesce(field.fr, field.en, "")` returned the empty string as a
 *     truthy value before reaching the EN fallback), the new helper is
 *     STRICT : it only returns the value for the requested locale and
 *     filters out the empty string. If the locale is empty, GROQ returns
 *     null and the JS-side merge in `fetch.ts` falls back to the local
 *     `.ts` source (which is in FR). That way :
 *       /fr — Sanity .fr if non-empty, else local FR fallback
 *       /en — Sanity .en if non-empty, else local FR fallback (still
 *             better than nothing ; will be improved once EN is
 *             populated in Sanity for the entities that need it).
 *       /no — Sanity .no if non-empty, else local FR fallback
 *
 * Each fetch helper passes `{ locale }` to the GROQ runtime. Consuming
 * Server Components call `await getLocale()` from `next-intl/server`
 * and forward it.
 */

import { defineQuery } from 'next-sanity';

/**
 * Returns the field value for the current `$locale` param, treating the
 * empty string as null (so the JS-side merge can substitute the local
 * fallback). Returns null when the locale-specific value is missing.
 */
const LOC = (field: string) => `select(
  ${field}[$locale] != null && ${field}[$locale] != "" => ${field}[$locale],
  null
)`;

// ─── Hotel singleton ──────────────────────────────────────────────────────

export const HOTEL_QUERY = defineQuery(`
  *[_type == "hotel"][0]{
    name,
    shortName,
    legalName,
    "tagline": ${LOC('tagline')},
    "description": ${LOC('description')},
    founded,
    founders,
    url,
    email,
    phone,
    whatsapp,
    address,
    geo,
    rooms,
    totalCapacity,
    priceRange,
    "concept": {
      "phrase": concept.phrase,
      "translation": concept.translation,
      "description": ${LOC('concept.description')}
    },
    "tgh": {
      "name": tgh.name,
      "abbreviation": tgh.abbreviation,
      "tagline": tgh.tagline,
      "taglineFr": tgh.taglineFr,
      "foundedYearsAgo": tgh.foundedYearsAgo,
      "description": ${LOC('tgh.description')}
    },
    hours,
    "amenities": amenities[].fr,
    languages,
    rating,
    socials
  }
`);

// ─── Room categories ──────────────────────────────────────────────────────

export const ROOM_CATEGORIES_QUERY = defineQuery(`
  *[_type == "roomCategory"] | order(number asc){
    "slug": slug.current,
    number,
    "name": ${LOC('name')},
    suiteNames,
    roomNumbers,
    size,
    capacity,
    count,
    countNum,
    priceMga,
    priceMgaDayUse,
    "shortDescription": ${LOC('shortDescription')},
    "longDescription": ${LOC('longDescription')},
    "bedSetup": ${LOC('bedSetup')},
    "view": ${LOC('view')},
    "bestFor": ${LOC('bestFor')},
    "features": features[]{
      icon,
      "label": ${LOC('label')}
    },
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    "concierge": {
      "body": ${LOC('concierge.body')},
      "signed": concierge.signed
    },
    "pullQuote": ${LOC('pullQuote')}
  }
`);

// ─── Reviews ──────────────────────────────────────────────────────────────

export const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] | order(order asc){
    "quote": ${LOC('quote')},
    author,
    city,
    source,
    date
  }
`);

// ─── Articles ─────────────────────────────────────────────────────────────

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && published == true] | order(date desc){
    "slug": slug.current,
    "title": ${LOC('title')},
    date,
    "excerpt": ${LOC('excerpt')},
    "body": ${LOC('body')},
    author,
    "heroImage": heroImage.asset->url
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    "slug": slug.current,
    "title": ${LOC('title')},
    date,
    "excerpt": ${LOC('excerpt')},
    "body": ${LOC('body')},
    author,
    "heroImage": heroImage.asset->url
  }
`);

// ─── Excursions ───────────────────────────────────────────────────────────

export const EXCURSIONS_QUERY = defineQuery(`
  *[_type == "excursion"] | order(number asc){
    "slug": slug.current,
    number,
    "name": ${LOC('name')},
    "duration": ${LOC('duration')},
    "tagline": ${LOC('tagline')},
    "body": ${LOC('body')},
    "best": ${LOC('best')},
    "cost": ${LOC('cost')},
    "image": image.asset->url,
    "ctaLabel": ${LOC('ctaLabel')},
    category
  }
`);

// ─── Itineraries ──────────────────────────────────────────────────────────

export const ITINERARIES_QUERY = defineQuery(`
  *[_type == "itinerary"] | order(duration asc){
    "slug": slug.current,
    duration,
    "title": ${LOC('title')},
    "pitch": ${LOC('summary')},
    "days": days[]{
      day,
      "title": ${LOC('title')},
      "body": ${LOC('body')}
    },
    "image": heroImage.asset->url
  }
`);

// ─── FAQ ──────────────────────────────────────────────────────────────────

export const FAQ_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc){
    "q": ${LOC('question')},
    "a": ${LOC('answer')},
    category
  }
`);

// ─── Staff ────────────────────────────────────────────────────────────────

export const STAFF_QUERY = defineQuery(`
  *[_type == "staff" && public == true] | order(order asc){
    name,
    "role": ${LOC('role')},
    "bio": ${LOC('bio')},
    "photo": photo.asset->url
  }
`);

// ─── Community (HFF singleton) ────────────────────────────────────────────

export const COMMUNITY_QUERY = defineQuery(`
  *[_type == "community"][0]{
    name,
    founded,
    location,
    activeChildren,
    communePopulation,
    "description": ${LOC('description')},
    "programs": programs[]{
      "title": ${LOC('title')},
      "description": ${LOC('description')}
    },
    "akanimamy": {
      "meaning": akanimamy.meaning,
      "landAcquired": akanimamy.landAcquired,
      "landSizeSqm": akanimamy.landSizeSqm,
      "buildingSizeSqm": akanimamy.buildingSizeSqm,
      "constructionStarted": akanimamy.constructionStarted,
      "plannedFeatures": akanimamy.plannedFeatures[].fr
    }
  }
`);

// ─── Pages (SEO + hero per route) ─────────────────────────────────────────

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    "slug": slug.current,
    "title": ${LOC('title')},
    "description": ${LOC('description')},
    "heroHeadline": ${LOC('heroHeadline')},
    "heroSubline": ${LOC('heroSubline')},
    "heroImage": heroImage.asset->url,
    "seoTitle": ${LOC('seoTitle')},
    "seoDescription": ${LOC('seoDescription')}
  }
`);
