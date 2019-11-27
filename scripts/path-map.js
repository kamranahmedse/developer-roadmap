const path = require('path');
const glob = require('glob');
const fs = require('fs');

const guides = require('../storage/guides.json');

const PAGES_PATH = path.join(__dirname, '../pages');
const ROADMAPS_PATH =  path.join(__dirname, '../storage/roadmaps');

/**
 * Generate the page routes from the page files inside `/pages`
 * directory. Gives the format understood by next
 * {
 *   '/slug': { page: '/path/to-file' }
 * }
 */
const getPageRoutes = () => {
  const files = glob.sync(`${PAGES_PATH}/**/*.js`, {
    ignore: [
      '**/_*.js',        // private non-page files e.g. _document.js
      '**/[[]*[]].js',   // Ignore dynamic pages i.e. `page/[something].js` files
      '**/[[]*[]]/*.js', // Ignore files inside dynamic pages i.e. `[something]/abc.js`
    ],
  });

  const pageRoutes = {};
  files.forEach(file => {
    const pageName = file.replace(PAGES_PATH, '').replace('.js', '');
    const pagePath = pageName.replace('/index', '') || '/';

    pageRoutes[pagePath] = { page: `${pageName}` }
  });

  return pageRoutes;
};

/**
 * Generates routes for guide pages
 * @returns {*}
 */
const getGuideRoutes = () => {
  return guides.reduce((acc, guide) => {
    const [, , slug] = guide.url.split('/');
    return {
      ...acc,
      [guide.url]: {
        page: '/guides/[guide]',
        query: slug,
      },
    };
  }, {});
};

/**
 * Generates routes for each of the roadmap and it's respective versions
 * @returns {*}
 */
const getRoadmapRoutes = () => {
  const roadmaps = fs.readdirSync(ROADMAPS_PATH);
  return roadmaps.reduce((roadmapRoutes, dirName) => {
    const roadmapUrl = `/${dirName}`;
    const roadmapDir = path.join(ROADMAPS_PATH, dirName);
    const pageFilePaths = glob.sync(`${roadmapDir}/**/*.md`);

    return {
      ...roadmapRoutes,
      // Default roadmap path i.e. `{ '/frontend': { page: '/[roadmap]', query: 'frontend' }`
      [roadmapUrl]: {
        page: '/[roadmap]',
        query: dirName,
      },
      // Routes for all the pages inside this directory
      ...pageFilePaths.reduce((pageRoutes, pageFilePath) => {
        const pageFileName = path.basename(pageFilePath, '.md');
        const pageSlug = pageFileName.replace(/^\d+-/, '').toLowerCase();

        return {
          ...pageRoutes,
          [`${roadmapUrl}/${pageSlug}`]: {
            page: '/[roadmap]/[page]',
            query: `${roadmapUrl}/${pageSlug}`
          }
        };
      }, {})
    };
  }, {});
};

/**
 * Generates the path-map understood by next.js
 * @returns {{}}
 */
const getPathMap = () => () => ({
  ...getPageRoutes(),
  ...getGuideRoutes(),
  ...getRoadmapRoutes(),
});

module.exports = {
  getPageRoutes,
  getGuideRoutes,
  getRoadmapRoutes,
  getPathMap,
};
