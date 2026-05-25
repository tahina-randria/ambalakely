/**
 * Données chambres + avis — extraites de hotelambalakely.com (Squarespace).
 * 3 catégories, 10 chambres au total, données réelles depuis le PDF Tarifs 2026
 * et le document de description Kirsten.
 */

export type Room = {
  id: string;
  number: string;
  name: string;
  size: string;
  capacity: string;
  priceMga: number;
  image: string;
  description?: string;
};

const SQ =
  'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export const rooms: Room[] = [
  // 2 Supérieure — Rogaland Suite + Kristiansand Suite (chambres 14 et 15)
  {
    id: 'superieure-14-rogaland',
    number: '14',
    name: 'Rogaland Suite',
    size: '43 m²',
    capacity: '1 à 4 personnes',
    priceMga: 255000,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description:
      'Lit king size 200×200 en palissandre, lit simple supplémentaire possible. Vue sur les rizières.',
  },
  {
    id: 'superieure-15-kristiansand',
    number: '15',
    name: 'Kristiansand Suite',
    size: '43 m²',
    capacity: '1 à 4 personnes',
    priceMga: 255000,
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg`,
    description:
      'Lit king size 200×200 en palissandre, lit simple supplémentaire possible. Vue sur les rizières.',
  },
  // 4 Confort — chambres 1, 2, 11, 12
  {
    id: 'confort-1',
    number: '1',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. Vue jardin.',
  },
  {
    id: 'confort-2',
    number: '2',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. Vue jardin.',
  },
  {
    id: 'confort-11',
    number: '11',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. À l\'étage, vue dégagée sur les hautes terres.',
  },
  {
    id: 'confort-12',
    number: '12',
    name: 'Confort',
    size: '29 m²',
    capacity: '1 à 3 personnes',
    priceMga: 226000,
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg`,
    description:
      'King size 200×200 en palissandre + un lit simple 90×200 en katrafay. À l\'étage, vue dégagée sur les hautes terres.',
  },
  // 4 Standard — chambres 4, 5, 6, 7 (2 doubles, 2 twin)
  {
    id: 'standard-4',
    number: '4',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Lit double 180×200 en katrafay. Vue jardin.',
  },
  {
    id: 'standard-5',
    number: '5',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Lit double 180×200 en katrafay. Vue jardin.',
  },
  {
    id: 'standard-6',
    number: '6',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Deux lits simples 90×200 en palissandre. Vue jardin.',
  },
  {
    id: 'standard-7',
    number: '7',
    name: 'Standard',
    size: '21 m²',
    capacity: '1 à 2 personnes',
    priceMga: 182000,
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg`,
    description: 'Deux lits simples 90×200 en palissandre. Vue jardin.',
  },
];

/**
 * Avis clients — traductions FR fidèles depuis les avis publics
 * vérifiés sur TripAdvisor (tripadvisor.com/Hotel_Review-g298271-d7646881).
 *
 * Chaque entrée pointe vers un avis réel : nom du reviewer + date + lieu
 * tels qu'ils apparaissent sur TripAdvisor. Le champ `quote` est une
 * traduction fidèle du texte original anglais, conservé en commentaire
 * pour traçabilité.
 *
 * Les 4 avis de la version précédente attribués à des reviewers Booking
 * (Ada, Giovanni) et Google (Ruth Barbara W., Anna Maria, KingfisherOslo)
 * ont été retirés faute de vérification ; Booking ne donne pas d'accès
 * public aux quotes, et l'intégration live via Google Places API est
 * laissée en TODO pour quand une clé sera disponible (cf. /docs).
 *
 * Ordre : les 3 premiers sont rendus sur la home (Reviews.tsx). Choisis
 * pour diversité (location, langue maternelle, aspect mentionné).
 */
export type Review = {
  quote: string;
  author: string;
  city: string;
  source: string;
  date?: string;
};

export const reviews: Review[] = [
  {
    // EN original (TripAdvisor, Jul 2022) : "This is an amazing gem of a hotel.
    // A beautiful location and built in the Betsileo style, with incredibly
    // friendly and helpful staff."
    quote:
      'Un joyau incroyable. Un bel emplacement, construit dans le style Betsileo, avec un personnel formidable et serviable.',
    author: 'Polly Pallister Wilkin',
    city: '',
    source: 'TripAdvisor',
    date: 'Juillet 2022',
  },
  {
    // EN original (TripAdvisor, Nov 2019) : "Really good service, great food
    // and fantastic relaxing atmosphere."
    quote:
      'Vraiment bon service, excellente cuisine et atmosphère fantastiquement relaxante.',
    author: 'Kristin O. V.',
    city: 'Trondheim',
    source: 'TripAdvisor',
    date: 'Novembre 2019',
  },
  {
    // EN original (TripAdvisor, Oct 2025) : "A fantastic oasis with a
    // friendly and good atmosphere. Very hospitable host. The owner
    // speaks Norwegian."
    quote:
      'Un oasis fantastique, ambiance chaleureuse. Hôte très accueillant. Le propriétaire parle norvégien.',
    author: 'Toril A.',
    city: '',
    source: 'TripAdvisor',
    date: 'Octobre 2025',
  },
  {
    // EN original (TripAdvisor, Jun 2022) : "Newly-refurbished hotel with
    // huge, well-equipped rooms: big beds, mosquito nets, lots of power
    // sockets."
    quote:
      'Hôtel récemment rénové, immenses chambres bien équipées : grands lits, moustiquaires, beaucoup de prises.',
    author: 'Femke V.',
    city: '',
    source: 'TripAdvisor',
    date: 'Juin 2022',
  },
  {
    // EN original (TripAdvisor, Sep 2019) : "This is the perfect place to
    // stay, either while staying in Fianarantsoa, or on the way through
    // to Isalo, og Antsirabe."
    quote:
      'L\'endroit parfait pour séjourner — à Fianarantsoa, ou en chemin vers Isalo et Antsirabe.',
    author: 'Bernt R. Pedersen',
    city: '',
    source: 'TripAdvisor',
    date: 'Septembre 2019',
  },
  {
    // EN original (TripAdvisor, Sep 2025) : "A rare find that exceeded
    // expectations. Lovely room. Professional and friendly staff."
    quote:
      'Une trouvaille rare qui a dépassé nos attentes. Belle chambre. Personnel professionnel et chaleureux.',
    author: 'traveltragic50',
    city: 'Wollongong',
    source: 'TripAdvisor',
    date: 'Septembre 2025',
  },
  {
    // EN original (TripAdvisor, Aug 2025) : "A very nice hotel in a town
    // where you wouldn't really expect it. Quite modern with very large
    // rooms."
    quote:
      'Un très bel hôtel dans une ville où on ne s\'y attendrait pas. Plutôt moderne, avec de très grandes chambres.',
    author: 'Robert H.',
    city: 'Adelaide',
    source: 'TripAdvisor',
    date: 'Août 2025',
  },
  {
    // EN original (TripAdvisor, Oct 2023) : "A hidden gem next to the main
    // road, but quiet. Very beautiful and lovingly designed hotel."
    quote:
      'Un joyau caché à côté de la route principale, mais calme. Hôtel très beau, décoré avec amour.',
    author: 'Roswitha S.',
    city: 'Vienne',
    source: 'TripAdvisor',
    date: 'Octobre 2023',
  },
  {
    // EN original (TripAdvisor, Apr 2023) : "The Hotel is beautifully
    // situated, along La Riziere and nearby The village Ambalakely."
    quote:
      'L\'hôtel est magnifiquement situé, le long des rizières, près du village d\'Ambalakely.',
    author: 'Pravin B.',
    city: '',
    source: 'TripAdvisor',
    date: 'Avril 2023',
  },
];
