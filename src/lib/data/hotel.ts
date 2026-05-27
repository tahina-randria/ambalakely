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
    'Un petit hôtel de dix chambres dans les hautes terres de Fianarantsoa, Madagascar. Sur la RN7, à 12 km de la ville. Ouvert en septembre 2014, sur le domaine familial fondé en 2002.',
  tagline: 'Dix chambres dans les hautes terres de Madagascar.',
  // §34 fact correction (2026-05-27) — source : timeline document from
  // the owners. The domain dates from 2002 (terrain Vonimboahirana
  // acquired by Mamy + Hasina) ; the chalet for first visitors came in
  // 2003 ; the garden kitchen Villa Hagen in 2005 ; foundation stone
  // of Hôtel Ambalakely in April 2013 ; hotel opens officially
  // September 2014 ; the chalet becomes Toko Telo restaurant in 2015 ;
  // reception inaugurated April 2018 (was previously confused with the
  // hotel opening — wrong). Schema.org `foundingDate` = 2014.
  founded: '2014',
  domainAcquired: '2002',
  chaletOpened: '2003',
  villaHagenKitchen: '2005',
  foundationStone: 'April 2013',
  tokoTeloOpened: '2015',
  receptionInaugurated: 'April 2018',
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
    checkIn: '13h',
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

  // Aggregate rating — vérifié sur TripAdvisor le 2026-05-25 :
  // 32 avis, 4.9/5 sur https://www.tripadvisor.com/Hotel_Review-g298271-d7646881.
  // Sources élargies §32bis #2 — on inclut désormais 2 quotes Google
  // historiques dans le carousel (Ruth Barbara W., Anna Maria), donc
  // la liste sources fait foi pour la caption "vérifiés sur X depuis Y".
  // Le compteur 32 reste TripAdvisor-only (chiffre dur, source unique).
  rating: {
    value: '4.9' as string | null,
    count: 32 as number | null,
    sources: ['TripAdvisor', 'Google'],
  },

  // URL des plateformes de reviews — utilisée pour les liens "Voir tous
  // les avis". Google n'a pas de Place ID stable préservé ici ; on
  // ouvre Maps via search query — c'est robuste et n'expose pas une URL
  // qui peut casser si la fiche Google bouge.
  reviewUrls: {
    tripadvisor:
      'https://www.tripadvisor.com/Hotel_Review-g298271-d7646881-Reviews-Hotel_Ambalakely-Fianarantsoa_Fianarantsoa_Province.html',
    google:
      'https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+Ambalakely+Fianarantsoa',
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
