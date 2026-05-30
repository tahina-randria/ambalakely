/**
 * ⚠️ DONNÉES DE DÉMONSTRATION — pas réelles.
 *
 * Sert UNIQUEMENT à prototyper la mise en page Finance façon Origin (revenus /
 * dépenses / flux net / breakdown). À remplacer par la vraie donnée :
 *  • Revenus = read model des réservations (déjà en base) ;
 *  • Dépenses = future table `expense` + saisie manuelle.
 * La page affiche un badge « Démo » bien visible tant que c'est ce module qui
 * alimente l'écran. Tout est isolé ici pour un retrait/branchement propre.
 */

export type Txn = {
  label: string;
  category: string;
  day: number; // jour du mois
  amountMinor: number; // Ar
  kind: 'income' | 'expense';
};

export type Cat = { label: string; amountMinor: number; color: string };

export type Recurring = { label: string; category: string; cadence: string; amountMinor: number };

export type MonthData = {
  key: string;
  label: string;
  incomeMinor: number;
  expenseMinor: number;
  budgetMinor: number;
  expenseCats: Cat[];
  incomeCats: Cat[];
  txns: Txn[];
};

// Palette catégorielle (chaude, façon Origin, alignée sand/sage).
const C = {
  salaires: '#2f6b3e',
  energie: '#c79a3b',
  fnb: '#3f8f7a',
  fournitures: '#d9763f',
  maintenance: '#6b9bd1',
  marketing: '#8b7fd1',
  autres: '#b8ad97',
  chambres: '#2f6b3e',
  extras: '#3f8f7a',
};

