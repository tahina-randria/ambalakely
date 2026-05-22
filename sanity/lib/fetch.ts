/**
 * Typed fetchers — try Sanity first, fall back to the static `.ts` data
 * if the dataset is empty or the request fails. This is the "graceful
 * degradation" path: the site keeps rendering even if Sanity is down
 * or while data is being edited.
 *
 * Each fetcher returns the SAME SHAPE as the corresponding .ts export,
 * so component imports can swap with no other change.
 *
 * Server Components only. Calling from client components requires
 * passing the resolved value as a prop.
 */

import { sanityClient } from './client';
import {
  HOTEL_QUERY,
  ROOM_CATEGORIES_QUERY,
  REVIEWS_QUERY,
  ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  EXCURSIONS_QUERY,
  ITINERARIES_QUERY,
  FAQ_QUERY,
  STAFF_QUERY,
  COMMUNITY_QUERY,
} from './queries';

import { HOTEL as HOTEL_FALLBACK } from '@/lib/data/hotel';
import { categories as CATEGORIES_FALLBACK } from '@/lib/data/categories';
import { reviews as REVIEWS_FALLBACK } from '@/lib/data/rooms';
import { articles as ARTICLES_FALLBACK } from '@/lib/data/articles';
import { experiences as EXCURSIONS_FALLBACK } from '@/lib/data/experiences';
import { itineraries as ITINERARIES_FALLBACK } from '@/lib/data/itineraries';
import { faq as FAQ_FALLBACK } from '@/lib/data/faq';

// Re-export types so callers don't reach into /lib/data
export type {
  Category,
  Feature,
} from '@/lib/data/categories';

// Cache options: revalidate every 60s in prod (ISR), no cache in dev.
const REVALIDATE = process.env.NODE_ENV === 'production' ? 60 : 0;

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE, tags: ['sanity'] },
    });
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback:', err instanceof Error ? err.message : err);
    return null;
  }
}

// ─── Hotel ────────────────────────────────────────────────────────────────

export type Hotel = typeof HOTEL_FALLBACK;

export async function fetchHotel(): Promise<Hotel> {
  const data = await sanityFetch<Partial<Hotel>>(HOTEL_QUERY);
  if (!data || !data.name) return HOTEL_FALLBACK;
  // Merge Sanity data over fallback, so any missing field uses fallback.
  return { ...HOTEL_FALLBACK, ...(data as Hotel) };
}

// ─── Room categories ──────────────────────────────────────────────────────

type Category = (typeof CATEGORIES_FALLBACK)[number];

export async function fetchCategories(): Promise<Category[]> {
  const data = await sanityFetch<Category[]>(ROOM_CATEGORIES_QUERY);
  if (!data || data.length === 0) return CATEGORIES_FALLBACK;
  // Merge with fallback per-category so heroImage / gallery URLs stay
  // even if Sanity hasn't wired images yet (T1.7 not done).
  return data.map((cat) => {
    const fallback = CATEGORIES_FALLBACK.find((f) => f.slug === cat.slug);
    return fallback ? { ...fallback, ...cat, heroImage: cat.heroImage || fallback.heroImage, gallery: cat.gallery?.length ? cat.gallery : fallback.gallery } : cat;
  }) as Category[];
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  const cats = await fetchCategories();
  return cats.find((c) => c.slug === slug);
}

// ─── Reviews ──────────────────────────────────────────────────────────────

type Review = (typeof REVIEWS_FALLBACK)[number];

export async function fetchReviews(): Promise<readonly Review[]> {
  const data = await sanityFetch<Review[]>(REVIEWS_QUERY);
  if (!data || data.length === 0) return REVIEWS_FALLBACK;
  return data;
}

// ─── Articles ─────────────────────────────────────────────────────────────

type Article = (typeof ARTICLES_FALLBACK)[number];

// Sanity body comes as portable text blocks; we collapse to string[] for the
// existing component contract (paragraphs array). For richer rendering later,
// we can use @portabletext/react.
type SanityArticle = Omit<Article, 'body' | 'datePublished'> & {
  body?: Array<{ children?: Array<{ text?: string }> }>;
  date?: string;
};

function adaptArticle(raw: SanityArticle, fallback?: Article): Article {
  const paragraphs = raw.body
    ?.map((block) => block.children?.map((c) => c.text || '').join('') || '')
    .filter(Boolean) ?? [];

  return {
    ...(fallback ?? ({} as Article)),
    slug: raw.slug,
    title: raw.title || fallback?.title || '',
    excerpt: raw.excerpt || fallback?.excerpt || '',
    body: paragraphs.length ? paragraphs : (fallback?.body ?? []),
    author: (raw.author as Article['author']) || fallback?.author || 'Hasina',
    date: raw.date ? new Date(raw.date).toLocaleDateString('en', { year: 'numeric', month: 'long' }) : (fallback?.date ?? ''),
    datePublished: raw.date || fallback?.datePublished || '',
    cover: fallback?.cover ?? '',
    authorRole: fallback?.authorRole ?? 'Kitchen, host',
  };
}

