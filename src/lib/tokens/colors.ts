/**
 * Color tokens — 12-step Radix-style scale.
 * Each step has a dedicated use case. No arbitrary shades.
 *
 * 1-2  : app backgrounds
 * 3-5  : UI component backgrounds (default / hover / pressed)
 * 6-8  : borders (subtle / default / strong)
 * 9-10 : solid fills (subdued / hover)
 * 11-12: text (muted / high-contrast)
 */

export const sand = {
  1: '#FDFCFA',
  2: '#F9F7F3',
  3: '#F0EDE6',
  4: '#E9E4DA',
  5: '#DFD8CA',
  6: '#CCC4B3',
  7: '#B6AD98',
  8: '#978E7A',
  9: '#7D7463',
  10: '#635B4B',
  11: '#4A4338',
  12: '#1D1B16',
} as const;

export const sandDark = {
  1: '#0F0E0C',
  2: '#16140F',
  3: '#1D1B15',
  4: '#26231B',
  5: '#2E2B22',
  6: '#3A362B',
  7: '#4A4638',
  8: '#65604E',
  9: '#8C8673',
  10: '#A09985',
  11: '#C4BDA8',
  12: '#F5F0E4',
} as const;

/** Single accent — neutralized gold. Used on <3% of pixels. */
export const ore = {
  1: '#FEFCF7',
  2: '#FBF6E9',
  3: '#F5EBCE',
  4: '#EDDFB1',
  5: '#E2CE91',
  6: '#D3BB75',
  7: '#C0A55C',
  8: '#AA8E44',
  9: '#967A2E',
  10: '#826722',
  11: '#6C5418',
  12: '#3A2D09',
} as const;

export const semantic = {
  success: { 3: '#E8F1E6', 9: '#3B7C36', 11: '#1E4A1C' },
  warning: { 3: '#FBEDE0', 9: '#B35B1E', 11: '#5C2E0C' },
  error: { 3: '#FBE5E5', 9: '#C53030', 11: '#5C1717' },
  info: { 3: '#E5EEF7', 9: '#2B6CB0', 11: '#17365C' },
} as const;
