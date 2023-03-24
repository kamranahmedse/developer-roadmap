import { expect, test } from '@playwright/test';

test(`videos`, async ({ page }) => {
  await page.goto('/videos');

  await expect(page).toHaveScreenshot({ fullPage: true });
});
