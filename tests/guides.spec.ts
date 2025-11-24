import { expect, test } from '@playwright/test';

test(`guides`, async ({ page }) => {
  await page.goto('/guides');

  await expect(page).toHaveScreenshot({ fullPage: true });
});
