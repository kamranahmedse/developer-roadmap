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

function populatePageAds({
  pageUrl,
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

  const urlPart = pageUrl.replace('https://roadmap.sh/', '').replace(/\?.+?$/, '');

  const parentDir = urlPart.startsWith('best-practices/') ? 'best-practices' : 'roadmaps';
  const pageId = urlPart.replace(`${parentDir}/`, '');

  const pageFilePath = path.join(__dirname, `../src/data/${parentDir}`, `${pageId}/${pageId}.md`);

  if (!fs.existsSync(pageFilePath)) {
    console.error(`Page file not found: ${pageFilePath}`);
    process.exit(1);
  }

  console.log(`Updating page: ${urlPart}`);
  const pageFileContent = fs.readFileSync(pageFilePath, 'utf8');

  const frontMatterRegex = /---\n([\s\S]*?)\n---/;

  const existingFrontmatter = pageFileContent.match(frontMatterRegex)[1];
  const contentWithoutFrontmatter = pageFileContent.replace(frontMatterRegex, ``).trim();

  let frontmatterObj = yaml.load(existingFrontmatter);
  delete frontmatterObj.sponsor;

  if (shouldShowAd) {
    const frontmatterValues = Object.entries(frontmatterObj);
    const roadmapLabel = frontmatterObj.briefTitle;

    // Insert sponsor data at 10 index i.e. after
    // roadmap dimensions in the frontmatter
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

  fs.writeFileSync(pageFilePath, newContent, 'utf8');
}

fetch(sheetUrl)
  .then((res) => res.json())
  .then((rawData) => {
    const rows = rawData.values;

    rows.map((row) => {
      // prettier-ignore
      const [
        pageUrl,
        company,
        redirectUrl,
        imageUrl,
        adTitle,
        adDescription,
        startDate,
        endDate,
        isActive,
      ] = row;

      populatePageAds({
        pageUrl,
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
