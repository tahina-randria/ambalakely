/**
 * Room categories — single source of truth for /rooms and /rooms/[category].
 */

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

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
  features: string[];
  heroImage: string;
  gallery: string[];
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
      'King size voamboana. Rice fields and village view. Option for up to two extra beds.',
    longDescription:
      'The two largest rooms in the house. A king-size voamboana bed sits centred under the high ceiling, with windows on two sides looking onto the rice fields and the village below. Hot water bottles in the bed at night. Mosquito nets. The bathroom is private with a hot shower and the same sand-coloured tiles throughout the hotel.',
    bedSetup: 'King-size voamboana, plus two single beds on request.',
    view: 'Rice fields and village',
    features: [
      'En-suite bathroom with hot shower',
      'Mosquito nets',
      'Hot water bottles at night',
      'Free WiFi',
      'Twin extra beds (on request, +20%)',
      'Private terrace access',
    ],
    heroImage: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    gallery: [
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=1500w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=1500w`,
    ],
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
      'King voamboana and a single katrafay. Two on the ground floor with garden view, two upstairs.',
    longDescription:
      'A king voamboana paired with a single katrafay bed, generous enough for a family of three. Two rooms sit on the ground floor opening onto the garden, two are upstairs with a wider view across the highlands. Same finish across all four: warm sand walls, dark wood floors, a small writing desk near the window.',
    bedSetup: 'King-size voamboana plus one single katrafay bed.',
    view: 'Garden (ground floor) or landscape (upstairs)',
    features: [
      'En-suite bathroom with hot shower',
      'Mosquito nets',
      'Hot water bottles at night',
      'Free WiFi',
      'Writing desk',
      'Two with garden view, two upstairs',
    ],
    heroImage: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    gallery: [
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=1500w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=1500w`,
    ],
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
      'Two double katrafay and two twin voamboana, with mosquito nets. Garden view.',
    longDescription:
      'The original four rooms of the house. Two with a double katrafay bed, two with twin voamboana. The same warm sand walls, the same hot shower, the same view onto the garden. Compact and quiet — favoured by guests passing through on the RN7 between Antsirabe and Isalo.',
    bedSetup: 'Double katrafay (2 rooms) or twin voamboana (2 rooms).',
    view: 'Garden',
    features: [
      'En-suite bathroom with hot shower',
      'Mosquito nets',
      'Hot water bottles at night',
      'Free WiFi',
      'Compact and quiet',
      'Single occupancy rate available',
    ],
    heroImage: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    gallery: [
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=1500w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=1500w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w`,
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
