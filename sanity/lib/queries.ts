/**
 * GROQ queries — each projects to a flat shape matching the existing
 * `src/lib/data/*.ts` exports, so components can swap imports without
 * other changes. Locale is unwrapped in GROQ (default fr, fallback en).
 *
 * The `coalesce(field.fr, field.en, "")` pattern enforces HANDOFF rule 7
 * (French primary, English fallback).
 */

import { defineQuery } from 'next-sanity';

const FR = (field: string) => `coalesce(${field}.fr, ${field}.en, "")`;

// ─── Hotel singleton ──────────────────────────────────────────────────────

export const HOTEL_QUERY = defineQuery(`
  *[_type == "hotel"][0]{
    name,
    shortName,
    legalName,
    "tagline": ${FR('tagline')},
    "description": ${FR('description')},
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
      "description": ${FR('concept.description')}
    },
    "tgh": {
      "name": tgh.name,
      "abbreviation": tgh.abbreviation,
      "tagline": tgh.tagline,
      "taglineFr": tgh.taglineFr,
      "foundedYearsAgo": tgh.foundedYearsAgo,
      "description": ${FR('tgh.description')}
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
    "name": ${FR('name')},
    suiteNames,
    roomNumbers,
    size,
    capacity,
    count,
    countNum,
    priceMga,
    priceMgaDayUse,
    "shortDescription": ${FR('shortDescription')},
    "longDescription": ${FR('longDescription')},
    "bedSetup": ${FR('bedSetup')},
    "view": ${FR('view')},
    "bestFor": ${FR('bestFor')},
    "features": features[]{
      icon,
      "label": ${FR('label')}
    },
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    "concierge": {
      "body": ${FR('concierge.body')},
      "signed": concierge.signed
    },
    "pullQuote": ${FR('pullQuote')}
  }
`);

// ─── Reviews ──────────────────────────────────────────────────────────────

export const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] | order(order asc){
    "quote": ${FR('quote')},
    author,
    city,
    source
  }
`);

// ─── Articles ─────────────────────────────────────────────────────────────

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && published == true] | order(date desc){
    "slug": slug.current,
    "title": coalesce(title.en, title.fr, ""),
    date,
    "excerpt": coalesce(excerpt.en, excerpt.fr, ""),
    "body": coalesce(body.en, body.fr),
    author,
    "heroImage": heroImage.asset->url
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    "slug": slug.current,
    "title": coalesce(title.en, title.fr, ""),
    date,
    "excerpt": coalesce(excerpt.en, excerpt.fr, ""),
    "body": coalesce(body.en, body.fr),
    author,
    "heroImage": heroImage.asset->url
  }
`);

// ─── Excursions ───────────────────────────────────────────────────────────

export const EXCURSIONS_QUERY = defineQuery(`
  *[_type == "excursion"] | order(number asc){
    "slug": slug.current,
    number,
    "name": coalesce(name.en, name.fr, ""),
    "duration": coalesce(duration.en, duration.fr, ""),
    "tagline": coalesce(tagline.en, tagline.fr, ""),
    "body": coalesce(body.en, body.fr, ""),
    "best": coalesce(best.en, best.fr, ""),
    "cost": coalesce(cost.en, cost.fr, ""),
    "image": image.asset->url,
    "ctaLabel": coalesce(ctaLabel.en, ctaLabel.fr, ""),
    category
  }
`);

// ─── Itineraries ──────────────────────────────────────────────────────────

export const ITINERARIES_QUERY = defineQuery(`
  *[_type == "itinerary"] | order(duration asc){
    "slug": slug.current,
    duration,
    "title": coalesce(title.en, title.fr, ""),
    "pitch": coalesce(summary.en, summary.fr, ""),
    "days": days[]{
      day,
      "title": coalesce(title.en, title.fr, ""),
      "body": coalesce(body.en, body.fr, "")
    },
    "image": heroImage.asset->url
  }
`);

// ─── FAQ ──────────────────────────────────────────────────────────────────

export const FAQ_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc){
    "q": coalesce(question.en, question.fr, ""),
    "a": coalesce(answer.en, answer.fr, ""),
    category
  }
`);

// ─── Staff ────────────────────────────────────────────────────────────────

export const STAFF_QUERY = defineQuery(`
  *[_type == "staff" && public == true] | order(order asc){
    name,
    "role": ${FR('role')},
    "bio": ${FR('bio')},
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
    "description": ${FR('description')},
    "programs": programs[]{
      "title": ${FR('title')},
      "description": ${FR('description')}
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
    "title": ${FR('title')},
    "description": ${FR('description')},
    "heroHeadline": ${FR('heroHeadline')},
    "heroSubline": ${FR('heroSubline')},
    "heroImage": heroImage.asset->url,
    "seoTitle": ${FR('seoTitle')},
    "seoDescription": ${FR('seoDescription')}
  }
`);
