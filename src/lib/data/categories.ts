/**
 * Room categories — single source for /rooms and /rooms/[category].
 *
 * All identity facts (slug, room numbers, sizes, prices, image URLs)
 * are verified from :
 *  - `docs/Publics 2026 Hôtel Ambalakely - Tarifs et Politiques de Vente.pdf`
 *    (Public + Day Use rates, taxes, extra bed)
 *  - `docs/Hotel Ambalakely beskrivelse Kirsten.docx` (room numbers,
 *    wood species, dimensions)
 *
 * No invented data.
 *
 * Trilingual shape — same pattern as `reviews.ts`. Before this file,
 * CATEGORIES_FALLBACK was FR-only ; /en/rooms/{slug} and /no/rooms/{slug}
 * leaked French whenever Sanity was empty for a locale (the common
 * case during T1.x ramp-up). The `getCategories(locale)` helper now
 * resolves the right shape per locale and is what `sanity/lib/fetch.ts`
 * uses as the field-by-field fallback merge.
 *
 * Brand / wood names kept as-is across locales : Supérieure, Confort,
 * Standard, Rogaland Suite, Kristiansand Suite, palissandre, katrafay
 * (palissandre is a French loanword the EN/NO copy keeps ; katrafay is
 * the Malagasy name for the wood). King-size dimensions written `200×200`
 * in all three locales.
 *
 * Tone : EN is restrained British editorial (the rooms, the rice paddies,
 * the garden view). NO is editorial Bokmål, matching `messages/no.json`
 * `RoomsPage` / `RoomCategory` voice (rommene, utsikt over hagen).
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
  /** Names of the individual suites (Supérieure only). */
  suiteNames?: string[];
  /** Room numbers in the house. */
  roomNumbers: string[];
  size: string;
  capacity: string;
  count: string;
  countNum: number;
  /** Public rate 2026 (per night, Ariary). */
  priceMga: number;
  /** Day Use rate 2026 (Ariary). */
  priceMgaDayUse: number;
  shortDescription: string;
  longDescription: string;
  bedSetup: string;
  view: string;
  bestFor: string;
  features: Feature[];
  heroImage: string;
  gallery: string[];
  concierge: { body: string; signed: 'Mamy' | 'Hasina' };
  pullQuote: string;
};

/**
 * Locale-aware copy block for one category. Identity fields live on the
 * outer object (slug, prices, sizes, image URLs) ; per-locale strings
 * live in `fr` / `en` / `no`. The `concierge.signed` value is shared
 * across locales (it's a person's name).
 */
type LocalizedCopy = {
  name: string;
  shortDescription: string;
  longDescription: string;
  bedSetup: string;
  view: string;
  bestFor: string;
  pullQuote: string;
  count: string;
  capacity: string;
  conciergeBody: string;
  features: Feature[];
};

type LocalizedCategory = {
  // Identity — same value across locales.
  slug: Category['slug'];
  number: string;
  suiteNames?: string[];
  roomNumbers: string[];
  size: string;
  countNum: number;
  priceMga: number;
  priceMgaDayUse: number;
  heroImage: string;
  gallery: string[];
  conciergeSigned: Category['concierge']['signed'];
  // Localized copy blocks.
  fr: LocalizedCopy;
  en: LocalizedCopy;
  no: LocalizedCopy;
};

