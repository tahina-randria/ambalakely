/**
 * Migration script — lit src/lib/data/*.ts et POST vers Sanity.
 *
 * Idempotent : utilise createOrReplace avec _id déterministes.
 * Lance avec: pnpm migrate:sanity
 *
 * Skip les images (TODO ÉTAPE 4 : upload assets puis wire références).
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

import { HOTEL } from '../src/lib/data/hotel';
import { categories } from '../src/lib/data/categories';
import { getReviews } from '../src/lib/data/reviews';
import { articles } from '../src/lib/data/articles';
import { experiences } from '../src/lib/data/experiences';
import { itineraries } from '../src/lib/data/itineraries';
import { faq } from '../src/lib/data/faq';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

// ─── helpers ──────────────────────────────────────────────────────────────

const fr = (s: string) => ({ fr: s, en: '' });
const en = (s: string) => ({ fr: '', en: s });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

let keyCounter = 0;
const k = () => `k${(keyCounter++).toString(36)}`;

const faqCategoryFr: Record<string, string> = {
  booking: 'Réservation',
  arrival: 'Transferts',
  rooms: 'Chambres',
  food: 'Restaurant',
  nearby: 'Excursions',
  money: 'Paiement',
  health: 'Pratique',
  practical: 'Pratique',
};

// ─── build documents ──────────────────────────────────────────────────────

const docs: Record<string, unknown>[] = [];

// 1. Hôtel (singleton)
docs.push({
  _id: 'hotel-singleton',
  _type: 'hotel',
  name: HOTEL.name,
  shortName: HOTEL.shortName,
  legalName: HOTEL.legalName,
  tagline: fr(HOTEL.tagline),
  description: fr(HOTEL.description),
  founded: HOTEL.founded,
  founders: [...HOTEL.founders],
  url: HOTEL.url,
  email: HOTEL.email,
  phone: HOTEL.phone,
  whatsapp: HOTEL.whatsapp,
  address: { ...HOTEL.address },
  geo: { ...HOTEL.geo },
  rooms: HOTEL.rooms,
  totalCapacity: HOTEL.totalCapacity,
  priceRange: HOTEL.priceRange,
  concept: {
    phrase: HOTEL.concept.phrase,
    translation: HOTEL.concept.translation,
    description: fr(HOTEL.concept.description),
  },
  tgh: {
    name: HOTEL.tgh.name,
    abbreviation: HOTEL.tgh.abbreviation,
    tagline: HOTEL.tgh.tagline,
    taglineFr: HOTEL.tgh.taglineFr,
    foundedYearsAgo: HOTEL.tgh.foundedYearsAgo,
    description: fr(HOTEL.tgh.description),
  },
  hours: { ...HOTEL.hours },
  amenities: HOTEL.amenities.map((a) => ({ _key: k(), ...fr(a) })),
  languages: [...HOTEL.languages],
  rating: {
    value: HOTEL.rating.value,
    count: HOTEL.rating.count,
    sources: [...HOTEL.rating.sources],
  },
  socials: { ...HOTEL.socials },
});

// 2. Room categories
for (const cat of categories) {
  docs.push({
    _id: `category-${cat.slug}`,
    _type: 'roomCategory',
    slug: { _type: 'slug', current: cat.slug },
    number: cat.number,
    name: fr(cat.name),
    suiteNames: cat.suiteNames ?? [],
    roomNumbers: [...cat.roomNumbers],
    size: cat.size,
    capacity: cat.capacity,
    count: cat.count,
    countNum: cat.countNum,
    priceMga: cat.priceMga,
    priceMgaDayUse: cat.priceMgaDayUse,
    shortDescription: fr(cat.shortDescription),
    longDescription: fr(cat.longDescription),
    bedSetup: fr(cat.bedSetup),
    view: fr(cat.view),
    bestFor: fr(cat.bestFor),
    features: cat.features.map((f) => ({
      _key: k(),
      icon: f.icon,
      label: fr(f.label),
    })),
    concierge: {
      body: fr(cat.concierge.body),
      signed: cat.concierge.signed,
    },
    pullQuote: fr(cat.pullQuote),
  });
}

// 3. Reviews — seed FR + EN + NO from the trilingual source so any
// Studio editor can switch tabs without going through the JSON.
// The old script was FR-only and pulled from the legacy rooms.ts list
// (Ada, Giovanni, Anna Maria, etc. — unverified Booking / Google) — those
// docs were deleted from Sanity 2026-05-27 §32 #124 and the new helper
// `getReviews(locale)` returns the 9 curated TripAdvisor quotes only.
const reviewsFR = getReviews('fr');
const reviewsEN = getReviews('en');
const reviewsNO = getReviews('no');
reviewsFR.forEach((r, i) => {
  const en = reviewsEN[i];
  const no = reviewsNO[i];
  docs.push({
    _id: `review-${slugify(r.author)}`,
    _type: 'review',
    quote: { _type: 'localeText', fr: r.quote, en: en.quote, no: no.quote },
    author: r.author,
    city: r.city,
    source: r.source,
    order: i,
  });
});

// 4. Articles — body source is EN paragraphs → portable text
for (const a of articles) {
  docs.push({
    _id: `article-${a.slug}`,
    _type: 'article',
    slug: { _type: 'slug', current: a.slug },
    title: en(a.title),
    date: a.datePublished,
    excerpt: en(a.excerpt),
    body: {
      fr: [],
      en: a.body.map((p) => ({
        _key: k(),
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _key: k(), _type: 'span', marks: [], text: p }],
      })),
    },
    author: a.author,
    published: true,
  });
}

// 5. Excursions (English source)
for (const e of experiences) {
  docs.push({
    _id: `excursion-${e.slug}`,
    _type: 'excursion',
    slug: { _type: 'slug', current: e.slug },
    number: e.number,
    name: en(e.name),
    duration: en(e.duration),
    tagline: en(e.tagline),
    body: en(e.body),
    best: en(e.best),
    cost: e.cost ? en(e.cost) : undefined,
    ctaLabel: en(e.ctaLabel),
    category: e.slug === 'community' ? 'local' : 'main',
  });
}

// 6. Itineraries
for (const it of itineraries) {
  docs.push({
    _id: `itinerary-${it.slug}`,
    _type: 'itinerary',
    slug: { _type: 'slug', current: it.slug },
    title: en(it.title),
    duration: it.duration,
    summary: en(it.pitch),
    days: it.days.map((d) => ({
      _key: k(),
      day: d.day,
      title: en(d.title),
      body: en(d.transit ? `${d.body}\n\nTransit: ${d.transit}` : d.body),
    })),
  });
}

// 7. FAQ — flatten all categories
let faqOrder = 0;
for (const cat of faq) {
  for (const e of cat.entries) {
    docs.push({
      _id: `faq-${cat.slug}-${slugify(e.q).slice(0, 40)}`,
      _type: 'faq',
      question: en(e.q),
      answer: en(e.a),
      category: faqCategoryFr[cat.slug] ?? 'Pratique',
      order: faqOrder++,
    });
  }
}

// 8. Community (Hope for the Future) — facts from HANDOFF section 5
docs.push({
  _id: 'community-singleton',
  _type: 'community',
  name: 'Hope for the Future',
  founded: '2014',
  location: 'Tanambao, Ambalakely',
  activeChildren: 130,
  communePopulation: 4000,
  description: fr(
    "Une école d'à côté à Tanambao, fondée par Mamy et Hasina en 2014. Cent trente enfants actifs. La commune de Tanambao compte environ quatre mille habitants.",
  ),
  // 8 programs (évangélisation filtered out per HANDOFF rule 3)
  programs: [
    {
      _key: k(),
      title: fr('Éducation'),
      description: fr(
        "Soutien scolaire, français/malgache/maths, repas chaud les jours d'école.",
      ),
    },
    {
      _key: k(),
      title: fr('Santé et hygiène'),
      description: fr(''),
    },
    {
      _key: k(),
      title: fr('Danse, musique et sport'),
      description: fr(''),
    },
    {
      _key: k(),
      title: fr('Environnement et agriculture'),
      description: fr(''),
    },
    {
      _key: k(),
      title: fr('Arts et travaux pratiques'),
      description: fr(''),
    },
    {
      _key: k(),
      title: fr('Clubs de langues'),
      description: fr('Anglais, norvégien, français en projet.'),
    },
    {
      _key: k(),
      title: fr('Histoire et connaissances générales'),
      description: fr(''),
    },
    {
      _key: k(),
      title: fr('Formation professionnelle'),
      description: fr(''),
    },
  ],
  akanimamy: {
    meaning: 'Akany (foyer/nid) + mamy (doux) = doux foyer / nid douillet',
    landAcquired: '2019',
    landSizeSqm: 2000,
    buildingSizeSqm: 152,
    constructionStarted: '1er septembre 2020',
    plannedFeatures: [
      { _key: k(), ...fr('Bibliothèque') },
      { _key: k(), ...fr('Jeux de société') },
      { _key: k(), ...fr('Bureau du chef de projet') },
      { _key: k(), ...fr('Stockage') },
      { _key: k(), ...fr('Terrain basketball/volley') },
      { _key: k(), ...fr('Arbres fruitiers') },
      { _key: k(), ...fr('Potager') },
      { _key: k(), ...fr('Pisciculture avec canards') },
      { _key: k(), ...fr('Plantation de Ravintsara') },
    ],
  },
});

// 9. Staff — public-facing (per HANDOFF rule 4, M. Héris & Mme Mamitiana not exposed)
docs.push(
  {
    _id: 'staff-mamy',
    _type: 'staff',
    name: 'Mamy RANDRIANANDRAINA',
    role: fr('Co-fondateur'),
    bio: fr(
      'Practical man and a great connoisseur of Madagascar. Network and field knowledge. Vingt ans d\'expérience tourisme avec Trans Groupe Hasina.',
    ),
    public: true,
    order: 1,
  },
  {
    _id: 'staff-hasina',
    _type: 'staff',
    name: 'Hasina RANDRIAMAHAZO',
    role: fr('Co-fondatrice, cuisine, hôtesse'),
    bio: fr(
      "Études à l'Universitetet i Stavanger, Norvège. Cinq ans en Norvège, parle norvégien couramment. Sa mère était amie de longue date d'une fille de missionnaire norvégien à Madagascar. A voyagé au Cap Nord (Midnattsolen).",
    ),
    public: true,
    order: 2,
  },
  {
    _id: 'staff-andre',
    _type: 'staff',
    name: 'André RANDRIANIRINA',
    role: fr('Directeur financier'),
    bio: fr(
      'Directeur financier depuis 2013. Randonneur passionné (Andringitra, Isalo Window).',
    ),
    public: true,
    order: 3,
  },
  {
    _id: 'staff-seheno',
    _type: 'staff',
    name: 'Seheno RANDRIAMANANA R.',
    role: fr('Conseillère voyage'),
    bio: fr(
      "D'Ihosy (près d'Isalo). Ancienne étudiante d'Hasina à l'Université de Fianarantsoa en \"Tourisme durable et écotourisme\".",
    ),
    public: true,
    order: 4,
  },
);

// 10. Pages — minimal SEO metadata
const pages = [
  { slug: '/', title: 'Accueil', desc: HOTEL.description },
  { slug: '/rooms', title: 'Chambres', desc: 'Dix chambres dans les hautes terres.' },
  {
    slug: '/dining',
    title: 'Restaurant Toko Telo',
    desc: "Le restaurant de l'hôtel. Petit déjeuner, déjeuner, dîner.",
  },
  {
    slug: '/experiences',
    title: 'Expériences',
    desc: "Excursions arrangées depuis l'hôtel.",
  },
  {
    slug: '/community',
    title: 'Hope for the Future',
    desc: "L'école d'à côté à Tanambao.",
  },
  { slug: '/about', title: 'À propos', desc: 'Mamy et Hasina, depuis 2018.' },
  { slug: '/faq', title: 'FAQ', desc: 'Questions fréquentes.' },
];
for (const p of pages) {
  const idPart = p.slug === '/' ? 'home' : slugify(p.slug);
  docs.push({
    _id: `page-${idPart}`,
    _type: 'page',
    slug: { _type: 'slug', current: p.slug },
    title: fr(p.title),
    description: fr(p.desc),
  });
}

// ─── commit ───────────────────────────────────────────────────────────────

async function run() {
  console.log(
    `Migrating ${docs.length} documents → projectId=${projectId} dataset=${dataset}…`,
  );
  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc as { _id: string; _type: string });
  }
  const result = await tx.commit();
  console.log(`✅ Wrote ${result.results.length} documents.`);

  const byType = docs.reduce<Record<string, number>>((acc, d) => {
    const t = d._type as string;
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {});
  console.log('By type:', byType);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
