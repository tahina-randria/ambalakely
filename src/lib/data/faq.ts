/**
 * FAQ — pragmatique, directe, factuelle.
 * Questions classées par fréquence. Pas de remplissage, pas de poésie.
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
  {
    slug: 'booking',
    label: 'Réservation et tarifs',
    entries: [
      {
        q: 'Combien de temps à l’avance faut-il réserver ?',
        a: 'Deux mois en haute saison (mai à octobre). Trois semaines en basse saison (novembre à avril). Le dernier moment est souvent possible, surtout pour les chambres Standard.',
      },
      {
        q: 'Un acompte est-il demandé ?',
        a: 'Aucun acompte pour les séjours de deux nuits ou moins. Pour les séjours plus longs ou les groupes, trente pour cent à la réservation. Annulation gratuite jusqu’à trente jours avant l’arrivée.',
      },
      {
        q: 'Quelle est votre politique d’annulation ?',
        a: 'Annulation gratuite jusqu’à trente jours avant l’arrivée. Au-delà, cinquante pour cent de la première nuit sont facturés. Les no-shows sont facturés en totalité.',
      },
      {
        q: 'Les taxes et services sont-ils inclus ?',
        a: 'Oui. Les tarifs incluent la taxe de tourisme et le service. Les seuls extras sont le dîner si vous le prenez (autour de quatre-vingt-dix mille Ariary par personne), l’eau en bouteille et les excursions.',
      },
      {
        q: 'Avez-vous un tarif single ?',
        a: 'Oui. Les chambres Standard ont une réduction de quinze pour cent en occupation simple. Confort et Supérieure restent au même tarif en single.',
      },
      {
        q: 'Avez-vous un tarif groupe ?',
        a: 'Oui pour les réservations de cinq chambres ou plus. Dites-nous la taille et les dates, nous envoyons un devis sous vingt-quatre heures.',
      },
    ],
  },
  {
    slug: 'arrival',
    label: 'Arrivée et transferts',
    entries: [
      {
        q: 'À quelle heure se fait le check-in ?',
        a: 'À partir de quatorze heures. Plus tôt sur demande si une chambre est prête, sans surcoût.',
      },
      {
        q: 'À quelle heure est le check-out ?',
        a: 'Onze heures du matin. Départ tardif jusqu’à quatorze heures si la chambre n’est pas réservée la même nuit, sans surcoût.',
      },
      {
        q: 'Comment se rendre d’Antananarivo à l’hôtel ?',
        a: 'Par la route sur la RN7, environ huit heures de conduite. Nous organisons un transfert privé avec un chauffeur de confiance depuis l’aéroport d’Ivato. Deux cent cinquante euros pour la voiture, jusqu’à quatre passagers, carburant et nuit du chauffeur inclus.',
      },
      {
        q: 'Les vols domestiques pour Fianarantsoa sont-ils fiables ?',
        a: 'Tsaradia relie Antananarivo à Fianarantsoa (TNR vers WFI) plusieurs fois par semaine. Les horaires peuvent changer ou être annulés à court préavis, surtout en basse saison. Prévoyez une journée tampon. La RN7 est plus lente mais jamais annulée.',
      },
      {
        q: 'Peut-on louer une voiture et conduire soi-même ?',
        a: 'Possible mais déconseillé pour une première visite. La RN7 est encombrée de camions, la route à travers les villages est partagée avec les charrettes et le bétail. Un chauffeur coûte à peu près le même prix qu’une location.',
      },
      {
        q: 'Puis-je laisser mes bagages pendant une excursion ?',
        a: 'Oui, sans frais. Beaucoup d’hôtes utilisent Ambalakely comme base pour deux ou trois jours d’excursions.',
      },
      {
        q: 'Organisez-vous le transfert depuis l’aéroport de Fianarantsoa ?',
        a: 'Oui, cinquante mille Ariary l’aller pour jusqu’à quatre passagers. Indiquez-nous votre numéro de vol à la réservation.',
      },
    ],
  },
  {
    slug: 'rooms',
    label: 'Les chambres',
    entries: [
      {
        q: 'Le WiFi est-il inclus ?',
        a: 'Oui. Gratuit, haut débit, disponible vingt-quatre heures sur vingt-quatre dans chaque chambre et la salle à manger. Streaming et appels vidéo sans souci.',
      },
      {
        q: 'Eau chaude disponible ?',
        a: 'Oui, toute la journée, dans chaque chambre. Solaire avec un chauffe-eau gaz en secours.',
      },
      {
        q: 'Qu’en est-il du chauffage en saison fraîche ?',
        a: 'Les nuits de juillet et août descendent à dix degrés Celsius en intérieur. Nous glissons des bouillottes dans votre lit à dix-huit heures. Couvertures supplémentaires dans chaque chambre. La salle à manger a une cheminée allumée à dix-huit heures.',
      },
      {
        q: 'Courant et prises ?',
        a: '220 volts, prises françaises à deux broches (type E). Apportez un adaptateur si vous venez du Royaume-Uni ou des États-Unis. L’hôtel dispose d’un groupe électrogène qui prend le relais en moins d’une minute en cas de coupure.',
      },
      {
        q: 'Y a-t-il la climatisation ?',
        a: 'Non. Les hautes terres sont fraîches toute l’année, souvent froides la nuit. La climatisation n’est pas nécessaire et nous n’en avons pas. Moustiquaires et ventilateurs de plafond dans chaque chambre.',
      },
      {
        q: 'Peut-on fumer ?',
        a: 'Pas de cigarettes à l’intérieur des chambres ni de la salle à manger. Autorisé sur les terrasses.',
      },
      {
        q: 'Proposez-vous un service de blanchisserie ?',
        a: 'Oui, notre équipe lave et repasse. Lavage main, séchage à l’air, retour le jour même par temps sec, deux jours quand il pleut. Autour de quinze mille Ariary pour un petit sac.',
      },
    ],
  },
  {
    slug: 'food',
    label: 'Restauration',
    entries: [
      {
        q: 'Le petit déjeuner est-il inclus ?',
        a: 'Oui, petit déjeuner complet avec chaque chambre. Pain frais chaque matin, fruits du jardin, œufs de nos poules, café de Sahambavy.',
      },
      {
        q: 'Peut-on dîner à l’hôtel ?',
        a: 'Oui, tous les soirs. Un menu unique en trois services, écrit par Hasina, cuisiné par l’équipe. Autour de quatre-vingt-dix mille Ariary par personne. Réservez à la réception à votre arrivée ou dans votre message de réservation.',
      },
      {
        q: 'Végétarien, végan, allergies ?',
        a: 'Végétarien sur demande, sans problème. Végan avec une journée de préavis. Allergies spécifiques (gluten, arachide, fruits de mer), précisez-le dans votre message de réservation et la cuisine s’adapte.',
      },
      {
        q: 'Les visiteurs externes peuvent-ils dîner ?',
        a: 'Oui. Réservez au moins vingt-quatre heures à l’avance. Le restaurant compte cinquante couverts.',
      },
      {
        q: 'Servez-vous du vin importé ?',
        a: 'Non. Nous tenons une petite carte de vins locaux Soavita et Lazan’i Betsileo, ainsi que du rhum malgache (Dzama). Les voyageurs qui veulent une bouteille importée précise doivent l’apporter.',
      },
      {
        q: 'L’eau du robinet est-elle potable ?',
        a: 'Non. Ne buvez pas l’eau du robinet. De l’eau en bouteille est fournie dans chaque chambre, et un thermos d’eau bouillie sur demande. Deux mille Ariary la bouteille à la réception si vous en voulez d’autres.',
      },
    ],
  },
  {
    slug: 'nearby',
    label: 'Aux alentours',
    entries: [
      {
        q: 'Que faire autour de l’hôtel ?',
        a: 'À moins de deux heures de l’hôtel : parc national de Ranomafana (lémuriens en forêt tropicale), plantation de thé de Sahambavy, vieille ville haute de Fianarantsoa, ateliers de sculpture d’Ambositra, massifs d’Andringitra et de Tsaranoro, atelier de papier Antemoro. Nous organisons le chauffeur et le guide pour chacune. Voir la page Excursions pour la liste complète.',
      },
      {
        q: 'Peut-on visiter le village d’Ambalakely ?',
        a: 'Oui. Une marche guidée jusqu’au village et à travers les rizières prend deux heures, sans frais. Idéal en fin d’après-midi. Le marché du mardi au village est petit mais vaut une demi-heure.',
      },
      {
        q: 'Quel est le parc national le plus proche ?',
        a: 'Ranomafana, à une heure vingt à l’est. Départ à six heures du matin avec un petit déjeuner emporté, retour pour le thé. Autour de deux cent quatre-vingt mille Ariary par personne, tout compris.',
      },
      {
        q: 'Peut-on visiter l’école Hope for the Future ?',
        a: 'Oui, les mardis et jeudis en demi-journée. Nous organisons un chauffeur et un membre de l’équipe. Pas de visite formelle, pas de coût.',
      },
    ],
  },
  {
    slug: 'money',
    label: 'Paiement et argent',
    entries: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Visa et Mastercard à la réception (trois pour cent de frais), espèces en Ariary, mobile money (MVola, Orange Money). American Express non acceptée.',
      },
      {
        q: 'Combien d’espèces emporter ?',
        a: 'Autour de cinq cents euros en Ariary pour une semaine, comprenant les repas extérieurs, les chauffeurs, les pourboires et les souvenirs. Il y a un distributeur dans le centre de Fianarantsoa, à douze kilomètres de l’hôtel.',
      },
      {
        q: 'Acceptez-vous le mobile money ?',
        a: 'Oui, MVola et Orange Money pour le règlement de l’hôtel. Nous pouvons envoyer un lien de paiement.',
      },
      {
        q: 'Les pourboires sont-ils attendus ?',
        a: 'Non. Si vous voulez laisser quelque chose pour l’équipe, la réception dispose d’une boîte unique que nous partageons à parts égales.',
      },
      {
        q: 'Serai-je débité à l’avance ?',
        a: 'Non, sauf acomptes pour séjours longs ou groupes. La plupart des hôtes paient à l’arrivée ou au départ.',
      },
    ],
  },
  {
    slug: 'health',
    label: 'Santé et sécurité',
    entries: [
      {
        q: 'Quelles vaccinations sont nécessaires ?',
        a: 'Le certificat de fièvre jaune est requis si vous arrivez d’un pays à fièvre jaune. Vaccinations de routine à jour. Consultez votre médecin au moins quatre semaines avant le départ.',
      },
      {
        q: 'Risque de paludisme ?',
        a: 'Faible dans les hautes terres à cette altitude (autour de 1 200 mètres) mais réel. La plupart des voyageurs prennent un traitement prophylactique (atovaquone-proguanil ou doxycycline). Moustiquaires dans chaque chambre.',
      },
      {
        q: 'Y a-t-il un médecin ou une pharmacie à proximité ?',
        a: 'Oui, une clinique dans le centre de Fianarantsoa, à douze kilomètres, ouverte vingt-quatre heures sur vingt-quatre. L’hôpital régional de Fianarantsoa assure les urgences. Nous avons une trousse de premiers secours et les contacts d’un médecin anglophone.',
      },
      {
        q: 'L’hôtel est-il sûr ?',
        a: 'Oui. Deux gardiens de nuit en rotation, entrée fermée, aucun incident depuis l’ouverture. Le quartier est tranquille.',
      },
      {
        q: 'Recommandez-vous une assurance voyage ?',
        a: 'Oui, avec couverture d’évacuation médicale. Madagascar est rurale et les hôpitaux internationaux les plus proches sont en Afrique du Sud et en France.',
      },
    ],
  },
  {
    slug: 'practical',
    label: 'Pratique',
    entries: [
      {
        q: 'Que faut-il emporter ?',
        a: 'Plusieurs couches pour les soirées fraîches toute l’année, chaussures de marche pour les chemins, vêtements légers pour le jour, anti-moustique (trente pour cent DEET), écran solaire, une petite lampe pour les coupures de courant.',
      },
      {
        q: 'Faut-il un visa ?',
        a: 'La plupart des voyageurs peuvent obtenir un visa à l’arrivée à l’aéroport d’Antananarivo (autour de cinquante euros pour trente jours). Apportez un billet retour imprimé et un justificatif d’hébergement. Nous pouvons envoyer une confirmation de réservation si nécessaire.',
      },
      {
        q: 'Signal téléphonique et cartes SIM ?',
        a: 'Telma et Orange fonctionnent à l’hôtel. Cartes SIM locales disponibles à l’aéroport d’Antananarivo autour de cinq euros, utiles pour les données et les appels locaux.',
      },
      {
        q: 'Les enfants sont-ils les bienvenus ?',
        a: 'Oui. Lits bébé disponibles sur demande, sans frais. Les enfants de moins de trois ans séjournent gratuitement dans la chambre des parents. Tarifs enfants de trois à douze ans à cinquante pour cent du tarif adulte.',
      },
      {
        q: 'Puis-je venir avec mon chien ?',
        a: 'Pas d’animaux dans les chambres. Nous avons deux chiens à nous qui vivent dans le jardin.',
      },
      {
        q: 'L’hôtel est-il accessible aux personnes à mobilité réduite ?',
        a: 'La salle à manger et les quatre chambres Standard sont au rez-de-chaussée, sans marches depuis le parking. Les chambres Confort et Supérieure impliquent des escaliers. Prévenez-nous à l’avance et nous attribuons une chambre au rez-de-chaussée.',
      },
      {
        q: 'Meilleure période pour venir ?',
        a: 'Mai à octobre : saison sèche et fraîche. Novembre à avril : saison des pluies (souvent en fin d’après-midi) et rizières au plus vert. Les cyclones ne remontent pas si loin dans les terres.',
      },
    ],
  },
];
