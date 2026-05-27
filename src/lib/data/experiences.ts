/**
 * Excursions organisées depuis la réception de l'hôtel.
 * 10 activités — 6 principales + 4 culturelles/locales. Mise en page éditoriale.
 *
 * Trilingue FR / EN / NO. Avant ce fichier, le fallback était FR-only et
 * /en et /no leakaient en français quand Sanity ne renvoyait rien. Le
 * helper `getExperiences(locale)` résout le bon shape per-locale et est
 * utilisé en fallback dans `sanity/lib/fetch.ts` — mirror du pattern
 * adopté pour `reviews.ts`.
 *
 * Identités préservées : slug, number, image, prix (sur devis ici, donc
 * formulation neutre).
 *
 * EN : anglais britannique éditorial, restrained.
 * NO : Bokmål éditorial, aligné avec le ton de messages/no.json.
 *
 * En Phase 2, migration vers une table CMS.
 */

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

export type Experience = {
  slug: string;
  number: string;
  name: string;
  duration: string;
  /** Sous-titre court */
  tagline: string;
  /** Prose longue ~150-200 mots */
  body: string;
  /** Meilleurs mois */
  best: string;
  /** Coût indicatif */
  cost?: string;
  /** Image hero (placeholder en attendant les vraies photos) */
  image: string;
  /** Libellé personnalisé du CTA */
  ctaLabel: string;
};

type LocalizedFields = {
  name: string;
  duration: string;
  tagline: string;
  body: string;
  best: string;
  cost?: string;
  ctaLabel: string;
};

type LocalizedExperience = {
  slug: string;
  number: string;
  image: string;
  fr: LocalizedFields;
  en: LocalizedFields;
  no: LocalizedFields;
};