export async function fetchArticles(): Promise<Article[]> {
  const data = await sanityFetch<SanityArticle[]>(ARTICLES_QUERY);
  if (!data || data.length === 0) return [...ARTICLES_FALLBACK];
  return data.map((raw) => {
    const fallback = ARTICLES_FALLBACK.find((f) => f.slug === raw.slug);
    return adaptArticle(raw, fallback);
  });
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  const data = await sanityFetch<SanityArticle | null>(ARTICLE_BY_SLUG_QUERY, { slug });
  const fallback = ARTICLES_FALLBACK.find((f) => f.slug === slug);
  if (!data) return fallback;
  return adaptArticle(data, fallback);
}

// ─── Excursions ───────────────────────────────────────────────────────────

type Excursion = (typeof EXCURSIONS_FALLBACK)[number];

export async function fetchExcursions(): Promise<Excursion[]> {
  const data = await sanityFetch<Excursion[]>(EXCURSIONS_QUERY);
  if (!data || data.length === 0) return [...EXCURSIONS_FALLBACK];
  // Merge with fallback to keep image URLs until photos are wired.
  return data.map((e) => {
    const fb = EXCURSIONS_FALLBACK.find((f) => f.slug === e.slug);
    return fb ? { ...fb, ...e, image: e.image || fb.image } : e;
  }) as Excursion[];
}

// ─── Itineraries ──────────────────────────────────────────────────────────

type Itinerary = (typeof ITINERARIES_FALLBACK)[number];

export async function fetchItineraries(): Promise<Itinerary[]> {
  const data = await sanityFetch<Itinerary[]>(ITINERARIES_QUERY);
  if (!data || data.length === 0) return [...ITINERARIES_FALLBACK];
  return data.map((it) => {
    const fb = ITINERARIES_FALLBACK.find((f) => f.slug === it.slug);
    return fb ? { ...fb, ...it, image: it.image || fb.image, best: fb.best, totalKm: fb.totalKm } : it;
  }) as Itinerary[];
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

type FaqCategory = (typeof FAQ_FALLBACK)[number];
type FlatFaq = { q: string; a: string; category: string };

const FAQ_CATEGORY_SLUG_MAP: Record<string, string> = {
  'Réservation': 'booking',
  'Transferts': 'arrival',
  'Chambres': 'rooms',
  'Restaurant': 'food',
  'Excursions': 'nearby',
  'Paiement': 'money',
  'Pratique': 'practical',
};

const FAQ_CATEGORY_LABEL_MAP: Record<string, string> = {
  booking: 'Booking and rates',
  arrival: 'Arrival and transfers',
  rooms: 'The rooms',
  food: 'Food and restaurant',
  nearby: 'What is nearby',
  money: 'Payment and money',
  health: 'Health and safety',
  practical: 'Practical',
};

export async function fetchFaq(): Promise<FaqCategory[]> {
  const data = await sanityFetch<FlatFaq[]>(FAQ_QUERY);
  if (!data || data.length === 0) return [...FAQ_FALLBACK];

  // Re-group by category to match the FaqCategory[] shape components expect.
  const groups = new Map<string, FaqCategory>();
  for (const item of data) {
    const slug = FAQ_CATEGORY_SLUG_MAP[item.category] ?? 'practical';
    const label = FAQ_CATEGORY_LABEL_MAP[slug] ?? item.category;
    if (!groups.has(slug)) groups.set(slug, { slug, label, entries: [] });
    groups.get(slug)!.entries.push({ q: item.q, a: item.a });
  }
  return Array.from(groups.values());
}

// ─── Staff (no .ts fallback — facts in HANDOFF only) ──────────────────────

export type Staff = {
  name: string;
  role: string;
  bio: string;
  photo: string | null;
};

export async function fetchStaff(): Promise<Staff[]> {
  const data = await sanityFetch<Staff[]>(STAFF_QUERY);
  return data ?? [];
}

// ─── Community (HFF) — no .ts fallback ────────────────────────────────────

export type Community = {
  name: string;
  founded: string;
  location: string;
  activeChildren: number;
  communePopulation: number;
  description: string;
  programs: { title: string; description: string }[];
  akanimamy: {
    meaning: string;
    landAcquired: string;
    landSizeSqm: number;
    buildingSizeSqm: number;
    constructionStarted: string;
    plannedFeatures: string[];
  };
};

export async function fetchCommunity(): Promise<Community | null> {
  return await sanityFetch<Community>(COMMUNITY_QUERY);
}
