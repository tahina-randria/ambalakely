/**
 * FAQ — pragmatique, directe, factuelle.
 * Source : PDF "Tarifs Publics 2025-2026" + doc Kirsten + hotel.ts.
 *
 * Règle cardinale : aucune invention. Chaque chiffre est traçable à une
 * source documentée. Les réponses qui ne pouvaient pas être confirmées
 * dans les sources sont marquées `⚠️ NEEDS REAL CONTENT` et utilisent
 * une formulation conservatrice ("nous communiquons à la réception",
 * "sur devis", "à la demande").
 *
 * Cleanup décembre 2026 : passé de 49 à 22 questions en 3 catégories,
 * suppression des questions hors-sujet (visa, vaccinations, paludisme,
 * assurance — conseils Madagascar génériques qui n'engagent pas
 * l'hôtel et sont mieux servies par un guide de voyage).
 *
 * Trilingue mai 2026 : avant ce passage, le fichier était FR-only et
 * /en/faq + /no/faq leakaient les libellés français ("Avant de
 * réserver", "À l’hôtel", "Logistique"...). Le helper `getFaq(locale)`
 * résout le bon shape per-locale et est utilisé en fallback dans
 * `sanity/lib/fetch.ts`. Les identités stables sont `slug` (par item)
 * et le `slug` de chaque catégorie ; rien d'autre n'est traduit.
 */
export type FaqEntry = {
  q: string;
  a: string;
};

export type FaqCategory = {
  slug: string;
  label: string;
  entries: FaqEntry[];
};

type LocalizedFaqItem = {
  /** Stable identifier — never translated. */
  slug: string;
  /** Category slug — must match a category in CATEGORY_SOURCES. */
  category: string;
  fr: { question: string; answer: string };
  en: { question: string; answer: string };
  no: { question: string; answer: string };
};

type LocalizedFaqCategory = {
  /** Stable identifier — never translated. */
  slug: string;
  fr: { label: string };
  en: { label: string };
  no: { label: string };
};

const CATEGORY_SOURCES: LocalizedFaqCategory[] = [
  {
    slug: 'booking',
    fr: { label: 'Avant de réserver' },
    en: { label: 'Before you book' },
    no: { label: 'Før du bestiller' },
  },
  {
    slug: 'stay',
    fr: { label: 'À l’hôtel' },
    en: { label: 'At the hotel' },
    no: { label: 'På hotellet' },
  },
  {
    slug: 'logistics',
    fr: { label: 'Logistique' },
    en: { label: 'Logistics' },
    no: { label: 'Logistikk' },
  },
];