const SOURCES: LocalizedCategory[] = [
  {
    slug: 'superieure',
    number: '01',
    suiteNames: ['Rogaland Suite', 'Kristiansand Suite'],
    roomNumbers: ['14', '15'],
    size: '43 m²',
    countNum: 2,
    priceMga: 255000,
    priceMgaDayUse: 192000,
    heroImage: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    gallery: [
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    conciergeSigned: 'Hasina',
    fr: {
      name: 'Supérieure',
      capacity: '1 à 4 personnes',
      count: '2 chambres',
      shortDescription:
        'Les deux plus grandes chambres de la maison. Lit king size en palissandre, vue sur les rizières.',
      longDescription:
        "Deux suites baptisées Rogaland et Kristiansand, en hommage au passé norvégien d'Hasina, étudiante à l'Université de Stavanger. Chambres 14 et 15. Lit king 200×200 en palissandre, option d'ajouter jusqu'à deux lits simples. Quarante-trois mètres carrés, deux fenêtres sur les rizières.",
      bedSetup:
        "Lit king 200×200 en palissandre. Possibilité d'ajouter jusqu'à 2 lits simples 90×200.",
      view: "Rizières et village d'Ambalakely.",
      bestFor: "Une famille de 4, ou deux voyageurs avec de l'espace pour lire.",
      pullQuote: 'Les deux plus belles vues de la maison.',
      conciergeBody:
        'Les deux plus belles vues de la maison. Les fenêtres donnent sur les rizières, et au matin la lumière entre lentement. Le lit en palissandre a été fabriqué à Fianarantsoa.',
      features: [
        { icon: 'bath', label: 'Salle de bain privée, eau chaude toute la journée' },
        { icon: 'tree', label: 'Mobilier en palissandre + katrafay (essences locales)' },
        { icon: 'moon', label: 'Moustiquaires en chambre' },
        { icon: 'bed', label: "Jusqu'à 2 lits simples additionnels sur demande" },
        { icon: 'view', label: 'Vue sur les rizières et le village' },
        { icon: 'house', label: 'Architecture Betsileo, matériaux locaux' },
        { icon: 'wifi', label: 'WiFi gratuit dans toute la maison' },
        { icon: 'bell', label: 'Service en chambre dès 5h30' },
      ],
    },
    en: {
      name: 'Supérieure',
      capacity: '1 to 4 guests',
      count: '2 rooms',
      shortDescription:
        'The two largest rooms in the house. King-size bed in palissandre, view over the rice paddies.',
      longDescription:
        "Two suites named Rogaland and Kristiansand, after Hasina's years in Norway as a student at the University of Stavanger. Rooms 14 and 15. King bed 200×200 in palissandre, with the option to add up to two single beds. Forty-three square metres, two windows on the rice paddies.",
      bedSetup:
        'King bed 200×200 in palissandre. Up to 2 single beds 90×200 can be added.',
      view: 'Rice paddies and the village of Ambalakely.',
      bestFor: 'A family of four, or two travellers with room to read.',
      pullQuote: 'The two finest views in the house.',
      conciergeBody:
        'The two finest views in the house. The windows open onto the rice paddies, and in the morning the light enters slowly. The palissandre bed was made in Fianarantsoa.',
      features: [
        { icon: 'bath', label: 'Private bathroom, hot water all day' },
        { icon: 'tree', label: 'Palissandre and katrafay furniture (local woods)' },
        { icon: 'moon', label: 'Mosquito nets in the room' },
        { icon: 'bed', label: 'Up to 2 additional single beds on request' },
        { icon: 'view', label: 'View over the rice paddies and the village' },
        { icon: 'house', label: 'Betsileo architecture, local materials' },
        { icon: 'wifi', label: 'Free WiFi throughout the house' },
        { icon: 'bell', label: 'Room service from 5.30 a.m.' },
      ],
    },
    no: {
      name: 'Supérieure',
      capacity: '1 til 4 gjester',
      count: '2 rom',
      shortDescription:
        'De to største rommene i huset. Kingsize-seng i palissandre, utsikt over rismarkene.',
      longDescription:
        'To suiter, Rogaland og Kristiansand, oppkalt etter Hasinas år i Norge som student ved Universitetet i Stavanger. Rom 14 og 15. King-seng 200×200 i palissandre, med mulighet for å legge til opptil to enkeltsenger. Førti-tre kvadratmeter, to vinduer mot rismarkene.',
      bedSetup:
        'King-seng 200×200 i palissandre. Opptil 2 enkeltsenger 90×200 kan legges til.',
      view: 'Rismarker og landsbyen Ambalakely.',
      bestFor: 'En familie på fire, eller to reisende med plass til å lese.',
      pullQuote: 'De to vakreste utsiktene i huset.',
      conciergeBody:
        'De to vakreste utsiktene i huset. Vinduene åpner seg mot rismarkene, og om morgenen kommer lyset langsomt inn. Palissandre-sengen ble laget i Fianarantsoa.',
      features: [
        { icon: 'bath', label: 'Privat bad, varmt vann hele dagen' },
        { icon: 'tree', label: 'Møbler i palissandre og katrafay (lokale tresorter)' },
        { icon: 'moon', label: 'Myggnett på rommet' },
        { icon: 'bed', label: 'Opptil 2 ekstra enkeltsenger på forespørsel' },
        { icon: 'view', label: 'Utsikt over rismarkene og landsbyen' },
        { icon: 'house', label: 'Betsileo-arkitektur, lokale materialer' },
        { icon: 'wifi', label: 'Gratis WiFi i hele huset' },
        { icon: 'bell', label: 'Romservice fra kl. 5.30' },
      ],
    },
  },
  {
    slug: 'confort',
    number: '02',
    roomNumbers: ['1', '2', '11', '12'],
    size: '29 m²',
    countNum: 4,
    priceMga: 226000,
    priceMgaDayUse: 170000,
    heroImage: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    gallery: [
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    conciergeSigned: 'Hasina',
    fr: {
      name: 'Confort',
      capacity: '1 à 3 personnes',
      count: '4 chambres',
      shortDescription:
        "Un lit king et un lit simple, dans vingt-neuf mètres carrés. Deux donnent sur le jardin, deux sont à l'étage.",
      longDescription:
        "Quatre chambres Confort, par paires. Les chambres 1 et 2 (rez-de-chaussée) ouvrent sur le jardin. Les chambres 11 et 12 (étage) offrent une vue plus large sur les hautes terres. Un lit king 200×200 en palissandre, un lit simple 90×200 en katrafay.",
      bedSetup: 'Un lit king 200×200 en palissandre + un lit simple 90×200 en katrafay.',
      view: "Jardin au rez-de-chaussée. Hautes terres et rizières à l'étage.",
      bestFor: 'Deux adultes et un enfant, ou un voyageur qui veut un bureau près de la fenêtre.',
      pullQuote: "La vue qui m'a fait choisir de m'arrêter ici.",
      conciergeBody:
        "Les chambres 11 et 12 à l'étage ont la vue qui m'a fait choisir de m'arrêter ici. Le bureau face à l'est, la porte qui s'ouvre vers le jardin.",
      features: [
        { icon: 'bath', label: 'Salle de bain privée, eau chaude toute la journée' },
        { icon: 'desk', label: 'Bureau près de la fenêtre' },
        { icon: 'moon', label: 'Moustiquaires en chambre' },
        { icon: 'leaf', label: 'Deux chambres avec accès direct au jardin (RDC)' },
        { icon: 'stairs', label: 'Deux chambres avec vue dégagée (étage)' },
        { icon: 'bed', label: 'Lit simple en katrafay pour un 3ème invité' },
        { icon: 'wifi', label: 'WiFi gratuit dans toute la maison' },
        { icon: 'bell', label: 'Service en chambre dès 5h30' },
      ],
    },
    en: {
      name: 'Confort',
      capacity: '1 to 3 guests',
      count: '4 rooms',
      shortDescription:
        'A king bed and a single bed, in twenty-nine square metres. Two open onto the garden, two are on the upper floor.',
      longDescription:
        'Four Confort rooms, in pairs. Rooms 1 and 2 (ground floor) open onto the garden. Rooms 11 and 12 (upstairs) offer a wider view over the highlands. One king bed 200×200 in palissandre, one single bed 90×200 in katrafay.',
      bedSetup: 'One king bed 200×200 in palissandre, plus one single bed 90×200 in katrafay.',
      view: 'Garden on the ground floor. Highlands and rice paddies upstairs.',
      bestFor: 'Two adults and a child, or a single traveller who wants a desk by the window.',
      pullQuote: 'The view that made me stop here.',
      conciergeBody:
        'Rooms 11 and 12, upstairs, have the view that made me stop here. The desk facing east, the door that opens onto the garden.',
      features: [
        { icon: 'bath', label: 'Private bathroom, hot water all day' },
        { icon: 'desk', label: 'Writing desk by the window' },
        { icon: 'moon', label: 'Mosquito nets in the room' },
        { icon: 'leaf', label: 'Two rooms with direct garden access (ground floor)' },
        { icon: 'stairs', label: 'Two rooms with an open view (upstairs)' },
        { icon: 'bed', label: 'Single katrafay bed for a third guest' },
        { icon: 'wifi', label: 'Free WiFi throughout the house' },
        { icon: 'bell', label: 'Room service from 5.30 a.m.' },
      ],
    },
    no: {
      name: 'Confort',
      capacity: '1 til 3 gjester',
      count: '4 rom',
      shortDescription:
        'En kingseng og en enkeltseng, på tjueni kvadratmeter. To åpner seg mot hagen, to ligger i etasjen over.',
      longDescription:
        'Fire Confort-rom, parvis. Rom 1 og 2 (første etasje) åpner seg mot hagen. Rom 11 og 12 (andre etasje) gir en videre utsikt over høylandet. En king-seng 200×200 i palissandre, en enkeltseng 90×200 i katrafay.',
      bedSetup: 'En king-seng 200×200 i palissandre, pluss en enkeltseng 90×200 i katrafay.',
      view: 'Hage i første etasje. Høyland og rismarker i andre etasje.',
      bestFor: 'To voksne og et barn, eller en enslig reisende som vil ha skrivebord ved vinduet.',
      pullQuote: 'Utsikten som fikk meg til å stoppe her.',
      conciergeBody:
        'Rom 11 og 12, i etasjen over, har utsikten som fikk meg til å stoppe her. Skrivebordet mot øst, døren som åpner seg mot hagen.',
      features: [
        { icon: 'bath', label: 'Privat bad, varmt vann hele dagen' },
        { icon: 'desk', label: 'Skrivebord ved vinduet' },
        { icon: 'moon', label: 'Myggnett på rommet' },
        { icon: 'leaf', label: 'To rom med direkte hageutgang (første etasje)' },
        { icon: 'stairs', label: 'To rom med åpen utsikt (andre etasje)' },
        { icon: 'bed', label: 'Enkeltseng i katrafay til en tredje gjest' },
        { icon: 'wifi', label: 'Gratis WiFi i hele huset' },
        { icon: 'bell', label: 'Romservice fra kl. 5.30' },
      ],
    },
  },
  {
    slug: 'standard',
    number: '03',
    roomNumbers: ['4', '5', '6', '7'],
    size: '21 m²',
    countNum: 4,
    priceMga: 182000,
    priceMgaDayUse: 137000,
    heroImage: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    gallery: [
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ],
    conciergeSigned: 'Hasina',
    fr: {
      name: 'Standard',
      capacity: '1 à 2 personnes',
      count: '4 chambres',
      shortDescription:
        'Les quatre premières chambres de la maison. Compactes, calmes, et la même attention au confort.',
      longDescription:
        'Quatre chambres au rez-de-chaussée : deux avec un lit double 180×200 en katrafay (chambres 4 et 5), deux avec deux lits simples 90×200 en palissandre (chambres 6 et 7). Les plus calmes de la maison, en retrait de la salle à manger.',
      bedSetup:
        'Lit double 180×200 en katrafay (deux chambres) ou deux lits simples 90×200 en palissandre (deux chambres).',
      view: 'Jardin.',
      bestFor: "Un voyageur seul, deux amis, ou une nuit d'étape sur la RN7.",
      pullQuote: 'Les chambres avec le plus de guests qui reviennent.',
      conciergeBody:
        "Ces chambres ont le plus de guests qui reviennent. Les voyageurs de la RN7, ceux qui font l'aller-retour Antsirabe-Isalo, ceux qui passent une seule nuit.",
      features: [
        { icon: 'bath', label: 'Salle de bain privée, eau chaude toute la journée' },
        { icon: 'path', label: 'En retrait, les plus calmes de la maison' },
        { icon: 'moon', label: 'Moustiquaires en chambre' },
        { icon: 'bed', label: 'Deux doubles en katrafay, deux twin en palissandre' },
        { icon: 'users', label: 'Tarif single occupancy disponible' },
        { icon: 'plant', label: 'Vue jardin' },
        { icon: 'wifi', label: 'WiFi gratuit dans toute la maison' },
        { icon: 'calendar', label: 'Disponibilité de dernière minute souvent possible' },
      ],
    },
    en: {
      name: 'Standard',
      capacity: '1 to 2 guests',
      count: '4 rooms',
      shortDescription:
        'The first four rooms of the house. Compact, quiet, and the same attention to comfort.',
      longDescription:
        'Four ground-floor rooms : two with a double bed 180×200 in katrafay (rooms 4 and 5), two with two single beds 90×200 in palissandre (rooms 6 and 7). The quietest in the house, set back from the dining room.',
      bedSetup:
        'Double bed 180×200 in katrafay (two rooms) or two single beds 90×200 in palissandre (two rooms).',
      view: 'Garden.',
      bestFor: 'A solo traveller, two friends, or a one-night stop along the RN7.',
      pullQuote: 'The rooms where most guests come back.',
      conciergeBody:
        'These rooms have the most returning guests. RN7 travellers, those doing the Antsirabe-Isalo round trip, those who stay only one night.',
      features: [
        { icon: 'bath', label: 'Private bathroom, hot water all day' },
        { icon: 'path', label: 'Set back, the quietest rooms in the house' },
        { icon: 'moon', label: 'Mosquito nets in the room' },
        { icon: 'bed', label: 'Two doubles in katrafay, two twins in palissandre' },
        { icon: 'users', label: 'Single occupancy rate available' },
        { icon: 'plant', label: 'Garden view' },
        { icon: 'wifi', label: 'Free WiFi throughout the house' },
        { icon: 'calendar', label: 'Last-minute availability often possible' },
      ],
    },
    no: {
      name: 'Standard',
      capacity: '1 til 2 gjester',
      count: '4 rom',
      shortDescription:
        'De fire første rommene i huset. Kompakte, stille, og samme oppmerksomhet på komfort.',
      longDescription:
        'Fire rom i første etasje: to med dobbeltseng 180×200 i katrafay (rom 4 og 5), to med to enkeltsenger 90×200 i palissandre (rom 6 og 7). De stilleste i huset, trukket litt unna spisesalen.',
      bedSetup:
        'Dobbeltseng 180×200 i katrafay (to rom) eller to enkeltsenger 90×200 i palissandre (to rom).',
      view: 'Hage.',
      bestFor: 'En enslig reisende, to venner, eller en overnatting langs RN7.',
      pullQuote: 'Rommene der flest gjester kommer tilbake.',
      conciergeBody:
        'Disse rommene har flest gjester som kommer tilbake. RN7-reisende, de som tar tur-retur Antsirabe-Isalo, de som overnatter bare én natt.',
      features: [
        { icon: 'bath', label: 'Privat bad, varmt vann hele dagen' },
        { icon: 'path', label: 'Trukket unna, de stilleste rommene i huset' },
        { icon: 'moon', label: 'Myggnett på rommet' },
        { icon: 'bed', label: 'To dobbeltsenger i katrafay, to twin i palissandre' },
        { icon: 'users', label: 'Enkelt-belegg-pris tilgjengelig' },
        { icon: 'plant', label: 'Hageutsikt' },
        { icon: 'wifi', label: 'Gratis WiFi i hele huset' },
        { icon: 'calendar', label: 'Siste-liten-tilgjengelighet ofte mulig' },
      ],
    },
  },
];

type SupportedLocale = 'fr' | 'en' | 'no';
const SUPPORTED: ReadonlyArray<SupportedLocale> = ['fr', 'en', 'no'];

function pickLocale(locale: string): SupportedLocale {
  return (SUPPORTED as ReadonlyArray<string>).includes(locale)
    ? (locale as SupportedLocale)
    : 'fr';
}

/**
 * Returns the 3 categories projected to the requested locale. Falls
 * back to FR for unknown locale strings (defensive — every page passes
 * the validated next-intl locale, but generateStaticParams + sitemap
 * callers may not).
 */
export function getCategories(locale: string): Category[] {
  const l = pickLocale(locale);
  return SOURCES.map((s) => {
    const copy = s[l];
    return {
      slug: s.slug,
      number: s.number,
      name: copy.name,
      ...(s.suiteNames ? { suiteNames: s.suiteNames } : {}),
      roomNumbers: s.roomNumbers,
      size: s.size,
      capacity: copy.capacity,
      count: copy.count,
      countNum: s.countNum,
      priceMga: s.priceMga,
      priceMgaDayUse: s.priceMgaDayUse,
      shortDescription: copy.shortDescription,
      longDescription: copy.longDescription,
      bedSetup: copy.bedSetup,
      view: copy.view,
      bestFor: copy.bestFor,
      features: copy.features,
      heroImage: s.heroImage,
      gallery: s.gallery,
      concierge: { body: copy.conciergeBody, signed: s.conciergeSigned },
      pullQuote: copy.pullQuote,
    };
  });
}

/**
 * Default FR export for legacy callers (e.g. `RoomComparison`, the
 * `scripts/migrate-to-sanity.ts` script, and any older imports of
 * `categories` not yet migrated to `getCategories(locale)`).
 */
export const categories: Category[] = getCategories('fr');

export function getCategory(slug: string, locale: string = 'fr'): Category | undefined {
  return getCategories(locale).find((c) => c.slug === slug);
}

/**
 * Booking extras — from the PDF Tarifs 2026.
 * Single source for /rooms, /faq, /book.
 */
export const ROOM_EXTRAS = {
  /** Local tax + tourist sticker, per stay. */
  localTax: 3000,
  /** Extra bed (free under 12). */
  extraBed: 35000,
  /** Day use = 75 % of the public rate per the 2026 PDF (updated from the 50 % of the older Kirsten doc). */
  dayUseRatioNote: 'Day use available at 75 % of the public rate.',
} as const;
