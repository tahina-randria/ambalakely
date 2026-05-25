/**
 * Typography tokens (reference only — runtime values live in globals.css
 * via CSS variables). Body is Satoshi (Indian Type Foundry, free for
 * commercial via Fontshare). Display is Fraunces (Google Fonts, opsz
 * axis). Minimum readable size: 14px. Body starts at 17px.
 */

export const fontFamily = {
  display: 'var(--font-fraunces), "Cormorant Garamond", Georgia, serif',
  body: 'Satoshi, system-ui, -apple-system, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, monospace',
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
} as const;

export const typeScale = {
  label: { size: '13px', lh: '16px', tracking: '0.08em', weight: 500 },
  meta: { size: '14px', lh: '20px', tracking: '0', weight: 400 },
  body: { size: '17px', lh: '26px', tracking: '0', weight: 400 },
  bodyLg: { size: '19px', lh: '30px', tracking: '-0.01em', weight: 400 },
  lead: { size: '22px', lh: '32px', tracking: '-0.01em', weight: 400 },
  h5: { size: '20px', lh: '26px', tracking: '-0.01em', weight: 500 },
  h4: { size: '24px', lh: '30px', tracking: '-0.02em', weight: 500 },
  h3: { size: '32px', lh: '38px', tracking: '-0.02em', weight: 500 },
  h2: { size: '44px', lh: '48px', tracking: '-0.03em', weight: 400 },
  h1: { size: '60px', lh: '62px', tracking: '-0.03em', weight: 400 },
  display: { size: '96px', lh: '96px', tracking: '-0.04em', weight: 300 },
  displayXl: { size: '128px', lh: '120px', tracking: '-0.045em', weight: 300 },
} as const;
