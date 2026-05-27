/**
 * Données chambres + avis — extraites de hotelambalakely.com (Squarespace).
 * 3 catégories, 10 chambres au total, données réelles depuis le PDF Tarifs 2026
 * et le document de description Kirsten.
 */

export type Room = {
  id: string;
  number: string;
  name: string;
  size: string;
  capacity: string;
  priceMga: number;
  image: string;
  description?: string;
};

const SQ =
  'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export const rooms: Room[] = [
  // 2 Supérieure — Rogaland Suite + Kristiansand Suite (chambres 14 et 15)
  {
    id: 'superieure-14-rogaland',
    number: '14',
    name: 'Rogaland Suite',
    size: '43 m²',
    capacity: '1 à 4 personnes',
    priceMga: 255000,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description:
      'Lit king size 200×200 en palissandre, lit simple supplémentaire possible. Vue sur les rizières.',
  },
  {
    id: 'superieure-15-kristiansand',
    number: '15',
    name: 'Kristiansand Suite',
    size: '43 m²',
    capacity: '1 à 4 personnes',
    priceMga: 255000,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description:
      'Lit king size 200×200 en palissandre, lit simple supplémentaire possible. Vue sur les rizières.',
  },
  // 4 Confort — chambres 1, 2, 11, 12
  {
    id: 'confort-1',
    number: '1',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. Vue jardin.',
  },
  {
    id: 'confort-2',
    number: '2',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. Vue jardin.',
  },
  {
    id: 'confort-11',
    number: '11',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. À l\'étage, vue dégagée sur les hautes terres.',
  },
  {
    id: 'confort-12',
    number: '12',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. À l\'étage, vue dégagée sur les hautes terres.',
  },
  // 4 Standard — chambres 4, 5, 6, 7 (2 doubles, 2 twin)
  {
    id: 'standard-4',
    number: '4',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Lit double 180×200 en katrafay. Vue jardin.',
  },
  {
    id: 'standard-5',
    number: '5',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Lit double 180×200 en katrafay. Vue jardin.',
  },
  {
    id: 'standard-6',
    number: '6',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Deux lits simples 90×200 en palissandre. Vue jardin.',
  },
  {
    id: 'standard-7',
    number: '7',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Deux lits simples 90×200 en palissandre. Vue jardin.',
  },
];

/**
 * Avis clients — déplacés vers `src/lib/data/reviews.ts` le 2026-05-27 #120
 * pour supporter trilingue FR/EN/NO. Le re-export ci-dessous garde la
 * compat des imports legacy (`@/lib/data/rooms` → `Review`, `reviews`).
 */
export type { Review } from './reviews';
export { reviews, getReviews } from './reviews';
