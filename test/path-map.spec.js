const path = require('path');
const fs = require('fs');
const glob = require('glob');
const guides = require('../storage/guides');
const roadmaps = require('../storage/roadmaps');

const {
  getPageRoutes,
  getGuideRoutes,
  getRoadmapRoutes
} = require("../scripts/path-map");

describe("Build scripts tests", () => {
  test('it should generate valid pathmap for pages', () => {
    const pageRoutes = getPageRoutes();

    expect(pageRoutes).toEqual({
      '/': { page: '/index' },
      '/about': { page: '/about' },
      '/privacy': { page: '/privacy' },
      '/terms': { page: '/terms' },
      '/guides': { page: '/guides/index' },
      '/roadmaps': { page: '/roadmaps' },
      '/signup': { page: '/signup' },
    });
  });

  test('it should generate valid guides pathmap', () => {
    const expectedGuideRoutes = guides.reduce((acc, guide) => {
      const [,, slug] = guide.url.split('/');
      return {
        ...acc,
        [guide.url]: {
          page: '/guides/[guide]',
          query: slug,
        }
      };
    }, {});

    // Valid path map is generated
    expect(expectedGuideRoutes).toEqual(getGuideRoutes());

    const pageFilePath = path.join(__dirname, '../pages/guides/[guide].js');
    const foundFilePath = fs.existsSync(pageFilePath) ? pageFilePath : '';

    // Given page component exists
    expect(foundFilePath).toEqual(pageFilePath);
  });

  test('it should have markdown file for each guide', () => {
    guides.forEach(guide => {
      const [,, slug] = guide.url.split('/');

      const expectedFile = path.join(__dirname, `../storage/guides/${slug}.md`);
      const foundFile = fs.existsSync(expectedFile) ? expectedFile : '';

      expect(foundFile).toEqual(expectedFile);
    })
  });

  // @todo add tests for roadmap pathmap
});
