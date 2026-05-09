/**
 * Experiences arranged from the hotel desk.
 * 10 activities — 6 main + 4 cultural/local. Magazine layout.
 *
 * In Phase 2, this migrates to a CMS-backed table.
 */

const SQ = 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d';

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
  /** Hero image (placeholder until real photos) */
  image: string;
  /** Personalized CTA call to action */
  ctaLabel: string;
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
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: 'Add Ranomafana to my stay',
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
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ctaLabel: 'Walk the village with us',
  },
  {
    slug: 'cooking',
    number: '03',
    name: 'A morning in the kitchen',
    duration: 'Four hours',
    tagline: 'Walk the garden with Hasina, then cook with the team.',
    body:
      'Walk the garden with Hasina at eight in the morning, pick what looks good, then go straight to the kitchen. The kitchen team takes you through the day’s set menu, plus one of the signature dishes (often Zébu Marengo or Krumkake). Lunch is what you cooked together. Limited to four people per session, by request only, on days when there is space.',
    best: 'All year.',
    cost: '120 000 Ariary per person.',
    image: `${SQ}/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2000w`,
    ctaLabel: 'Book a kitchen morning',
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
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    ctaLabel: 'Add tea estate to my stay',
  },
  {
    slug: 'fianarantsoa-old-town',
    number: '05',
    name: 'Fianarantsoa old town',
    duration: 'Half day',
    tagline: 'The colonial-era hill above the modern city.',
    body:
      'The upper old town of Fianarantsoa, twelve kilometres south, sits above the modern city on a series of stepped hills. Wooden balconied houses from the early twentieth century, a small Anglican mission, two churches, and the kind of cobblestoned alleys that take an afternoon to walk through. Best with a local guide who knows the families. Easy to combine with Sahambavy tea or with the rice field walk back at Ambalakely.',
    best: 'All year.',
    cost: 'Around 80 000 Ariary per person plus driver.',
    image: `${SQ}/5766ca0c-fb44-4459-b2a0-468c184fe728/hotel.JPG?format=2000w`,
    ctaLabel: 'Add the old town to my stay',
  },
  {
    slug: 'ambositra-woodcarving',
    number: '06',
    name: 'Ambositra woodcarving workshops',
    duration: 'Full day',
    tagline: 'Two hours north, the carving capital of Madagascar.',
    body:
      'Ambositra is the woodcarving capital of the country, two hours north of the hotel on the RN7. Family workshops where four generations have worked the same lathe. You watch a piece of voamboana being shaped from rough block to finished bowl in an afternoon. Easy to combine with a stop at the Antemoro paper workshop in Ambalavao on the way back, or with lunch at the Ihary cooperative.',
    best: 'All year, drier in the cool season.',
    cost: 'Around 180 000 Ariary per person plus driver.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: 'Add Ambositra to my stay',
  },
  {
    slug: 'andringitra',
    number: '07',
    name: 'Andringitra trek',
    duration: 'Three days',
    tagline: 'Granite cliffs and Tsaranoro villages.',
    body:
      'A serious walk for travellers with the time. Three days through the Tsaranoro massif at the foot of the Andringitra range. Camp at the base, day-walks to the great granite cliffs, evenings in the village. Best done with a dedicated guide and porters, arranged through a partner agency we trust. We will introduce you. The drive from the hotel is around five hours each way.',
    best: 'May to September.',
    cost: 'Around 1 200 000 Ariary per person, all in for three days.',
    image: `${SQ}/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=2000w`,
    ctaLabel: 'Plan an Andringitra trek',
  },
  {
    slug: 'tsaranoro-stargazing',
    number: '08',
    name: 'Stargazing at Tsaranoro',
    duration: 'Overnight',
    tagline: 'The Milky Way over the granite cliffs.',
    body:
      'A single night at the Tsaranoro foot, with no light pollution for fifty kilometres around. The stars over the granite walls are extravagant. Drive down from the hotel in the afternoon, dinner at the camp, the long evening of looking up, breakfast in the morning, drive back. Photographers should bring a tripod. We arrange the camp, the driver, the dinner.',
    best: 'May to October, new moon for the best stars.',
    cost: 'Around 400 000 Ariary per person, all in for one night.',
    image: `${SQ}/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w`,
    ctaLabel: 'Spend a night under the stars',
  },
  {
    slug: 'antemoro-paper',
    number: '09',
    name: 'Antemoro paper workshop',
    duration: 'Half day',
    tagline: 'Paper made from bark, a tradition since the seventeenth century.',
    body:
      'The Antemoro people of southeast Madagascar have made paper from the bark of the avoha tree since the seventeenth century. The workshop in Ambalavao, an hour and a half south of the hotel, lets you watch the whole process from soaking the bark to pressing the dried pulp with flowers. You leave with a sheet you made yourself.',
    best: 'All year.',
    cost: 'Around 70 000 Ariary per person plus driver.',
    image: `${SQ}/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w`,
    ctaLabel: 'Add the paper workshop',
  },
  {
    slug: 'community',
    number: '10',
    name: 'A morning at the school',
    duration: 'Two hours',
    tagline: 'Visit Hope for the Future.',
    body:
      'Half-days on Tuesdays or Thursdays at the Hope for the Future school in Tanambao. We arrange a driver and one of the team to walk you through. You meet the teachers, see the classroom, have a tea with the children. There is no formal tour and no cost. If you bring something to give, we ask you to give it to the school directly, not to the children.',
    best: 'School days, Tuesdays and Thursdays.',
    cost: 'No charge.',
    image: `${SQ}/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2000w`,
    ctaLabel: 'Visit the school with us',
  },
];
