/**
 * Typed fetchers — try Sanity first, fall back to the static `.ts` data
 * if the dataset is empty, the request fails, OR the requested locale
 * field is missing in Sanity for an item. This is "locale-aware graceful
 * degradation" : even if Sanity has only EN populated for some entities,
 * the FR site serves the FR fallback (`src/lib/data/*.ts`) field-by-field
 * via the `??` merge — never English on /fr.
 *
 * Each fetcher returns the SAME SHAPE as the corresponding .ts export,
 * so component imports can swap with no other change.
 *
 * Server Components only. Each fetcher takes a `locale` parameter that
 * MUST be forwarded from `getLocale()` (next-intl/server). The default
 * is `'fr'` to preserve existing callers (sitemap/robots/etc.) that
 * don't have a locale context.
 *
 * The locale parameter is passed to the GROQ query as `$locale`. The
 * `LOC` helper in `queries.ts` returns null when that locale-specific
 * value is empty in Sanity, so the merge falls back to the local FR
 * source instead of leaking the wrong language.
 */

import { cache } from 'react';
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
import { getCategories, type Category as CategoryType } from '@/lib/data/categories';
import { getReviews, type Review as ReviewType } from '@/lib/data/reviews';
import { articles as ARTICLES_FALLBACK } from '@/lib/data/articles';
import { getExperiences, type Experience as ExperienceType } from '@/lib/data/experiences';
import { getItineraries, type Itinerary as ItineraryType } from '@/lib/data/itineraries';
import {
  getFaq,
  getFaqCategories,
  type FaqCategory as FaqCategoryType,
} from '@/lib/data/faq';

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

export const fetchHotel = cache(async (locale: string = 'fr'): Promise<Hotel> => {
  const data = await sanityFetch<Partial<Hotel>>(HOTEL_QUERY, { locale });
  if (!data || !data.name) return HOTEL_FALLBACK;
  // Merge field-by-field so any null (= empty in this locale) uses fallback.
  // The nested `rating` object needs its own per-field merge — without this,
  // a Sanity rating block with `count: null` clobbers the verified fallback
  // (HOTEL.rating.count = 32 from the 2026-05-25 TripAdvisor check). §32 fix.
  const sanityRating = (data as { rating?: Partial<Hotel['rating']> }).rating;
  return {
    ...HOTEL_FALLBACK,
    ...data,
    tagline: data.tagline ?? HOTEL_FALLBACK.tagline,
    description: data.description ?? HOTEL_FALLBACK.description,
    rating: sanityRating
      ? {
          value: sanityRating.value ?? HOTEL_FALLBACK.rating.value,
          count: sanityRating.count ?? HOTEL_FALLBACK.rating.count,
          sources: sanityRating.sources?.length
            ? sanityRating.sources
            : HOTEL_FALLBACK.rating.sources,
        }
      : HOTEL_FALLBACK.rating,
  } as Hotel;
});

// ─── Room categories ──────────────────────────────────────────────────────

type Category = CategoryType;

export const fetchCategories = cache(async (locale: string = 'fr'): Promise<Category[]> => {
  // Local trilingual fallback — same pattern as reviews. `getCategories(locale)`
  // projects the 3 categories into the requested locale so /en and /no never
  // leak FR fields when Sanity is empty or partial for that locale.
  const fallback = getCategories(locale);
  const data = await sanityFetch<Category[]>(ROOM_CATEGORIES_QUERY, { locale });
  if (!data || data.length === 0) return fallback;
  // Merge field-by-field per category. Image URLs from Sanity may be null
  // until T1.7 photo uploads finish — fall back to fallback URLs.
  return data.map((cat) => {
    const fb = fallback.find((f) => f.slug === cat.slug);
    if (!fb) return cat;
    return {
      ...fb,
      ...cat,
      // Textual fields : null from GROQ means empty in this locale → use fallback.
      name: cat.name ?? fb.name,
      shortDescription: cat.shortDescription ?? fb.shortDescription,
      longDescription: cat.longDescription ?? fb.longDescription,
      bedSetup: cat.bedSetup ?? fb.bedSetup,
      view: cat.view ?? fb.view,
      bestFor: cat.bestFor ?? fb.bestFor,
      pullQuote: cat.pullQuote ?? fb.pullQuote,
      // Image fields : prefer Sanity if available, fall back to local URLs.
      heroImage: cat.heroImage || fb.heroImage,
      gallery: cat.gallery?.length ? cat.gallery : fb.gallery,
    };
  }) as Category[];
});

