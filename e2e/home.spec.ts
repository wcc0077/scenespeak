import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays app title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SceneSpeak' })).toBeVisible();
    await expect(page.getByText('Learn English through real scenes')).toBeVisible();
  });

  test('shows progress section', async ({ page }) => {
    await expect(page.getByText("Today's Progress")).toBeVisible();
    await expect(page.getByText(/\d+%/)).toBeVisible();
  });

  test('shows recommended scene', async ({ page }) => {
    await expect(page.getByText('Recommended for You')).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: /Greetings|Small Talk|Airport/ })).toBeVisible();
  });

  test('has navigation buttons', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Browse Scenes|Scenes/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Statistics|Stats/ })).toBeVisible();
  });

  test('can navigate to scene selection', async ({ page }) => {
    await page.getByRole('link', { name: /Browse Scenes|Scenes/ }).first().click();
    await expect(page).toHaveURL(/\/scenes/);
    await expect(page.getByText('Choose a Scene')).toBeVisible();
  });
});
