import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('home page renders correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'SceneSpeak' })).toBeVisible();
    await expect(page.getByText("Today's Progress")).toBeVisible();
  });

  test('navigation is accessible on mobile', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Check navigation items
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Scenes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats' })).toBeVisible();
  });

  test('scene cards are tappable on mobile', async ({ page }) => {
    await page.goto('/scenes');
    const firstCard = page.getByRole('button').filter({ hasText: 'Greetings' }).first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    await expect(page).toHaveURL(/\/dialogue/);
  });
});
