const path = require('path');
const glob = require('glob');

const guides = require('../storage/guides.json');
const roadmaps = require('../storage/roadmaps');

const PAGES_PATH = path.join(__dirname, '../pages');

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
    ]
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
      }
    };
  }, {});
};

/**
 * Generates routes for each of the roadmap and it's respective versions
 * @returns {*}
 */
const getRoadmapRoutes = () => {
  return roadmaps.reduce((roadmapRoutes, roadmap) => {
    const [, slug] = roadmap.url.split('/');

    return {
      ...roadmapRoutes,
      // Default roadmap path i.e. `{ '/frontend': { page: '/[roadmap]/index', query: 'frontend' }`
      [roadmap.url]: {
        page: '/[roadmap]',
        query: slug
      },
      // Route for each of the versions of this roadmap i.e.
      // `{ '/frontend/2019': { page: '/[roadmap]/[version]', query: 'frontend/2019' } }`
      ...((roadmap.versions || []).reduce((versionRoutes, version) => {
        return {
          ...versionRoutes,
          [`${roadmap.url}/${version}`]: {
            page: '/[roadmap]/[version]',
            query: `${slug}/${version}`
          }
        };
      }, {})),
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
