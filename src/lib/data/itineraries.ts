/**
 * Itineraries — three suggestions using Ambalakely as a base camp on the RN7.
 * Real, factual. No marketing language.
 */

export type ItineraryDay = {
  day: number;
  title: string;
  body: string;
  /** Optional drive note (km, hours) */
  transit?: string;
};

export type Itinerary = {
  slug: 'three-days' | 'five-days' | 'seven-days';
  duration: string;
  title: string;
  pitch: string;
  best: string;
  totalKm: string;
  days: ItineraryDay[];
};

export const itineraries: Itinerary[] = [
  {
    slug: 'three-days',
    duration: 'Three days',
    title: 'A long weekend on the RN7.',
    pitch:
      'For travellers already in Madagascar with a short window. The shortest version of the road, with one full day at Ranomafana and a quiet evening in Ambalakely.',
    best: 'May to October.',
    totalKm: 'About 320 km of driving.',
    days: [
      {
        day: 1,
        title: 'Antsirabe to Ambalakely',
        body:
          'Leave Antsirabe early. Stop at the Antsirabe market, then drive through Ambositra (woodcarving country) and Ambohimahasoa. Arrive at Ambalakely in the late afternoon, in time for tea on the upper terrace and a walk through the rice fields below the hotel before dark.',
        transit: '230 km, around 5 hours of driving.',
      },
      {
        day: 2,
        title: 'Ranomafana National Park',
        body:
          'Leave at six in the morning with a packed breakfast. The park is best in the early hours when lemurs come down to feed. A guided walk of three to four hours, looking for the Milne-Edwards’ sifaka and the golden bamboo lemur. Lunch in the village of Ranomafana, then back to Ambalakely for dinner. Hot water bottles in the bed at six.',
        transit: '180 km return, around 3 hours of driving.',
      },
      {
        day: 3,
        title: 'Ambalakely village and back',
        body:
          'Slow morning. A guided walk through Ambalakely village with one of the team, an hour to the rice fields and the workshop where the voamboana furniture is made. Lunch from the garden, then a one-hour drive into central Fianarantsoa to see the old town before continuing south, or back north to the capital.',
        transit: '20 km return for the village walk.',
      },
    ],
  },
  {
    slug: 'five-days',
    duration: 'Five days',
    title: 'The slow middle of the country.',
    pitch:
      'Two nights at Ambalakely, two day-trips to the parks, a tea-tasting at Sahambavy, and one night to spare for the trek to Andringitra if you have the legs.',
    best: 'May to September.',
    totalKm: 'About 600 km of driving.',
    days: [
      {
        day: 1,
        title: 'Antsirabe to Ambalakely',
        body:
          'A full driving day on the RN7, with stops at Ambositra and Ambohimahasoa. Arrive in time for dinner. The road is busy with trucks but smooth.',
        transit: '230 km, around 5 hours.',
      },
      {
        day: 2,
        title: 'Ranomafana National Park',
        body:
          'A guided early-morning walk in the rainforest, looking for lemurs and endemic flora. Return to Ambalakely in the late afternoon. Quiet evening with a fire in the dining room.',
        transit: '180 km return, around 3 hours.',
      },
      {
        day: 3,
        title: 'Sahambavy tea estate and Fianarantsoa old town',
        body:
          'A morning at Sahambavy, the only commercial tea estate in Madagascar, with a factory tour and a tasting. Lunch by the lake. Afternoon in the upper old town of Fianarantsoa, the colonial-era hill above the modern city. Back at Ambalakely by sunset.',
        transit: '70 km, around 2 hours total.',
      },
      {
        day: 4,
        title: 'Andringitra day-trip or village rest',
        body:
          'Two options. The active version, leave at five in the morning for the Tsaranoro massif at the foot of Andringitra, a one-day walk through villages and granite cliffs. Or the quiet version, a half-day of cooking with Hasina and an afternoon in the garden.',
        transit: '320 km return for Andringitra, or 5 km for the cooking class.',
      },
      {
        day: 5,
        title: 'Onwards south or back north',
        body:
          'Breakfast at the hotel, then continue south on the RN7 towards Isalo (around 5 hours) or turn back north towards Antsirabe and the capital.',
      },
    ],
  },
  {
    slug: 'seven-days',
    duration: 'Seven days',
    title: 'The full RN7, capital to Isalo.',
    pitch:
      'The classic Madagascar overland journey. Three nights at Ambalakely as the base, two parks, two cultural stops, and the dramatic landscapes of Isalo to close.',
    best: 'May to October.',
    totalKm: 'About 1,400 km of driving.',
    days: [
      {
        day: 1,
        title: 'Antananarivo to Antsirabe',
        body:
          'Leave Tana mid-morning after a stop at the Friday market. Drive south through Ambatolampy (aluminium pots) to Antsirabe, the old colonial spa town, for the night.',
        transit: '170 km, around 4 hours.',
      },
      {
        day: 2,
        title: 'Antsirabe to Ambalakely',
        body:
          'A full driving day with stops at Ambositra and Ambohimahasoa. Arrive in the late afternoon for dinner.',
        transit: '230 km, around 5 hours.',
      },
      {
        day: 3,
        title: 'Ranomafana National Park',
        body:
          'Early morning in the rainforest, guided walk looking for lemurs. Lunch in Ranomafana village, return for an evening at Ambalakely.',
        transit: '180 km return.',
      },
      {
        day: 4,
        title: 'Sahambavy tea, Fianarantsoa old town, evening with Hasina',
        body:
          'Morning at the tea estate, lunch lakeside, afternoon walking the old town. Return for dinner with Hasina cooking a Norwegian-Madagascan menu.',
        transit: '70 km.',
      },
      {
        day: 5,
        title: 'Ambalakely to Ranohira (Isalo)',
        body:
          'Long driving day south on the RN7. The landscape opens up dramatically after Ihosy. Arrive at Isalo for sunset over the sandstone cliffs.',
        transit: '420 km, around 7 hours.',
      },
      {
        day: 6,
        title: 'Isalo National Park',
        body:
          'A guided full-day walk through the canyons, swimming holes and lemur watching. Sunset back at the lodge.',
      },
      {
        day: 7,
        title: 'Onwards to Tulear and the coast',
        body:
          'Final stretch to the coast at Ifaty or back north for the return flight from Tulear (TLE).',
        transit: '230 km to Tulear, around 4 hours.',
      },
    ],
  },
];

export function getItinerary(slug: string) {
  return itineraries.find((i) => i.slug === slug);
}
