// @ts-check
const { test, expect } = require('@playwright/test');

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1024, height: 800 };

const PAGES = [
  {
    file: 'index.html',
    links: [
      { text: 'Chatbots', href: '#how' },
      { text: 'Voice Agents', href: '#voice' },
      { text: 'Live demo', href: '#demo' },
      { text: 'Industries', href: '#industries' },
      { text: 'Pricing', href: '#pricing' },
      { text: 'FAQ', href: '#faq' },
    ],
  },
  {
    file: 'clinics.html',
    links: [
      { text: 'Chatbots', href: '/#how' },
      { text: 'Voice Agents', href: '/#voice' },
      { text: 'Pricing', href: '/#pricing' },
      { text: 'Industries', href: '/#industries' },
    ],
  },
  {
    file: 'restaurants.html',
    links: [
      { text: 'Chatbots', href: '/#how' },
      { text: 'Voice Agents', href: '/#voice' },
      { text: 'Pricing', href: '/#pricing' },
      { text: 'Industries', href: '/#industries' },
    ],
  },
  {
    file: 'salons.html',
    links: [
      { text: 'Chatbots', href: '/#how' },
      { text: 'Voice Agents', href: '/#voice' },
      { text: 'Pricing', href: '/#pricing' },
      { text: 'Industries', href: '/#industries' },
    ],
  },
];

for (const { file, links } of PAGES) {
  test.describe(`mobile nav — ${file}`, () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('toggle opens and closes, updating aria-expanded and inert', async ({ page }) => {
      await page.goto(`/${file}`);
      const toggle = page.locator('#aiq-nav-toggle');
      const panel = page.locator('#aiq-mobile-nav');

      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toHaveAttribute('inert', '');
      await expect(panel).toHaveClass(/aiq-shut/);

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).not.toHaveAttribute('inert', '');
      await expect(panel).not.toHaveClass(/aiq-shut/);

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toHaveAttribute('inert', '');
      await expect(panel).toHaveClass(/aiq-shut/);
    });

    test('panel contains the expected links', async ({ page }) => {
      await page.goto(`/${file}`);
      await page.locator('#aiq-nav-toggle').click();

      const panelLinks = page.locator('#aiq-mobile-nav a');
      await expect(panelLinks).toHaveCount(links.length);

      for (const { text, href } of links) {
        const link = page.locator('#aiq-mobile-nav a', { hasText: text });
        await expect(link).toHaveAttribute('href', href);
      }
    });

    test('clicking a link closes the panel', async ({ page }) => {
      await page.goto(`/${file}`);
      const toggle = page.locator('#aiq-nav-toggle');
      const panel = page.locator('#aiq-mobile-nav');

      await toggle.click();
      await expect(panel).not.toHaveClass(/aiq-shut/);

      await page.locator('#aiq-mobile-nav a').first().click();

      await expect(panel).toHaveClass(/aiq-shut/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    test('Escape closes the panel and returns focus to the toggle', async ({ page }) => {
      await page.goto(`/${file}`);
      const toggle = page.locator('#aiq-nav-toggle');
      const panel = page.locator('#aiq-mobile-nav');

      await toggle.click();
      await expect(panel).not.toHaveClass(/aiq-shut/);

      await page.keyboard.press('Escape');

      await expect(panel).toHaveClass(/aiq-shut/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
    });

    test('clicking outside the panel closes it without returning focus', async ({ page }) => {
      await page.goto(`/${file}`);
      const toggle = page.locator('#aiq-nav-toggle');
      const panel = page.locator('#aiq-mobile-nav');

      await toggle.click();
      await expect(panel).not.toHaveClass(/aiq-shut/);

      // Click somewhere clearly outside both the toggle and the panel.
      await page.mouse.click(10, 10);

      await expect(panel).toHaveClass(/aiq-shut/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).not.toBeFocused();
    });

    test('resizing past the md breakpoint force-closes an open panel', async ({ page }) => {
      await page.goto(`/${file}`);
      const toggle = page.locator('#aiq-nav-toggle');
      const panel = page.locator('#aiq-mobile-nav');

      await toggle.click();
      await expect(panel).not.toHaveClass(/aiq-shut/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');

      await page.setViewportSize(DESKTOP_VIEWPORT);
      // The matchMedia 'change' listener fires asynchronously; expect() polls/retries.
      await expect(panel).toHaveClass(/aiq-shut/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });
}
