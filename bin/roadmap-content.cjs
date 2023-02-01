const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content');
// Directory containing the roadmaps
const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/roadmaps');
const roadmapId = process.argv[2];

const allowedRoadmapIds = fs.readdirSync(ROADMAP_CONTENT_DIR);
if (!roadmapId) {
  console.error('roadmapId is required');
  process.exit(1);
}

if (!allowedRoadmapIds.includes(roadmapId)) {
  console.error(`Invalid roadmap key ${roadmapId}`);
  console.error(`Allowed keys are ${allowedRoadmapIds.join(', ')}`);
  process.exit(1);
}

// Directory holding the roadmap content files
const roadmapDirName = fs
  .readdirSync(ROADMAP_CONTENT_DIR)
  .find((dirName) => dirName.replace(/\d+-/, '') === roadmapId);

if (!roadmapDirName) {
  console.error('Roadmap directory not found');
  process.exit(1);
}

const roadmapDirPath = path.join(ROADMAP_CONTENT_DIR, roadmapDirName);
const roadmapContentDirPath = path.join(
  ROADMAP_CONTENT_DIR,
  roadmapDirName,
  'content'
);

// If roadmap content already exists do not proceed as it would override the files
if (fs.existsSync(roadmapContentDirPath)) {
  console.error(`Roadmap content already exists @ ${roadmapContentDirPath}`);
  process.exit(1);
}

function prepareDirTree(control, dirTree, dirSortOrders) {
  // Directories are only created for groups
  if (control.typeID !== '__group__') {
    return;
  }

  // e.g. 104-testing-your-apps:other-options
  const controlName = control?.properties?.controlName || '';
  // e.g. 104
  const sortOrder = controlName.match(/^\d+/)?.[0];

  // No directory for a group without control name
  if (!controlName || !sortOrder) {
    return;
  }

  // e.g. testing-your-apps:other-options
  const controlNameWithoutSortOrder = controlName.replace(/^\d+-/, '');
  // e.g. ['testing-your-apps', 'other-options']
  const dirParts = controlNameWithoutSortOrder.split(':');

  // Nest the dir path in the dirTree
  let currDirTree = dirTree;
  dirParts.forEach((dirPart) => {
    currDirTree[dirPart] = currDirTree[dirPart] || {};
    currDirTree = currDirTree[dirPart];
  });

  dirSortOrders[controlNameWithoutSortOrder] = Number(sortOrder);

  const childrenControls = control.children.controls.control;
  // No more children
  if (childrenControls.length) {
    childrenControls.forEach((childControl) => {
      prepareDirTree(childControl, dirTree, dirSortOrders);
    });
  }

  return { dirTree, dirSortOrders };
}

const roadmap = require(path.join(__dirname, `../public/jsons/roadmaps/${roadmapId}`));
const controls = roadmap.mockup.controls.control;

// Prepare the dir tree that we will be creating and also calculate the sort orders
const dirTree = {};
const dirSortOrders = {};

controls.forEach((control) => {
  prepareDirTree(control, dirTree, dirSortOrders);
});

/**
 * @param parentDir Parent directory in which directory is to be created
 * @param dirTree Nested dir tree to be created
 * @param sortOrders Mapping from groupName to sort order
 * @param filePaths The mapping from groupName to file path
 */
function createDirTree(parentDir, dirTree, sortOrders, filePaths = {}) {
  const childrenDirNames = Object.keys(dirTree);
  const hasChildren = childrenDirNames.length !== 0;

  // @todo write test for this, yolo for now
  const groupName = parentDir
    .replace(roadmapContentDirPath, '') // Remove base dir path
    .replace(/(^\/)|(\/$)/g, '') // Remove trailing slashes
    .replace(/(^\d+?-)/g, '') // Remove sorting information
    .replaceAll('/', ':') // Replace slashes with `:`
    .replace(/:\d+-/, ':');

  const humanizedGroupName = groupName
    .split(':')
    .pop()
    ?.replaceAll('-', ' ')
    .replace(/^\w/, ($0) => $0.toUpperCase());

  const sortOrder = sortOrders[groupName] || '';

  // Attach sorting information to dirname
  // e.g. /roadmaps/100-frontend/content/internet
  // ———> /roadmaps/100-frontend/content/103-internet
  if (sortOrder) {
    parentDir = parentDir.replace(/(.+?)([^\/]+)?$/, `$1${sortOrder}-$2`);
  }

  // If no children, create a file for this under the parent directory
  if (!hasChildren) {
    let fileName = `${parentDir}.md`;
    fs.writeFileSync(fileName, `# ${humanizedGroupName}`);

    filePaths[groupName || 'home'] = fileName.replace(CONTENT_DIR, '');
    return filePaths;
  }

  // There *are* children, so create the parent as a directory
  // and create `index.md` as the content file for this
  fs.mkdirSync(parentDir);

  let readmeFilePath = path.join(parentDir, 'index.md');
  fs.writeFileSync(readmeFilePath, `# ${humanizedGroupName}`);

  filePaths[groupName || 'home'] = readmeFilePath.replace(CONTENT_DIR, '');

  // For each of the directory names, create a
  // directory inside the given directory
  childrenDirNames.forEach((dirName) => {
    createDirTree(
      path.join(parentDir, dirName),
      dirTree[dirName],
      dirSortOrders,
      filePaths
    );
  });

  return filePaths;
}

// Create directories and get back the paths for created directories
createDirTree(roadmapContentDirPath, dirTree, dirSortOrders);
console.log('Created roadmap content directory structure');
