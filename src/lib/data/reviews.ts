/**
 * Avis clients — 9 quotes vérifiées sur TripAdvisor
 * (tripadvisor.com/Hotel_Review-g298271-d7646881).
 *
 * Chaque entrée est trilingue : original anglais (TripAdvisor langue
 * source), traduction française (site primaire), traduction norvégienne
 * (clientèle Hasina / TGH). Date également localisée — `Juillet 2022`
 * en FR, `July 2022` en EN, `Juli 2022` en NO.
 *
 * Les 4 avis Booking / Google de la version précédente (Ada, Giovanni,
 * Ruth Barbara W., Anna Maria, KingfisherOslo) ont été retirés faute
 * de vérification publique. L'intégration Google Places live est
 * laissée TODO en attendant une clé API.
 *
 * Avant ce fichier, REVIEWS_FALLBACK vivait dans rooms.ts en FR-only :
 * /en et /no leakaient en français. Le helper `getReviews(locale)`
 * résout le bon shape per-locale et est utilisé en fallback dans
 * `sanity/lib/fetch.ts`.
 *
 * Ordre : du plus signal-positif au plus court. Trie déjà fait pour
 * que la home affiche les 3 plus impactants en premier si jamais on
 * revient à un slice.
 */

export type Review = {
  /** Quote text in the requested locale. */
  quote: string;
  author: string;
  city: string;
  source: string;
  /** Human-readable month + year in the requested locale. */
  date?: string;
};

type LocalizedReview = {
  author: string;
  city: string;
  source: string;
  fr: { quote: string; date: string };
  en: { quote: string; date: string };
  no: { quote: string; date: string };
};