export const MONTHS: MonthData[] = [
  {
    key: '2026-03',
    label: 'Mars',
    incomeMinor: 16_200_000,
    expenseMinor: 13_800_000,
    budgetMinor: 16_000_000,
    expenseCats: [
      { label: 'Salaires', amountMinor: 7_200_000, color: C.salaires },
      { label: 'Énergie (JIRAMA)', amountMinor: 2_350_000, color: C.energie },
      { label: 'Restauration', amountMinor: 1_900_000, color: C.fnb },
      { label: 'Fournitures', amountMinor: 1_150_000, color: C.fournitures },
      { label: 'Maintenance', amountMinor: 720_000, color: C.maintenance },
      { label: 'Marketing', amountMinor: 280_000, color: C.marketing },
      { label: 'Autres', amountMinor: 200_000, color: C.autres },
    ],
    incomeCats: [
      { label: 'Chambres', amountMinor: 13_400_000, color: C.chambres },
      { label: 'Restauration', amountMinor: 1_950_000, color: C.energie },
      { label: 'Excursions', amountMinor: 850_000, color: C.extras },
    ],
    txns: [
      { label: 'Salaires personnel', category: 'Salaires', day: 1, amountMinor: 7_200_000, kind: 'expense' },
      { label: 'JIRAMA — électricité & eau', category: 'Énergie', day: 5, amountMinor: 2_350_000, kind: 'expense' },
      { label: 'Réservation AMB-7K2P', category: 'Chambres', day: 9, amountMinor: 1_180_000, kind: 'income' },
      { label: 'Approvisionnement cuisine', category: 'Restauration', day: 11, amountMinor: 980_000, kind: 'expense' },
      { label: 'Réservation AMB-3X9C', category: 'Chambres', day: 18, amountMinor: 1_640_000, kind: 'income' },
    ],
  },
  {
    key: '2026-04',
    label: 'Avril',
    incomeMinor: 18_900_000,
    expenseMinor: 14_200_000,
    budgetMinor: 16_000_000,
    expenseCats: [
      { label: 'Salaires', amountMinor: 7_200_000, color: C.salaires },
      { label: 'Énergie (JIRAMA)', amountMinor: 2_180_000, color: C.energie },
      { label: 'Restauration', amountMinor: 2_250_000, color: C.fnb },
      { label: 'Fournitures', amountMinor: 1_250_000, color: C.fournitures },
      { label: 'Maintenance', amountMinor: 820_000, color: C.maintenance },
      { label: 'Marketing', amountMinor: 350_000, color: C.marketing },
      { label: 'Autres', amountMinor: 150_000, color: C.autres },
    ],
    incomeCats: [
      { label: 'Chambres', amountMinor: 15_700_000, color: C.chambres },
      { label: 'Restauration', amountMinor: 2_300_000, color: C.energie },
      { label: 'Excursions', amountMinor: 900_000, color: C.extras },
    ],
    txns: [
      { label: 'Salaires personnel', category: 'Salaires', day: 1, amountMinor: 7_200_000, kind: 'expense' },
      { label: 'JIRAMA — électricité & eau', category: 'Énergie', day: 5, amountMinor: 2_180_000, kind: 'expense' },
      { label: 'Réservation AMB-9F4T', category: 'Chambres', day: 7, amountMinor: 2_120_000, kind: 'income' },
      { label: 'Approvisionnement cuisine', category: 'Restauration', day: 10, amountMinor: 1_140_000, kind: 'expense' },
      { label: 'Réservation AMB-2Q8M', category: 'Chambres', day: 22, amountMinor: 1_480_000, kind: 'income' },
    ],
  },
  {
    key: '2026-05',
    label: 'Mai',
    incomeMinor: 22_400_000,
    expenseMinor: 15_100_000,
    budgetMinor: 16_000_000,
    expenseCats: [
      { label: 'Salaires', amountMinor: 7_200_000, color: C.salaires },
      { label: 'Restauration', amountMinor: 2_400_000, color: C.fnb },
      { label: 'Énergie (JIRAMA)', amountMinor: 2_100_000, color: C.energie },
      { label: 'Fournitures', amountMinor: 1_300_000, color: C.fournitures },
      { label: 'Maintenance', amountMinor: 900_000, color: C.maintenance },
      { label: 'Marketing', amountMinor: 600_000, color: C.marketing },
      { label: 'Autres', amountMinor: 600_000, color: C.autres },
    ],
    incomeCats: [
      { label: 'Chambres', amountMinor: 18_600_000, color: C.chambres },
      { label: 'Restauration', amountMinor: 2_600_000, color: C.energie },
      { label: 'Excursions', amountMinor: 1_200_000, color: C.extras },
    ],
    txns: [
      { label: 'Salaires personnel', category: 'Salaires', day: 1, amountMinor: 7_200_000, kind: 'expense' },
      { label: 'Telma — internet', category: 'Autres', day: 3, amountMinor: 280_000, kind: 'expense' },
      { label: 'JIRAMA — électricité & eau', category: 'Énergie', day: 5, amountMinor: 2_100_000, kind: 'expense' },
      { label: 'Approvisionnement cuisine', category: 'Restauration', day: 8, amountMinor: 1_350_000, kind: 'expense' },
      { label: 'Réservation AMB-74RC', category: 'Chambres', day: 9, amountMinor: 1_850_000, kind: 'income' },
      { label: 'Blanchisserie', category: 'Fournitures', day: 12, amountMinor: 420_000, kind: 'expense' },
      { label: 'Réservation AMB-FN43', category: 'Chambres', day: 14, amountMinor: 1_240_000, kind: 'income' },
      { label: 'Maintenance piscine', category: 'Maintenance', day: 15, amountMinor: 650_000, kind: 'expense' },
    ],
  },
];

export const RECURRING: Recurring[] = [
  { label: 'Salaires personnel', category: 'Salaires', cadence: 'Mensuel · le 1er', amountMinor: 7_200_000 },
  { label: 'JIRAMA — électricité & eau', category: 'Énergie', cadence: 'Mensuel · ~le 5', amountMinor: 2_100_000 },
  { label: 'Telma — internet', category: 'Autres', cadence: 'Mensuel · le 3', amountMinor: 280_000 },
  { label: 'Assurance établissement', category: 'Autres', cadence: 'Mensuel · le 10', amountMinor: 350_000 },
];

export const FREQUENT: { label: string; count: number }[] = [
  { label: 'Marché Anjoma', count: 6 },
  { label: 'Carburant groupe', count: 3 },
  { label: 'Blanchisserie', count: 4 },
];

export const CURRENT_KEY = '2026-05';
