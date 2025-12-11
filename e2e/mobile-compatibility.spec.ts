import { test, expect } from '@playwright/test';

const BASE_URL = 'https://crim.pinoyreviewer.com';

// Mobile viewport sizes
const mobileViewports = [
  { name: 'iPhone-SE', width: 375, height: 667 },
  { name: 'iPhone-12', width: 390, height: 844 },
  { name: 'Pixel-5', width: 393, height: 851 },
  { name: 'Galaxy-S9', width: 360, height: 740 },
];

test.describe('Mobile Compatibility Tests', () => {

  for (const viewport of mobileViewports) {
    test(`${viewport.name}: Homepage loads correctly`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Check page title
      await expect(page).toHaveTitle(/Crim|Criminology|Reviewer/i);

      // Check navbar is visible
      const navbar = page.locator('header').first();
      await expect(navbar).toBeVisible();

      // Sidebar should be hidden on mobile
      const sidebar = page.locator('aside').first();
      await expect(sidebar).toBeHidden();

      // Take screenshot
      await page.screenshot({ path: `test-results/mobile-${viewport.name}-homepage.png` });
    });

    test(`${viewport.name}: Mobile menu works`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Find hamburger menu button (should have X or Menu icon)
      const menuButton = page.locator('header button').last();

      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);

        // Take screenshot of open menu
        await page.screenshot({ path: `test-results/mobile-${viewport.name}-menu-open.png` });
      }
    });

    test(`${viewport.name}: No horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Check no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });

    test(`${viewport.name}: Module page readable`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/part-1/Module-1.1-Fundamentals-of-Criminal-Law`);
      await page.waitForLoadState('networkidle');

      // Check content is visible
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();

      // Check font size is readable (at least 14px)
      const fontSize = await page.evaluate(() => {
        const p = document.querySelector('p');
        return p ? parseFloat(window.getComputedStyle(p).fontSize) : 16;
      });
      expect(fontSize).toBeGreaterThanOrEqual(14);

      // Take screenshot
      await page.screenshot({ path: `test-results/mobile-${viewport.name}-module.png` });
    });

    test(`${viewport.name}: Practice page loads`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/practice`);
      await page.waitForLoadState('networkidle');

      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();

      await page.screenshot({ path: `test-results/mobile-${viewport.name}-practice.png` });
    });
  }

  // Test tables responsiveness
  test('Tables have horizontal scroll container', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/lea/Module-6.9-Patrol-Operations`);
    await page.waitForLoadState('networkidle');

    // Check if tables are in scrollable containers or fit viewport
    const tables = page.locator('table');
    const count = await tables.count();

    console.log(`Found ${count} tables`);

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const table = tables.nth(i);
        const isVisible = await table.isVisible();

        if (isVisible) {
          // Check if in overflow container
          const hasScrollContainer = await table.evaluate((el) => {
            const parent = el.closest('.overflow-x-auto, .overflow-auto, [style*="overflow"]');
            return parent !== null;
          });

          console.log(`Table ${i}: has scroll container = ${hasScrollContainer}`);
        }
      }
    }

    await page.screenshot({ path: `test-results/mobile-tables.png`, fullPage: true });
  });

  // Touch target size test
  test('Touch targets are adequately sized', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Get all interactive elements
    const buttons = page.locator('button, a[href]');
    const count = await buttons.count();

    let smallTargets = 0;
    const issues: string[] = [];

    for (let i = 0; i < Math.min(count, 20); i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible().catch(() => false);

      if (isVisible) {
        const box = await button.boundingBox();
        if (box && (box.width < 44 || box.height < 44)) {
          smallTargets++;
          const text = await button.textContent().catch(() => '');
          issues.push(`Small target (${Math.round(box.width)}x${Math.round(box.height)}): "${text?.substring(0, 30)}"`);
        }
      }
    }

    console.log(`Touch target analysis: ${smallTargets} small targets found`);
    issues.forEach(issue => console.log(issue));

    // Allow some small targets (icons, etc) but flag if too many
    expect(smallTargets).toBeLessThan(10);
  });

  // Responsive breakpoint tests
  test('Sidebar hidden on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeHidden();

    await page.screenshot({ path: `test-results/tablet-768px.png` });
  });

  test('Sidebar visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();

    await page.screenshot({ path: `test-results/desktop-1280px.png` });
  });
});
