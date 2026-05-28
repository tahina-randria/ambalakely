/**
 * Matrice de comparaison — mêmes critères pour les 3 catégories.
 * Utilisée dans /rooms en tant que grille de lecture rapide.
 *
 * Types de valeurs :
 *  - string  → valeur typographique (ex. "43 m²", "King")
 *  - true    → coche
 *  - false   → tiret (non inclus)
 *
 * §38 (2026-05-28) — migré au pattern trilingue. Avant, le tableau était
 * FR-only et fuyait crûment sur /en + /no. Stratégie : trois listes
 * complètes (FR / EN / NO) parallèles, plus un helper `getComparison`.
 * On garde l'API consumer-side identique à l'ancienne `comparison`
 * pour minimiser l'impact côté `RoomComparison.tsx`.
 *
 * Les brand-names (Supérieure, palissandre, katrafay) restent en FR
 * dans la traduction EN car ce sont les noms exacts des bois locaux —
 * cohérent avec experiences.ts / categories.ts.
 */
import type { FeatureIconName } from '@/components/atoms/FeatureIcon';

export type ComparisonValue = string | boolean;

export type ComparisonRow = {
  icon: FeatureIconName;
  label: string;
  values: {
    superieure: ComparisonValue;
    confort: ComparisonValue;
    standard: ComparisonValue;
  };
};

const COMPARISON_FR: ComparisonRow[] = [
  {
    icon: 'size',
    label: 'Surface',
    values: { superieure: '43 m²', confort: '29 m²', standard: '21 m²' },
  },
  {
    icon: 'users',
    label: 'Capacité',
    values: { superieure: '1 à 4', confort: '1 à 3', standard: '1 à 2' },
  },
  {
    icon: 'bed',
    label: 'Lit',
    values: {
      superieure: 'King en palissandre',
      confort: 'King + simple en katrafay',
      standard: 'Double ou twin',
    },
  },
  {
    icon: 'view',
    label: 'Vue',
    values: {
      superieure: 'Rizières',
      confort: 'Jardin ou étage',
      standard: 'Jardin',
    },
  },
  {
    icon: 'leaf',
    label: 'Accès direct au jardin',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'house',
    label: 'Accès à la terrasse haute',
    values: { superieure: true, confort: false, standard: false },
  },
  {
    icon: 'desk',
    label: 'Bureau sous la fenêtre',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'bed',
    label: 'Lit simple supplémentaire',
    values: { superieure: true, confort: true, standard: false },
  },
  {
    icon: 'bath',
    label: 'Eau chaude toute la journée',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'moon',
    label: 'Bouillottes au coucher',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'wifi',
    label: 'WiFi gratuit',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'bell',
    label: 'Service en chambre dès sept heures',
    values: { superieure: true, confort: true, standard: true },
  },
];

const COMPARISON_EN: ComparisonRow[] = [
  {
    icon: 'size',
    label: 'Floor area',
    values: { superieure: '43 m²', confort: '29 m²', standard: '21 m²' },
  },
  {
    icon: 'users',
    label: 'Capacity',
    values: { superieure: '1–4 guests', confort: '1–3 guests', standard: '1–2 guests' },
  },
  {
    icon: 'bed',
    label: 'Bed',
    values: {
      superieure: 'King in rosewood',
      confort: 'King + single in katrafay',
      standard: 'Double or twin',
    },
  },
  {
    icon: 'view',
    label: 'Outlook',
    values: {
      superieure: 'Rice paddies',
      confort: 'Garden or upper floor',
      standard: 'Garden',
    },
  },
  {
    icon: 'leaf',
    label: 'Direct garden access',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'house',
    label: 'Access to the upper terrace',
    values: { superieure: true, confort: false, standard: false },
  },
  {
    icon: 'desk',
    label: 'Desk under the window',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'bed',
    label: 'Extra single bed',
    values: { superieure: true, confort: true, standard: false },
  },
  {
    icon: 'bath',
    label: 'Hot water all day',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'moon',
    label: 'Hot-water bottles at turndown',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'wifi',
    label: 'Free WiFi',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'bell',
    label: 'In-room breakfast from seven',
    values: { superieure: true, confort: true, standard: true },
  },
];

const COMPARISON_NO: ComparisonRow[] = [
  {
    icon: 'size',
    label: 'Areal',
    values: { superieure: '43 m²', confort: '29 m²', standard: '21 m²' },
  },
  {
    icon: 'users',
    label: 'Kapasitet',
    values: { superieure: '1–4 gjester', confort: '1–3 gjester', standard: '1–2 gjester' },
  },
  {
    icon: 'bed',
    label: 'Seng',
    values: {
      superieure: 'King i palisander',
      confort: 'King + enkelt i katrafay',
      standard: 'Dobbel eller twin',
    },
  },
  {
    icon: 'view',
    label: 'Utsikt',
    values: {
      superieure: 'Risåkrene',
      confort: 'Hage eller øvre etasje',
      standard: 'Hagen',
    },
  },
  {
    icon: 'leaf',
    label: 'Direkte tilgang til hagen',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'house',
    label: 'Tilgang til den øvre terrassen',
    values: { superieure: true, confort: false, standard: false },
  },
  {
    icon: 'desk',
    label: 'Skrivebord under vinduet',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'bed',
    label: 'Ekstra enkeltseng',
    values: { superieure: true, confort: true, standard: false },
  },
  {
    icon: 'bath',
    label: 'Varmt vann hele dagen',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'moon',
    label: 'Varmeflasker ved sengetid',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'wifi',
    label: 'Gratis WiFi',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'bell',
    label: 'Frokost på rommet fra klokken sju',
    values: { superieure: true, confort: true, standard: true },
  },
];

export function getComparison(locale: string): ComparisonRow[] {
  if (locale === 'en') return COMPARISON_EN;
  if (locale === 'no') return COMPARISON_NO;
  return COMPARISON_FR;
}

/** Backwards-compat re-export — anciens consumers qui n'ont pas encore
 * migré au pattern getComparison(locale). À retirer une fois zero usage. */
export const comparison = COMPARISON_FR;
