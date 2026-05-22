/**
 * Shared formatters. Single source of truth for prices, etc.
 *
 * MGA prices are formatted French-style with non-breaking spaces
 * so groups never wrap mid-number ("255 000" stays together).
 */

const NBSP = ' ';

export function formatMga(n: number): string {
  return n.toLocaleString('fr-FR').replace(/\s/g, NBSP);
}
