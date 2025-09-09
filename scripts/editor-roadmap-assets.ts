import playwright from 'playwright';

// Usage: tsx ./scripts/editor-roadmap-dirs.ts <roadmapId>

const roadmapId = process.argv[2];

if (!roadmapId) {
  console.error('Roadmap Id is required');
  process.exit(1);
}

// Fetch roadmap data from API
const apiUrl = `https://roadmap.sh/api/v1-official-roadmap/${roadmapId}`;
console.log(`Fetching roadmap data from ${apiUrl}`);

let roadmapData: any;
try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  roadmapData = await response.json();
} catch (error) {
  console.error(`Failed to fetch roadmap data: ${error}`);
  process.exit(1);
}

// Check if dimensions exist in the API response
if (!roadmapData.dimensions) {
  console.error('Invalid roadmap data: missing dimensions');
  process.exit(1);
}

console.log(`Launching chromium`);
const browser = await playwright.chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const pageUrl = `http://localhost:3000/${roadmapId}/svg`;
console.log(`Opening page ${pageUrl}`);
await page.goto(pageUrl);
await page.waitForSelector('#resource-svg-wrap');
await page.waitForTimeout(5000);
console.log(`Generating PDF ${pageUrl}`);
await page.pdf({
  path: `./public/pdfs/roadmaps/${roadmapId}.pdf`,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  height: roadmapData.dimensions?.height || 2000,
  width: roadmapData.dimensions?.width || 968,
});

// @todo generate png from the pdf
console.log(`Generating png ${pageUrl}`);
await page.locator('#resource-svg-wrap>svg').screenshot({
  path: `./public/roadmaps/${roadmapId}.png`,
  type: 'png',
  scale: 'device',
});

await browser.close();
