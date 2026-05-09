/**
 * FAQ — concierge-level. Real, specific answers.
 * Grouped by category. Question = h3, answer = body prose.
 *
 * Ordered by frequency of asking, not alphabetical.
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
    slug: 'before-you-come',
    label: 'Before you come',
    entries: [
      {
        q: 'When should I book?',
        a: 'Two months ahead in high season (May to October), three weeks in low season (November to April). Last-minute is often possible, especially in the Standard rooms. Write to us if you are flexible on dates, we can usually find something.',
      },
      {
        q: 'Do you take a deposit?',
        a: 'No deposit for stays of two nights or fewer. For longer stays or groups, we ask for thirty percent on confirmation. Free cancellation up to thirty days before arrival.',
      },
      {
        q: 'What is the best season to come?',
        a: 'May, June, September and October are dry, cool at night and warm by day. July and August are dry but cold (we light the fire in the dining room). November to April brings rain, often in the late afternoon, with green rice fields and the garden at its best. Cyclone risk is low this far inland.',
      },
      {
        q: 'Do I need a visa?',
        a: 'Most travellers can get a visa on arrival at Antananarivo airport (around fifty euros for thirty days). Bring a printed return ticket and proof of accommodation. We can send a booking confirmation if you need one for the visa.',
      },
      {
        q: 'What about vaccinations and malaria?',
        a: 'Yellow fever vaccination certificate is required if you are coming from a yellow-fever country. Malaria risk in the highlands is low but real. Most travellers take prophylaxis (atovaquone-proguanil or doxycycline). Check with your doctor at least four weeks before. We have mosquito nets in every room.',
      },
    ],
  },
  {
    slug: 'getting-here',
    label: 'Getting here',
    entries: [
      {
        q: 'How do I get from Antananarivo to Ambalakely?',
        a: 'By road on the RN7, around eight hours of driving. We arrange a private transfer with a trusted driver from Ivato airport. Around two hundred fifty euros for the car, up to four passengers, including fuel and the night for the driver. The road is sealed but slow in places.',
      },
      {
        q: 'Is there a domestic flight?',
        a: 'Tsaradia flies Antananarivo to Fianarantsoa (TNR to WFI) several times a week, around one hour ten minutes. From Fianarantsoa airport, we are twenty-five minutes by car. We can pick you up.',
      },
      {
        q: 'Can I rent a car and drive myself?',
        a: 'Possible but we do not recommend it for first-timers. The RN7 is busy with trucks, the road through villages is shared with carts, livestock and pedestrians. A driver who knows the road costs about the same as a rental and takes the stress away.',
      },
      {
        q: 'How far is Ranomafana National Park?',
        a: 'One hour twenty minutes by car east. Most guests do it as a day trip from Ambalakely. We arrange a driver and a park guide.',
      },
      {
        q: 'Can I leave luggage with you while I do a side trip?',
        a: 'Yes, no charge. Many guests use Ambalakely as a base for two or three days of excursions.',
      },
    ],
  },
  {
    slug: 'in-the-room',
    label: 'In the room',
    entries: [
      {
        q: 'Do you have WiFi?',
        a: 'Yes, free, in every room and the dining room. Speed is fine for email and browsing, less reliable for video calls. The signal is strongest near the main building.',
      },
      {
        q: 'Hot water?',
        a: 'Yes, all day, in every room. Solar plus a backup gas heater for cloudy days.',
      },
      {
        q: 'Power and plugs?',
        a: '220 volts, French two-pin plugs (type E). Bring an adapter if you are coming from the UK or US. Power outages happen, we have a generator that kicks in within a minute.',
      },
      {
        q: 'How cold does it get at night?',
        a: 'In July and August, down to ten degrees Celsius indoors. We put hot water bottles in your bed at six in the evening. Bring a sweater. The dining room has a fireplace.',
      },
      {
        q: 'Are the rooms quiet?',
        a: 'Yes. The loudest sound is usually a rooster at first light. The Standard rooms are set back from the dining room and the quietest in the house.',
      },
    ],
  },
  {
    slug: 'food-and-drink',
    label: 'Food and drink',
    entries: [
      {
        q: 'Is breakfast included?',
        a: 'Yes, full breakfast included with every room. Hasina makes bread fresh, fruit from the garden, eggs from our chickens, real coffee from Sahambavy.',
      },
      {
        q: 'Can I eat dinner here?',
        a: 'Yes, every evening. One set menu, three courses, around seven in the evening. Around ninety thousand Ariary per person. Reserve at the desk on arrival.',
      },
      {
        q: 'Vegetarian, vegan, allergies?',
        a: 'Vegetarian on request, no problem. Vegan with a day of notice. Specific allergies (gluten, peanut, shellfish), tell us in your booking message and Hasina adjusts the menu.',
      },
      {
        q: 'Can outside guests come for dinner?',
        a: 'Yes, day visitors are welcome with a reservation at least twenty-four hours in advance. The restaurant has fifty seats.',
      },
      {
        q: 'Do you sell wine?',
        a: 'A short list of local wines from Soavita and Lazan’i Betsileo, plus Madagascan rum (Dzama). No imported wine.',
      },
    ],
  },
  {
    slug: 'money-and-payment',
    label: 'Money and payment',
    entries: [
      {
        q: 'Do you take credit cards?',
        a: 'We accept Visa and Mastercard at the desk, with a small fee passed on (around three percent). Cash in Ariary is preferred for smaller amounts. American Express is not accepted.',
      },
      {
        q: 'How much cash should I bring?',
        a: 'Around five hundred euros in Ariary for a week, including meals out, drivers, tips and souvenirs. There is an ATM in central Fianarantsoa, ten kilometres from the hotel. We can change small amounts of euros at the desk.',
      },
      {
        q: 'Do you take mobile money?',
        a: 'Yes, MVola and Orange Money are common in Madagascar. Voaray works for cards too. We can send you a payment link on request.',
      },
      {
        q: 'Are tips expected?',
        a: 'Not expected, but appreciated. A common gesture is to leave around ten percent for the team, which we share equally between cooks, waiters, gardener and gardiens.',
      },
    ],
  },
  {
    slug: 'practical',
    label: 'Practical',
    entries: [
      {
        q: 'What should I pack?',
        a: 'Layers. A warm sweater for evenings (year-round), light clothes for day, walking shoes (the village has dirt paths), insect repellent, sunblock. A small flashlight is useful when the power goes off. Anything else, ask us.',
      },
      {
        q: 'Are there mosquitoes?',
        a: 'Some, mostly at dusk in the rainy season. Every bed has a mosquito net. Bring a repellent with thirty percent DEET.',
      },
      {
        q: 'Is the water safe to drink?',
        a: 'Tap water is filtered but we recommend bottled or boiled water for drinking. We provide a thermos of hot water in each room. Bottled water is around two thousand Ariary at the desk.',
      },
      {
        q: 'Can I do laundry?',
        a: 'Yes, hand washed and air dried, around the same day in dry weather, two days when it rains. Around fifteen thousand Ariary for a small bag.',
      },
      {
        q: 'Can I bring my dog?',
        a: 'No pets in the rooms. We have two friendly dogs of our own who live in the garden.',
      },
      {
        q: 'Is there a doctor nearby?',
        a: 'Yes, a clinic in central Fianarantsoa, ten kilometres away, twenty-four hour. The nearest hospital is the regional hospital of Fianarantsoa. We have a basic first-aid kit and contacts of an English-speaking doctor.',
      },
      {
        q: 'Is the hotel accessible for someone with limited mobility?',
        a: 'Partly. The dining room and the Standard rooms are on the ground floor with no steps from the parking. The Confort and Supérieure rooms involve some stairs. Tell us in advance and we will assign a ground-floor room.',
      },
    ],
  },
];
