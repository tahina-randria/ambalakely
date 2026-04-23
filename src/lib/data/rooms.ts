/**
 * Placeholder room data — Betsileo toponyms.
 * To be replaced once Hasina's team provides real names, photos, prices.
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
};

export const rooms: Room[] = [
  {
    id: 'sahambavy',
    number: '01',
    name: 'Sahambavy',
    size: '28 m²',
    capacity: 'For two',
    priceMga: 350000,
    priceEur: 67,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  },
  {
    id: 'ranomafana',
    number: '02',
    name: 'Ranomafana',
    size: '32 m²',
    capacity: 'For two',
    priceMga: 380000,
    priceEur: 72,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  },
  {
    id: 'isalo',
    number: '03',
    name: 'Isalo',
    size: '28 m²',
    capacity: 'For two or three',
    priceMga: 420000,
    priceEur: 80,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
  },
  {
    id: 'andringitra',
    number: '04',
    name: 'Andringitra',
    size: '36 m²',
    capacity: 'For two',
    priceMga: 450000,
    priceEur: 86,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  },
  {
    id: 'tsaranoro',
    number: '05',
    name: 'Tsaranoro',
    size: '42 m²',
    capacity: 'For four',
    priceMga: 620000,
    priceEur: 118,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80',
  },
  {
    id: 'antanifotsy',
    number: '06',
    name: 'Antanifotsy',
    size: '30 m²',
    capacity: 'For two',
    priceMga: 400000,
    priceEur: 76,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
  },
  {
    id: 'ambositra',
    number: '07',
    name: 'Ambositra',
    size: '28 m²',
    capacity: 'For two',
    priceMga: 360000,
    priceEur: 69,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
  },
  {
    id: 'ihosy',
    number: '08',
    name: 'Ihosy',
    size: '30 m²',
    capacity: 'For two',
    priceMga: 380000,
    priceEur: 72,
    image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=1200&q=80',
  },
  {
    id: 'ranohira',
    number: '09',
    name: 'Ranohira',
    size: '26 m²',
    capacity: 'For two',
    priceMga: 340000,
    priceEur: 65,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
  },
  {
    id: 'fianarantsoa',
    number: '10',
    name: 'Fianarantsoa',
    size: '48 m²',
    capacity: 'Family · for four',
    priceMga: 720000,
    priceEur: 137,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
  },
];

export const experiences = [
  { id: 'ranomafana', number: '01', title: 'Ranomafana National Park', subtitle: 'Full-day guided walk', duration: '8 h' },
  { id: 'silk', number: '02', title: 'Silk workshop', subtitle: 'Betsileo traditional weaving', duration: '3 h' },
  { id: 'cooking', number: '03', title: 'Cooking session', subtitle: 'With the kitchen', duration: '4 h' },
  { id: 'vineyard', number: '04', title: 'Vineyard visit', subtitle: 'Sahambavy estate', duration: '½ day' },
  { id: 'andringitra-trek', number: '05', title: 'Andringitra trek', subtitle: 'Three days, two nights', duration: '3 d' },
  { id: 'market', number: '06', title: 'Market & basketry', subtitle: 'Betsileo craftsmanship', duration: '½ day' },
] as const;

export const journalPosts = [
  { id: 'silence', date: 'MARCH 2026', title: 'On silence, and why we don\u2019t have televisions.' },
  { id: 'harvest', date: 'FEBRUARY 2026', title: 'Notes from the 2025 harvest.' },
  { id: 'closure', date: 'JANUARY 2026', title: 'Why we close in December.' },
] as const;
