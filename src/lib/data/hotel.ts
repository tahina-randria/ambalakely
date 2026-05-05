/**
 * Source de verite pour les infos de l'hotel.
 * Utilise pour SEO (JSON-LD), metadata, footer, contact.
 */

export const HOTEL = {
  name: 'Hotel Ambalakely',
  shortName: 'Ambalakely',
  legalName: 'Hotel Ambalakely',
  description:
    'A small hotel in Fianarantsoa, Madagascar. Ten rooms, a restaurant, a garden. Mamy and Hasina, since 2018.',
  tagline: 'Ten rooms in the highlands of Madagascar.',
  founded: '2018',
  founders: ['Mamy Randriamahazo', 'Hasina Randriamahazo'],
  url: 'https://hotelambalakely.com',
  vercelUrl: 'https://ambalakely.vercel.app',
  email: 'reservation@hotelambalakely.com',
  phone: '+261 34 02 654 70',
  whatsapp: '+261340265470',
  address: {
    street: 'Ambalakely, RN7',
    locality: 'Fianarantsoa',
    region: 'Haute Matsiatra',
    postalCode: '301',
    country: 'MG',
    countryName: 'Madagascar',
  },
  geo: {
    lat: -21.4541,
    lng: 47.0862,
  },
  rooms: 10,
  priceRange: '35-49 EUR',
  starRating: 3,
  amenities: [
    'Restaurant',
    'Garden',
    'Free parking',
    'Free WiFi',
    'Hot water bottles',
    'Mosquito nets',
    'Room service',
    'Airport transfer (on request)',
  ],
  languages: ['en', 'fr', 'no', 'mg'],
  socials: {
    instagram: 'https://www.instagram.com/hotelambalakely',
    facebook: 'https://www.facebook.com/hotelambalakely',
  },
  images: {
    hero: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/1736180000-EXTERIEUR/exterieur.jpg',
    logo: 'https://hotelambalakely.com/logo.png',
  },
} as const;