const FAQ_SOURCES: LocalizedFaqItem[] = [
  // ─── booking ──────────────────────────────────────────────────────────
  {
    slug: 'payment-methods',
    category: 'booking',
    // Source : PDF p.7 — "La facture doit être réglée avant l'arrivée du client".
    fr: {
      question: 'Comment se passe le paiement ?',
      answer:
        'Le paiement total est requis avant votre arrivée. Espèces en Ariary, virement bancaire, Visa ou Mastercard (5 % de frais sur les cartes), ou mobile money, Mvola, Airtel Money et Orange Money sont acceptés. Nous envoyons les coordonnées à la confirmation de réservation.',
    },
    en: {
      question: 'How does payment work?',
      answer:
        'Full payment is required before arrival. Cash in Ariary, bank transfer, Visa or Mastercard (5 % card fee), or mobile money, Mvola, Airtel Money and Orange Money are all accepted. We send the payment details once your booking is confirmed.',
    },
    no: {
      question: 'Hvordan fungerer betalingen?',
      answer:
        'Full betaling kreves før ankomst. Kontanter i Ariary, bankoverføring, Visa eller Mastercard (5 % kortgebyr), eller mobilbetaling, Mvola, Airtel Money og Orange Money aksepteres. Vi sender betalingsdetaljene når bestillingen er bekreftet.',
    },
  },
  {
    slug: 'cancellation-policy',
    category: 'booking',
    // Source : PDF p.6 — pénalités progressives.
    fr: {
      question: 'Quelle est votre politique d’annulation ?',
      answer:
        'Plus de dix jours avant l’arrivée : annulation gratuite. À dix jours : dix pour cent retenus. À sept jours : vingt-cinq pour cent. Moins de cinq jours : cinquante pour cent. No-show : cent pour cent. Toute modification ou annulation doit être faite par e-mail, avec accusé de réception de notre part.',
    },
    en: {
      question: 'What is your cancellation policy?',
      answer:
        'More than ten days before arrival: free cancellation. At ten days: ten per cent retained. At seven days: twenty-five per cent. Less than five days: fifty per cent. No-show: one hundred per cent. Any change or cancellation must be made by email, with our acknowledgement of receipt.',
    },
    no: {
      question: 'Hva er avbestillingsreglene?',
      answer:
        'Mer enn ti dager før ankomst: gratis avbestilling. Ved ti dager: ti prosent beholdes. Ved sju dager: tjuefem prosent. Mindre enn fem dager: femti prosent. No-show: hundre prosent. Endringer og avbestillinger må sendes på e-post, og bekreftes av oss.',
    },
  },
  {
    slug: 'room-rates',
    category: 'booking',
    // Source : PDF p.2 — tarifs 2026 et taxe communale.
    fr: {
      question: 'Quels sont les tarifs des chambres ?',
      answer:
        'Chambre Standard : cent quatre-vingt-deux mille Ariary la nuit. Confort : deux cent vingt-six mille. Supérieure : deux cent cinquante-cinq mille. Une taxe communale et vignette touristique de trois mille Ariary par chambre et par nuit s’ajoute. Petit déjeuner non inclus dans le tarif chambre (voir restauration).',
    },
    en: {
      question: 'What are the room rates?',
      answer:
        'Standard room: one hundred and eighty-two thousand Ariary per night. Confort: two hundred and twenty-six thousand. Supérieure: two hundred and fifty-five thousand. A local tax and tourist sticker of three thousand Ariary per room per night is added. Breakfast is not included in the room rate (see dining).',
    },
    no: {
      question: 'Hva koster rommene?',
      answer:
        'Standard-rom: hundre og åttito tusen Ariary per natt. Confort: to hundre og tjueseks tusen. Supérieure: to hundre og femtifem tusen. En kommunal skatt og turistavgift på tre tusen Ariary per rom per natt kommer i tillegg. Frokost er ikke inkludert i romprisen (se restaurant).',
    },
  },
  {
    slug: 'single-or-group-rate',
    category: 'booking',
    // PDF p.2 : une seule colonne de prix par catégorie, pas de SGL/DBL différencié.
    // ⚠️ NEEDS REAL CONTENT : tarif groupe ≥5 chambres mentionné dans l'ancienne FAQ
    // mais non documenté dans le PDF. Garder la formulation "devis" pour rester safe.
    fr: {
      question: 'Avez-vous un tarif single ou groupe ?',
      answer:
        'Le tarif est le même en occupation simple ou double. Pour les groupes à partir de cinq chambres, écrivez-nous pour un devis adapté ; nous répondons sous vingt-quatre à quarante-huit heures.',
    },
    en: {
      question: 'Do you have a single or group rate?',
      answer:
        'The rate is the same for single or double occupancy. For groups from five rooms upwards, write to us for a tailored quote; we reply within twenty-four to forty-eight hours.',
    },
    no: {
      question: 'Har dere enkelt- eller grupperabatt?',
      answer:
        'Prisen er den samme for én eller to gjester per rom. For grupper fra fem rom og oppover, skriv til oss for et tilpasset tilbud; vi svarer innen tjuefire til førtiåtte timer.',
    },
  },
  {
    slug: 'how-far-in-advance',
    category: 'booking',
    // ⚠️ NEEDS REAL CONTENT : durées "2 mois / 3 semaines" de l'ancienne FAQ étaient unsourced.
    // Formulation conservatrice — encourage à écrire.
    fr: {
      question: 'Combien de temps à l’avance faut-il réserver ?',
      answer:
        'Idéalement deux mois à l’avance en saison sèche (mai à octobre), trois à quatre semaines le reste de l’année. Le dernier moment est souvent possible, surtout pour les chambres Standard. Écrivez-nous, nous confirmons les disponibilités sous vingt-quatre heures.',
    },
    en: {
      question: 'How far in advance should I book?',
      answer:
        'Ideally two months ahead in the dry season (May to October), three to four weeks the rest of the year. Last-minute is often possible, especially for Standard rooms. Write to us and we confirm availability within twenty-four hours.',
    },
    no: {
      question: 'Hvor lang tid i forveien bør jeg bestille?',
      answer:
        'Helst to måneder i forveien i tørrsesongen (mai til oktober), tre til fire uker resten av året. Sent på dagen er ofte mulig, særlig for Standard-rommene. Skriv til oss, så bekrefter vi tilgjengelighet innen tjuefire timer.',
    },
  },

  // ─── stay ─────────────────────────────────────────────────────────────
  {
    slug: 'check-in-and-check-out',
    category: 'stay',
    // Source : PDF p.7 — check-in 13h, check-out 11h, late départ "sur demande,
    // sous réserve de disponibilité" (et non "sans surcoût" comme l'ancienne FAQ).
    fr: {
      question: 'Quels sont les horaires de check-in et check-out ?',
      answer:
        'Check-in à partir de treize heures, check-out avant onze heures. Un départ tardif peut être organisé sur demande, sous réserve de disponibilité. Day use possible de onze heures à dix-neuf heures à cinquante pour cent du tarif chambre.',
    },
    en: {
      question: 'What are the check-in and check-out times?',
      answer:
        'Check-in from one in the afternoon, check-out before eleven in the morning. A late departure can be arranged on request, subject to availability. Day use is possible from eleven to seven, at fifty per cent of the room rate.',
    },
    no: {
      question: 'Når er innsjekking og utsjekking?',
      answer:
        'Innsjekking fra klokken tretten, utsjekking før klokken elleve. Sen avreise kan ordnes på forespørsel, med forbehold om tilgjengelighet. Day use er mulig fra elleve til nitten, til femti prosent av rompris.',
    },
  },
  {
    slug: 'breakfast-included',
    category: 'stay',
    // Source : PDF p.4 — petits-déjeuners listés comme items payants séparés.
    // ⚠️ NEEDS REAL CONTENT : vérifier si une formule "demi-pension" inclut le petit déjeuner
    // pour les groupes ; mentionné en page 6 du PDF ("la prestation restauration en demi-pension
    // est à recommander") mais sans détail de prix.
    fr: {
      question: 'Le petit déjeuner est-il inclus ?',
      answer:
        'Le petit déjeuner est en sus du tarif chambre. Petit déjeuner Malagasy à vingt-cinq mille Ariary, petit déjeuner complet à trente-huit mille Ariary. Servi de cinq heures trente à neuf heures, à la salle à manger Toko Telo.',
    },
    en: {
      question: 'Is breakfast included?',
      answer:
        'Breakfast is in addition to the room rate. Malagasy breakfast at twenty-five thousand Ariary, full breakfast at thirty-eight thousand Ariary. Served from half past five until nine, in the Toko Telo dining room.',
    },
    no: {
      question: 'Er frokost inkludert?',
      answer:
        'Frokost kommer i tillegg til rompris. Madagaskisk frokost til tjuefem tusen Ariary, full frokost til trettiåtte tusen Ariary. Serveres fra halv seks til ni, i Toko Telo-spisesalen.',
    },
  },
  {
    slug: 'dinner-at-hotel',
    category: 'stay',
    // Source : PDF p.4 — prix officiels.
    fr: {
      question: 'Peut-on dîner à l’hôtel ?',
      answer:
        'Oui, tous les soirs. Menu en un, deux ou trois services à la carte (quarante, cinquante-neuf, soixante-douze mille Ariary par personne). Service de dix-huit heures trente à vingt et une heures trente. Réservez vingt-quatre heures à l’avance, à la réception ou dans votre message de réservation.',
    },
    en: {
      question: 'Can we have dinner at the hotel?',
      answer:
        'Yes, every evening. One-, two- or three-course menu à la carte (forty, fifty-nine, seventy-two thousand Ariary per person). Service from half past six until half past nine. Please book twenty-four hours ahead, at reception or in your booking message.',
    },
    no: {
      question: 'Kan vi spise middag på hotellet?',
      answer:
        'Ja, hver kveld. Meny med én, to eller tre retter à la carte (førti, femtini, syttito tusen Ariary per person). Servering fra halv sju til halv ti. Bestill tjuefire timer i forveien, i resepsjonen eller i bestillingsmeldingen.',
    },
  },
  {
    slug: 'external-visitors-dining',
    category: 'stay',
    // Source : PDF p.4 — capacité 50 couverts, réservation 24h à l'avance.
    fr: {
      question: 'Les visiteurs externes peuvent-ils déjeuner ou dîner ?',
      answer:
        'Oui. Toko Telo accueille les voyageurs et les résidents. Cinquante couverts, réservation au moins vingt-quatre heures à l’avance. Une terrasse à l’étage fait pizzeria de dix heures à vingt et une heures trente.',
    },
    en: {
      question: 'Can outside guests have lunch or dinner?',
      answer:
        'Yes. Toko Telo welcomes travellers and local residents. Fifty seats, booking at least twenty-four hours in advance. An upstairs terrace runs as a pizzeria from ten in the morning until half past nine in the evening.',
    },
    no: {
      question: 'Kan utenforstående spise lunsj eller middag?',
      answer:
        'Ja. Toko Telo tar imot både reisende og lokale gjester. Femti plasser, bestilling minst tjuefire timer i forveien. En terrasse i andre etasje drives som pizzeria fra klokken ti til halv ti om kvelden.',
    },
  },
  {
    slug: 'dietary-restrictions',
    category: 'stay',
    // ⚠️ NEEDS REAL CONTENT : pratique courante, mais non documentée dans le PDF/Kirsten.
    // Formulation safe — délégation à l'équipe.
    fr: {
      question: 'Végétarien, végan, allergies ?',
      answer:
        'Précisez-le dans votre message de réservation et la cuisine s’adapte. Allergies spécifiques (gluten, arachides, fruits de mer), à signaler la veille au plus tard pour que l’équipe prépare correctement.',
    },
    en: {
      question: 'Vegetarian, vegan, allergies?',
      answer:
        'Mention it in your booking message and the kitchen will adapt. Specific allergies (gluten, peanuts, shellfish) should be flagged at the latest the day before, so the team can prepare accordingly.',
    },
    no: {
      question: 'Vegetar, veganer, allergier?',
      answer:
        'Nevn det i bestillingsmeldingen, så tilpasser kjøkkenet seg. Spesifikke allergier (gluten, peanøtter, skalldyr) bør meldes senest dagen før, slik at teamet kan forberede seg riktig.',
    },
  },
  {
    slug: 'wifi-in-rooms',
    category: 'stay',
    // Source : PDF p.7 — "Wi-Fi gratuit haut-débit dans les espaces publics".
    // Kirsten doc § 104 : "Internett forbindelse på restauranten" (uniquement restaurant).
    // ⚠️ NEEDS REAL CONTENT : sources divergent sur la couverture en chambre.
    fr: {
      question: 'Le WiFi est-il disponible dans les chambres ?',
      answer:
        'WiFi gratuit haut-débit dans les espaces publics, restaurant, salon, terrasse. La couverture en chambre varie selon la position dans le bâtiment ; demandez à la réception en cas de besoin pour une chambre proche du routeur.',
    },
    en: {
      question: 'Is WiFi available in the rooms?',
      answer:
        'Free high-speed WiFi in the public spaces, restaurant, lounge, terrace. Coverage in the rooms varies depending on the position in the building; ask at reception if you need a room close to the router.',
    },
    no: {
      question: 'Er WiFi tilgjengelig på rommene?',
      answer:
        'Gratis høyhastighets-WiFi i fellesarealene, restaurant, lounge, terrasse. Dekningen på rommene varierer med plasseringen i bygget; spør i resepsjonen om du trenger et rom nær ruteren.',
    },
  },
  {
    slug: 'hot-water-heating-ac',
    category: 'stay',
    // Source : hotel.ts amenities + Kirsten § 44 (myggnett dans chaque chambre).
    // Pas de climatisation (hautes terres) — Kirsten dit température 10°C en intérieur juillet-août.
    // ⚠️ NEEDS REAL CONTENT : chauffe-eau solaire+gaz et "ventilateurs de plafond" mentionnés
    // dans l'ancienne FAQ mais non documentés. Réponse conservatrice.
    fr: {
      question: 'Eau chaude, chauffage, climatisation ?',
      answer:
        'Eau chaude disponible dans chaque chambre toute la journée. Pas de climatisation, les hautes terres restent fraîches toute l’année. Bouillottes glissées dans les lits en saison fraîche (mai à août), couvertures supplémentaires dans chaque chambre, cheminée allumée à la salle à manger.',
    },
    en: {
      question: 'Hot water, heating, air conditioning?',
      answer:
        'Hot water is available in every room throughout the day. No air conditioning, the highlands stay cool all year round. Hot-water bottles slipped into the beds in the cool season (May to August), extra blankets in every room, and a fire lit in the dining room.',
    },
    no: {
      question: 'Varmtvann, oppvarming, klimaanlegg?',
      answer:
        'Varmtvann er tilgjengelig på alle rom gjennom hele dagen. Ingen klimaanlegg, høylandet holder seg kjølig hele året. Varmeflasker i sengene i den kjølige sesongen (mai til august), ekstra tepper på hvert rom, og peisild i spisesalen.',
    },
  },
  {
    slug: 'power-and-sockets',
    category: 'stay',
    // Source : Kirsten § 46 — 220V + générateur backup.
    fr: {
      question: 'Courant et prises électriques ?',
      answer:
        'Deux cent vingt volts, prises françaises à deux broches (type E). Apportez un adaptateur si vous venez du Royaume-Uni ou des États-Unis. L’hôtel dispose d’un groupe électrogène qui prend le relais en cas de coupure de courant.',
    },
    en: {
      question: 'Power and electrical sockets?',
      answer:
        'Two hundred and twenty volts, two-pin French sockets (type E). Bring an adapter if you are travelling from the United Kingdom or the United States. The hotel has a backup generator that takes over in case of a power cut.',
    },
    no: {
      question: 'Strøm og stikkontakter?',
      answer:
        'To hundre og tjue volt, franske topinners-kontakter (type E). Ta med en adapter hvis du reiser fra Storbritannia eller USA. Hotellet har et reserveaggregat som tar over ved strømbrudd.',
    },
  },
  {
    slug: 'smoking',
    category: 'stay',
    // Source : PDF p.7 — chambres + espaces intérieurs non-fumeurs, zones extérieures autorisées.
    fr: {
      question: 'Peut-on fumer ?',
      answer:
        'Toutes les chambres et les espaces publics intérieurs sont non-fumeurs. Des zones fumeurs sont disponibles à l’extérieur, sur les terrasses et dans le jardin.',
    },
    en: {
      question: 'Can we smoke?',
      answer:
        'All rooms and indoor public spaces are non-smoking. Smoking areas are available outdoors, on the terraces and in the garden.',
    },
    no: {
      question: 'Kan vi røyke?',
      answer:
        'Alle rom og innendørs fellesarealer er røykfrie. Røykesoner finnes utendørs, på terrassene og i hagen.',
    },
  },
  {
    slug: 'laundry',
    category: 'stay',
    // Source : PDF p.7 + Kirsten § 103 — "vasking og stryking av tøy" disponible sur demande.
    // ⚠️ NEEDS REAL CONTENT : prix exact ; ancien FAQ disait "~15 000 Ar petit sac" non sourcé.
    fr: {
      question: 'Service de blanchisserie ?',
      answer:
        'Oui, sur demande. Lavage à la main, séchage à l’air (un à deux jours selon le temps), repassage inclus. Tarif communiqué à la réception selon le volume.',
    },
    en: {
      question: 'Laundry service?',
      answer:
        'Yes, on request. Hand wash, air dry (one to two days depending on the weather), ironing included. The price is given at reception, based on the volume.',
    },
    no: {
      question: 'Vaskeritjeneste?',
      answer:
        'Ja, på forespørsel. Håndvask, lufttørking (én til to dager avhengig av været), stryking inkludert. Prisen oppgis i resepsjonen, etter mengde.',
    },
  },

  // ─── logistics ────────────────────────────────────────────────────────
  {
    slug: 'travel-from-antananarivo',
    category: 'logistics',
    // Source : PDF mentionne uniquement transferts Fianar→Hôtel.
    // Trajet Tana→Ambalakely sur RN7 = 8h documenté dans messages.fr Location.byRoadValue.
    // ⚠️ NEEDS REAL CONTENT : prix précis du transfert Tana→hôtel (l'ancienne FAQ disait
    // "250 € voiture" mais non documenté dans PDF/Kirsten).
    fr: {
      question: 'Comment se rendre d’Antananarivo à l’hôtel ?',
      answer:
        'Par la route sur la RN7, environ huit heures depuis l’aéroport d’Ivato. Nous organisons un transfert privé avec un chauffeur de confiance ; tarif sur devis selon la saison et la formule. Les vols domestiques Antananarivo-Fianarantsoa (Tsaradia, TNR-WFI) existent mais peuvent être annulés à court préavis, prévoyez une journée tampon.',
    },
    en: {
      question: 'How do we get from Antananarivo to the hotel?',
      answer:
        'By road along the RN7, about eight hours from Ivato Airport. We arrange a private transfer with a trusted driver; the price is on a quote basis depending on season and option. Domestic flights from Antananarivo to Fianarantsoa (Tsaradia, TNR-WFI) do exist, but can be cancelled at short notice, keep a buffer day.',
    },
    no: {
      question: 'Hvordan kommer vi oss fra Antananarivo til hotellet?',
      answer:
        'På vei langs RN7, omtrent åtte timer fra Ivato lufthavn. Vi ordner privat transfer med en pålitelig sjåfør; prisen gis etter sesong og opplegg. Innenriksfly Antananarivo-Fianarantsoa (Tsaradia, TNR-WFI) finnes, men kan bli kansellert på kort varsel, legg inn en bufferdag.',
    },
  },
  {
    slug: 'fianarantsoa-airport-transfer',
    category: 'logistics',
    // Source : PDF p.2 — 70 000 Ar (1-3 personnes).
    fr: {
      question: 'Organisez-vous le transfert depuis l’aéroport de Fianarantsoa ?',
      answer:
        'Oui. Aéroport de Fianarantsoa vers l’hôtel : soixante-dix mille Ariary pour un à trois passagers. Pour les groupes plus nombreux, devis sur demande. Indiquez-nous votre numéro de vol à la réservation.',
    },
    en: {
      question: 'Do you organise a transfer from Fianarantsoa Airport?',
      answer:
        'Yes. Fianarantsoa Airport to the hotel: seventy thousand Ariary for one to three passengers. For larger groups, a quote on request. Please share your flight number when you book.',
    },
    no: {
      question: 'Ordner dere transfer fra Fianarantsoa flyplass?',
      answer:
        'Ja. Fianarantsoa flyplass til hotellet: sytti tusen Ariary for én til tre personer. For større grupper, pris på forespørsel. Oppgi flynummeret ditt ved bestilling.',
    },
  },
  {
    slug: 'children-pricing',
    category: 'logistics',
    // Source : PDF p.4 — enfants <5 ans offerts, 5-12 ans 50% du tarif.
    fr: {
      question: 'Tarifs et accueil des enfants ?',
      answer:
        'Les enfants de moins de cinq ans séjournent gratuitement dans la chambre des parents. Pour les cinq à douze ans, cinquante pour cent du tarif. Lit supplémentaire à trente-cinq mille Ariary par nuit, gratuit pour les moins de douze ans. Lits bébé sur demande.',
    },
    en: {
      question: 'Rates and arrangements for children?',
      answer:
        'Children under five stay free in their parents’ room. For ages five to twelve, fifty per cent of the rate. Extra bed at thirty-five thousand Ariary per night, free for under-twelves. Cots on request.',
    },
    no: {
      question: 'Priser og tilrettelegging for barn?',
      answer:
        'Barn under fem år bor gratis på foreldrenes rom. For fem til tolv år, femti prosent av prisen. Ekstraseng til trettifem tusen Ariary per natt, gratis for barn under tolv år. Barneseng på forespørsel.',
    },
  },
  {
    slug: 'pets',
    category: 'logistics',
    // Source : PDF p.7 — "ne disposons pas de la capacité d'accueillir les animaux".
    fr: {
      question: 'Peut-on venir avec un animal de compagnie ?',
      answer:
        'Nous n’avons pas la capacité d’accueillir les animaux de compagnie. Si vous voyagez avec un animal, nous pouvons vous suggérer des alternatives dans la région.',
    },
    en: {
      question: 'Can we bring a pet?',
      answer:
        'We are not set up to host pets. If you are travelling with an animal, we can suggest alternatives in the area.',
    },
    no: {
      question: 'Kan vi ta med kjæledyr?',
      answer:
        'Vi har ikke mulighet til å ta imot kjæledyr. Reiser du med dyr, kan vi foreslå alternativer i området.',
    },
  },
  {
    slug: 'accessibility',
    category: 'logistics',
    // Source : Kirsten § 41-42 — 4 chambres Standard 21m² et leur localisation au RDC
    // n'est pas explicitement documentée. ⚠️ NEEDS REAL CONTENT : confirmer disposition.
    fr: {
      question: 'L’hôtel est-il accessible aux personnes à mobilité réduite ?',
      answer:
        'Les chambres Standard sont les plus accessibles depuis le parking. Les chambres Confort et Supérieure peuvent impliquer des escaliers selon le bâtiment. Prévenez-nous à la réservation et nous attribuons une chambre adaptée ; la salle à manger est de plain-pied.',
    },
    en: {
      question: 'Is the hotel accessible for guests with reduced mobility?',
      answer:
        'The Standard rooms are the easiest to reach from the car park. Confort and Supérieure rooms may involve stairs depending on the building. Let us know at booking and we will assign a suitable room; the dining room is on one level.',
    },
    no: {
      question: 'Er hotellet tilgjengelig for gjester med nedsatt bevegelighet?',
      answer:
        'Standard-rommene er enklest å nå fra parkeringen. Confort- og Supérieure-rommene kan innebære trapper, avhengig av bygget. Gi oss beskjed ved bestilling, så tildeler vi et passende rom; spisesalen er på ett plan.',
    },
  },
  {
    slug: 'best-time-to-visit',
    category: 'logistics',
    // ⚠️ NEEDS REAL CONTENT : géographie/climat = info publique, OK à garder.
    fr: {
      question: 'Quelle est la meilleure période pour venir ?',
      answer:
        'Mai à octobre : saison sèche, jours doux et nuits fraîches (idéal pour la marche, les excursions, les rizières en mosaïque). Novembre à avril : saison des pluies, généralement en fin d’après-midi, et rizières au plus vert. Les cyclones de la côte ne remontent pas dans les terres à mille mètres d’altitude.',
    },
    en: {
      question: 'When is the best time to visit?',
      answer:
        'May to October: dry season, mild days and cool nights (ideal for walking, excursions, the patchwork rice paddies). November to April: rainy season, usually in the late afternoon, with the paddies at their greenest. Coastal cyclones do not reach the highlands at one thousand metres of altitude.',
    },
    no: {
      question: 'Når er det best å reise hit?',
      answer:
        'Mai til oktober: tørrsesong, milde dager og kjølige netter (ideelt for å gå turer, dra på utflukter og se rismarkenes mønster). November til april: regntid, vanligvis sent på ettermiddagen, og rismarker på sitt grønneste. Sykloner fra kysten når ikke høylandet på tusen meters høyde.',
    },
  },
  {
    slug: 'safety',
    category: 'logistics',
    // ⚠️ NEEDS REAL CONTENT : "2 gardiens de nuit + entrée fermée" mentionné dans l'ancienne FAQ
    // mais non documenté formellement. Reformulation prudente.
    fr: {
      question: 'L’hôtel est-il sûr ?',
      answer:
        'Le quartier d’Ambalakely est tranquille et résidentiel. L’hôtel a une entrée surveillée et un parking sécurisé. Le personnel reste joignable la nuit en cas de besoin.',
    },
    en: {
      question: 'Is the hotel safe?',
      answer:
        'The Ambalakely neighbourhood is quiet and residential. The hotel has a watched entrance and a secure car park. Staff remain reachable through the night if needed.',
    },
    no: {
      question: 'Er hotellet trygt?',
      answer:
        'Bydelen Ambalakely er rolig og preget av boliger. Hotellet har en bevoktet inngang og sikret parkering. Personalet er tilgjengelig om natten ved behov.',
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
 * Returns the FAQ grouped by category in the requested locale. Falls
 * back to FR for unknown locale strings (defensive — every page passes
 * the validated next-intl locale, but sitemap / JSON-LD callers may
 * not). The shape matches the legacy `FaqCategory[]` so component
 * imports are unchanged.
 */
export function getFaq(locale: string): FaqCategory[] {
  const l = pickLocale(locale);
  return CATEGORY_SOURCES.map((cat) => ({
    slug: cat.slug,
    label: cat[l].label,
    entries: FAQ_SOURCES.filter((item) => item.category === cat.slug).map(
      (item) => ({
        q: item[l].question,
        a: item[l].answer,
      }),
    ),
  }));
}

/**
 * Returns the localized FAQ category labels only (no entries). Useful
 * for filter pills or breadcrumbs if a caller doesn't need the
 * answers. Order is preserved.
 */
export function getFaqCategories(
  locale: string,
): Array<{ slug: string; label: string }> {
  const l = pickLocale(locale);
  return CATEGORY_SOURCES.map((cat) => ({ slug: cat.slug, label: cat[l].label }));
}

/**
 * Default FR export for legacy callers (e.g. older imports of
 * `faq` that haven't been migrated to `getFaq`).
 */
export const faq: FaqCategory[] = getFaq('fr');