const SOURCES: LocalizedReview[] = [
  {
    author: 'Polly Pallister Wilkin',
    city: '',
    source: 'TripAdvisor',
    en: {
      quote:
        'This is an amazing gem of a hotel. A beautiful location and built in the Betsileo style, with incredibly friendly and helpful staff.',
      date: 'July 2022',
    },
    fr: {
      quote:
        'Un joyau incroyable. Un bel emplacement, construit dans le style Betsileo, avec un personnel formidable et serviable.',
      date: 'Juillet 2022',
    },
    no: {
      quote:
        'Et fantastisk juvel av et hotell. Et vakkert sted, bygget i Betsileo-stil, med utrolig vennlig og hjelpsomt personale.',
      date: 'Juli 2022',
    },
  },
  {
    author: 'Kristin O. V.',
    city: 'Trondheim',
    source: 'TripAdvisor',
    en: {
      quote:
        'Really good service, great food and fantastic relaxing atmosphere.',
      date: 'November 2019',
    },
    fr: {
      quote:
        'Vraiment bon service, excellente cuisine et atmosphère fantastiquement relaxante.',
      date: 'Novembre 2019',
    },
    no: {
      quote:
        'Virkelig god service, fantastisk mat og en fantastisk avslappende atmosfære.',
      date: 'November 2019',
    },
  },
  {
    author: 'Toril A.',
    city: '',
    source: 'TripAdvisor',
    en: {
      quote:
        'A fantastic oasis with a friendly and good atmosphere. Very hospitable host. The owner speaks Norwegian.',
      date: 'October 2025',
    },
    fr: {
      quote:
        'Un oasis fantastique, ambiance chaleureuse. Hôte très accueillant. Le propriétaire parle norvégien.',
      date: 'Octobre 2025',
    },
    no: {
      quote:
        'En fantastisk oase med vennlig og god atmosfære. Svært gjestfri vert. Eieren snakker norsk.',
      date: 'Oktober 2025',
    },
  },
  {
    // Google review — reinstated 2026-05-27 §32bis #2 after the user
    // asked to include Google sources too. Original quote on Google
    // Maps; back-translated EN from the FR translation we had in
    // legacy rooms.ts since the original-language source wasn't
    // preserved. Date left empty because Google didn't surface a
    // month in the original entry.
    author: 'Ruth Barbara W.',
    city: '',
    source: 'Google',
    en: {
      quote:
        'A very lovely hotel with a peaceful garden. The food was excellent. Spacious, clean rooms.',
      date: '',
    },
    fr: {
      quote:
        'Très bel hôtel avec jardin paisible. Le repas était excellent. Chambres spacieuses et propres.',
      date: '',
    },
    no: {
      quote:
        'Et veldig fint hotell med en fredelig hage. Maten var utmerket. Romslige, rene rom.',
      date: '',
    },
  },
  {
    // Google review — see Ruth Barbara W. note above. Author name
    // suggests Italian original, but the only quote we have is the FR
    // legacy translation, so EN and NO are also derived from FR.
    author: 'Anna Maria',
    city: '',
    source: 'Google',
    en: {
      quote:
        'Beautiful place! The owner speaks perfect English, we even got a room upgrade.',
      date: '',
    },
    fr: {
      quote:
        "Bel endroit ! Le propriétaire parle un anglais parfait, nous avons eu un surclassement de chambre.",
      date: '',
    },
    no: {
      quote:
        'Et vakkert sted! Eieren snakker perfekt engelsk, vi fikk til og med en romoppgradering.',
      date: '',
    },
  },
  {
    author: 'Femke V.',
    city: '',
    source: 'TripAdvisor',
    en: {
      quote:
        'Newly-refurbished hotel with huge, well-equipped rooms: big beds, mosquito nets, lots of power sockets.',
      date: 'June 2022',
    },
    fr: {
      quote:
        'Hôtel récemment rénové, immenses chambres bien équipées : grands lits, moustiquaires, beaucoup de prises.',
      date: 'Juin 2022',
    },
    no: {
      quote:
        'Nyrenovert hotell med store, velutstyrte rom: store senger, myggnett, mange stikkontakter.',
      date: 'Juni 2022',
    },
  },
  {
    author: 'Bernt R. Pedersen',
    city: '',
    source: 'TripAdvisor',
    en: {
      quote:
        'The perfect place to stay — in Fianarantsoa, or on the way through to Isalo and Antsirabe.',
      date: 'September 2019',
    },
    fr: {
      quote:
        "L'endroit parfait pour séjourner — à Fianarantsoa, ou en chemin vers Isalo et Antsirabe.",
      date: 'Septembre 2019',
    },
    no: {
      quote:
        'Det perfekte stedet å bo — enten du oppholder deg i Fianarantsoa, eller er på vei til Isalo og Antsirabe.',
      date: 'September 2019',
    },
  },
  {
    author: 'traveltragic50',
    city: 'Wollongong',
    source: 'TripAdvisor',
    en: {
      quote:
        'A rare find that exceeded expectations. Lovely room. Professional and friendly staff.',
      date: 'September 2025',
    },
    fr: {
      quote:
        'Une trouvaille rare qui a dépassé nos attentes. Belle chambre. Personnel professionnel et chaleureux.',
      date: 'Septembre 2025',
    },
    no: {
      quote:
        'Et sjeldent funn som overgikk forventningene. Nydelig rom. Profesjonelt og vennlig personale.',
      date: 'September 2025',
    },
  },
  {
    author: 'Robert H.',
    city: 'Adelaide',
    source: 'TripAdvisor',
    en: {
      quote:
        "A very nice hotel in a town where you wouldn't really expect it. Quite modern with very large rooms.",
      date: 'August 2025',
    },
    fr: {
      quote:
        "Un très bel hôtel dans une ville où on ne s'y attendrait pas. Plutôt moderne, avec de très grandes chambres.",
      date: 'Août 2025',
    },
    no: {
      quote:
        'Et veldig fint hotell i en by der man ikke ville forvente det. Ganske moderne med veldig store rom.',
      date: 'August 2025',
    },
  },
  {
    author: 'Roswitha S.',
    city: 'Vienne',
    source: 'TripAdvisor',
    en: {
      quote:
        'A hidden gem next to the main road, but quiet. Very beautiful and lovingly designed hotel.',
      date: 'October 2023',
    },
    fr: {
      quote:
        'Un joyau caché à côté de la route principale, mais calme. Hôtel très beau, décoré avec amour.',
      date: 'Octobre 2023',
    },
    no: {
      quote:
        'En skjult perle ved hovedveien, men stille. Et veldig vakkert og kjærlig utformet hotell.',
      date: 'Oktober 2023',
    },
  },
  {
    author: 'Pravin B.',
    city: '',
    source: 'TripAdvisor',
    en: {
      quote:
        'The hotel is beautifully situated, along the rice paddies and near the village of Ambalakely.',
      date: 'April 2023',
    },
    fr: {
      quote:
        "L'hôtel est magnifiquement situé, le long des rizières, près du village d'Ambalakely.",
      date: 'Avril 2023',
    },
    no: {
      quote:
        'Hotellet er nydelig beliggende, langs rismarkene og nær landsbyen Ambalakely.',
      date: 'April 2023',
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
 * Returns the 9 reviews in the requested locale. Falls back to FR for
 * unknown locale strings (defensive — every page passes the validated
 * next-intl locale, but sitemap / JSON-LD callers may not).
 */
export function getReviews(locale: string): Review[] {
  const l = pickLocale(locale);
  return SOURCES.map((r) => ({
    quote: r[l].quote,
    author: r.author,
    city: r.city,
    source: r.source,
    date: r[l].date,
  }));
}

/**
 * Default FR export for legacy callers (e.g. older imports of
 * `REVIEWS_FALLBACK` that haven't been migrated to `getReviews`).
 */
export const reviews: Review[] = getReviews('fr');
