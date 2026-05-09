/**
 * Experiences arranged from the hotel desk. No detail pages for now,
 * one chapter per experience on the /experiences page.
 *
 * In Phase 2, this migrates to a CMS-backed table.
 */

export type Experience = {
  slug: string;
  number: string;
  name: string;
  duration: string;
  /** One-line tagline */
  tagline: string;
  /** Long form prose ~150-200 words */
  body: string;
  /** Best months to do it */
  best: string;
  /** Approximate cost guidance */
  cost?: string;
};

export const experiences: Experience[] = [
  {
    slug: 'ranomafana',
    number: '01',
    name: 'Ranomafana National Park',
    duration: 'Full day',
    tagline: 'Lemurs in the rainforest, an early start.',
    body:
      'One of the great rainforests of Madagascar, an hour and twenty minutes east of the hotel. The drive itself climbs through tea estates and pine forest. We leave at six in the morning with a packed breakfast, meet the park guide at the entrance, and walk three to four hours looking for the Milne-Edwards’ sifaka, the golden bamboo lemur and a few of the smaller nocturnal species. Lunch in the village of Ranomafana, then the drive back. You are home for tea, and the hot water bottle is in the bed by six.',
    best: 'May to October.',
    cost: 'Around 280 000 Ariary per person, all in.',
  },
  {
    slug: 'rice-fields',
    number: '02',
    name: 'Rice field walk',
    duration: 'Two hours',
    tagline: 'A short walk through the village below.',
    body:
      'A guided walk down the hill to Ambalakely village and through the rice terraces below the hotel. Two hours, gentle, mostly flat once you are off the slope. You see the workshop where the voamboana furniture is made, the small Tuesday market when it falls on the right day, and the irrigation channels that have not changed since the village was founded. Best in the late afternoon when the light is low and the workers are leaving the fields.',
    best: 'All year.',
    cost: 'No charge for hotel guests.',
  },
  {
    slug: 'cooking',
    number: '03',
    name: 'Cooking with Hasina',
    duration: 'Four hours',
    tagline: 'A kitchen morning, then a meal.',
    body:
      'Walk the garden with Hasina at eight in the morning, pick what looks good, then go straight to the kitchen. You make whatever the garden gave that day, plus one signature dish (often Zébu Marengo or Krumkake). Lunch is what you cooked. Limited to four people per session, by request only, on days when there is space.',
    best: 'All year.',
    cost: '120 000 Ariary per person.',
  },
  {
    slug: 'sahambavy',
    number: '04',
    name: 'Sahambavy tea estate',
    duration: 'Half day',
    tagline: 'Madagascar grows tea, here is where.',
    body:
      'The only commercial tea estate in Madagascar, half an hour east of Fianarantsoa. A factory tour with one of the production team, a tasting of seven varieties, and lunch by the estate lake. Quiet, well organised, the kind of place that makes you want to drink tea more carefully when you get home. Easy to combine with the upper old town of Fianarantsoa in the same half day.',
    best: 'May to October.',
    cost: 'Around 90 000 Ariary per person plus driver.',
  },
  {
    slug: 'andringitra',
    number: '05',
    name: 'Andringitra trek',
    duration: 'Three days',
    tagline: 'Granite cliffs and Tsaranoro villages.',
    body:
      'A serious walk for travellers with the time. Three days through the Tsaranoro massif at the foot of the Andringitra range. Camp at the base, day-walks to the great granite cliffs, evenings in the village. Best done with a dedicated guide and porters, arranged through a partner agency we trust. We will introduce you. The drive from the hotel is around five hours each way.',
    best: 'May to September.',
    cost: 'Around 1 200 000 Ariary per person, all in for three days.',
  },
  {
    slug: 'community',
    number: '06',
    name: 'A morning at the school',
    duration: 'Two hours',
    tagline: 'Visit Hope for the Future.',
    body:
      'Half-days on Tuesdays or Thursdays at the Hope for the Future school in Tanambao. We arrange a driver and one of the team to walk you through. You meet the teachers, see the classroom, have a tea with the children. There is no formal tour and no cost. If you bring something to give, we ask you to give it to the school directly, not to the children.',
    best: 'School days, Tuesdays and Thursdays.',
    cost: 'No charge.',
  },
];
