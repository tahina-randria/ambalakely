import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';

const OUT = '/Users/tahina/Documents/Mita/ambalakely/audit/screens-i18n';
const BASE = 'https://ambalakely.vercel.app';
const PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'rooms', path: '/rooms' },
  { slug: 'experiences', path: '/experiences' },
  { slug: 'plan', path: '/plan-your-trip' },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ...devices['iPad Pro 11'],
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
for (const p of PAGES) {
  await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/tablet_${p.slug}.png`, fullPage: true });
  console.log(`✓ tablet ${p.slug}`);
}
await browser.close();
