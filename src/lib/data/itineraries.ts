/**
 * Itinéraires — trois suggestions avec Ambalakely comme camp de base
 * sur la RN7.
 *
 * Trilingue FR / EN / NO sur le même modèle que `reviews.ts` :
 * - Les champs d'identité (slug, image URL) vivent au niveau racine
 *   de chaque source.
 * - Les champs traduits (duration, title, pitch, best, totalKm, days)
 *   vivent dans une sous-clé `fr` / `en` / `no`.
 * - `getItineraries(locale)` résout le bon shape par locale et est
 *   utilisé en fallback dans `sanity/lib/fetch.ts`.
 * - L'export legacy `itineraries: Itinerary[]` reste FR pour les
 *   callers qui n'ont pas encore migré (sitemap, etc.).
 *
 * Avant ce fichier, ITINERARIES_FALLBACK vivait en FR-only et /en
 * et /no leakaient en français sur /plan-your-trip dès que Sanity
 * ne couvrait pas la locale demandée.
 *
 * Voix : British editorial restrained pour EN ("the road", "the
 * village", "the highlands"). Bokmål editorial pour NO ("veien",
 * "landsbyen", "høylandet") en cohérence avec le bloc PlanTrip de
 * `messages/no.json`. Noms propres et marques laissés intacts
 * (RN7, Antananarivo, Antsirabe, Ranomafana, Sahambavy, Andringitra,
 * Tsaranoro, Ifaty, Tuléar, Isalo, Ambositra, Ambohimahasoa,
 * Ihosy, Ranohira, Ialagnanindro, Ambalavao, etc.).
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

type LocalizedItineraryContent = {
  duration: string;
  title: string;
  pitch: string;
  best: string;
  totalKm: string;
  days: ItineraryDay[];
};

type LocalizedItinerary = {
  slug: Itinerary['slug'];
  image: string;
  fr: LocalizedItineraryContent;
  en: LocalizedItineraryContent;
  no: LocalizedItineraryContent;
};

const SOURCES: LocalizedItinerary[] = [
  {
    slug: 'three-days',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w`,
    fr: {
      duration: 'Trois jours',
      title: 'Un long week-end sur la RN7.',
      pitch:
        "Pour les voyageurs déjà à Madagascar avec une courte fenêtre. La version la plus courte de la route, avec une journée entière à Ranomafana et une soirée calme à Ambalakely.",
      best: 'Mai à octobre.',
      totalKm: 'Environ 320 km de route.',
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
    en: {
      duration: 'Three days',
      title: 'A long weekend on the RN7.',
      pitch:
        'For travellers already in Madagascar with a short window. The shortest version of the road, with a full day at Ranomafana and a quiet evening at Ambalakely.',
      best: 'May to October.',
      totalKm: 'About 320 km of road.',
      days: [
        {
          day: 1,
          title: 'From Antsirabe to Ambalakely',
          body:
            'Leave Antsirabe early. A stop at the Antsirabe market, then through Ambositra (the woodcarving town) and Ambohimahasoa. Arrival at Ambalakely in the late afternoon, in time for tea on the upper terrace and a walk in the rice paddies below before nightfall.',
          transit: '230 km, about five hours on the road.',
        },
        {
          day: 2,
          title: 'Ranomafana National Park',
          body:
            'An early start with a packed breakfast. The park is busier in the first hours, when the lemurs come down to feed. A guided walk of a few hours, looking for the Milne-Edwards sifaka and the golden bamboo lemur. Lunch in the village of Ranomafana, back to Ambalakely in the late afternoon for dinner, a hot-water bottle in bed at night.',
          transit: '180 km return, about three hours on the road.',
        },
        {
          day: 3,
          title: 'The village of Ambalakely and onward',
          body:
            'A quiet morning. A guided walk through the village of Ambalakely with a member of the team, an hour through the rice paddies to the workshop where the rosewood furniture is made. Lunch in the garden, then an hour by road to central Fianarantsoa to see the old town before carrying on south, or heading back up to the capital.',
          transit: '20 km return for the village walk.',
        },
      ],
    },
    no: {
      duration: 'Tre dager',
      title: 'En lang helg på RN7.',
      pitch:
        'For reisende som allerede er på Madagaskar med et kort vindu. Den korteste versjonen av veien, med en hel dag i Ranomafana og en rolig kveld på Ambalakely.',
      best: 'Mai til oktober.',
      totalKm: 'Omkring 320 km vei.',
      days: [
        {
          day: 1,
          title: 'Fra Antsirabe til Ambalakely',
          body:
            'Tidlig avgang fra Antsirabe. Stopp på markedet i Antsirabe, så gjennom Ambositra (treskjæringsbyen) og Ambohimahasoa. Ankomst Ambalakely sent på ettermiddagen, tidsnok til te på den øvre terrassen og en tur i rismarkene nedenfor før kvelden faller på.',
          transit: '230 km, omtrent fem timer på veien.',
        },
        {
          day: 2,
          title: 'Ranomafana nasjonalpark',
          body:
            'Tidlig avgang med pakket frokost. Parken er mer livlig i de første timene, når lemurene kommer ned for å spise. En guidet tur på noen timer på leting etter Milne-Edwards-sifakaen og den gylne bambuslemuren. Lunsj i landsbyen Ranomafana, tilbake til Ambalakely sent på ettermiddagen til middag, varmeflaske i sengen om natten.',
          transit: '180 km tur-retur, omtrent tre timer på veien.',
        },
        {
          day: 3,
          title: 'Landsbyen Ambalakely og videre',
          body:
            'En rolig morgen. En guidet tur gjennom landsbyen Ambalakely med en fra teamet, en time gjennom rismarkene til verkstedet der rosentre-møblene lages. Lunsj i hagen, så en time på veien til sentrum av Fianarantsoa for å se den gamle byen før dere fortsetter sørover, eller setter kursen tilbake mot hovedstaden.',
          transit: '20 km tur-retur for landsbyturen.',
        },
      ],
    },
  },
  {
    slug: 'five-days',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w`,
    fr: {
      duration: 'Cinq jours',
      title: 'Le centre du pays en douceur.',
      pitch:
        "Deux nuits à Ambalakely, deux excursions vers les parcs, une dégustation de thé à Sahambavy, et une nuit en réserve pour le trek d'Andringitra si les jambes suivent.",
      best: 'Mai à septembre.',
      totalKm: 'Environ 600 km de route.',
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
    en: {
      duration: 'Five days',
      title: 'The centre of the country, gently.',
      pitch:
        'Two nights at Ambalakely, two excursions to the parks, a tea tasting at Sahambavy, and one night in reserve for the Andringitra trek if the legs hold.',
      best: 'May to September.',
      totalKm: 'About 600 km of road.',
      days: [
        {
          day: 1,
          title: 'From Antsirabe to Ambalakely',
          body:
            'A full day on the RN7, with stops at Ambositra and Ambohimahasoa. Arrival in time for dinner. The road is crowded with lorries but smooth.',
          transit: '230 km, about five hours.',
        },
        {
          day: 2,
          title: 'Ranomafana National Park',
          body:
            'A guided walk in the rainforest first thing, looking for lemurs and endemic plants. Back to Ambalakely in the late afternoon. A quiet evening with a fire in the dining room.',
          transit: '180 km return, about three hours.',
        },
        {
          day: 3,
          title: 'Sahambavy and the old town of Fianarantsoa',
          body:
            "A morning at Sahambavy, Madagascar's only commercial tea plantation, with a tour of the factory and a tasting. Lunch by the lake. The afternoon in the upper old town of Fianarantsoa, the colonial hill above the modern town. Back to Ambalakely at sunset.",
          transit: '70 km, about two hours in total.',
        },
        {
          day: 4,
          title: 'An Andringitra day, or rest at the village',
          body:
            'Two options. The active version: an early start for the Tsaranoro massif at the foot of Andringitra, a day on foot through the villages and granite cliffs. Or the quiet version: a half-day cooking with Hasina and an afternoon in the garden.',
          transit: '320 km return for Andringitra, or 5 km for the cooking.',
        },
        {
          day: 5,
          title: 'Onward south, or back up north',
          body:
            'Breakfast at the hotel, then you carry on south on the RN7 towards Isalo (about five hours), or head back up to Antsirabe and the capital.',
        },
      ],
    },
    no: {
      duration: 'Fem dager',
      title: 'Sentrale Madagaskar i ro.',
      pitch:
        'To netter på Ambalakely, to utflukter til parkene, en teprøving på Sahambavy, og en natt i reserve for Andringitra-turen om beina holder.',
      best: 'Mai til september.',
      totalKm: 'Omkring 600 km vei.',
      days: [
        {
          day: 1,
          title: 'Fra Antsirabe til Ambalakely',
          body:
            'En hel dag på RN7, med stopp i Ambositra og Ambohimahasoa. Ankomst i tide til middag. Veien er full av lastebiler, men jevn.',
          transit: '230 km, omtrent fem timer.',
        },
        {
          day: 2,
          title: 'Ranomafana nasjonalpark',
          body:
            'Tidlig guidet tur i regnskogen på leting etter lemurer og endemiske planter. Tilbake til Ambalakely sent på ettermiddagen. En rolig kveld med peisild i spisesalen.',
          transit: '180 km tur-retur, omtrent tre timer.',
        },
        {
          day: 3,
          title: 'Sahambavy og gamlebyen i Fianarantsoa',
          body:
            'En formiddag på Sahambavy, Madagaskars eneste kommersielle teplantasje, med omvisning på fabrikken og smaksprøving. Lunsj ved innsjøen. Ettermiddagen i den øvre gamlebyen i Fianarantsoa, kolonihøyden over den moderne byen. Tilbake til Ambalakely ved solnedgang.',
          transit: '70 km, omtrent to timer til sammen.',
        },
        {
          day: 4,
          title: 'En Andringitra-dag, eller hvile i landsbyen',
          body:
            'To alternativer. Den aktive versjonen: tidlig avgang mot Tsaranoro-massivet ved foten av Andringitra, en dag til fots gjennom landsbyene og granittklippene. Eller den rolige versjonen: en halv dag med matlaging sammen med Hasina og en ettermiddag i hagen.',
          transit: '320 km tur-retur for Andringitra, eller 5 km for matlagingen.',
        },
        {
          day: 5,
          title: 'Videre sørover, eller tilbake nordover',
          body:
            'Frokost på hotellet, så fortsetter dere sørover på RN7 mot Isalo (omtrent fem timer), eller setter kursen tilbake mot Antsirabe og hovedstaden.',
        },
      ],
    },
  },
  {
    slug: 'seven-days',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2500w`,
    fr: {
      duration: 'Sept jours',
      title: "La RN7 complète, capitale jusqu'à Isalo.",
      pitch:
        "Le grand voyage classique de Madagascar. Trois nuits à Ambalakely comme base, deux parcs, deux étapes culturelles, et les paysages spectaculaires d'Isalo en clôture.",
      best: 'Mai à octobre.',
      totalKm: 'Environ 1 400 km de route.',
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
    en: {
      duration: 'Seven days',
      title: 'The full RN7, capital to Isalo.',
      pitch:
        "The classic Madagascar journey. Three nights at Ambalakely as a base, two parks, two cultural stops, and the dramatic landscapes of Isalo at the close.",
      best: 'May to October.',
      totalKm: 'About 1,400 km of road.',
      days: [
        {
          day: 1,
          title: 'From Antananarivo to Antsirabe',
          body:
            'Leave Tana mid-morning after a stop at the Friday market. South through Ambatolampy (the aluminium pot makers) to Antsirabe, the old colonial spa town, for the night.',
          transit: '170 km, about four hours.',
        },
        {
          day: 2,
          title: 'From Antsirabe to Ambalakely',
          body:
            'A full day on the road with stops at Ambositra and Ambohimahasoa. Arrival in the late afternoon in time for dinner.',
          transit: '230 km, about five hours.',
        },
        {
          day: 3,
          title: 'Ranomafana National Park',
          body:
            'A morning in the rainforest, a guided walk looking for the lemurs. Lunch in the village of Ranomafana, back for an evening at Ambalakely.',
          transit: '180 km return.',
        },
        {
          day: 4,
          title: 'Sahambavy, the old town of Fianarantsoa, an evening with Hasina',
          body:
            'A morning at the tea plantation, lunch by the lake, the afternoon walking the old town. Back for dinner with Hasina at the stove for a Malagasy-Norwegian menu.',
          transit: '70 km.',
        },
        {
          day: 5,
          title: 'From Ambalakely to Ranohira (Isalo)',
          body:
            'A long day south on the RN7. The landscape opens dramatically after Ihosy. Arrival at Isalo in time for sunset on the sandstone cliffs.',
          transit: '420 km, about seven hours.',
        },
        {
          day: 6,
          title: 'Isalo National Park',
          body:
            'A day on foot through the canyons, swims in the natural pools and a chance to see lemurs. Sunset back at the lodge.',
        },
        {
          day: 7,
          title: 'On to Tuléar and the coast',
          body:
            'The last leg down to the coast at Ifaty, or back up north for the flight from Tuléar (TLE).',
          transit: '230 km to Tuléar, about four hours.',
        },
      ],
    },
    no: {
      duration: 'Sju dager',
      title: 'Hele RN7, fra hovedstaden til Isalo.',
      pitch:
        'Den klassiske Madagaskar-reisen. Tre netter på Ambalakely som base, to parker, to kulturelle stopp, og det dramatiske landskapet i Isalo til slutt.',
      best: 'Mai til oktober.',
      totalKm: 'Omkring 1 400 km vei.',
      days: [
        {
          day: 1,
          title: 'Fra Antananarivo til Antsirabe',
          body:
            'Avgang fra Tana sent på formiddagen etter et stopp på fredagsmarkedet. Sørover gjennom Ambatolampy (aluminiumsgrytene) til Antsirabe, den gamle koloniale kurbyen, for natten.',
          transit: '170 km, omtrent fire timer.',
        },
        {
          day: 2,
          title: 'Fra Antsirabe til Ambalakely',
          body:
            'En hel dag på veien med stopp i Ambositra og Ambohimahasoa. Ankomst sent på ettermiddagen i tide til middag.',
          transit: '230 km, omtrent fem timer.',
        },
        {
          day: 3,
          title: 'Ranomafana nasjonalpark',
          body:
            'En formiddag i regnskogen, en guidet tur på leting etter lemurene. Lunsj i landsbyen Ranomafana, tilbake til en kveld på Ambalakely.',
          transit: '180 km tur-retur.',
        },
        {
          day: 4,
          title: 'Sahambavy, gamlebyen i Fianarantsoa, kveld med Hasina',
          body:
            'En formiddag på teplantasjen, lunsj ved innsjøen, ettermiddagen til fots i gamlebyen. Tilbake til middag med Hasina ved komfyren for en gassisk-norsk meny.',
          transit: '70 km.',
        },
        {
          day: 5,
          title: 'Fra Ambalakely til Ranohira (Isalo)',
          body:
            'En lang dag sørover på RN7. Landskapet åpner seg dramatisk etter Ihosy. Ankomst Isalo i tide til solnedgangen over sandsteinsklippene.',
          transit: '420 km, omtrent sju timer.',
        },
        {
          day: 6,
          title: 'Isalo nasjonalpark',
          body:
            'En dag til fots gjennom kløftene, bad i de naturlige bassengene og en sjanse til å se lemurer. Solnedgang tilbake på lodgen.',
        },
        {
          day: 7,
          title: 'Videre til Tuléar og kysten',
          body:
            'Siste etappe ned til kysten ved Ifaty, eller tilbake nordover til flyet fra Tuléar (TLE).',
          transit: '230 km til Tuléar, omtrent fire timer.',
        },
      ],
    },
  },
];

type SupportedLocale = 'fr' | 'en' | 'no';
const SUPPORTED: ReadonlyArray<SupportedLocale> = ['fr', 'en', 'no'];

function pickLocale(locale: string): SupportedLocale {
  return (SUPPORTED as ReadonlyArray<string>).includes(locale)
    ? (locale as SupportedLocale)
    : 'fr';
}

/**
 * Returns the three itineraries in the requested locale. Falls back to
 * FR for unknown locale strings (defensive — every page passes the
 * validated next-intl locale, but sitemap / JSON-LD callers may not).
 */
export function getItineraries(locale: string): Itinerary[] {
  const l = pickLocale(locale);
  return SOURCES.map((s) => ({
    slug: s.slug,
    image: s.image,
    duration: s[l].duration,
    title: s[l].title,
    pitch: s[l].pitch,
    best: s[l].best,
    totalKm: s[l].totalKm,
    days: s[l].days,
  }));
}

/**
 * Default FR export for legacy callers (e.g. older imports of
 * `ITINERARIES_FALLBACK` that haven't been migrated to `getItineraries`).
 */
export const itineraries: Itinerary[] = getItineraries('fr');

export function getItinerary(slug: string, locale: string = 'fr') {
  return getItineraries(locale).find((i) => i.slug === slug);
}
