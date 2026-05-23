/**
 * Full-site screenshot run for the design audit.
 * Captures every key page at desktop (1440x900) + mobile (390x844),
 * full-page scroll, against the live Vercel deployment.
 *
 * Usage: pnpm exec node audit/capture.mjs
 */
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'screens');

const BASE = process.env.AUDIT_BASE_URL ?? 'https://ambalakely.vercel.app';

const ROUTES = [
  '/',
  '/rooms',
  '/rooms/superieure',
  '/rooms/confort',
  '/rooms/standard',
  '/dining',
  '/experiences',
  '/plan-your-trip',
  '/community',
  '/journal',
  '/about',
  '/faq',
];

const VIEWPORTS = [
  { name: 'desktop', config: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: 'mobile', config: { ...devices['iPhone 14'] } },
];

function slug(path) {
  return path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '_');
}

async function captureRoute(browser, route, vp) {
  const ctx = await browser.newContext({
    ...vp.config,
    locale: 'fr-FR',
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  try {
    const url = `${BASE}${route}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Settle any hero-reveal animation
    await page.waitForTimeout(800);
    const file = `${OUT}/${slug(route)}_${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${vp.name.padEnd(7)} ${route.padEnd(24)} → ${file.replace(OUT + '/', '')}`);
  } catch (err) {
    console.error(`✗ ${vp.name.padEnd(7)} ${route.padEnd(24)} → ${err.message}`);
  } finally {
    await ctx.close();
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  console.log(`Capturing ${ROUTES.length} routes × ${VIEWPORTS.length} viewports against ${BASE}`);
  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      await captureRoute(browser, route, vp);
    }
  }
  await browser.close();
  console.log(`\nDone. Screenshots in ${OUT}/`);
}

main().catch((err) => {
  console.error('Capture run failed:', err);
  process.exit(1);
});
