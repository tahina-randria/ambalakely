/**
 * Comparison matrix — same criteria across all 3 categories.
 * Used in /rooms overview as a quick-scan grid.
 *
 * Value types:
 *  - string  → typographic value (e.g. "43 m²", "King")
 *  - true    → checkmark
 *  - false   → em-dash (not included)
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
    label: 'Size',
    values: { superieure: '43 m²', confort: '29 m²', standard: '21 m²' },
  },
  {
    icon: 'users',
    label: 'Capacity',
    values: { superieure: '1 to 4', confort: '1 to 3', standard: '1 to 2' },
  },
  {
    icon: 'bed',
    label: 'Bed',
    values: {
      superieure: 'King-size voamboana',
      confort: 'King + single katrafay',
      standard: 'Double or twin',
    },
  },
  {
    icon: 'view',
    label: 'View',
    values: {
      superieure: 'Rice fields',
      confort: 'Garden or upstairs',
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
    label: 'Upper terrace access',
    values: { superieure: true, confort: false, standard: false },
  },
  {
    icon: 'desk',
    label: 'Writing desk by the window',
    values: { superieure: false, confort: true, standard: false },
  },
  {
    icon: 'bed',
    label: 'Extra single bed option',
    values: { superieure: true, confort: true, standard: false },
  },
  {
    icon: 'bath',
    label: 'Hot water all day',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'moon',
    label: 'Hot water bottles at night',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'wifi',
    label: 'Free WiFi',
    values: { superieure: true, confort: true, standard: true },
  },
  {
    icon: 'bell',
    label: 'Room service from seven',
    values: { superieure: true, confort: true, standard: true },
  },
];
