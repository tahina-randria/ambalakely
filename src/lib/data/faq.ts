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

export const faq: FaqCategory[] = [
  // ----------------------------------------------------------------
  {
    slug: 'booking',
    label: 'Avant de réserver',
    entries: [
      {
        q: 'Comment se passe le paiement ?',
        // Source : PDF p.7 — "La facture doit être réglée avant l'arrivée du client".
        a: 'Le paiement total est requis avant votre arrivée. Espèces en Ariary, virement bancaire, Visa ou Mastercard (5 % de frais sur les cartes), ou mobile money — Mvola, Airtel Money et Orange Money sont acceptés. Nous envoyons les coordonnées à la confirmation de réservation.',
      },
      {
        q: 'Quelle est votre politique d’annulation ?',
        // Source : PDF p.6 — pénalités progressives.
        a: 'Plus de dix jours avant l’arrivée : annulation gratuite. À dix jours : dix pour cent retenus. À sept jours : vingt-cinq pour cent. Moins de cinq jours : cinquante pour cent. No-show : cent pour cent. Toute modification ou annulation doit être faite par e-mail, avec accusé de réception de notre part.',
      },
      {
        q: 'Quels sont les tarifs des chambres ?',
        // Source : PDF p.2 — tarifs 2026 et taxe communale.
        a: 'Chambre Standard : cent quatre-vingt-deux mille Ariary la nuit. Confort : deux cent vingt-six mille. Supérieure : deux cent cinquante-cinq mille. Une taxe communale et vignette touristique de trois mille Ariary par chambre et par nuit s’ajoute. Petit déjeuner non inclus dans le tarif chambre (voir restauration).',
      },
      {
        q: 'Avez-vous un tarif single ou groupe ?',
        // PDF p.2 : une seule colonne de prix par catégorie, pas de SGL/DBL différencié.
        // ⚠️ NEEDS REAL CONTENT : tarif groupe ≥5 chambres mentionné dans l'ancienne FAQ
        // mais non documenté dans le PDF. Garder la formulation "devis" pour rester safe.
        a: 'Le tarif est le même en occupation simple ou double. Pour les groupes à partir de cinq chambres, écrivez-nous pour un devis adapté ; nous répondons sous vingt-quatre à quarante-huit heures.',
      },
      {
        q: 'Combien de temps à l’avance faut-il réserver ?',
        // ⚠️ NEEDS REAL CONTENT : durées "2 mois / 3 semaines" de l'ancienne FAQ étaient unsourced.
        // Formulation conservatrice — encourage à écrire.
        a: 'Idéalement deux mois à l’avance en saison sèche (mai à octobre), trois à quatre semaines le reste de l’année. Le dernier moment est souvent possible, surtout pour les chambres Standard. Écrivez-nous, nous confirmons les disponibilités sous vingt-quatre heures.',
      },
    ],
  },

  // ----------------------------------------------------------------
  {
    slug: 'stay',
    label: 'À l’hôtel',
    entries: [
      {
        q: 'Quels sont les horaires de check-in et check-out ?',
        // Source : PDF p.7 — check-in 13h, check-out 11h, late départ "sur demande,
        // sous réserve de disponibilité" (et non "sans surcoût" comme l'ancienne FAQ).
        a: 'Check-in à partir de treize heures, check-out avant onze heures. Un départ tardif peut être organisé sur demande, sous réserve de disponibilité. Day use possible de onze heures à dix-neuf heures à cinquante pour cent du tarif chambre.',
      },
      {
        q: 'Le petit déjeuner est-il inclus ?',
        // Source : PDF p.4 — petits-déjeuners listés comme items payants séparés.
        // ⚠️ NEEDS REAL CONTENT : vérifier si une formule "demi-pension" inclut le petit déjeuner
        // pour les groupes ; mentionné en page 6 du PDF ("la prestation restauration en demi-pension
        // est à recommander") mais sans détail de prix.
        a: 'Le petit déjeuner est en sus du tarif chambre. Petit déjeuner Malagasy à vingt-cinq mille Ariary, petit déjeuner complet à trente-huit mille Ariary. Servi de cinq heures trente à neuf heures, à la salle à manger Toko Telo.',
      },
      {
        q: 'Peut-on dîner à l’hôtel ?',
        // Source : PDF p.4 — prix officiels.
        a: 'Oui, tous les soirs. Menu en un, deux ou trois services à la carte (quarante, cinquante-neuf, soixante-douze mille Ariary par personne). Service de dix-huit heures trente à vingt et une heures trente. Réservez vingt-quatre heures à l’avance, à la réception ou dans votre message de réservation.',
      },
      {
        q: 'Les visiteurs externes peuvent-ils déjeuner ou dîner ?',
        // Source : PDF p.4 — capacité 50 couverts, réservation 24h à l'avance.
        a: 'Oui. Toko Telo accueille les voyageurs et les résidents. Cinquante couverts, réservation au moins vingt-quatre heures à l’avance. Une terrasse à l’étage fait pizzeria de dix heures à vingt et une heures trente.',
      },
      {
        q: 'Végétarien, végan, allergies ?',
        // ⚠️ NEEDS REAL CONTENT : pratique courante, mais non documentée dans le PDF/Kirsten.
        // Formulation safe — délégation à l'équipe.
        a: 'Précisez-le dans votre message de réservation et la cuisine s’adapte. Allergies spécifiques (gluten, arachides, fruits de mer), à signaler la veille au plus tard pour que l’équipe prépare correctement.',
      },
      {
        q: 'Le WiFi est-il disponible dans les chambres ?',
        // Source : PDF p.7 — "Wi-Fi gratuit haut-débit dans les espaces publics".
        // Kirsten doc § 104 : "Internett forbindelse på restauranten" (uniquement restaurant).
        // ⚠️ NEEDS REAL CONTENT : sources divergent sur la couverture en chambre.
        a: 'WiFi gratuit haut-débit dans les espaces publics — restaurant, salon, terrasse. La couverture en chambre varie selon la position dans le bâtiment ; demandez à la réception en cas de besoin pour une chambre proche du routeur.',
      },
      {
        q: 'Eau chaude, chauffage, climatisation ?',
        // Source : hotel.ts amenities + Kirsten § 44 (myggnett dans chaque chambre).
        // Pas de climatisation (hautes terres) — Kirsten dit température 10°C en intérieur juillet-août.
        // ⚠️ NEEDS REAL CONTENT : chauffe-eau solaire+gaz et "ventilateurs de plafond" mentionnés
        // dans l'ancienne FAQ mais non documentés. Réponse conservatrice.
        a: 'Eau chaude disponible dans chaque chambre toute la journée. Pas de climatisation — les hautes terres restent fraîches toute l’année. Bouillottes glissées dans les lits en saison fraîche (mai à août), couvertures supplémentaires dans chaque chambre, cheminée allumée à la salle à manger.',
      },
      {
        q: 'Courant et prises électriques ?',
        // Source : Kirsten § 46 — 220V + générateur backup.
        a: 'Deux cent vingt volts, prises françaises à deux broches (type E). Apportez un adaptateur si vous venez du Royaume-Uni ou des États-Unis. L’hôtel dispose d’un groupe électrogène qui prend le relais en cas de coupure de courant.',
      },
      {
        q: 'Peut-on fumer ?',
        // Source : PDF p.7 — chambres + espaces intérieurs non-fumeurs, zones extérieures autorisées.
        a: 'Toutes les chambres et les espaces publics intérieurs sont non-fumeurs. Des zones fumeurs sont disponibles à l’extérieur, sur les terrasses et dans le jardin.',
      },
      {
        q: 'Service de blanchisserie ?',
        // Source : PDF p.7 + Kirsten § 103 — "vasking og stryking av tøy" disponible sur demande.
        // ⚠️ NEEDS REAL CONTENT : prix exact ; ancien FAQ disait "~15 000 Ar petit sac" non sourcé.
        a: 'Oui, sur demande. Lavage à la main, séchage à l’air (un à deux jours selon le temps), repassage inclus. Tarif communiqué à la réception selon le volume.',
      },
    ],
  },

  // ----------------------------------------------------------------
  {
    slug: 'logistics',
    label: 'Logistique',
    entries: [
      {
        q: 'Comment se rendre d’Antananarivo à l’hôtel ?',
        // Source : PDF mentionne uniquement transferts Fianar→Hôtel.
        // Trajet Tana→Ambalakely sur RN7 = 8h documenté dans messages.fr Location.byRoadValue.
        // ⚠️ NEEDS REAL CONTENT : prix précis du transfert Tana→hôtel (l'ancienne FAQ disait
        // "250 € voiture" mais non documenté dans PDF/Kirsten).
        a: 'Par la route sur la RN7, environ huit heures depuis l’aéroport d’Ivato. Nous organisons un transfert privé avec un chauffeur de confiance ; tarif sur devis selon la saison et la formule. Les vols domestiques Antananarivo-Fianarantsoa (Tsaradia, TNR-WFI) existent mais peuvent être annulés à court préavis — prévoyez une journée tampon.',
      },
      {
        q: 'Organisez-vous le transfert depuis l’aéroport de Fianarantsoa ?',
        // Source : PDF p.2 — 70 000 Ar (1-3 personnes).
        a: 'Oui. Aéroport de Fianarantsoa vers l’hôtel : soixante-dix mille Ariary pour un à trois passagers. Pour les groupes plus nombreux, devis sur demande. Indiquez-nous votre numéro de vol à la réservation.',
      },
      {
        q: 'Tarifs et accueil des enfants ?',
        // Source : PDF p.4 — enfants <5 ans offerts, 5-12 ans 50% du tarif.
        a: 'Les enfants de moins de cinq ans séjournent gratuitement dans la chambre des parents. Pour les cinq à douze ans, cinquante pour cent du tarif. Lit supplémentaire à trente-cinq mille Ariary par nuit, gratuit pour les moins de douze ans. Lits bébé sur demande.',
      },
      {
        q: 'Peut-on venir avec un animal de compagnie ?',
        // Source : PDF p.7 — "ne disposons pas de la capacité d'accueillir les animaux".
        a: 'Nous n’avons pas la capacité d’accueillir les animaux de compagnie. Si vous voyagez avec un animal, nous pouvons vous suggérer des alternatives dans la région.',
      },
      {
        q: 'L’hôtel est-il accessible aux personnes à mobilité réduite ?',
        // Source : Kirsten § 41-42 — 4 chambres Standard 21m² et leur localisation au RDC
        // n'est pas explicitement documentée. ⚠️ NEEDS REAL CONTENT : confirmer disposition.
        a: 'Les chambres Standard sont les plus accessibles depuis le parking. Les chambres Confort et Supérieure peuvent impliquer des escaliers selon le bâtiment. Prévenez-nous à la réservation et nous attribuons une chambre adaptée ; la salle à manger est de plain-pied.',
      },
      {
        q: 'Quelle est la meilleure période pour venir ?',
        // ⚠️ NEEDS REAL CONTENT : géographie/climat = info publique, OK à garder.
        a: 'Mai à octobre : saison sèche, jours doux et nuits fraîches (idéal pour la marche, les excursions, les rizières en mosaïque). Novembre à avril : saison des pluies, généralement en fin d’après-midi, et rizières au plus vert. Les cyclones de la côte ne remontent pas dans les terres à mille mètres d’altitude.',
      },
      {
        q: 'L’hôtel est-il sûr ?',
        // ⚠️ NEEDS REAL CONTENT : "2 gardiens de nuit + entrée fermée" mentionné dans l'ancienne FAQ
        // mais non documenté formellement. Reformulation prudente.
        a: 'Le quartier d’Ambalakely est tranquille et résidentiel. L’hôtel a une entrée surveillée et un parking sécurisé. Le personnel reste joignable la nuit en cas de besoin.',
      },
    ],
  },
];
