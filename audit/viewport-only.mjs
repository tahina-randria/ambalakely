import { chromium, devices } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 14'], reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto('https://ambalakely.vercel.app', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
// Top viewport (where hero is)
await page.screenshot({ path: '/tmp/viewport_top.png', fullPage: false });
// Scroll midway and screenshot
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/viewport_scrolled.png', fullPage: false });
await browser.close();
console.log('saved');
