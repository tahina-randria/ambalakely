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
  /** Optional inline image after pull quote (full-bleed) */
  inlineImage?: { src: string; alt: string };
};

export const articles: Article[] = [
  {
    slug: 'ten-years-of-community',
    date: 'February 2026',
    datePublished: '2026-02-08',
    title: 'Ten years of the school next door.',
    excerpt:
      'Hope for the Future opened in 2014, four years before the hotel. The work is older than us. This is what it has become.',
    author: 'Hasina',
    authorRole: 'Kitchen, host',
    cover: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    pullQuote:
      'A hundred and thirty children every week, three of whom now teach the youngest ones.',
    inlineImage: {
      src: `${SQ}/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w`,
      alt: 'Hope for the Future, children of Tanambao',
    },
    body: [
      'In 2014 we walked our own quartier in the middle of the day and counted the children. They were at home or in the streets, not in school. A short survey told us about a hundred and thirty of them, from the quartier of Tanambao alone, were rarely or never going to the public school.',
      'We had been working in tourism for years. We had seen children begging in every region we travelled through Madagascar. The thing that made us act was that this time the children were our neighbours.',
      'We started the school in a borrowed room. There was no electricity. There was a blackboard a retired teacher carried from a closed building in Fianarantsoa. The first lesson was a reading lesson, and four of the first six children could not read.',
      'The hotel was built four years later, in 2018. We already knew what the rooms would pay for. The school had moved into a small dedicated building by then, and there were sixty children. Ten years on, there are a hundred and thirty, three of whom now teach the youngest ones.',
      'The clinic opened in 2019. It is the smallest clinic you can imagine, two rooms, a nurse who comes from Fianarantsoa on Mondays. People bring their children to be weighed, vaccinated, reassured. The clinic does not cost anything. The medicines come from a partner pharmacy in town at a reduced price.',
      'The water programme started in 2022. There was a spring above the village that nobody had cleaned out in twenty years. We paid for the cleaning, the new pipe, and the small concrete tank. Three hundred and forty people now use that tap.',
      'Two percent of every room booked at the hotel goes directly to the school. It is not a marketing line. It is the actual line in the budget that keeps the work going. When the rooms are full, the school is calm. When the rooms are empty, the school is calm too, because we have built a small reserve. But the rooms have mostly been full.',
      'Guests visit on Tuesdays and Thursdays. Half a day, a driver, one of the team. There is no formal tour. You meet the teachers, see the classroom, have a tea with the children. We ask people who want to give to give to the school directly, not to the children. There is a small box in the office for that.',
      'The biggest thing the hotel has taught me about Hope for the Future is that it works because it is small and because it is steady. We have not tried to make it bigger every year. We have tried to make it last. The same teachers, mostly. The same Wednesday and Saturday afternoons. Ten years of the same rhythm. Ten years of the same children growing up.',
      'Three of them came back this year as teachers. That is the line that will stay with me when this is twenty years.',
    ],
  },
  {
    slug: 'what-the-garden-gives-in-april',
    date: 'March 2026',
    datePublished: '2026-03-22',
    title: 'What the garden gives in April.',
    excerpt:
      'The pomelo tree drops in March. The tomatoes hold until late April. The watercress is just thinking about coming up. This is what is on the menu next month.',
    author: 'Hasina',
    authorRole: 'Kitchen, host',
    cover: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    pullQuote:
      'I do not write the menu the night before. I write it the morning of, after I have walked the garden.',
    inlineImage: {
      src: `${SQ}/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2500w`,
      alt: 'The kitchen at Hotel Ambalakely',
    },
    body: [
      'I do not write the menu the night before. I write it the morning of, after I have walked the garden. There is a chair under the pomelo tree where I sit with a coffee for ten minutes before I look at anything. The walk takes another twenty.',
      'In April the garden is in a slow transition. The rains are ending, the cold has not yet started. The pomelo tree finished dropping in March, but the late fruit is still good for marmelade. The tomatoes are at the end of their season, sweet and small and starting to crack. The aubergines are at their peak. The watercress is just thinking about coming up at the bottom of the garden where the water sits.',
      'The chickens lay better in April. The dry season is starting and they have more space to walk. We get five or six eggs a morning from twelve hens. The eggs are small and orange-yolked.',
      'This is roughly what is on the menu in the coming weeks. It will change with the rain.',
      'Soups. Tomato soup, while we still have them, often with mint and a swirl of yoghurt. Pumpkin soup once we cut the first pumpkins, by the second half of the month. Watercress soup if it comes up early.',
      'Mains. Zébu Marengo with red rice, slow-braised in white wine and tomato. Ravitoto, the cassava-leaf and pork dish, the way my grandmother made it, with coconut milk in the last fifteen minutes. A vegetarian gratin of aubergine, tomato and basil from the back of the garden. Trondra, the river fish, fried in zebu fat with lemon, when the local fisherman has them. He has them on Tuesday morning and on Friday morning, almost always.',
      'Sweet. Krumkake, the rolled Norwegian wafer, with a cream of vanilla and a touch of orange. Caramelised banana with rum from the village. Homemade ice cream, vanilla in April because the garden vanilla is still drying, mango when the early mangoes come at the end of the month.',
      'I do not put it all on the menu at once. Three courses a night, one set menu. I write what I want the kitchen to make, given what I picked that morning. The team takes it from there. Most evenings five things from the list above, sometimes a sixth.',
      'If you are coming and you have a strong preference or a strong allergy, tell us. I do not mind adjusting. I mind less than people think.',
      'May will be different. The first cold nights, the first leeks, the end of the tomatoes. I will write again then.',
    ],
  },
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
    inlineImage: {
      src: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
      alt: 'A Supérieure room at Hotel Ambalakely',
    },
    body: [
      'My Norwegian godmother lived in a small wooden house in the hills above Oslo. There was always a fire in the room you sat in, never in the rooms you did not. There were always more woollen blankets than chairs. The light was always low in the evening, and someone always got up to put on the kettle without asking.',
      'I spent four winters with her between fourteen and eighteen, learning Norwegian and learning to cook. I could not have told you then what koselig was. I would have said it meant cosy. That is what the dictionary says. The dictionary is wrong, or at least incomplete.',
      'Koselig is not a thing you put on top of a place. It is not curtains and candles. You can have those things and not be koselig. You can be koselig with nothing but a window and a person you trust and a hot drink between you.',
      'It is the small attention. The hot water bottle slipped into the bed at six in the evening before anyone asks. The fire lit before the first guest comes down. The bread put out at the moment when it is still slightly warm in the middle. The candle that is replaced when it is two-thirds gone, before anyone sees the wick die.',
      'It is the absence of effort visible. You see the result, you do not see the work. Mamy says it is the same as good gardening. The garden looks like it grew itself. It did not.',
      'When we opened the hotel in 2018, we did not say to each other, let us make this place koselig. The word does not exist in Malagasy and we would have felt silly using it. But it was the model. We were trying to make a hotel that felt like the houses we had been welcomed into. My godmother in Oslo. Mamy’s grandmother in Fianarantsoa. Friends who had hosted us in France and Norway when we were young and broke.',
      'You make a place koselig the way you make a soup. Quietly, with what is around, with attention to the cold outside the window. You add salt at the right moment. You taste it before serving. You do not announce yourself.',
      'The kitchen serves one set menu each evening. I write it the morning of, not the night before, because I want to walk the garden first. The watercress comes in May. The pomelo tree drops in March. The chickens lay more in the dry season. The menu follows.',
      'I think koselig is also a way of saying : we are not trying to impress you. We are trying to look after you. There is a difference. The first wears you out. The second does not.',
      'A guest from Oslo, Bernt, stayed last June. He did not use the word but he understood the room. He left a note on the desk that said, in English, "Felt like home. Better than home." That note is now in a drawer in the kitchen. I look at it sometimes when the day is long.',
      'You cannot fake koselig. You can only do small things, every day, and trust that they add up to something a guest can feel without naming.',
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
