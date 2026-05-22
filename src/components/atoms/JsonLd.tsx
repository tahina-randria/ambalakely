import { fetchHotel, fetchReviews } from '@/sanity/lib/fetch';

/**
 * JSON-LD structured data for Google rich results.
 * - Hotel schema with rooms, amenities, geo, contact
 * - Aggregated reviews (note moyenne calculee)
 *
 * Place dans <head> via dangerouslySetInnerHTML (best practice Next 15).
 * Data: Sanity (with .ts fallback via fetchHotel/fetchReviews).
 */
export async function HotelJsonLd() {
  const [HOTEL, reviews] = await Promise.all([fetchHotel(), fetchReviews()]);

  const aggregateRating =
    HOTEL.rating.value && HOTEL.rating.count
      ? {
          '@type': 'AggregateRating',
          ratingValue: HOTEL.rating.value,
          reviewCount: String(HOTEL.rating.count),
          bestRating: '5',
          worstRating: '1',
        }
      : undefined;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${HOTEL.url}/#hotel`,
    name: HOTEL.name,
    description: HOTEL.description,
    url: HOTEL.url,
    telephone: HOTEL.phone,
    email: HOTEL.email,
    image: HOTEL.images.hero,
    priceRange: HOTEL.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOTEL.address.street,
      addressLocality: HOTEL.address.locality,
      addressRegion: HOTEL.address.region,
      postalCode: HOTEL.address.postalCode,
      addressCountry: HOTEL.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL.geo.lat,
      longitude: HOTEL.geo.lng,
    },
    numberOfRooms: HOTEL.rooms,
    amenityFeature: HOTEL.amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    availableLanguage: HOTEL.languages,
    sameAs: [HOTEL.socials.instagram, HOTEL.socials.facebook],
    review: reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.quote,
      publisher: { '@type': 'Organization', name: r.source },
    })),
  };
  if (aggregateRating) data.aggregateRating = aggregateRating;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Restaurant schema for /dining page.
 */
export async function RestaurantJsonLd() {
  const HOTEL = await fetchHotel();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${HOTEL.url}/dining/#restaurant`,
    name: 'Toko Telo',
    description:
      'A small kitchen between Madagascar and Norway. One set menu each evening, mostly from the garden.',
    url: `${HOTEL.url}/dining`,
    telephone: HOTEL.phone,
    image: HOTEL.images.hero,
    servesCuisine: ['Malagasy', 'Norwegian', 'French'],
    priceRange: '$$',
    acceptsReservations: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOTEL.address.street,
      addressLocality: HOTEL.address.locality,
      addressRegion: HOTEL.address.region,
      postalCode: HOTEL.address.postalCode,
      addressCountry: HOTEL.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL.geo.lat,
      longitude: HOTEL.geo.lng,
    },
    openingHours: 'Mo-Su 19:00-21:00',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumb schema for detail pages.
 */
export async function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const HOTEL = await fetchHotel();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${HOTEL.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
