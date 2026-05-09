/**
 * Room categories — single source of truth for /rooms and /rooms/[category].
 */
import type { FeatureIconName } from '@/components/atoms/FeatureIcon';

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export type Feature = {
  icon: FeatureIconName;
  label: string;
};

export type Category = {
  slug: 'superieure' | 'confort' | 'standard';
  number: string;
  name: string;
  size: string;
  capacity: string;
  count: string;
  countNum: number;
  priceMga: number;
  priceEur: number;
  shortDescription: string;
  longDescription: string;
  bedSetup: string;
  view: string;
  bestFor: string;
  features: Feature[];
  heroImage: string;
  gallery: string[];
  /** Concierge note, signed by Mamy or Hasina */
  concierge: { body: string; signed: 'Mamy' | 'Hasina' };
  /** Pull quote from the longDescription */
  pullQuote: string;
};

export const categories: Category[] = [
  {
    slug: 'superieure',
    number: '01',
    name: 'Supérieure',
    size: '43 m²',
    capacity: '1 to 4 guests',
    count: '2 rooms',
    countNum: 2,
    priceMga: 255000,
    priceEur: 49,
    shortDescription:
      'The two largest rooms in the house. King-size voamboana, windows on the rice fields.',
    longDescription:
      'There are two of these rooms. They sit at the front of the main building, with windows on two sides — one looks down over the terraced rice fields, the other across the village below. The bed is voamboana, hand-carved by a workshop in Fianarantsoa. Forty-three square metres is enough for an extra bed or two, if a family needs them.',
    bedSetup: 'King-size voamboana, with the option of two single katrafay beds.',
    view: 'Rice terraces and the village of Ambalakely.',
    bestFor: 'A family of four, or two travellers with room to read.',
    features: [
      { icon: 'bath', label: 'En-suite bathroom, hot water all day' },
      { icon: 'tree', label: 'Hand-carved voamboana furniture' },
      { icon: 'moon', label: 'Hot water bottles and mosquito nets at night' },
      { icon: 'bed', label: 'Two single beds on request' },
      { icon: 'view', label: 'Two windows, two views' },
      { icon: 'house', label: 'Direct access to the upper terrace' },
      { icon: 'wifi', label: 'Free WiFi throughout the house' },
      { icon: 'bell', label: 'Room service from seven in the morning' },
    ],
    heroImage: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    gallery: [
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    concierge: {
      body: 'These are the rooms I keep for my own family when they visit. The morning light comes in slowly from the east, and at five in the afternoon the rice fields turn gold. Sleep with the window open if it is not too cold.',
      signed: 'Hasina',
    },
    pullQuote: 'At five in the afternoon the rice fields turn gold.',
  },
  {
    slug: 'confort',
    number: '02',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 to 3 guests',
    count: '4 rooms',
    countNum: 4,
    priceMga: 226000,
    priceEur: 44,
    shortDescription:
      'A king and a single, in twenty-nine square metres. Two open onto the garden, two are upstairs.',
    longDescription:
      'Four Confort rooms, paired in twos. The ground-floor pair opens straight into the garden, so you can step out without putting shoes on. The upstairs pair has a wider, longer view, the kind that draws you out of bed earlier than you meant to. A king voamboana, a single katrafay, a desk by the window.',
    bedSetup: 'King-size voamboana and one single katrafay bed.',
    view: 'Garden on the ground floor. Highlands and rice fields upstairs.',
    bestFor: 'Two adults and a child, or a writer who wants a desk by the window.',
    features: [
      { icon: 'bath', label: 'En-suite bathroom, hot water all day' },
      { icon: 'desk', label: 'Writing desk by the window' },
      { icon: 'moon', label: 'Hot water bottles and mosquito nets at night' },
      { icon: 'leaf', label: 'Two ground-floor with direct garden access' },
      { icon: 'stairs', label: 'Two upstairs with the wider view' },
      { icon: 'bed', label: 'Single katrafay bed for a third guest' },
      { icon: 'wifi', label: 'Free WiFi throughout the house' },
      { icon: 'bell', label: 'Room service from seven in the morning' },
    ],
    heroImage: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    gallery: [
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    concierge: {
      body: 'I write in the upstairs Confort when the kitchen does not need me. The desk faces east, the door faces the garden. The hot water bottle goes in around six in the evening, before the cold settles in.',
      signed: 'Hasina',
    },
    pullQuote: 'The kind of view that draws you out of bed earlier than you meant to.',
  },
  {
    slug: 'standard',
    number: '03',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 to 2 guests',
    count: '4 rooms',
    countNum: 4,
    priceMga: 182000,
    priceEur: 35,
    shortDescription:
      'The first four rooms we built. Compact, quiet, and the same hot water bottles at night.',
    longDescription:
      'These were the four rooms we opened with in 2018. Two have a double katrafay bed, two have twin voamboana. They are the smallest in the house and the quietest, set back from the dining room at the end of the path. Most guests on the RN7 between Antsirabe and Isalo stay one night and remember the breakfast.',
    bedSetup: 'Double katrafay (two rooms) or twin voamboana (two rooms).',
    view: 'Garden, with the pomelo tree to one side.',
    bestFor: 'A single traveller, two friends, or a one-night stop on the RN7.',
    features: [
      { icon: 'bath', label: 'En-suite bathroom, hot water all day' },
      { icon: 'path', label: 'Quiet, set back from the dining room' },
      { icon: 'moon', label: 'Hot water bottles and mosquito nets at night' },
      { icon: 'bed', label: 'Two double katrafay, two twin voamboana' },
      { icon: 'users', label: 'Single-occupancy rate available' },
      { icon: 'plant', label: 'Garden view, pomelo tree to one side' },
      { icon: 'wifi', label: 'Free WiFi throughout the house' },
      { icon: 'calendar', label: 'Last-minute availability often possible' },
    ],
    heroImage: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    gallery: [
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ],
    concierge: {
      body: 'These rooms hold the most repeat guests. Drivers, friends from Tana passing through, families on the RN7. I light the fire in the dining room at six, and the rooms warm up by seven. Quiet by ten.',
      signed: 'Hasina',
    },
    pullQuote: 'Set back from the dining room at the end of the path.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
