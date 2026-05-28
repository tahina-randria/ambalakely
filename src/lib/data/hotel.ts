/**
 * Source de vérité — Hôtel Ambalakely.
 * Données extraites du PDF des Tarifs Publics 2026 + document Kirsten.
 * Aucune information inventée : chaque champ provient des documents officiels.
 *
 * Utilisée pour SEO (JSON-LD), metadata, footer, contact.
 *
 * §38 (2026-05-28) — migré au pattern trilingue. Avant, les champs
 * `description`, `tagline`, `amenities`, `concept.*`, `tgh.description`,
 * `address.street`, `hours.*` étaient FR-only et leakaient dans le
 * JSON-LD émis sur /en + /no (Google rich results FR pour les versions
 * non-FR). Pattern : BASE (immuable) + L10N (par locale) + `getHotel(locale)`
 * qui merge — même API que `getCategories`, `getReviews`.
 *
 * Les brand-names (Hôtel Ambalakely, Ambalakely, Toko Telo, Eny ambanivohitra,
 * Trans Groupe Hasina) ne se traduisent pas. Les noms de lieux (Fianarantsoa,
 * RN7, Haute Matsiatra) non plus. Les nombres et codes ISO (rooms, postalCode,
 * country='MG', geo, priceRange) sont identiques.
 */

type Locale = 'fr' | 'en' | 'no';

// ─── BASE : champs identiques sur les 3 locales ──────────────────────────

