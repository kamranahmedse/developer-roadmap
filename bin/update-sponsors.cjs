const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const apiKey = process.env.SPONSOR_SHEET_API_KEY;
const sheetId = process.env.SPONSOR_SHEET_ID;

if (!apiKey || !sheetId) {
  console.error('Missing API key or sheet ID');
  process.exit(1);
}

const sheetRange = 'A3:I1001';
const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

function populateRoadmapAds({
  roadmapUrl,
  company,
  redirectUrl,
  imageUrl,
  adTitle,
  adDescription,
  startDate,
  endDate,
  isActive,
}) {
  const isConfiguredActive = isActive.toLowerCase() === 'yes';

  const currentDate = new Date();
  const isDateInRange = currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
  const shouldShowAd = isConfiguredActive && isDateInRange;

  // get id from the roadmap URL
  const roadmapId = roadmapUrl
    .split('/')
    .pop()
    .replace(/\?.+?$/, '');

  const roadmapFilePath = path.join(__dirname, '../src/data/roadmaps', `${roadmapId}/${roadmapId}.md`);

  if (!fs.existsSync(roadmapFilePath)) {
    console.error(`Roadmap file not found: ${roadmapFilePath}`);
    process.exit(1);
  }

  console.log(`Updating roadmap: ${roadmapId}`);
  const roadmapFileContent = fs.readFileSync(roadmapFilePath, 'utf8');

  const frontMatterRegex = /---\n([\s\S]*?)\n---/;

  const existingFrontmatter = roadmapFileContent.match(frontMatterRegex)[1];
  const contentWithoutFrontmatter = roadmapFileContent.replace(frontMatterRegex, ``).trim();

  let frontmatterObj = yaml.load(existingFrontmatter);
  delete frontmatterObj.sponsor;

  if (shouldShowAd) {
    const frontmatterValues = Object.entries(frontmatterObj);
    const roadmapLabel = frontmatterObj.briefTitle;

    // Insert sponsor data at 10 index i.e. after
    // roadmap dimensions in the fronmatter
    frontmatterValues.splice(10, 0, [
      'sponsor',
      {
        url: redirectUrl,
        title: adTitle,
        imageUrl,
        description: adDescription,
        event: {
          category: 'SponsorClick',
          action: `${company} Redirect`,
          label: `${roadmapLabel} / ${company} Link`,
        },
      },
    ]);

    frontmatterObj = Object.fromEntries(frontmatterValues);
  }

  const newFrontmatter = yaml.dump(frontmatterObj, { lineWidth: 10000, forceQuotes: true, quotingType: '"' });
  const newContent = `---\n${newFrontmatter}---\n\n${contentWithoutFrontmatter}`;

  fs.writeFileSync(roadmapFilePath, newContent, 'utf8');
}

fetch(sheetUrl)
  .then((res) => res.json())
  .then((rawData) => {
    const rows = rawData.values;

    rows.map((row) => {
      // prettier-ignore
      const [
        roadmapUrl,
        company,
        redirectUrl,
        imageUrl,
        adTitle,
        adDescription,
        startDate,
        endDate,
        isActive,
      ] = row;

      populateRoadmapAds({
        roadmapUrl,
        company,
        redirectUrl,
        imageUrl,
        adTitle,
        adDescription,
        startDate,
        endDate,
        isActive,
      });
    });
  });
