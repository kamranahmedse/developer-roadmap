// This is a development script executed in the build step of pages
const fs = require('fs');
const path = require('path');
const guides = require('../storage/guides');
const roadmaps = require('../storage/roadmaps');
const { getPageRoutes, getGuideRoutes } = require('./path-map');

const DOMAIN = 'https://roadmap.sh';
const PAGES_DIR = path.join(__dirname, '../pages');
const STORAGE_PATH = path.join(__dirname, '../storage');
const SITEMAP_PATH = 'static/sitemap.xml';

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `${xmlHeader}
${nodes}
</urlset>`;

const getSlugPriority = (pageSlug) => {
  if (pageSlug === '/') {
    return '1.0';
  }

  const slugPriorities = [
    ['/roadmaps', '/guides'],      // 1.0
    ['/signup'],                   // 0.9
    ['/about'],                    // 0.8
  ];

  const foundIndex = slugPriorities.findIndex(
    routes => routes.some(route => pageSlug.startsWith(route)),
  );

  if (foundIndex !== -1) {
    return parseFloat((10 - foundIndex) / 10)
      .toFixed(1);
  }

  return 0.5;
};

function generateNode({
  slug,
  basePath,
  fileName,
  priority = null,
  date = null,
  frequency = 'monthly',
}) {
  const pagePath = path.join(basePath, fileName);
  let pageStats = {};
  try {
    pageStats = fs.lstatSync(pagePath);
  } catch (e) {
    console.log(`File not found: ${pagePath}`);
    pageStats = { mtime: (new Date()) }
  }

  return `<url>
              <loc>${DOMAIN}${slug}</loc>
              <changefreq>${ frequency }</changefreq>
              <lastmod>${date || pageStats.mtime.toISOString()}</lastmod>
              <priority>${ priority || getSlugPriority(slug) }</priority>
          </url>`;
}

function generateSiteMap() {
  const pageRoutes = getPageRoutes();
  const pageSlugs = Object.keys(pageRoutes)
    .filter(route => ![
      '/privacy',
      '/terms',
    ].includes(route));

  const pagesChunk = pageSlugs.map(pageSlug => {
    return generateNode({
      basePath: PAGES_DIR,
      fileName: `${pageRoutes[pageSlug].page}.js`,
      slug: pageSlug,
    });
  });

  // Chunks for each of the guides
  const guideRoutes = getGuideRoutes();
  const guideSlugs = Object.keys(guideRoutes);
  const guidesChunk = guideSlugs.map(guideSlug => {
    const foundGuide = guides.find(guide => guide.url === guideSlug) || {};
    return generateNode({
      basePath: STORAGE_PATH,
      fileName: `${guideSlug}.md`,
      slug: guideSlug,
      date: foundGuide.updatedAt,
      priority: '1.0',
    });
  });

  // Chunks for each of the roadmaps
  const roadmapsChunk = roadmaps.reduce((roadmapsNodes, roadmap) => {
    return [
      ...roadmapsNodes,
      generateNode({
        basePath: STORAGE_PATH,
        fileName: roadmap.path,
        slug: roadmap.url,
        priority: '1.0',
      }),
      ...Object
        .values(roadmap.sidebar || {})
        .reduce((pageNodes, menuPages) => {
          return [
            ...pageNodes,
            ...menuPages.map(menuPage => {
              return generateNode({
                basePath: STORAGE_PATH,
                fileName: menuPage.path,
                slug: menuPage.url,
                priority: menuPage.path.includes('_others') ? '0.5' : '1.0',
              })
            })
          ];
        }, [])
    ]
  }, []);

  const nodes = [
    ...roadmapsChunk,
    ...guidesChunk,
    ...pagesChunk,
  ];

  const sitemap = `${xmlUrlWrapper(nodes.join('\n'))}`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(`sitemap.xml with ${nodes.length} entries was written to ${SITEMAP_PATH}`);
}

generateSiteMap();
