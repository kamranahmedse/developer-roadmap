const path = require('path');
const fs = require('fs');
const glob = require('glob');

const PAGES_PATH = path.join(__dirname, 'pages');

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

console.log(getPageRoutes());
