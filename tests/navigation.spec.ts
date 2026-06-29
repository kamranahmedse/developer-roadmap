import { test, expect } from '@playwright/test';

test('mobile navigation manages expanded state and closes with escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Menu' });
  const mobileNav = page.locator('#mobile-navigation');
  const closeButton = page.getByRole('button', { name: 'Close Menu' });

  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(mobileNav).toHaveAttribute('aria-hidden', 'true');

  await menuButton.click();

  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(mobileNav).toHaveAttribute('aria-hidden', 'false');
  await expect(closeButton).toBeFocused();
  await expect(page.locator('body')).toHaveClass(/overflow-hidden/);

  await page.keyboard.press('Escape');

  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(mobileNav).toHaveAttribute('aria-hidden', 'true');
  await expect(menuButton).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
});
