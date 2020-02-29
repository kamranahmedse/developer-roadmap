const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const STORAGE_PATH = path.join(__dirname, '../content');
const ROADMAPS_PATH = path.join(__dirname, '../content/roadmaps');
const META_FILE_PATH = path.join(__dirname, '../content/roadmaps.json');

const roadmapDirs = fs.readdirSync(ROADMAPS_PATH);
console.log(`[x] ${roadmapDirs.length} roadmaps found`);

const roadmapsMeta = roadmapDirs.reduce((metaAcc, roadmapDirName) => {
  const roadmapSlug = roadmapDirName.replace(/^\d+-/, '');
  const roadmapDir = path.join(ROADMAPS_PATH, roadmapDirName);
  const roadmapMeta = require(path.join(roadmapDir, 'meta.json'));

  // We can't use the absolute path in the build e.g. ~/Users/user/where-build-is-running/content
  // So, we remove it and use the path relative to content directory
  const roadmapLandingFilePath = path.join(roadmapDir.replace(STORAGE_PATH, ''), roadmapMeta.path);
  const resourcesPath = path.join(roadmapDir.replace(STORAGE_PATH, ''), roadmapMeta.resources);

  const contributors = exec(`git log --pretty=format:"%an%x09" ${roadmapDir} | uniq`)
    .toString()
    .split('\n')
    .map(contributor => contributor.replace(/[\s\t]/g, ' ').trim()) || [];
  const contributorNames = contributors.filter(contributor => !!contributor);


  console.log(`----------------------------`);
  console.log(`[#] Roadmap: ${roadmapMeta.title}`);
  console.log(`[x] Generating sidebar`);

  // Get all the directories in the roadmap dir
  // these are going to be the parent menu items
  const menuDirs = fs.readdirSync(roadmapDir)
    .map(dirPath => path.join(roadmapDir, dirPath))
    .filter(dirPath => fs.lstatSync(dirPath).isDirectory());

  // Read the files inside each of the menu dirs and prepare menu items
  // for the sidebar i.e. of the format below
  // {
  //    landscape: [{ title: "Junior", path: "/path/to/file.md"}, ...],
  //    learn: [{ title: "Job Ready", path: "/path/to/file.md"}, ...],
  // }
  const sidebar = menuDirs.reduce((menus, menuDir) => {
    const menuItemName = path.basename(menuDir).replace(/\d+-/, '').replace('-', ' ');
    const pageFiles = fs.readdirSync(menuDir)
      .filter(pageFileName => pageFileName.endsWith('.md'))
      // Sort by the titles `1-something.md, 2-another.md`
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    return {
      ...menus,
      [menuItemName]: [
        ...(menus[menuItemName] || []),
        ...pageFiles.map(pageFile => {
          const pageFileName = path.basename(pageFile, '.md');
          const pageSlug = pageFileName.replace(/^\d+-/, '').toLowerCase();

          return {
            // Use the filename and remove the number from the beginning to generate slug
            url: `/${roadmapSlug}/${pageSlug}`,
            // Remove the number and replace the dashes to generate title
            title: pageFileName.replace(/^\d+-/, '').replace(/-/g, ' '),
            // Remove "STORAGE_PATH" because we don't want to push the absolute path while development
            path: path.join(menuDir, pageFile).replace(STORAGE_PATH, ''),
          }
        }),
      ],
    };
  }, {});

  return [
    ...metaAcc,
    {
      ...roadmapMeta,
      contributorsCount: contributorNames.length,
      contributorsUrl: `/${roadmapSlug}/contributors`,
      url: `/${roadmapSlug}`,
      path: roadmapLandingFilePath,
      resources: resourcesPath,
      sidebar,
    },
  ];
}, []);

console.log(`----------------------------`);
console.log(`[x] Meta generated for ${roadmapsMeta.length} roadmaps`);
console.log(`[x] Writing file ${META_FILE_PATH}`);
fs.writeFileSync(META_FILE_PATH, JSON.stringify(roadmapsMeta, null, 2));
console.log(`[x] Wrote file with content`);
console.log(JSON.stringify(roadmapsMeta, null, 2));
