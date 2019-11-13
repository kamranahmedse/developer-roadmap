const path = require('path');
const fs = require('fs');
const guides = require('../data/guides');
const roadmaps = require('../data/roadmaps');

const {
  getPageRoutes,
  getGuideRoutes,
  getRoadmapRoutes
} = require("../path-map");

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

      const expectedFile = path.join(__dirname, `../data/guides/${slug}.md`);
      const foundFile = fs.existsSync(expectedFile) ? expectedFile : '';

      expect(foundFile).toEqual(expectedFile);
    })
  });

  test('it should generate valid roadmap routes', () => {
    const expectedPathMap = roadmaps.reduce((roadmapAcc, roadmap) => {
      // Routes for each of the versions of this roadmap
      const versionRoutes = (roadmap.versions || []).reduce((versionAcc, version) => ({
        ...versionAcc,
        [`${roadmap.url}/${version}`]: {
          page: '/[roadmap]/[version]',
          query: `${roadmap.url.split('/')[1]}/${version}`,
        }
      }), {});

      // Route for the route roadmap itself
      return {
        ...roadmapAcc,
        [roadmap.url]: {
          page: '/[roadmap]',
          query: roadmap.url.split('/')[1]
        },
        // Expected roadmap for versions
        ...versionRoutes
      };
    }, {});

    expect(getRoadmapRoutes()).toEqual(expectedPathMap);
  })
});
