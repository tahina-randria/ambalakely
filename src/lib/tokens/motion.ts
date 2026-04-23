/**
 * Motion tokens — disciplined durations & easings.
 * No spring. No bounce. No elastic.
 */

export const duration = {
  instant: 0,
  fast: 0.12,
  base: 0.2,
  slow: 0.32,
  slower: 0.56,
  hero: 0.88,
} as const;

export const ease = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.3, 0, 0, 1] as const,
  entrance: [0, 0, 0, 1] as const,
  exit: [0.3, 0, 1, 1] as const,
} as const;

/** GSAP ease strings (for gsap.to/from) */
export const gsapEase = {
  standard: 'power3.out',
  emphasized: 'expo.out',
  entrance: 'power4.out',
  exit: 'power2.in',
} as const;