const BASE = {
  name: 'Hôtel Ambalakely',
  shortName: 'Ambalakely',
  legalName: 'Hôtel Ambalakely',
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
  founders: ['Mamy', 'Hasina'] as const,

  // Single point of contact — pas de contacts internes exposés
  url: 'https://hotelambalakely.com',
  vercelUrl: 'https://ambalakely.vercel.app',
  email: 'hello@hotelambalakely.com',
  phone: '+261 34 11 254 34',
  whatsapp: '+261341125434',

  // Adresse réelle depuis le PDF
  address: {
    locality: 'Ambalakely, Fianarantsoa',
    region: 'Haute Matsiatra',
    postalCode: '301',
    country: 'MG',
  },

  // GPS exact du pin Google "Hotel Ambalakely" (place CID
  // 0x760efd8fe7492c02). Altitude 1 082 m du document Kirsten.
  geo: {
    lat: -21.4150267,
    lng: 47.1656023,
    altitude: 1082,
  },

  // Capacité réelle depuis le document Kirsten
  rooms: 10,

  // Tarifs réels depuis le PDF 2026
  priceRange: '182000-255000 MGA',

  /**
   * Concept du lieu — "Eny ambanivohitra" (à la campagne).
   * `phrase` reste en malagasy (intraduisible — c'est le slogan).
   */
  concept: {
    phrase: 'Eny ambanivohitra',
  },

  /**
   * Trans Groupe Hasina — agence de voyage sœur, dirigée par les mêmes
   * fondateurs. Vingt ans d'expérience tourisme à Madagascar.
   */
  tgh: {
    name: 'Trans Groupe Hasina',
    abbreviation: 'TGH',
    tagline: 'Ny tur, ny horisont, ny inspirasjon',
    taglineFr: 'Un nouveau voyage, un nouvel horizon, une nouvelle inspiration',
    foundedYearsAgo: 20,
  },

  // 4 langues parlées sur place (du document Kirsten)
  languages: ['fr', 'en', 'no', 'mg'] as const,

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

// ─── L10N : champs qui varient par locale ────────────────────────────────

type L10n = {
  description: string;
  tagline: string;
  diningDescription: string;
  totalCapacity: string;
  address: {
    street: string;
    countryName: string;
  };
  concept: {
    translation: string;
    description: string;
  };
  tgh: {
    description: string;
  };
  hours: {
    checkIn: string;
    checkOut: string;
    dayRoom: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    pizzaTerrace: string;
  };
  amenities: readonly string[];
};

const L10N: Record<Locale, L10n> = {
  fr: {
    description:
      'Un petit hôtel de dix chambres dans les hautes terres de Fianarantsoa, Madagascar. Sur la RN7, à 12 km de la ville. Ouvert en septembre 2014, sur le domaine familial fondé en 2002.',
    tagline: 'Dix chambres dans les hautes terres de Madagascar.',
    diningDescription:
      'Une petite cuisine entre Madagascar et la Norvège. Un menu unique chaque soir, presque tout du jardin.',
    totalCapacity: '20 à 28 personnes',
    address: {
      street: 'BP 1188, sur la RN7',
      countryName: 'Madagascar',
    },
    concept: {
      translation: 'À la campagne',
      description:
        'Notre attachement à la vie à la campagne : couleurs chatoyantes, matériaux locaux, architecture Betsileo, présence des rizières.',
    },
    tgh: {
      description:
        "Agence de voyage à Fianarantsoa, dans les hautes terres Betsileo. Vingt ans d'expérience à organiser des séjours dans toute Madagascar, avec un soin particulier pour le tourisme responsable et durable.",
    },
    hours: {
      checkIn: '13h',
      checkOut: '11h',
      dayRoom: '50 % du tarif',
      breakfast: '5h30 à 9h',
      lunch: '11h à 14h',
      dinner: '18h30 à 21h30',
      pizzaTerrace: '10h à 21h30',
    },
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
  },
  en: {
    description:
      'A small ten-room hotel in the highlands of Fianarantsoa, Madagascar. On the RN7, 12 km from town. Opened in September 2014, on the family estate established in 2002.',
    tagline: 'Ten rooms in the highlands of Madagascar.',
    diningDescription:
      'A small kitchen between Madagascar and Norway. One set menu each evening, mostly from the garden.',
    totalCapacity: '20 to 28 guests',
    address: {
      street: 'BP 1188, on the RN7',
      countryName: 'Madagascar',
    },
    concept: {
      translation: 'In the countryside',
      description:
        'Our affection for country life : warm colours, local materials, Betsileo architecture, the rice paddies just outside the window.',
    },
    tgh: {
      description:
        'A travel agency in Fianarantsoa, in the Betsileo highlands. Twenty years of arranging journeys across Madagascar, with a particular care for responsible and sustainable tourism.',
    },
    hours: {
      checkIn: '1 pm',
      checkOut: '11 am',
      dayRoom: '50% of the rate',
      breakfast: '5:30 to 9 am',
      lunch: '11 am to 2 pm',
      dinner: '6:30 to 9:30 pm',
      pizzaTerrace: '10 am to 9:30 pm',
    },
    amenities: [
      'Toko Telo restaurant',
      'Garden',
      'Terrace',
      'Free parking',
      'Free WiFi',
      'Hot-water bottles (cool season)',
      'Mosquito nets in every room',
      'Private bathroom with hot water',
      'In-room service',
      'Back-up generator',
      'Airport and town transfers',
      'Laundry service',
      'Train-ticket assistance',
    ],
  },
  no: {
    description:
      'Et lite hotell med ti rom i høylandet rundt Fianarantsoa, Madagaskar. Langs RN7, 12 km fra byen. Åpnet i september 2014, på familiens eiendom etablert i 2002.',
    tagline: 'Ti rom i høylandet i Madagaskar.',
    diningDescription:
      'Et lite kjøkken mellom Madagaskar og Norge. Én meny hver kveld, det meste fra hagen.',
    totalCapacity: '20 til 28 gjester',
    address: {
      street: 'BP 1188, langs RN7',
      countryName: 'Madagaskar',
    },
    concept: {
      translation: 'På landsbygda',
      description:
        'Vår tilknytning til livet på landsbygda : varme farger, lokale materialer, Betsileo-arkitektur, risåkrene rett utenfor vinduet.',
    },
    tgh: {
      description:
        'Et reisebyrå i Fianarantsoa, i Betsileo-høylandet. Tjue års erfaring med å organisere reiser i hele Madagaskar, med særlig omsorg for ansvarlig og bærekraftig turisme.',
    },
    hours: {
      checkIn: 'kl. 13',
      checkOut: 'kl. 11',
      dayRoom: '50 % av prisen',
      breakfast: 'kl. 5.30 til 9',
      lunch: 'kl. 11 til 14',
      dinner: 'kl. 18.30 til 21.30',
      pizzaTerrace: 'kl. 10 til 21.30',
    },
    amenities: [
      'Restauranten Toko Telo',
      'Hage',
      'Terrasse',
      'Gratis parkering',
      'Gratis WiFi',
      'Varmeflasker (kjølig sesong)',
      'Myggnett i alle rom',
      'Privat bad med varmt vann',
      'Romservice',
      'Reservegenerator',
      'Transport til flyplass og by',
      'Vaskeritjeneste',
      'Hjelp med togbilletter',
    ],
  },
};

const SUPPORTED: ReadonlyArray<Locale> = ['fr', 'en', 'no'];

/**
 * Projette l'hôtel dans la locale demandée. Falls back en FR si la locale
 * est inconnue. Conserve la même forme que l'ancien export `HOTEL` const
 * pour ne pas casser les consumers ; le merge `concept` / `tgh` / `address`
 * est explicite pour préserver les champs base + les overrides L10N.
 */
export function getHotel(locale: string) {
  const loc = (SUPPORTED.includes(locale as Locale) ? locale : 'fr') as Locale;
  const l = L10N[loc];
  return {
    ...BASE,
    description: l.description,
    tagline: l.tagline,
    diningDescription: l.diningDescription,
    totalCapacity: l.totalCapacity,
    address: {
      ...BASE.address,
      street: l.address.street,
      countryName: l.address.countryName,
    },
    concept: {
      ...BASE.concept,
      translation: l.concept.translation,
      description: l.concept.description,
    },
    tgh: {
      ...BASE.tgh,
      description: l.tgh.description,
    },
    hours: l.hours,
    amenities: l.amenities,
  };
}

/** Backwards-compat re-export — anciens consumers (sitemap, robots, scripts)
 * qui n'ont pas de contexte locale. Toujours FR. */
export const HOTEL = getHotel('fr');
