import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';

const OUT = '/Users/tahina/Documents/Mita/ambalakely/audit/screens-i18n';
const BASE = 'https://ambalakely.vercel.app';
const PAGES = [
  { slug: 'experiences', path: '/experiences' },
  { slug: 'plan', path: '/plan-your-trip' },
  { slug: 'community', path: '/community' },
  { slug: 'faq', path: '/faq' },
];
const VPS = [
  { name: 'desktop', config: { viewport: { width: 1440, height: 900 } } },
  { name: 'mobile', config: { ...devices['iPhone 14'] } },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const vp of VPS) {
  for (const p of PAGES) {
    const ctx = await browser.newContext({ ...vp.config, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/fr_${p.slug}_${vp.name}.png`, fullPage: true });
      console.log(`✓ fr ${vp.name} ${p.slug}`);
    } catch (e) { console.error(e.message); }
    await ctx.close();
  }
}
await browser.close();
