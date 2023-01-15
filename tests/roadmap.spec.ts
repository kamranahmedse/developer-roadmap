import path from 'node:path';
import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const roadmapIds = fs.readdirSync(path.join(process.cwd(), 'src/roadmaps'));

for (const roadmapId of roadmapIds) {
  test(`roadmap ${roadmapId}`, async ({ page }) => {
    await page.goto(`/${roadmapId}`);

    await expect(page).toHaveScreenshot({ fullPage: true });
  });
}
