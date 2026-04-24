/**
 * Real room data — extracted from hotelambalakely.com.
 * 3 categories, 10 rooms total.
 */

export type Room = {
  id: string;
  number: string;
  name: string;
  size: string;
  capacity: string;
  priceMga: number;
  priceEur: number;
  image: string;
  description?: string;
};

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export const rooms: Room[] = [
  // 2 Supérieure
  {
    id: 'superieure-1',
    number: '01',
    name: 'Supérieure',
    size: '43 m²',
    capacity: '1–4 guests',
    priceMga: 255000,
    priceEur: 49,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description: 'King size voamboana. Rice field view.',
  },
  {
    id: 'superieure-2',
    number: '02',
    name: 'Supérieure',
    size: '43 m²',
    capacity: '1–4 guests',
    priceMga: 255000,
    priceEur: 49,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description: 'King size voamboana. Rice field view.',
  },
  // 4 Confort
  {
    id: 'confort-1',
    number: '03',
    name: 'Confort',
    size: '29 m²',
    capacity: '1–3 guests',
    priceMga: 226000,
    priceEur: 44,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description: 'King voamboana + single katrafay. Garden view.',
  },
  {
    id: 'confort-2',
    number: '04',
    name: 'Confort',
    size: '29 m²',
    capacity: '1–3 guests',
    priceMga: 226000,
    priceEur: 44,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description: 'King voamboana + single katrafay. Garden view.',
  },
  {
    id: 'confort-3',
    number: '05',
    name: 'Confort',
    size: '29 m²',
    capacity: '1–3 guests',
    priceMga: 226000,
    priceEur: 44,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description: 'Upstairs. Landscape view.',
  },
  {
    id: 'confort-4',
    number: '06',
    name: 'Confort',
    size: '29 m²',
    capacity: '1–3 guests',
    priceMga: 226000,
    priceEur: 44,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description: 'Upstairs. Landscape view.',
  },
  // 4 Standard
  {
    id: 'standard-1',
    number: '07',
    name: 'Standard',
    size: '21 m²',
    capacity: '1–2 guests',
    priceMga: 182000,
    priceEur: 35,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Double katrafay and twin voamboana. Garden view.',
  },
  {
    id: 'standard-2',
    number: '08',
    name: 'Standard',
    size: '21 m²',
    capacity: '1–2 guests',
    priceMga: 182000,
    priceEur: 35,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Double katrafay and twin voamboana. Garden view.',
  },
  {
    id: 'standard-3',
    number: '09',
    name: 'Standard',
    size: '21 m²',
    capacity: '1–2 guests',
    priceMga: 182000,
    priceEur: 35,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Double katrafay and twin voamboana. Garden view.',
  },
  {
    id: 'standard-4',
    number: '10',
    name: 'Standard',
    size: '21 m²',
    capacity: '1–2 guests',
    priceMga: 182000,
    priceEur: 35,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Double katrafay and twin voamboana. Garden view.',
  },
];

export const experiences = [
  { id: 'ranomafana', number: '01', title: 'Ranomafana National Park', subtitle: 'Guided walk, lemurs and endemic flora', duration: 'Full day' },
  { id: 'rice-fields', number: '02', title: 'Rice field walk', subtitle: 'Around Ambalakely village', duration: '2 h' },
  { id: 'cooking', number: '03', title: 'Cooking with the team', subtitle: 'Seasonal produce from the garden', duration: '4 h' },
  { id: 'sahambavy', number: '04', title: 'Sahambavy tea estate', subtitle: 'Tea factory and tastings', duration: 'Half day' },
  { id: 'andringitra', number: '05', title: 'Andringitra trek', subtitle: 'Tsaranoro massif, three days', duration: '3 days' },
  { id: 'hope', number: '06', title: 'Hope for the Future', subtitle: 'Visit the community programme', duration: '2 h' },
] as const;

export const journalPosts = [
  { id: 'koselig', date: 'APRIL 2026', title: 'Koselig in the highlands. What it means here.' },
  { id: 'garden', date: 'MARCH 2026', title: 'What the garden gives in April.' },
  { id: 'hope', date: 'FEBRUARY 2026', title: 'Ten years of Hope for the Future.' },
] as const;

/**
 * Reviews from real guests — from hotelambalakely.com.
 * Shortened/translated for english homepage.
 */
export const reviews = [
  {
    quote:
      'Truly a jewel. Built in the Betsileo style, unbelievably friendly staff, superb food mostly from the garden. The room was impeccable and there were hot water bottles in our bed that were still warm in the morning. Real Malagasy hospitality.',
    author: 'Polly P.',
    city: 'UK',
    date: 'TripAdvisor',
    source: 'TripAdvisor',
  },
  {
    quote:
      'Unique countryside location. Ten minutes by car from central Fianarantsoa. Stunning views over the rice fields. Food and lodging were exceptional. Try Hasina\u2019s homemade ice cream.',
    author: 'KingfisherOslo',
    city: 'Oslo',
    date: 'TripAdvisor',
    source: 'TripAdvisor',
  },
  {
    quote:
      'A rare treasure in the middle of Madagascar. Excellent stay. Always welcomed with smiles and joy. Beautiful garden. Clean and comfortable room. Delicious food. They even surprised us by washing our car.',
    author: 'Ada',
    city: '—',
    date: 'Booking',
    source: 'Booking',
  },
  {
    quote:
      'Perfect place to stay whether you\u2019re spending time in Fianarantsoa or passing through on the way to Isalo or Antsirabe. Very clean, delicious food, and Hasina showed us her garden where she grows fruits and herbs for the kitchen.',
    author: 'Bernt R.',
    city: 'Norway',
    date: 'TripAdvisor',
    source: 'TripAdvisor',
  },
] as const;
