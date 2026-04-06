import { test, expect } from '@playwright/test';

test.describe('Learning Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scenes/greetings/dialogue');
  });

  test('displays dialogue with speakers', async ({ page }) => {
    await expect(page.getByText('Greetings')).toBeVisible();
    await expect(page.getByText('Meeting someone for the first time')).toBeVisible();
    await expect(page.getByText("Hello! I'm Alex. What's your name?")).toBeVisible();
  });

  test('has audio play buttons on dialogue lines', async ({ page }) => {
    const playButtons = page.locator('button[aria-label="Play"]').first();
    await expect(playButtons).toBeVisible();
  });

  test('can navigate to sentences page', async ({ page }) => {
    await page.getByRole('button', { name: /Start Learning Sentences/i }).click();
    await expect(page).toHaveURL(/\/scenes\/greetings\/sentences/);
    await expect(page.getByText(/Nice to meet you|How are you doing/)).toBeVisible();
  });

  test('sentences page has recording functionality', async ({ page }) => {
    await page.goto('/scenes/greetings/sentences');
    await expect(page.getByText('Hold to record')).toBeVisible();
    await expect(page.locator('button').filter({ has: page.locator('svg') }).first()).toBeVisible();
  });
});
