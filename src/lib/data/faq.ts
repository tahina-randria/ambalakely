/**
 * FAQ — pragmatic, direct, factual.
 * Questions ordered by frequency of asking. No filler, no poetry.
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
    label: 'Booking and rates',
    entries: [
      {
        q: 'How far in advance should I book?',
        a: 'Two months ahead in high season (May to October). Three weeks in low season (November to April). Last-minute is often possible, especially in the Standard rooms.',
      },
      {
        q: 'Is a deposit required?',
        a: 'No deposit for stays of two nights or fewer. For longer stays or groups, thirty percent is required at booking. Free cancellation up to thirty days before arrival.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Free cancellation up to thirty days before arrival. After that, fifty percent of the first night is charged. No-shows are charged in full.',
      },
      {
        q: 'Are taxes and service included in the rate?',
        a: 'Yes. Rates shown include tourism tax and service. The only extra is dinner if you take it (around ninety thousand Ariary per person), bottled water, and any excursions.',
      },
      {
        q: 'Do you offer single occupancy rates?',
        a: 'Yes. The Standard rooms have a fifteen percent single discount. Confort and Supérieure are not discounted for single occupancy.',
      },
      {
        q: 'Do you have group rates?',
        a: 'Yes for bookings of five rooms or more. Tell us the size and dates and we send a group quote within twenty-four hours.',
      },
    ],
  },
  {
    slug: 'arrival',
    label: 'Arrival and transfers',
    entries: [
      {
        q: 'What time can I check in?',
        a: 'From two in the afternoon. Earlier on request if a room is ready, no charge.',
      },
      {
        q: 'What time is check-out?',
        a: 'Eleven in the morning. Late check-out until two in the afternoon if the room is not booked the same night, no charge.',
      },
      {
        q: 'How do I get from Antananarivo to the hotel?',
        a: 'By road on the RN7, around eight hours of driving. We arrange a private transfer with a trusted driver from Ivato airport. Two hundred fifty euros for the car, up to four passengers, including fuel and the driver overnight.',
      },
      {
        q: 'Is there a domestic flight?',
        a: 'Yes. Tsaradia flies Antananarivo to Fianarantsoa (TNR to WFI) several times a week, around one hour ten minutes. From Fianarantsoa airport we are twenty-five minutes by car. Pickup included on request.',
      },
      {
        q: 'Can I rent a car and drive myself?',
        a: 'Possible but not recommended for first-time visitors. The RN7 is busy with trucks, the road through villages is shared with carts and livestock. A driver costs about the same as a rental.',
      },
      {
        q: 'Can I leave luggage during a side trip?',
        a: 'Yes, no charge. Many guests use Ambalakely as a base for two or three days of excursions.',
      },
      {
        q: 'Do you arrange airport pickup at Fianarantsoa airport?',
        a: 'Yes, fifty thousand Ariary one way for up to four passengers. Tell us your flight number at booking.',
      },
    ],
  },
  {
    slug: 'rooms',
    label: 'The rooms',
    entries: [
      {
        q: 'Is WiFi included?',
        a: 'Yes, free in every room and the dining room.',
      },
      {
        q: 'Is hot water available?',
        a: 'Yes, all day, in every room. Solar with a backup gas heater.',
      },
      {
        q: 'What about heating in the cold months?',
        a: 'July and August nights drop to ten degrees Celsius indoors. We put hot water bottles in your bed at six in the evening. Extra blankets in every room. The dining room has a fireplace lit at six.',
      },
      {
        q: 'Power and plugs?',
        a: '220 volts, French two-pin plugs (type E). Bring an adapter if coming from the UK or US. The hotel has a generator that switches in within a minute during outages.',
      },
      {
        q: 'Is there air conditioning?',
        a: 'No. The highlands are cool year-round, often cold at night. AC is not needed and we do not have it. Mosquito nets and ceiling fans in every room.',
      },
      {
        q: 'Smoking policy?',
        a: 'No smoking inside the rooms or the dining room. Smoking permitted on the terraces.',
      },
      {
        q: 'Laundry service?',
        a: 'Yes, hand washed and air dried, returned the same day in dry weather. Fifteen thousand Ariary for a small bag.',
      },
    ],
  },
  {
    slug: 'food',
    label: 'Food and restaurant',
    entries: [
      {
        q: 'Is breakfast included?',
        a: 'Yes, full breakfast with every room. Bread baked fresh, fruit from the garden, eggs from our chickens, coffee from Sahambavy.',
      },
      {
        q: 'Can I have dinner at the hotel?',
        a: 'Yes, every evening. One set menu, three courses. Around ninety thousand Ariary per person. Reserve at the desk on arrival or in your booking message.',
      },
      {
        q: 'Vegetarian, vegan, allergies?',
        a: 'Vegetarian on request, no problem. Vegan with a day of notice. Specific allergies (gluten, peanut, shellfish), tell us in your booking message and the kitchen adjusts.',
      },
      {
        q: 'Can day visitors come for dinner?',
        a: 'Yes. Reserve at least twenty-four hours in advance. The restaurant has fifty seats.',
      },
      {
        q: 'Is the tap water safe to drink?',
        a: 'Tap water is filtered but we recommend bottled or boiled water for drinking. A thermos of hot water in each room. Bottled water is two thousand Ariary at the desk.',
      },
    ],
  },
  {
    slug: 'money',
    label: 'Payment and money',
    entries: [
      {
        q: 'What payment methods do you accept?',
        a: 'Visa and Mastercard at the desk (three percent fee), cash in Ariary, mobile money (MVola, Orange Money). American Express not accepted.',
      },
      {
        q: 'How much cash should I bring?',
        a: 'Around five hundred euros in Ariary for a week, including meals out, drivers, tips and souvenirs. There is an ATM in central Fianarantsoa, twelve kilometres from the hotel.',
      },
      {
        q: 'Do you accept mobile money?',
        a: 'Yes, MVola and Orange Money for hotel payments. We can send a payment link.',
      },
      {
        q: 'Are tips expected?',
        a: 'Not expected, but appreciated. Around ten percent for the team is common, shared equally between cooks, waiters, gardener and gardiens.',
      },
      {
        q: 'Will I be charged in advance?',
        a: 'No, except deposits for long stays or groups. Most guests pay on arrival or departure.',
      },
    ],
  },
  {
    slug: 'health',
    label: 'Health and safety',
    entries: [
      {
        q: 'What vaccinations do I need?',
        a: 'Yellow fever certificate is required if you arrive from a yellow fever country. Routine vaccinations should be up to date. Check with your doctor at least four weeks before travel.',
      },
      {
        q: 'Malaria risk?',
        a: 'Low in the highlands at this altitude (around 1 200 metres) but real. Most travellers take prophylaxis (atovaquone-proguanil or doxycycline). Mosquito nets in every room.',
      },
      {
        q: 'Is there a doctor or pharmacy nearby?',
        a: 'Yes, a clinic in central Fianarantsoa, twelve kilometres away, twenty-four hour. The regional hospital of Fianarantsoa has emergency care. We have a basic first-aid kit and contacts of an English-speaking doctor.',
      },
      {
        q: 'Is the hotel safe?',
        a: 'Yes. Two night gardiens on rotation, gated entrance, no incidents in our years of operation. The neighbourhood is quiet.',
      },
      {
        q: 'Do you recommend travel insurance?',
        a: 'Yes, with medical evacuation cover. Madagascar is rural and the closest international hospitals are in South Africa and France.',
      },
    ],
  },
  {
    slug: 'practical',
    label: 'Practical',
    entries: [
      {
        q: 'What should I pack?',
        a: 'Layers for cool evenings year-round, walking shoes for dirt paths, light clothes for day, insect repellent (thirty percent DEET), sunblock, a small flashlight for power outages.',
      },
      {
        q: 'Do I need a visa?',
        a: 'Most travellers can get a visa on arrival at Antananarivo airport (around fifty euros for thirty days). Bring a printed return ticket and proof of accommodation. We can send a booking confirmation if needed for the visa.',
      },
      {
        q: 'Phone signal and SIM cards?',
        a: 'Telma and Orange both work in the hotel. Local SIM cards available at the airport in Antananarivo for around five euros, useful for data and local calls.',
      },
      {
        q: 'Are children welcome?',
        a: 'Yes. Cribs available on request, no charge. Children under three stay free in the parents&rsquo; room. Rates for children three to twelve are fifty percent of the adult rate.',
      },
      {
        q: 'Can I bring my dog?',
        a: 'No pets in the rooms. We have two dogs of our own who live in the garden.',
      },
      {
        q: 'Is the hotel accessible for limited mobility?',
        a: 'The dining room and the four Standard rooms are on the ground floor with no steps from the parking. The Confort and Supérieure rooms involve stairs. Tell us in advance and we assign a ground-floor room.',
      },
      {
        q: 'Best time of year to visit?',
        a: 'May to October is dry and cool. November to April brings rain (often in the late afternoon) and the rice fields are at their greenest. Cyclones do not reach this far inland.',
      },
    ],
  },
];
