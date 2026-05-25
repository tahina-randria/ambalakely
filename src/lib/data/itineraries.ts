/**
 * Itinéraires — trois suggestions avec Ambalakely comme camp de base sur la RN7.
 * Réels, factuels, sans langue marketing.
 */

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export type ItineraryDay = {
  day: number;
  title: string;
  body: string;
  /** Note optionnelle de trajet (km, heures) */
  transit?: string;
};

export type Itinerary = {
  slug: 'three-days' | 'five-days' | 'seven-days';
  duration: string;
  title: string;
  pitch: string;
  best: string;
  totalKm: string;
  /** Hero image du chapitre (placeholder en attendant les vraies photos) */
  image: string;
  days: ItineraryDay[];
};

export const itineraries: Itinerary[] = [
  {
    slug: 'three-days',
    duration: 'Trois jours',
    title: 'Un long week-end sur la RN7.',
    pitch:
      "Pour les voyageurs déjà à Madagascar avec une courte fenêtre. La version la plus courte de la route, avec une journée entière à Ranomafana et une soirée calme à Ambalakely.",
    best: 'Mai à octobre.',
    totalKm: 'Environ 320 km de route.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    days: [
      {
        day: 1,
        title: "D'Antsirabe à Ambalakely",
        body:
          "Départ d'Antsirabe tôt le matin. Arrêt au marché d'Antsirabe, puis traversée d'Ambositra (capitale de la sculpture sur bois) et d'Ambohimahasoa. Arrivée à Ambalakely en fin d'après-midi, à temps pour un thé sur la terrasse haute et une marche dans les rizières en contrebas avant la nuit.",
        transit: '230 km, environ 5 heures de route.',
      },
      {
        day: 2,
        title: 'Parc national de Ranomafana',
        body:
          "Départ tôt le matin avec un petit déjeuner emporté. Le parc est plus animé aux premières heures, quand les lémuriens descendent se nourrir. Marche guidée de quelques heures à la recherche du sifaka de Milne-Edwards et du lémurien doré du bambou. Déjeuner au village de Ranomafana, retour à Ambalakely en fin d'après-midi pour le dîner, bouillotte au lit le soir.",
        transit: '180 km aller-retour, environ 3 heures de route.',
      },
      {
        day: 3,
        title: "Village d'Ambalakely et retour",
        body:
          "Matinée tranquille. Marche guidée dans le village d'Ambalakely avec un membre de l'équipe, une heure jusqu'aux rizières et à l'atelier où le mobilier en palissandre est fabriqué. Déjeuner au jardin, puis une heure de route jusqu'au centre de Fianarantsoa pour voir la vieille ville avant de continuer vers le sud, ou de remonter vers la capitale.",
        transit: '20 km aller-retour pour la marche au village.',
      },
    ],
  },
  {
    slug: 'five-days',
    duration: 'Cinq jours',
    title: 'Le centre du pays en douceur.',
    pitch:
      "Deux nuits à Ambalakely, deux excursions vers les parcs, une dégustation de thé à Sahambavy, et une nuit en réserve pour le trek d'Andringitra si les jambes suivent.",
    best: 'Mai à septembre.',
    totalKm: 'Environ 600 km de route.',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    days: [
      {
        day: 1,
        title: "D'Antsirabe à Ambalakely",
        body:
          "Journée complète de route sur la RN7, avec arrêts à Ambositra et Ambohimahasoa. Arrivée pour le dîner. La route est encombrée de camions mais lisse.",
        transit: '230 km, environ 5 heures.',
      },
      {
        day: 2,
        title: 'Parc national de Ranomafana',
        body:
          "Marche guidée tôt le matin en forêt tropicale, à la recherche des lémuriens et de la flore endémique. Retour à Ambalakely en fin d'après-midi. Soirée tranquille avec un feu dans la salle à manger.",
        transit: '180 km aller-retour, environ 3 heures.',
      },
      {
        day: 3,
        title: 'Sahambavy et vieille ville de Fianarantsoa',
        body:
          "Matinée à Sahambavy, la seule plantation de thé commerciale de Madagascar, avec visite de l'usine et dégustation. Déjeuner au bord du lac. Après-midi dans la vieille ville haute de Fianarantsoa, la colline coloniale au-dessus de la ville moderne. Retour à Ambalakely au coucher du soleil.",
        transit: '70 km, environ 2 heures au total.',
      },
      {
        day: 4,
        title: "Journée Andringitra ou repos au village",
        body:
          "Deux options. La version active : départ tôt le matin pour le massif du Tsaranoro au pied d'Andringitra, une journée de marche à travers les villages et les falaises de granite. Ou la version calme : une demi-journée à cuisiner avec Hasina et un après-midi au jardin.",
        transit: '320 km aller-retour pour Andringitra, ou 5 km pour la cuisine.',
      },
      {
        day: 5,
        title: 'Suite vers le sud ou retour au nord',
        body:
          "Petit déjeuner à l'hôtel, puis vous continuez vers le sud sur la RN7 en direction d'Isalo (environ 5 heures), ou vous remontez vers Antsirabe et la capitale.",
      },
    ],
  },
  {
    slug: 'seven-days',
    duration: 'Sept jours',
    title: "La RN7 complète, capitale jusqu'à Isalo.",
    pitch:
      "Le grand voyage classique de Madagascar. Trois nuits à Ambalakely comme base, deux parcs, deux étapes culturelles, et les paysages spectaculaires d'Isalo en clôture.",
    best: 'Mai à octobre.',
    totalKm: 'Environ 1 400 km de route.',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    days: [
      {
        day: 1,
        title: "D'Antananarivo à Antsirabe",
        body:
          "Départ de Tana en milieu de matinée après un arrêt au marché du vendredi. Route vers le sud à travers Ambatolampy (les marmites d'aluminium) jusqu'à Antsirabe, l'ancienne ville thermale coloniale, pour la nuit.",
        transit: '170 km, environ 4 heures.',
      },
      {
        day: 2,
        title: "D'Antsirabe à Ambalakely",
        body:
          'Journée complète de route avec arrêts à Ambositra et Ambohimahasoa. Arrivée en fin d’après-midi pour le dîner.',
        transit: '230 km, environ 5 heures.',
      },
      {
        day: 3,
        title: 'Parc national de Ranomafana',
        body:
          'Matinée en forêt tropicale, marche guidée à la recherche des lémuriens. Déjeuner au village de Ranomafana, retour pour une soirée à Ambalakely.',
        transit: '180 km aller-retour.',
      },
      {
        day: 4,
        title: 'Sahambavy, vieille ville de Fianarantsoa, soirée avec Hasina',
        body:
          "Matinée à la plantation de thé, déjeuner au bord du lac, après-midi à parcourir la vieille ville. Retour pour le dîner avec Hasina aux fourneaux pour un menu malgacho-norvégien.",
        transit: '70 km.',
      },
      {
        day: 5,
        title: "D'Ambalakely à Ranohira (Isalo)",
        body:
          "Longue journée de route vers le sud sur la RN7. Le paysage s'ouvre spectaculairement après Ihosy. Arrivée à Isalo pour le coucher du soleil sur les falaises de grès.",
        transit: '420 km, environ 7 heures.',
      },
      {
        day: 6,
        title: "Parc national d'Isalo",
        body:
          "Journée de marche guidée à travers les canyons, baignades dans les piscines naturelles et observation des lémuriens. Coucher de soleil de retour au lodge.",
      },
      {
        day: 7,
        title: 'Vers Tuléar et la côte',
        body:
          "Dernière étape jusqu'à la côte à Ifaty, ou retour vers le nord pour le vol depuis Tuléar (TLE).",
        transit: '230 km vers Tuléar, environ 4 heures.',
      },
    ],
  },
];

export function getItinerary(slug: string) {
  return itineraries.find((i) => i.slug === slug);
}