const SOURCES: LocalizedExperience[] = [
  {
    slug: 'ranomafana',
    number: '01',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    fr: {
      name: 'Parc national de Ranomafana',
      duration: 'Journée complète',
      tagline: "Les lémuriens en forêt tropicale, départ tôt le matin.",
      body:
        "L'une des grandes forêts tropicales de Madagascar, à l'est de l'hôtel. La route grimpe à travers les plantations de thé et la forêt de pins. Départ tôt le matin avec un petit déjeuner emporté, rendez-vous avec le guide du parc à l'entrée, quelques heures de marche pour observer le sifaka de Milne-Edwards, le lémurien doré du bambou et quelques espèces nocturnes plus petites. Déjeuner au village de Ranomafana, puis retour à l'hôtel en fin d'après-midi, juste à temps pour le thé et la bouillotte au lit le soir.",
      best: 'Mai à octobre.',
      cost: 'Sur demande, devis personnalisé selon le nombre de voyageurs.',
      ctaLabel: 'Ajouter Ranomafana à mon séjour',
    },
    en: {
      name: 'Ranomafana National Park',
      duration: 'Full day',
      tagline: 'Lemurs in the rainforest, an early start.',
      body:
        "One of Madagascar's great rainforests, east of the hotel. The road climbs through tea plantations and pine forest. An early start with a packed breakfast, meeting the park guide at the gate, a few hours' walk to look for the Milne-Edwards' sifaka, the golden bamboo lemur and a few smaller nocturnal species. Lunch in the village of Ranomafana, then back to the hotel in late afternoon, just in time for tea and a hot water bottle in bed in the evening.",
      best: 'May to October.',
      cost: 'On request, quoted by party size.',
      ctaLabel: 'Add Ranomafana to my stay',
    },
    no: {
      name: 'Ranomafana nasjonalpark',
      duration: 'Hel dag',
      tagline: 'Lemurer i regnskogen, tidlig avgang om morgenen.',
      body:
        "En av Madagaskars store regnskoger, øst for hotellet. Veien stiger gjennom teplantasjer og furuskog. Tidlig avgang med pakket frokost, møte med parkguiden ved inngangen, noen timers vandring for å se Milne-Edwards' sifaka, den gylne bambuslemuren og noen mindre nattaktive arter. Lunsj i landsbyen Ranomafana, deretter tilbake til hotellet sent på ettermiddagen, akkurat i tide til te og en varmeflaske i sengen om kvelden.",
      best: 'Mai til oktober.',
      cost: 'På forespørsel, tilbud etter antall reisende.',
      ctaLabel: 'Legg Ranomafana til oppholdet',
    },
  },
  {
    slug: 'rice-fields',
    number: '02',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    fr: {
      name: 'Marche dans les rizières',
      duration: 'Deux heures',
      tagline: "Une marche courte à travers le village en contrebas.",
      body:
        "Une marche guidée qui descend la colline vers le village d'Ambalakely et serpente dans les rizières en terrasses sous l'hôtel. Deux heures, tranquille, surtout plat une fois quitté le versant. Vous voyez l'atelier où le mobilier en palissandre est fabriqué, le petit marché du mardi quand il tombe le bon jour, et les canaux d'irrigation inchangés depuis la fondation du village. Idéal en fin d'après-midi, quand la lumière est basse et que les paysans quittent les champs.",
      best: 'Toute l’année.',
      cost: 'Sans frais pour les hôtes de la maison.',
      ctaLabel: 'Faire la marche du village',
    },
    en: {
      name: 'A walk through the rice paddies',
      duration: 'Two hours',
      tagline: 'A short walk through the village below.',
      body:
        "A guided walk down the hill to the village of Ambalakely and through the terraced rice paddies below the hotel. Two hours, easy, mostly flat once you leave the slope. You see the workshop where the rosewood furniture is made, the small Tuesday market when it falls on the right day, and the irrigation channels unchanged since the village was founded. Best in the late afternoon, when the light is low and the farmers are leaving the fields.",
      best: 'Year-round.',
      cost: 'No charge for guests of the house.',
      ctaLabel: 'Walk down to the village',
    },
    no: {
      name: 'Vandring i rismarkene',
      duration: 'To timer',
      tagline: 'En kort vandring gjennom landsbyen nedenfor.',
      body:
        "En guidet vandring ned åsen til landsbyen Ambalakely og videre gjennom rismarkene i terrasser under hotellet. To timer, rolig, stort sett flatt etter at man har forlatt skråningen. Du ser verkstedet der palisander-møblene lages, det lille tirsdagsmarkedet når det treffer riktig dag, og vannkanalene som har vært uforandret siden landsbyen ble grunnlagt. Best på sen ettermiddag, når lyset er lavt og bøndene forlater markene.",
      best: 'Hele året.',
      cost: 'Ingen kostnad for gjestene i huset.',
      ctaLabel: 'Gå turen til landsbyen',
    },
  },
  {
    slug: 'cooking',
    number: '03',
    image: `${SQ}/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2000w`,
    fr: {
      name: 'Une matinée en cuisine',
      duration: 'Quatre heures',
      tagline: "Marcher le jardin avec Hasina, puis cuisiner avec l'équipe.",
      body:
        "Marche dans le jardin avec Hasina en début de matinée, vous cueillez ce qui vous plaît, puis direction la cuisine. L'équipe vous accompagne sur le menu du jour, plus l'un des plats les plus demandés à la maison (souvent Zébu Marengo ou Krumkake). Le déjeuner, c'est ce que vous avez cuisiné ensemble. Quatre personnes par session, sur demande, les jours où il y a de la place.",
      best: 'Toute l’année.',
      cost: 'Sur demande, devis personnalisé.',
      ctaLabel: 'Réserver une matinée cuisine',
    },
    en: {
      name: 'A morning in the kitchen',
      duration: 'Four hours',
      tagline: 'Walk the garden with Hasina, then cook with the team.',
      body:
        "A walk through the garden with Hasina early in the morning, you pick what you like, then on to the kitchen. The team takes you through the day's menu, plus one of the most-asked-for dishes of the house (often Zebu Marengo or Krumkake). Lunch is what you cooked together. Four guests per session, on request, on days when there's room.",
      best: 'Year-round.',
      cost: 'On request, quoted individually.',
      ctaLabel: 'Book a morning in the kitchen',
    },
    no: {
      name: 'En morgen på kjøkkenet',
      duration: 'Fire timer',
      tagline: 'Gå i hagen med Hasina, lag deretter mat med teamet.',
      body:
        "Vandring i hagen med Hasina tidlig om morgenen, du plukker det du har lyst på, deretter videre til kjøkkenet. Teamet tar deg gjennom dagens meny, pluss en av husets mest etterspurte retter (ofte Zebu Marengo eller Krumkake). Lunsjen er det dere har laget sammen. Fire gjester per økt, på forespørsel, på dagene det er plass.",
      best: 'Hele året.',
      cost: 'På forespørsel, individuelt tilbud.',
      ctaLabel: 'Bestill en morgen på kjøkkenet',
    },
  },
  {
    slug: 'sahambavy',
    number: '04',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    fr: {
      name: 'Plantation de thé de Sahambavy',
      duration: 'Demi-journée',
      tagline: 'Madagascar cultive du thé, voici où.',
      body:
        "La seule plantation de thé commerciale de Madagascar, à l'est de Fianarantsoa. Visite de l'usine avec un membre de l'équipe de production, dégustation de sept variétés, et déjeuner au bord du lac de la plantation. Calme, bien organisé, le genre d'endroit qui donne envie de boire le thé plus attentivement de retour à la maison. Facile à combiner avec la vieille ville haute de Fianarantsoa la même demi-journée.",
      best: 'Mai à octobre.',
      cost: 'Sur demande, devis personnalisé (chauffeur inclus).',
      ctaLabel: 'Ajouter la plantation de thé',
    },
    en: {
      name: 'Sahambavy tea plantation',
      duration: 'Half day',
      tagline: 'Madagascar grows tea, this is where.',
      body:
        "The only commercial tea plantation in Madagascar, east of Fianarantsoa. A tour of the factory with someone from the production team, a tasting of seven varieties, and lunch by the plantation lake. Quiet, well run, the kind of place that makes you drink tea more carefully when you get home. Easy to pair with the old upper town of Fianarantsoa in the same half-day.",
      best: 'May to October.',
      cost: 'On request, quoted individually (driver included).',
      ctaLabel: 'Add the tea plantation',
    },
    no: {
      name: 'Sahambavy teplantasje',
      duration: 'Halv dag',
      tagline: 'Madagaskar dyrker te, her er det.',
      body:
        "Den eneste kommersielle teplantasjen på Madagaskar, øst for Fianarantsoa. Omvisning på fabrikken med en fra produksjonsteamet, smaking av sju ulike teer, og lunsj ved plantasjens innsjø. Stille, velorganisert, den typen sted som gjør at man drikker te mer oppmerksomt når man kommer hjem. Lett å kombinere med den gamle høybyen i Fianarantsoa samme halvdag.",
      best: 'Mai til oktober.',
      cost: 'På forespørsel, individuelt tilbud (sjåfør inkludert).',
      ctaLabel: 'Legg til teplantasjen',
    },
  },
  {
    slug: 'fianarantsoa-old-town',
    number: '05',
    image: `${SQ}/5766ca0c-fb44-4459-b2a0-468c184fe728/hotel.JPG?format=2000w`,
    fr: {
      name: 'Vieille ville haute de Fianarantsoa',
      duration: 'Demi-journée',
      tagline: 'La ville coloniale au-dessus de la ville moderne.',
      body:
        "La vieille ville haute de Fianarantsoa, à douze kilomètres au sud, se dresse au-dessus de la ville moderne sur une série de collines étagées. Maisons à balcons en bois du début du vingtième siècle, petite mission anglicane, deux églises, et des ruelles pavées qu'on met un après-midi à parcourir. Idéal avec un guide local qui connaît les familles. Facile à combiner avec Sahambavy ou avec la marche dans les rizières d'Ambalakely au retour.",
      best: 'Toute l’année.',
      cost: 'Sur demande, devis personnalisé (chauffeur inclus).',
      ctaLabel: 'Ajouter la vieille ville',
    },
    en: {
      name: 'The old upper town of Fianarantsoa',
      duration: 'Half day',
      tagline: 'The colonial town above the modern one.',
      body:
        "The old upper town of Fianarantsoa, twelve kilometres south, sits above the modern town on a series of stepped hills. Wooden balconied houses from the early twentieth century, a small Anglican mission, two churches, and cobbled lanes that take an afternoon to walk. Best with a local guide who knows the families. Easy to combine with Sahambavy, or with the Ambalakely rice-paddy walk on the way back.",
      best: 'Year-round.',
      cost: 'On request, quoted individually (driver included).',
      ctaLabel: 'Add the old town',
    },
    no: {
      name: 'Den gamle høybyen i Fianarantsoa',
      duration: 'Halv dag',
      tagline: 'Kolonibyen over den moderne byen.',
      body:
        "Den gamle høybyen i Fianarantsoa, tolv kilometer sør, ligger over den moderne byen på en rekke trinnvise åser. Trehus med balkonger fra tidlig 1900-tall, en liten anglikansk misjon, to kirker, og brosteinslagte smug man bruker en ettermiddag på å gå gjennom. Best med en lokal guide som kjenner familiene. Lett å kombinere med Sahambavy, eller med vandringen i rismarkene ved Ambalakely på vei tilbake.",
      best: 'Hele året.',
      cost: 'På forespørsel, individuelt tilbud (sjåfør inkludert).',
      ctaLabel: 'Legg til den gamle byen',
    },
  },
  {
    slug: 'ambositra-woodcarving',
    number: '06',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    fr: {
      name: "Ateliers de sculpture d'Ambositra",
      duration: 'Journée complète',
      tagline: "Au nord sur la RN7, la capitale malgache de la sculpture.",
      body:
        "Ambositra est la capitale malgache de la sculpture sur bois, au nord de l'hôtel sur la RN7. Ateliers familiaux où quatre générations ont travaillé le même tour. Vous regardez un bloc de palissandre prendre forme jusqu'à devenir un bol fini en un après-midi. Facile à combiner avec un arrêt à l'atelier de papier Antemoro d'Ambalavao au retour, ou un déjeuner à la coopérative Ihary.",
      best: "Toute l’année, plus sec en saison fraîche.",
      cost: 'Sur demande, devis personnalisé (chauffeur inclus).',
      ctaLabel: "Ajouter Ambositra",
    },
    en: {
      name: 'The woodcarving workshops of Ambositra',
      duration: 'Full day',
      tagline: 'North on the RN7, the carving capital of Madagascar.',
      body:
        "Ambositra is the Malagasy capital of wood-carving, north of the hotel on the RN7. Family workshops where four generations have worked the same lathe. You watch a block of rosewood take shape into a finished bowl in an afternoon. Easy to pair with a stop at the Antemoro paper workshop at Ambalavao on the way back, or lunch at the Ihary cooperative.",
      best: 'Year-round, drier in the cool season.',
      cost: 'On request, quoted individually (driver included).',
      ctaLabel: 'Add Ambositra',
    },
    no: {
      name: 'Treskjærerverkstedene i Ambositra',
      duration: 'Hel dag',
      tagline: 'Nordover langs RN7, treskjæringens hovedstad på Madagaskar.',
      body:
        "Ambositra er treskjæringens hovedstad på Madagaskar, nord for hotellet langs RN7. Familieverksteder der fire generasjoner har arbeidet ved samme dreiebenk. Du ser en blokk av palisander ta form og bli en ferdig skål i løpet av en ettermiddag. Lett å kombinere med et stopp ved Antemoro-papirverkstedet i Ambalavao på veien tilbake, eller en lunsj ved Ihary-kooperativet.",
      best: 'Hele året, tørrere i kjølig sesong.',
      cost: 'På forespørsel, individuelt tilbud (sjåfør inkludert).',
      ctaLabel: 'Legg til Ambositra',
    },
  },
  {
    slug: 'andringitra',
    number: '07',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    fr: {
      name: "Trek d'Andringitra",
      duration: 'Trois jours',
      tagline: 'Falaises granitiques et villages du Tsaranoro.',
      body:
        "Une vraie marche pour les voyageurs qui ont le temps. Trois jours à travers le massif du Tsaranoro au pied de la chaîne de l'Andringitra. Camp à la base, marches en journée vers les grandes falaises, soirées au village. À faire avec un guide dédié et des porteurs, organisés via une agence partenaire de confiance. Nous vous mettons en contact. Compter une journée de transit à l'aller comme au retour, selon les conditions de la route.",
      best: 'Mai à septembre.',
      cost: 'Sur demande, devis personnalisé (organisation via agence partenaire).',
      ctaLabel: "Préparer un trek d'Andringitra",
    },
    en: {
      name: 'The Andringitra trek',
      duration: 'Three days',
      tagline: 'Granite cliffs and the villages of the Tsaranoro.',
      body:
        "A proper walk for travellers with time. Three days across the Tsaranoro massif at the foot of the Andringitra range. Camp at the base, days walking towards the great cliffs, evenings in the village. Done with a dedicated guide and porters, organised through a trusted partner agency. We put you in touch. Allow a day of transit each way, depending on the road.",
      best: 'May to September.',
      cost: 'On request, quoted individually (arranged through partner agency).',
      ctaLabel: 'Plan an Andringitra trek',
    },
    no: {
      name: 'Andringitra-trekken',
      duration: 'Tre dager',
      tagline: 'Granittklipper og landsbyene i Tsaranoro.',
      body:
        "En ordentlig fottur for reisende som har tid. Tre dager gjennom Tsaranoro-massivet ved foten av Andringitra-fjellene. Leir ved foten, dager med vandring mot de store klippene, kvelder i landsbyen. Gjøres med en egen guide og bærere, organisert gjennom et betrodd partnerbyrå. Vi setter dere i kontakt. Regn med en dag i transit hver vei, avhengig av veien.",
      best: 'Mai til september.',
      cost: 'På forespørsel, individuelt tilbud (organisert via partnerbyrå).',
      ctaLabel: 'Planlegg en Andringitra-trek',
    },
  },
  {
    slug: 'tsaranoro-stargazing',
    number: '08',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    fr: {
      name: 'Nuit étoilée au Tsaranoro',
      duration: 'Une nuit',
      tagline: 'La Voie lactée au-dessus des falaises de granite.',
      body:
        "Une seule nuit au pied du Tsaranoro, sans pollution lumineuse à cinquante kilomètres à la ronde. Les étoiles au-dessus des parois granitiques sont extravagantes. Trajet depuis l'hôtel l'après-midi, dîner au camp, longue soirée à regarder le ciel, petit déjeuner le matin, retour. Les photographes apportent un trépied. Nous organisons le camp, le chauffeur, le dîner.",
      best: 'Mai à octobre, nouvelle lune pour les meilleures étoiles.',
      cost: 'Sur demande, devis personnalisé.',
      ctaLabel: "Passer une nuit sous les étoiles",
    },
    en: {
      name: 'A night under the stars at the Tsaranoro',
      duration: 'One night',
      tagline: 'The Milky Way above the granite cliffs.',
      body:
        "A single night at the foot of the Tsaranoro, with no light pollution for fifty kilometres around. The stars above the granite walls are extravagant. The drive from the hotel in the afternoon, dinner at camp, a long evening watching the sky, breakfast in the morning, then back. Photographers bring a tripod. We arrange the camp, the driver, the dinner.",
      best: 'May to October, new moon for the best stars.',
      cost: 'On request, quoted individually.',
      ctaLabel: 'Spend a night under the stars',
    },
    no: {
      name: 'Stjernehimmel ved Tsaranoro',
      duration: 'Én natt',
      tagline: 'Melkeveien over granittklippene.',
      body:
        "En enkelt natt ved foten av Tsaranoro, uten lysforurensning på femti kilometers omkrets. Stjernene over granittveggene er overdådige. Avgang fra hotellet på ettermiddagen, middag i leiren, en lang kveld med å se på himmelen, frokost om morgenen, deretter tilbake. Fotografer tar med stativ. Vi ordner leiren, sjåføren, middagen.",
      best: 'Mai til oktober, nymåne for de beste stjernene.',
      cost: 'På forespørsel, individuelt tilbud.',
      ctaLabel: 'Tilbring en natt under stjernene',
    },
  },
  {
    slug: 'antemoro-paper',
    number: '09',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    fr: {
      name: 'Atelier de papier Antemoro',
      duration: 'Demi-journée',
      tagline: "Papier écorce, tradition depuis le XVIIe siècle.",
      body:
        "Les Antemoro du sud-est de Madagascar fabriquent du papier à partir de l'écorce de l'arbre avoha depuis le dix-septième siècle. L'atelier d'Ambalavao, au sud de l'hôtel, vous laisse observer tout le processus, du trempage de l'écorce au pressage de la pâte séchée avec des fleurs. Vous repartez avec une feuille que vous avez vous-même fabriquée.",
      best: 'Toute l’année.',
      cost: "Atelier sans frais d'entrée. Chauffeur sur demande, devis personnalisé.",
      ctaLabel: "Ajouter l'atelier de papier",
    },
    en: {
      name: 'The Antemoro paper workshop',
      duration: 'Half day',
      tagline: 'Bark paper, a tradition since the seventeenth century.',
      body:
        "The Antemoro people of south-east Madagascar have made paper from the bark of the avoha tree since the seventeenth century. The workshop at Ambalavao, south of the hotel, lets you watch the whole process, from soaking the bark to pressing the dried pulp with flowers. You leave with a sheet you made yourself.",
      best: 'Year-round.',
      cost: 'No entry fee for the workshop. Driver on request, quoted individually.',
      ctaLabel: 'Add the paper workshop',
    },
    no: {
      name: 'Antemoro-papirverkstedet',
      duration: 'Halv dag',
      tagline: 'Barkpapir, en tradisjon siden 1600-tallet.',
      body:
        "Antemoro-folket sørøst på Madagaskar har laget papir av barken til avoha-treet siden 1600-tallet. Verkstedet i Ambalavao, sør for hotellet, lar deg se hele prosessen, fra bløtleggingen av barken til pressingen av den tørkede massen sammen med blomster. Du drar derfra med et ark du selv har laget.",
      best: 'Hele året.',
      cost: 'Ingen inngangsavgift på verkstedet. Sjåfør på forespørsel, individuelt tilbud.',
      ctaLabel: 'Legg til papirverkstedet',
    },
  },
  {
    slug: 'community',
    number: '10',
    image: `${SQ}/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2000w`,
    fr: {
      name: "Une matinée à l'école",
      duration: 'Deux heures',
      tagline: 'Visite de Hope for the Future.',
      body:
        "Demi-journées les mardis et jeudis à l'école Hope for the Future de Tanambao. Nous organisons un chauffeur et un membre de l'équipe pour vous accompagner. Vous rencontrez les enseignants, voyez la salle de classe, partagez un thé avec les enfants. Pas de visite formelle, pas de coût. Si vous apportez quelque chose, nous vous demandons de le donner directement à l'école, pas aux enfants.",
      best: 'Jours d’école, mardis et jeudis.',
      cost: 'Sans frais.',
      ctaLabel: 'Visiter l’école avec nous',
    },
    en: {
      name: 'A morning at the school',
      duration: 'Two hours',
      tagline: 'A visit to Hope for the Future.',
      body:
        "Half-days on Tuesdays and Thursdays at the Hope for the Future school in Tanambao. We arrange a driver and someone from the team to go with you. You meet the teachers, see the classroom, share a cup of tea with the children. No formal tour, no charge. If you bring something, we ask that you give it directly to the school, not to the children.",
      best: 'School days, Tuesdays and Thursdays.',
      cost: 'No charge.',
      ctaLabel: 'Visit the school with us',
    },
    no: {
      name: 'En morgen på skolen',
      duration: 'To timer',
      tagline: 'Et besøk hos Hope for the Future.',
      body:
        "Halvdager på tirsdager og torsdager på Hope for the Future-skolen i Tanambao. Vi ordner en sjåfør og en fra teamet som blir med deg. Du møter lærerne, ser klasserommet, deler en kopp te med barna. Ingen formell omvisning, ingen kostnad. Hvis du tar med noe, ber vi om at du gir det direkte til skolen, ikke til barna.",
      best: 'Skoledager, tirsdager og torsdager.',
      cost: 'Ingen kostnad.',
      ctaLabel: 'Besøk skolen med oss',
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
 * Returns the 10 excursions in the requested locale. Falls back to FR
 * for unknown locale strings (defensive — every page passes the
 * validated next-intl locale, but sitemap / JSON-LD callers may not).
 */
export function getExperiences(locale: string): Experience[] {
  const l = pickLocale(locale);
  return SOURCES.map((s) => ({
    slug: s.slug,
    number: s.number,
    image: s.image,
    ...s[l],
  }));
}

/**
 * Default FR export for legacy callers that haven't been migrated to
 * `getExperiences`.
 */
export const experiences: Experience[] = getExperiences('fr');
