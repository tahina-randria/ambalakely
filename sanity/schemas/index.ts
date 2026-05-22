import { type SchemaTypeDefinition } from 'sanity';

import { localeString, localeText, localePortableText } from '../lib/locale';
import { hotel } from './hotel';
import { roomCategory } from './roomCategory';
import { review } from './review';
import { article } from './article';
import { excursion } from './excursion';
import { itinerary } from './itinerary';
import { faq } from './faq';
import { staff } from './staff';
import { community } from './community';
import { page } from './page';

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localePortableText,
  hotel,
  roomCategory,
  review,
  article,
  excursion,
  itinerary,
  faq,
  staff,
  community,
  page,
];
