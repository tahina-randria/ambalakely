/**
 * Source de vérité — Hôtel Ambalakely.
 * Données extraites du PDF des Tarifs Publics 2026 + document Kirsten.
 * Aucune information inventée : chaque champ provient des documents officiels.
 *
 * Utilisée pour SEO (JSON-LD), metadata, footer, contact.
 */

export const HOTEL = {
  name: 'Hôtel Ambalakely',
  shortName: 'Ambalakely',
  legalName: 'Hôtel Ambalakely',
  description:
    'Un petit hôtel de dix chambres dans les hautes terres de Fianarantsoa, Madagascar. Sur la RN7, à 12 km de la ville, fondé en 2018 par Mamy et Hasina.',
  tagline: 'Dix chambres dans les hautes terres de Madagascar.',
  founded: '2018',
  founders: ['Mamy', 'Hasina'],

  // Single point of contact — pas de contacts internes exposés
  url: 'https://hotelambalakely.com',
  vercelUrl: 'https://ambalakely.vercel.app',
  email: 'hello@hotelambalakely.com',
  phone: '+261 34 11 254 34',
  whatsapp: '+261341125434',

  // Adresse réelle depuis le PDF
  address: {
    street: 'BP 1188, sur la RN7',
    locality: 'Ambalakely, Fianarantsoa',
    region: 'Haute Matsiatra',
    postalCode: '301',
    country: 'MG',
    countryName: 'Madagascar',
  },

  // GPS réel depuis le document Kirsten : 21°25' S, 47°10' E, altitude 1 082 m
  geo: {
    lat: -21.4167,
    lng: 47.1667,
    altitude: 1082,
  },

  // Capacité réelle depuis le document Kirsten
  rooms: 10,
  totalCapacity: '20 à 28 personnes',

  // Tarifs réels depuis le PDF 2026
  priceRange: '182000-255000 MGA',

  /**
   * Concept du lieu — "Eny ambanivohitra" (à la campagne).
   * Du PDF des tarifs : "Nos chambres, décorées avec des couleurs chatoyantes
   * et des matériaux locaux, reflètent notre attachement à la vie à la
   * campagne, 'Eny ambanivohitra' : notre concept."
   */
  concept: {
    phrase: 'Eny ambanivohitra',
    translation: 'À la campagne',
    description:
      'Notre attachement à la vie à la campagne : couleurs chatoyantes, matériaux locaux, architecture Betsileo, présence des rizières.',
  },

  /**
   * Trans Groupe Hasina — agence de voyage sœur, dirigée par les mêmes
   * fondateurs. Vingt ans d'expérience tourisme à Madagascar.
   * L'hôtel sert de base aux voyageurs TGH dans la région des hautes terres.
   */
  tgh: {
    name: 'Trans Groupe Hasina',
    abbreviation: 'TGH',
    tagline: 'Ny tur, ny horisont, ny inspirasjon',
    taglineFr: 'Un nouveau voyage, un nouvel horizon, une nouvelle inspiration',
    foundedYearsAgo: 20,
    description:
      'Agence de voyage à Fianarantsoa, dans les hautes terres Betsileo. Vingt ans d\'expérience à organiser des séjours dans toute Madagascar, avec un soin particulier pour le tourisme responsable et durable.',
  },

  // Horaires réels depuis le document Kirsten
  hours: {
    checkIn: '12h à 13h',
    checkOut: '11h',
    dayRoom: '50 % du tarif',
    breakfast: '5h30 à 9h',
    lunch: '11h à 14h',
    dinner: '18h30 à 21h30',
    pizzaTerrace: '10h à 21h30',
  },

  /**
   * Équipements de l'hôtel pour JSON-LD Hotel.
   */
  amenities: [
    'Restaurant Toko Telo',
    'Jardin',
    'Terrasse',
    'Parking gratuit',
    'WiFi gratuit',
    'Bouillottes (saison fraîche)',
    'Moustiquaires en chambre',
    'Salle de bain privée, eau chaude',
    'Service en chambre',
    'Groupe électrogène de secours',
    'Service de transfert (aéroport, ville)',
    'Service de blanchisserie',
    'Assistance billets de train',
  ],

  // 4 langues parlées sur place (du document Kirsten)
  languages: ['fr', 'en', 'no', 'mg'],

  // Aggregate rating — à confirmer depuis TripAdvisor/Booking publics.
  // Pour l'instant on retire les chiffres inventés.
  rating: {
    value: null as string | null,
    count: null as number | null,
    sources: ['TripAdvisor', 'Booking'],
  },

  socials: {
    instagram: 'https://www.instagram.com/hotelambalakely',
    facebook: 'https://www.facebook.com/hotelambalakely',
  },

  images: {
    hero: 'https://ambalakely.vercel.app/photos/p23_hotel_ambalakely_dsc6429.webp',
    logo: 'https://hotelambalakely.com/logo.png',
  },
} as const;
