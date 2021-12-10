// This is a development script executed in the build step of pages
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const guides = require('../content/guides.json');
const roadmaps = require('../content/roadmaps.json');

const DOMAIN = 'https://roadmap.sh';
const PAGES_DIR = path.join(__dirname, '../pages');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

const PAGES_PATH = path.join(__dirname, '../pages');
const ROADMAPS_PATH = path.join(__dirname, '../content/roadmaps');
const GUIDES_PATH = path.join(__dirname, '../content/guides');

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = (nodes) => `${xmlHeader}
${nodes}
</urlset>`;

function getSlugPriority(pageSlug) {
  if (pageSlug === '/') {
    return '1.0';
  }

  const slugPriorities = [
    ['/roadmaps', '/guides', '/watch', '/podcasts'], // 1.0
    ['/signup'], // 0.9
    ['/about'], // 0.8
  ];

  const foundIndex = slugPriorities.findIndex((routes) =>
    routes.some((route) => pageSlug.startsWith(route))
  );

  if (foundIndex !== -1) {
    return parseFloat((10 - foundIndex) / 10).toFixed(1);
  }

  return 0.5;
}

function getPageRoutes() {
  const files = glob.sync(`${PAGES_PATH}/**/*.tsx`, {
    ignore: [
      '**/_*.tsx', // private non-page files e.g. _document.js
      '**/[[]*[]].tsx', // Ignore dynamic pages i.e. `page/[something].js` files
      '**/[[]*[]]/*.tsx', // Ignore files inside dynamic pages i.e. `[something]/abc.js`
      '**/components/*.tsx', // Ignore the component files
    ],
  });

  const pageRoutes = {};
  files.forEach((file) => {
    const pageName = file.replace(PAGES_PATH, '').replace('.tsx', '');
    const pagePath = pageName.replace('/index', '') || '/';

    pageRoutes[pagePath] = { page: `${pageName}` };
  });

  return pageRoutes;
}

function generateNode(nodeProps) {
  const {
    slug,
    basePath,
    fileName,
    priority = null,
    date = null,
    frequency = 'monthly',
  } = nodeProps;

  const pagePath = path.join(basePath, fileName);
  let pageStats = {};
  try {
    pageStats = fs.lstatSync(pagePath);
  } catch (e) {
    console.log(`File not found: ${pagePath}`);
    pageStats = { mtime: new Date() };
  }

  return `<url>
              <loc>${DOMAIN}${slug}</loc>
              <changefreq>${frequency}</changefreq>
              <lastmod>${date || pageStats.mtime.toISOString()}</lastmod>
              <priority>${priority || getSlugPriority(slug)}</priority>
          </url>`;
}

function generateSiteMap() {
  const pageRoutes = getPageRoutes();
  const pageSlugs = Object.keys(pageRoutes).filter(
    (route) => !['/privacy', '/terms'].includes(route)
  );

  const pagesChunk = pageSlugs.map((pageSlug) => {
    return generateNode({
      basePath: PAGES_DIR,
      fileName: `${pageRoutes[pageSlug].page}.tsx`,
      slug: pageSlug,
    });
  });

  const guidesChunk = guides.map((guide) => {
    return generateNode({
      basePath: GUIDES_PATH,
      fileName: `${guide.id}.md`,
      slug: `/guides/${guide.id}`,
      date: guide.updatedAt,
      priority: '1.0',
    });
  });

  const roadmapsChunk = roadmaps.map((roadmap, roadmapCounter) => {
    return generateNode({
      basePath: ROADMAPS_PATH,
      fileName: roadmap.metaPath.replace('/roadmaps', ''),
      slug: `/${roadmap.id}`,
      date: roadmap.updatedAt,
      priority: '1.0',
    });
  });

  const nodes = [...roadmapsChunk, ...guidesChunk, ...pagesChunk];

  const sitemap = `${xmlUrlWrapper(nodes.join('\n'))}`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(
    `sitemap.xml with ${nodes.length} entries was written to ${SITEMAP_PATH}`
  );
}

generateSiteMap();
