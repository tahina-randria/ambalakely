/**
 * Journal articles.
 *
 * Source of truth is Sanity (see `sanity/lib/fetch.ts`). This file
 * provides the type shape + an empty fallback array. The /journal
 * route renders an empty state until Hasina writes the first piece
 * (or until the 4 Max William RAFALIARISON hiking articles are
 * imported from the legacy Squarespace site).
 */

export type Article = {
  slug: string;
  date: string;
  /** ISO format for JSON-LD */
  datePublished: string;
  title: string;
  excerpt: string;
  author: 'Hasina' | 'Mamy';
  authorRole: string;
  cover: string;
  /** Paragraphs of the article body. */
  body: string[];
  /** Optional pull quote shown halfway through */
  pullQuote?: string;
  /** Optional inline image after pull quote (full-bleed) */
  inlineImage?: { src: string; alt: string };
};

export const articles: Article[] = [];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
