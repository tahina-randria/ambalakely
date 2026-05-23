/**
 * Excursions organisées depuis la réception de l'hôtel.
 * 10 activités — 6 principales + 4 culturelles/locales. Mise en page éditoriale.
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

export const experiences: Experience[] = [
  {
    slug: 'ranomafana',
    number: '01',
    name: 'Parc national de Ranomafana',
    duration: 'Journée complète',
    tagline: "Les lémuriens en forêt tropicale, départ tôt le matin.",
    body:
      "L'une des grandes forêts tropicales de Madagascar, à une heure vingt à l'est de l'hôtel. La route grimpe à travers les plantations de thé et la forêt de pins. Départ à six heures du matin avec un petit déjeuner emporté, rendez-vous avec le guide du parc à l'entrée, trois à quatre heures de marche pour observer le sifaka de Milne-Edwards, le lémurien doré du bambou et quelques espèces nocturnes plus petites. Déjeuner au village de Ranomafana, puis le retour. Vous êtes rentrés pour le thé, et la bouillotte est dans le lit à dix-huit heures.",
    best: 'Mai à octobre.',
    cost: 'Autour de 280 000 Ariary par personne, tout compris.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: 'Ajouter Ranomafana à mon séjour',
  },
  {
    slug: 'rice-fields',
    number: '02',
    name: 'Marche dans les rizières',
    duration: 'Deux heures',
    tagline: "Une marche courte à travers le village en contrebas.",
    body:
      "Une marche guidée qui descend la colline vers le village d'Ambalakely et serpente dans les rizières en terrasses sous l'hôtel. Deux heures, tranquille, surtout plat une fois quitté le versant. Vous voyez l'atelier où le mobilier en palissandre est fabriqué, le petit marché du mardi quand il tombe le bon jour, et les canaux d'irrigation inchangés depuis la fondation du village. Idéal en fin d'après-midi, quand la lumière est basse et que les paysans quittent les champs.",
    best: 'Toute l’année.',
    cost: 'Sans frais pour les hôtes de la maison.',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ctaLabel: 'Faire la marche du village',
  },
  {
    slug: 'cooking',
    number: '03',
    name: 'Une matinée en cuisine',
    duration: 'Quatre heures',
    tagline: "Marcher le jardin avec Hasina, puis cuisiner avec l'équipe.",
    body:
      "Marche dans le jardin avec Hasina à huit heures du matin, vous cueillez ce qui vous plaît, puis direction la cuisine. L'équipe vous accompagne sur le menu du jour, plus l'un des plats les plus demandés à la maison (souvent Zébu Marengo ou Krumkake). Le déjeuner, c'est ce que vous avez cuisiné ensemble. Quatre personnes par session, sur demande, les jours où il y a de la place.",
    best: 'Toute l’année.',
    cost: '120 000 Ariary par personne.',
    image: `${SQ}/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2000w`,
    ctaLabel: 'Réserver une matinée cuisine',
  },
  {
    slug: 'sahambavy',
    number: '04',
    name: 'Plantation de thé de Sahambavy',
    duration: 'Demi-journée',
    tagline: 'Madagascar cultive du thé, voici où.',
    body:
      "La seule plantation de thé commerciale de Madagascar, à une demi-heure à l'est de Fianarantsoa. Visite de l'usine avec un membre de l'équipe de production, dégustation de sept variétés, et déjeuner au bord du lac de la plantation. Calme, bien organisé, le genre d'endroit qui donne envie de boire le thé plus attentivement de retour à la maison. Facile à combiner avec la vieille ville haute de Fianarantsoa la même demi-journée.",
    best: 'Mai à octobre.',
    cost: 'Autour de 90 000 Ariary par personne plus chauffeur.',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    ctaLabel: 'Ajouter la plantation de thé',
  },
  {
    slug: 'fianarantsoa-old-town',
    number: '05',
    name: 'Vieille ville haute de Fianarantsoa',
    duration: 'Demi-journée',
    tagline: 'La ville coloniale au-dessus de la ville moderne.',
    body:
      "La vieille ville haute de Fianarantsoa, à douze kilomètres au sud, se dresse au-dessus de la ville moderne sur une série de collines étagées. Maisons à balcons en bois du début du vingtième siècle, petite mission anglicane, deux églises, et des ruelles pavées qu'on met un après-midi à parcourir. Idéal avec un guide local qui connaît les familles. Facile à combiner avec Sahambavy ou avec la marche dans les rizières d'Ambalakely au retour.",
    best: 'Toute l’année.',
    cost: 'Autour de 80 000 Ariary par personne plus chauffeur.',
    image: `${SQ}/5766ca0c-fb44-4459-b2a0-468c184fe728/hotel.JPG?format=2000w`,
    ctaLabel: 'Ajouter la vieille ville',
  },
  {
    slug: 'ambositra-woodcarving',
    number: '06',
    name: "Ateliers de sculpture d'Ambositra",
    duration: 'Journée complète',
    tagline: "À deux heures au nord, la capitale malgache de la sculpture.",
    body:
      "Ambositra est la capitale malgache de la sculpture sur bois, à deux heures au nord de l'hôtel sur la RN7. Ateliers familiaux où quatre générations ont travaillé le même tour. Vous regardez un bloc de palissandre prendre forme jusqu'à devenir un bol fini en un après-midi. Facile à combiner avec un arrêt à l'atelier de papier Antemoro d'Ambalavao au retour, ou un déjeuner à la coopérative Ihary.",
    best: "Toute l’année, plus sec en saison fraîche.",
    cost: 'Autour de 180 000 Ariary par personne plus chauffeur.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: "Ajouter Ambositra",
  },
  {
    slug: 'andringitra',
    number: '07',
    name: "Trek d'Andringitra",
    duration: 'Trois jours',
    tagline: 'Falaises granitiques et villages du Tsaranoro.',
    body:
      "Une vraie marche pour les voyageurs qui ont le temps. Trois jours à travers le massif du Tsaranoro au pied de la chaîne de l'Andringitra. Camp à la base, marches en journée vers les grandes falaises, soirées au village. À faire avec un guide dédié et des porteurs, organisés via une agence partenaire de confiance. Nous vous mettons en contact. La route depuis l'hôtel prend environ cinq heures à l'aller comme au retour.",
    best: 'Mai à septembre.',
    cost: 'Autour de 1 200 000 Ariary par personne, tout compris pour trois jours.',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ctaLabel: "Préparer un trek d'Andringitra",
  },
  {
    slug: 'tsaranoro-stargazing',
    number: '08',
    name: 'Nuit étoilée au Tsaranoro',
    duration: 'Une nuit',
    tagline: 'La Voie lactée au-dessus des falaises de granite.',
    body:
      "Une seule nuit au pied du Tsaranoro, sans pollution lumineuse à cinquante kilomètres à la ronde. Les étoiles au-dessus des parois granitiques sont extravagantes. Trajet depuis l'hôtel l'après-midi, dîner au camp, longue soirée à regarder le ciel, petit déjeuner le matin, retour. Les photographes apportent un trépied. Nous organisons le camp, le chauffeur, le dîner.",
    best: 'Mai à octobre, nouvelle lune pour les meilleures étoiles.',
    cost: 'Autour de 400 000 Ariary par personne, tout compris pour une nuit.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: "Passer une nuit sous les étoiles",
  },
  {
    slug: 'antemoro-paper',
    number: '09',
    name: 'Atelier de papier Antemoro',
    duration: 'Demi-journée',
    tagline: "Papier écorce, tradition depuis le XVIIe siècle.",
    body:
      "Les Antemoro du sud-est de Madagascar fabriquent du papier à partir de l'écorce de l'arbre avoha depuis le dix-septième siècle. L'atelier d'Ambalavao, à une heure trente au sud de l'hôtel, vous laisse observer tout le processus, du trempage de l'écorce au pressage de la pâte séchée avec des fleurs. Vous repartez avec une feuille que vous avez vous-même fabriquée.",
    best: 'Toute l’année.',
    cost: 'Autour de 70 000 Ariary par personne plus chauffeur.',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    ctaLabel: "Ajouter l'atelier de papier",
  },
  {
    slug: 'community',
    number: '10',
    name: "Une matinée à l'école",
    duration: 'Deux heures',
    tagline: 'Visite de Hope for the Future.',
    body:
      "Demi-journées les mardis et jeudis à l'école Hope for the Future de Tanambao. Nous organisons un chauffeur et un membre de l'équipe pour vous accompagner. Vous rencontrez les enseignants, voyez la salle de classe, partagez un thé avec les enfants. Pas de visite formelle, pas de coût. Si vous apportez quelque chose, nous vous demandons de le donner directement à l'école, pas aux enfants.",
    best: 'Jours d’école, mardis et jeudis.',
    cost: 'Sans frais.',
    image: `${SQ}/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2000w`,
    ctaLabel: 'Visiter l’école avec nous',
  },
];
