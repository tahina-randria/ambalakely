/**
 * Multilingual smoke test — captures key pages in FR / EN / NO at
 * desktop + mobile, against the live Vercel deployment.
 *
 * Usage: pnpm exec node audit/capture-i18n.mjs
 *
 * Output: audit/screens-i18n/{locale}_{page}_{viewport}.png
 */
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'screens-i18n');

const BASE = process.env.AUDIT_BASE_URL ?? 'https://ambalakely.vercel.app';

// Subset of routes — high-traffic + content-rich, enough to catch overflow
const PAGES = [
  { slug: 'home', path: '' },
  { slug: 'about', path: '/about' },
  { slug: 'dining', path: '/dining' },
  { slug: 'rooms', path: '/rooms' },
];

const LOCALES = [
  { code: 'fr', prefix: '', browserLocale: 'fr-FR' },
  { code: 'en', prefix: '/en', browserLocale: 'en-US' },
  { code: 'no', prefix: '/no', browserLocale: 'nb-NO' },
];

const VIEWPORTS = [
  { name: 'desktop', config: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: 'mobile', config: { ...devices['iPhone 14'] } },
];

async function captureRoute(browser, locale, page, vp) {
  const ctx = await browser.newContext({
    ...vp.config,
    locale: locale.browserLocale,
    reducedMotion: 'reduce',
  });
  const pageObj = await ctx.newPage();
  try {
    const url = `${BASE}${locale.prefix}${page.path || '/'}`;
    await pageObj.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await pageObj.waitForTimeout(800);
    const file = `${OUT}/${locale.code}_${page.slug}_${vp.name}.png`;
    await pageObj.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${locale.code} · ${vp.name.padEnd(7)} ${page.slug.padEnd(8)} → ${file.replace(OUT + '/', '')}`);
  } catch (err) {
    console.error(`✗ ${locale.code} · ${vp.name.padEnd(7)} ${page.slug.padEnd(8)} → ${err.message}`);
  } finally {
    await ctx.close();
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const total = LOCALES.length * PAGES.length * VIEWPORTS.length;
  console.log(`Capturing ${total} shots against ${BASE}\n`);
  for (const vp of VIEWPORTS) {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        await captureRoute(browser, locale, page, vp);
      }
    }
  }
  await browser.close();
  console.log(`\nDone. Screenshots in ${OUT}/`);
}

main().catch((err) => {
  console.error('Capture run failed:', err);
  process.exit(1);
});
