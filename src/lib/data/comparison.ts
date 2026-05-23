/**
 * Matrice de comparaison — mêmes critères pour les 3 catégories.
 * Utilisée dans /rooms en tant que grille de lecture rapide.
 *
 * Types de valeurs :
 *  - string  → valeur typographique (ex. "43 m²", "King")
 *  - true    → coche
 *  - false   → tiret (non inclus)
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

export const comparison: ComparisonRow[] = [
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
