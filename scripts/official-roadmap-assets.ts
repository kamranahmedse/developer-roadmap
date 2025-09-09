import playwright from 'playwright';
import type { OfficialRoadmapDocument } from '../src/queries/official-roadmap';

async function listAllRoadmaps(): Promise<OfficialRoadmapDocument[]> {
  const response = await fetch(
    'https://roadmap.sh/api/v1-list-official-roadmaps',
  );
  const mainRoadmaps = await response.json();
  const beginnerResponse = await fetch(
    'https://roadmap.sh/api/v1-list-official-beginner-roadmaps',
  );
  const beginnerRoadmaps = await beginnerResponse.json();
  const data = [...mainRoadmaps, ...beginnerRoadmaps];
  return data;
}

// Usage: tsx ./scripts/official-roadmap-assets.ts <roadmapSlug>

const roadmapSlug = process.argv?.[2];

const allRoadmaps = await listAllRoadmaps();
const allowedRoadmapSlugs = allRoadmaps.map((roadmap) => roadmap.slug);

const roadmapSlugs = roadmapSlug ? [roadmapSlug] : allowedRoadmapSlugs;

console.log(`Launching chromium`);
const browser = await playwright.chromium.launch();

for (const roadmapSlug of roadmapSlugs) {
  const roadmap = allRoadmaps.find((roadmap) => roadmap.slug === roadmapSlug);
  if (!roadmap) {
    console.error(`Roadmap ${roadmapSlug} not found`);
    continue;
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  const pageUrl = `http://roadmap.sh/${roadmapSlug}/svg`;
  console.log(`Opening page ${pageUrl}`);
  await page.goto(pageUrl);
  await page.waitForSelector('#resource-svg-wrap');
  await page.waitForTimeout(5000);

  console.log(`Generating PDF ${pageUrl}`);
  await page.pdf({
    path: `./public/pdfs/roadmaps/${roadmapSlug}.pdf`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    height: roadmap?.dimensions?.height || 2000,
    width: roadmap?.dimensions?.width || 968,
  });

  console.log(`Generating png ${pageUrl}`);
  await page.locator('#resource-svg-wrap>svg').screenshot({
    path: `./public/roadmaps/${roadmapSlug}.png`,
    type: 'png',
    scale: 'device',
  });
}

console.log(`Closing browser`);
await browser.close();
