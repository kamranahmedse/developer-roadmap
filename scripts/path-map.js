const path = require('path');
const glob = require('glob');
const fs = require('fs');

const roadmaps = require('../content/roadmaps.json');
const guides = require('../content/guides.json');

const PAGES_PATH = path.join(__dirname, '../pages');
const ROADMAPS_PATH =  path.join(__dirname, '../content/roadmaps');

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
 * Generates routes for each of the roadmap and its respective versions
 * @returns {*}
 */
const getRoadmapRoutes = () => {
  return roadmaps.reduce((roadmapRoutes, roadmap) => {
    const pages = Object.values(roadmap.sidebar || {})
      .reduce((acc, menuPages) => {
        return [
          ...acc,
          ...menuPages
        ]
      }, []);

    return {
      ...roadmapRoutes,
      // Default roadmap path i.e. `{ '/frontend': { page: '/[roadmap]', query: 'frontend' }`
      [roadmap.url]: {
        page: '/[roadmap]',
        query: roadmap.url.replace(/\/+/, ''),
      },
      [`${roadmap.url}/resources`]: {
        page: '/[roadmap]/resources',
        query: roadmap.url.replace(/\/+/, ''),
      },
      // Routes for all the pages inside this directory
      ...pages.reduce((pageRoutes, page) => {
        return {
          ...pageRoutes,
          [page.url]: {
            page: '/[roadmap]/[page]',
            query: page.url.replace(/^\//, '')
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
