/**
 * Catégories de chambres — source unique pour /rooms et /rooms/[category].
 * Toutes les infos sont vérifiées depuis :
 *  - Le PDF "Tarifs Publics 2026" (prix Public + Day Use, taxes, lit supp)
 *  - Le document Kirsten (numéros de chambres, essences de bois, dimensions)
 *
 * Aucune donnée inventée.
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
  /** Noms des suites individuelles (uniquement pour la Supérieure). */
  suiteNames?: string[];
  /** Numéros des chambres dans l'hôtel. */
  roomNumbers: string[];
  size: string;
  capacity: string;
  count: string;
  countNum: number;
  /** Tarif public 2026 (par nuit, en Ariary). */
  priceMga: number;
  /** Tarif Day Use 2026 (en Ariary). */
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

export const categories: Category[] = [
  {
    slug: 'superieure',
    number: '01',
    name: 'Supérieure',
    suiteNames: ['Rogaland Suite', 'Kristiansand Suite'],
    roomNumbers: ['14', '15'],
    size: '43 m²',
    capacity: '1 à 4 personnes',
    count: '2 chambres',
    countNum: 2,
    priceMga: 255000,
    priceMgaDayUse: 192000,
    shortDescription:
      'Les deux plus grandes chambres de la maison. Lit king size en palissandre, vue sur les rizières.',
    longDescription:
      'Deux suites baptisées Rogaland et Kristiansand, en hommage au passé norvégien d\'Hasina, étudiante à l\'Université de Stavanger. Chambres 14 et 15. Lit king 200×200 en palissandre, option d\'ajouter jusqu\'à deux lits simples. Quarante-trois mètres carrés, deux fenêtres sur les rizières.',
    bedSetup:
      'Lit king 200×200 en palissandre. Possibilité d\'ajouter jusqu\'à 2 lits simples 90×200.',
    view: 'Rizières et village d\'Ambalakely.',
    bestFor: 'Une famille de 4, ou deux voyageurs avec de l\'espace pour lire.',
    features: [
      { icon: 'bath', label: 'Salle de bain privée, eau chaude toute la journée' },
      { icon: 'tree', label: 'Mobilier en palissandre + katrafay (essences locales)' },
      { icon: 'moon', label: 'Moustiquaires en chambre' },
      { icon: 'bed', label: 'Jusqu\'à 2 lits simples additionnels sur demande' },
      { icon: 'view', label: 'Vue sur les rizières et le village' },
      { icon: 'house', label: 'Architecture Betsileo, matériaux locaux' },
      { icon: 'wifi', label: 'WiFi gratuit dans toute la maison' },
      { icon: 'bell', label: 'Service en chambre dès 5h30' },
    ],
    heroImage: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    gallery: [
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    concierge: {
      body: 'Les deux plus belles vues de la maison. Les fenêtres donnent sur les rizières, et au matin la lumière entre lentement. Le lit en palissandre a été fabriqué à Fianarantsoa.',
      signed: 'Hasina',
    },
    pullQuote: 'Les deux plus belles vues de la maison.',
  },
  {
    slug: 'confort',
    number: '02',
    name: 'Confort',
    roomNumbers: ['1', '2', '11', '12'],
    size: '29 m²',
    capacity: '1 à 3 personnes',
    count: '4 chambres',
    countNum: 4,
    priceMga: 226000,
    priceMgaDayUse: 170000,
    shortDescription:
      'Un lit king et un lit simple, dans vingt-neuf mètres carrés. Deux donnent sur le jardin, deux sont à l\'étage.',
    longDescription:
      'Quatre chambres Confort, par paires. Les chambres 1 et 2 (rez-de-chaussée) ouvrent sur le jardin. Les chambres 11 et 12 (étage) offrent une vue plus large sur les hautes terres. Un lit king 200×200 en palissandre, un lit simple 90×200 en katrafay.',
    bedSetup: 'Un lit king 200×200 en palissandre + un lit simple 90×200 en katrafay.',
    view: 'Jardin au rez-de-chaussée. Hautes terres et rizières à l\'étage.',
    bestFor: 'Deux adultes et un enfant, ou un voyageur qui veut un bureau près de la fenêtre.',
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
    heroImage: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    gallery: [
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ],
    concierge: {
      body: 'Les chambres 11 et 12 à l\'étage ont la vue qui m\'a fait choisir de m\'arrêter ici. Le bureau face à l\'est, la porte qui s\'ouvre vers le jardin.',
      signed: 'Hasina',
    },
    pullQuote: 'La vue qui m\'a fait choisir de m\'arrêter ici.',
  },
  {
    slug: 'standard',
    number: '03',
    name: 'Standard',
    roomNumbers: ['4', '5', '6', '7'],
    size: '21 m²',
    capacity: '1 à 2 personnes',
    count: '4 chambres',
    countNum: 4,
    priceMga: 182000,
    priceMgaDayUse: 137000,
    shortDescription:
      'Les quatre premières chambres de la maison. Compactes, calmes, et la même attention au confort.',
    longDescription:
      'Quatre chambres au rez-de-chaussée : deux avec un lit double 180×200 en katrafay (chambres 4 et 5), deux avec deux lits simples 90×200 en palissandre (chambres 6 et 7). Les plus calmes de la maison, en retrait de la salle à manger.',
    bedSetup:
      'Lit double 180×200 en katrafay (deux chambres) ou deux lits simples 90×200 en palissandre (deux chambres).',
    view: 'Jardin.',
    bestFor: 'Un voyageur seul, deux amis, ou une nuit d\'étape sur la RN7.',
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
    heroImage: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    gallery: [
      `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
      `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
      `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ],
    concierge: {
      body: 'Ces chambres ont le plus de guests qui reviennent. Les voyageurs de la RN7, ceux qui font l\'aller-retour Antsirabe-Isalo, ceux qui passent une seule nuit.',
      signed: 'Hasina',
    },
    pullQuote: 'Les chambres avec le plus de guests qui reviennent.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Extras à la réservation — du PDF Tarifs 2026.
 * Single source pour /rooms, /faq, /book.
 */
export const ROOM_EXTRAS = {
  /** Taxe communale + vignette touristique, par séjour. */
  localTax: 3000,
  /** Lit supplémentaire (gratuit pour les moins de 12 ans). */
  extraBed: 35000,
  /** Day use = 75 % du tarif Public selon le PDF 2026 (mis à jour vs 50 % de l'ancien Kirsten doc). */
  dayUseRatioNote: 'Day use disponible à 75 % du tarif public.',
} as const;
