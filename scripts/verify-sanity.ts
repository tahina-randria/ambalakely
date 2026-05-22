import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

async function main() {
  const all = await client.fetch<{ _type: string }[]>(
    `*[_type in ["hotel","roomCategory","review","article","excursion","itinerary","faq","staff","community","page"]] {_type}`,
  );
  const byType = all.reduce<Record<string, number>>((acc, d) => {
    acc[d._type] = (acc[d._type] ?? 0) + 1;
    return acc;
  }, {});
  console.log('Docs by type:', byType);
  console.log('Total:', all.length);

  const hotel = await client.fetch(
    `*[_type=="hotel"][0]{name,"taglineFR":tagline.fr,email,phone,founded,rooms,priceRange,"amenityCount":count(amenities)}`,
  );
  console.log('Hotel singleton:', hotel);

  const cats = await client.fetch(
    `*[_type=="roomCategory"]|order(number asc){"name":name.fr,priceMga,countNum}`,
  );
  console.log('Categories:', cats);

  const staff = await client.fetch(
    `*[_type=="staff"]|order(order asc){name,"role":role.fr,public}`,
  );
  console.log('Staff:', staff);

  const community = await client.fetch(
    `*[_type=="community"][0]{name,founded,activeChildren,location,"programCount":count(programs),"plannedFeaturesCount":count(akanimamy.plannedFeatures)}`,
  );
  console.log('Community:', community);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
