/**
 * Journal articles. Long-form, magazine-style.
 * Body is an array of paragraphs (no markdown for now, intentional).
 *
 * In Phase 2, this migrates to a CMS-backed table.
 */

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

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
};

export const articles: Article[] = [
  {
    slug: 'koselig-in-the-highlands',
    date: 'April 2026',
    datePublished: '2026-04-12',
    title: 'Koselig in the highlands. What it means here.',
    excerpt:
      'Koselig is a Norwegian word that does not translate. My godmother in Oslo taught me it without ever explaining it. I think it is the closest word to what we try to do at Ambalakely.',
    author: 'Hasina',
    authorRole: 'Kitchen, host',
    cover: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    pullQuote:
      'You make a place koselig the way you make a soup. Quietly, with what is around, with attention to the cold outside the window.',
    body: [
      'My Norwegian godmother lived in a small wooden house in the hills above Oslo. There was always a fire in the room you sat in, never in the rooms you did not. There were always more woollen blankets than chairs. The light was always low in the evening, and someone always got up to put on the kettle without asking.',
      'I spent four winters with her between fourteen and eighteen, learning Norwegian and learning to cook. I could not have told you then what koselig was. I would have said it meant cosy. That is what the dictionary says. The dictionary is wrong, or at least incomplete.',
      'Koselig is not a thing you put on top of a place. It is not curtains and candles. You can have those things and not be koselig. You can be koselig with nothing but a window and a person you trust and a hot drink between you.',
      'It is the small attention. The hot water bottle slipped into the bed at six in the evening before anyone asks. The fire lit before the first guest comes down. The bread put out at the moment when it is still slightly warm in the middle. The candle that is replaced when it is two-thirds gone, before anyone sees the wick die.',
      'It is the absence of effort visible. You see the result, you do not see the work. Mamy says it is the same as good gardening. The garden looks like it grew itself. It did not.',
      'When we opened the hotel in 2018, we did not say to each other, let us make this place koselig. The word does not exist in Malagasy and we would have felt silly using it. But it was the model. We were trying to make a hotel that felt like the houses we had been welcomed into. My godmother in Oslo. Mamy’s grandmother in Fianarantsoa. Friends who had hosted us in France and Norway when we were young and broke.',
      'You make a place koselig the way you make a soup. Quietly, with what is around, with attention to the cold outside the window. You add salt at the right moment. You taste it before serving. You do not announce yourself.',
      'I cook one set menu each evening. I write it the morning of, not the night before, because I want to walk the garden first. The watercress comes in May. The pomelo tree drops in March. The chickens lay more in the dry season. The menu follows.',
      'I think koselig is also a way of saying : we are not trying to impress you. We are trying to look after you. There is a difference. The first wears you out. The second does not.',
      'A guest from Oslo, Bernt, stayed last June. He did not use the word but he understood the room. He left a note on the desk that said, in English, "Felt like home. Better than home." That note is now in a drawer in the kitchen. I look at it sometimes when the day is long.',
      'You cannot fake koselig. You can only do small things, every day, and trust that they add up to something a guest can feel without naming.',
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