export async function fetchCategoryBySlug(slug: string, locale: string = 'fr'): Promise<Category | undefined> {
  const cats = await fetchCategories(locale);
  return cats.find((c) => c.slug === slug);
}

// ─── Reviews ──────────────────────────────────────────────────────────────

type Review = ReviewType;

export const fetchReviews = cache(async (locale: string = 'fr'): Promise<readonly Review[]> => {
  // Local trilingual fallback — 9 TripAdvisor quotes already translated
  // FR / EN / NO in `src/lib/data/reviews.ts`. Used when Sanity is empty
  // OR returns nothing for this locale (so /no never leaks FR text).
  const fallback = getReviews(locale);
  const data = await sanityFetch<Review[]>(REVIEWS_QUERY, { locale });
  if (!data || data.length === 0) return fallback;
  const filtered = data.filter((r) => r.quote);
  if (filtered.length === 0) return fallback;
  return filtered;
});

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

export const fetchArticles = cache(async (locale: string = 'fr'): Promise<Article[]> => {
  const data = await sanityFetch<SanityArticle[]>(ARTICLES_QUERY, { locale });
  if (!data || data.length === 0) return [...ARTICLES_FALLBACK];
  // Skip articles with no title in this locale.
  const filtered = data.filter((raw) => raw.title);
  if (filtered.length === 0) return [...ARTICLES_FALLBACK];
  return filtered.map((raw) => {
    const fallback = ARTICLES_FALLBACK.find((f) => f.slug === raw.slug);
    return adaptArticle(raw, fallback);
  });
});

export async function fetchArticleBySlug(slug: string, locale: string = 'fr'): Promise<Article | undefined> {
  const data = await sanityFetch<SanityArticle | null>(ARTICLE_BY_SLUG_QUERY, { slug, locale });
  const fallback = ARTICLES_FALLBACK.find((f) => f.slug === slug);
  if (!data || !data.title) return fallback;
  return adaptArticle(data, fallback);
}

// ─── Excursions ───────────────────────────────────────────────────────────

type Excursion = ExperienceType;

export const fetchExcursions = cache(async (locale: string = 'fr'): Promise<Excursion[]> => {
  // Local trilingual fallback — 10 excursions already translated FR / EN /
  // NO in `src/lib/data/experiences.ts`. Used when Sanity is empty OR
  // returns nothing for this locale (so /no never leaks FR text). Mirror
  // of the `fetchReviews` pattern.
  const fallback = getExperiences(locale);
  const data = await sanityFetch<Excursion[]>(EXCURSIONS_QUERY, { locale });
  if (!data || data.length === 0) return fallback;
  // Merge per excursion : null from GROQ for textual fields means empty
  // in this locale → use the local locale-aware fallback. Image stays
  // from Sanity if uploaded, else fallback URL.
  return data.map((e) => {
    const fb = fallback.find((f) => f.slug === e.slug);
    if (!fb) return e;
    return {
      ...fb,
      ...e,
      name: e.name ?? fb.name,
      duration: e.duration ?? fb.duration,
      tagline: e.tagline ?? fb.tagline,
      body: e.body ?? fb.body,
      best: e.best ?? fb.best,
      cost: e.cost ?? fb.cost,
      ctaLabel: e.ctaLabel ?? fb.ctaLabel,
      image: e.image || fb.image,
    };
  }) as Excursion[];
});

// ─── Itineraries ──────────────────────────────────────────────────────────

type Itinerary = ItineraryType;

export const fetchItineraries = cache(async (locale: string = 'fr'): Promise<Itinerary[]> => {
  // Local trilingual fallback — three RN7 itineraries already translated
  // FR / EN / NO in `src/lib/data/itineraries.ts`. Used when Sanity is
  // empty OR returns nothing for this locale (so /en and /no don't leak
  // FR text on /plan-your-trip). Mirror of the `fetchReviews` pattern.
  const fallback = getItineraries(locale);
  const data = await sanityFetch<Itinerary[]>(ITINERARIES_QUERY, { locale });
  if (!data || data.length === 0) return fallback;
  return data.map((it) => {
    const fb = fallback.find((f) => f.slug === it.slug);
    if (!fb) return it;
    return {
      ...fb,
      ...it,
      title: it.title ?? fb.title,
      pitch: it.pitch ?? fb.pitch,
      // Days array : if Sanity has it, merge per-day. Otherwise local.
      days: it.days?.length
        ? it.days.map((day, idx) => {
            const fbDay = fb.days?.[idx];
            return {
              ...(fbDay ?? {}),
              ...day,
              title: day.title ?? fbDay?.title ?? '',
              body: day.body ?? fbDay?.body ?? '',
            };
          })
        : fb.days,
      image: it.image || fb.image,
      best: fb.best,
      totalKm: fb.totalKm,
    };
  }) as Itinerary[];
});

