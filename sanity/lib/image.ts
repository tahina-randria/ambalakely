import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: Image | null | undefined) {
  if (!source?.asset?._ref) return null;
  return imageBuilder.image(source).auto('format').fit('max');
}

export function urlForImageSrc(
  source: Image | null | undefined,
  width: number,
): string | null {
  const builder = urlForImage(source);
  if (!builder) return null;
  return builder.width(width).url();
}
