import { test, expect } from '@playwright/test';

test.describe('Scene Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scenes');
  });

  test('displays category tabs', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Social' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Travel' })).toBeVisible();
  });

  test('shows social scenes by default', async ({ page }) => {
    await expect(page.getByText('Greetings')).toBeVisible();
    await expect(page.getByText('Small Talk')).toBeVisible();
  });

  test('can switch to travel category', async ({ page }) => {
    await page.getByRole('button', { name: 'Travel' }).click();
    await expect(page.getByText('Airport Check-in')).toBeVisible();
    await expect(page.getByText('Hotel Check-in')).toBeVisible();
  });

  test('can navigate to dialogue page', async ({ page }) => {
    await page.getByText('Greetings').first().click();
    await expect(page).toHaveURL(/\/scenes\/greetings\/dialogue/);
    await expect(page.getByText('Meeting someone for the first time')).toBeVisible();
  });
});