// ─── FAQ ──────────────────────────────────────────────────────────────────

type FaqCategory = FaqCategoryType;
type FlatFaq = { q: string | null; a: string | null; category: string };

// Sanity stores FAQ categories as free-form labels (typically FR). Map
// them onto the canonical 3-slug taxonomy used in `src/lib/data/faq.ts`
// (booking / stay / logistics). Includes new + legacy names so a
// half-migrated Sanity dataset still groups correctly. Anything
// unmapped falls back to `logistics` rather than leaking a raw FR
// label.
const FAQ_CATEGORY_SLUG_MAP: Record<string, string> = {
  // New 3-category set (Dec 2026)
  'Avant de réserver': 'booking',
  'Before you book': 'booking',
  'Før du bestiller': 'booking',
  'À l’hôtel': 'stay',
  "À l'hôtel": 'stay',
  'At the hotel': 'stay',
  'På hotellet': 'stay',
  Logistique: 'logistics',
  Logistics: 'logistics',
  Logistikk: 'logistics',
  // Legacy FR labels — map onto the closest new slug.
  Réservation: 'booking',
  'Réservation et tarifs': 'booking',
  Paiement: 'booking',
  'Paiement et argent': 'booking',
  Chambres: 'stay',
  'Les chambres': 'stay',
  Restaurant: 'stay',
  Restauration: 'stay',
  Transferts: 'logistics',
  'Arrivée et transferts': 'logistics',
  Excursions: 'logistics',
  'Aux alentours': 'logistics',
  Pratique: 'logistics',
  'Santé et sécurité': 'logistics',
};

export const fetchFaq = cache(async (locale: string = 'fr'): Promise<FaqCategory[]> => {
  // Local trilingual fallback — 22 questions across 3 categories,
  // already translated FR / EN / NO in `src/lib/data/faq.ts`. Used
  // when Sanity is empty OR returns nothing for this locale (so /en
  // and /no never leak FR text on /faq).
  const fallback = getFaq(locale);
  const labelByCategorySlug: Record<string, string> = Object.fromEntries(
    getFaqCategories(locale).map((c) => [c.slug, c.label]),
  );
  const data = await sanityFetch<FlatFaq[]>(FAQ_QUERY, { locale });
  if (!data || data.length === 0) return fallback;
  // Filter out FAQ items missing q or a in this locale. If most/all
  // are missing, fall back entirely to the localized FAQ (which is
  // the curated, PDF-sourced source of truth per §94).
  const filtered = data.filter((item) => item.q && item.a);
  if (filtered.length === 0) return fallback;

  // Re-group by category to match the FaqCategory[] shape components expect.
  const groups = new Map<string, FaqCategory>();
  for (const item of filtered) {
    const slug = FAQ_CATEGORY_SLUG_MAP[item.category] ?? 'logistics';
    const label = labelByCategorySlug[slug] ?? item.category;
    if (!groups.has(slug)) groups.set(slug, { slug, label, entries: [] });
    groups.get(slug)!.entries.push({ q: item.q!, a: item.a! });
  }
  return Array.from(groups.values());
});

// ─── Staff (no .ts fallback — facts in HANDOFF only) ──────────────────────

export type Staff = {
  name: string;
  role: string | null;
  bio: string | null;
  photo: string | null;
};

export const fetchStaff = cache(async (locale: string = 'fr'): Promise<Staff[]> => {
  const data = await sanityFetch<Staff[]>(STAFF_QUERY, { locale });
  return data ?? [];
});

// ─── Community (HFF) — no .ts fallback ────────────────────────────────────

export type Community = {
  name: string;
  founded: string;
  location: string;
  activeChildren: number;
  communePopulation: number;
  description: string | null;
  programs: { title: string | null; description: string | null }[];
  akanimamy: {
    meaning: string;
    landAcquired: string;
    landSizeSqm: number;
    buildingSizeSqm: number;
    constructionStarted: string;
    plannedFeatures: string[];
  };
};

export const fetchCommunity = cache(async (locale: string = 'fr'): Promise<Community | null> => {
  return await sanityFetch<Community>(COMMUNITY_QUERY, { locale });
});
