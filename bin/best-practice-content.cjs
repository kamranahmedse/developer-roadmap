const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content');
// Directory containing the best-practices
const BEST_PRACTICE_CONTENT_DIR = path.join(__dirname, '../src/best-practices');
const bestPracticeId = process.argv[2];

const allowedBestPracticeId = fs.readdirSync(BEST_PRACTICE_CONTENT_DIR);
if (!bestPracticeId) {
  console.error('bestPractice is required');
  process.exit(1);
}

if (!allowedBestPracticeId.includes(bestPracticeId)) {
  console.error(`Invalid best practice key ${bestPracticeId}`);
  console.error(`Allowed keys are ${allowedBestPracticeId.join(', ')}`);
  process.exit(1);
}

// Directory holding the best parctice content files
const bestPracticeDirName = fs
  .readdirSync(BEST_PRACTICE_CONTENT_DIR)
  .find((dirName) => dirName.replace(/\d+-/, '') === bestPracticeId);

if (!bestPracticeDirName) {
  console.error('Best practice directory not found');
  process.exit(1);
}

const bestPracticeDirPath = path.join(BEST_PRACTICE_CONTENT_DIR, bestPracticeDirName);
const bestPracticeContentDirPath = path.join(
  BEST_PRACTICE_CONTENT_DIR,
  bestPracticeDirName,
  'content'
);

// If best practice content already exists do not proceed as it would override the files
if (fs.existsSync(bestPracticeContentDirPath)) {
  console.error(`Best Practice content already exists @ ${bestPracticeContentDirPath}`);
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

const bestPractice = require(path.join(__dirname, `../public/jsons/best-practices/${bestPracticeId}`));
const controls = bestPractice.mockup.controls.control;

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
    .replace(bestPracticeContentDirPath, '') // Remove base dir path
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
  // e.g. /best-practices/frontend-performance/content/internet
  // ———> /best-practices/frontend-performance/content/103-internet
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
createDirTree(bestPracticeContentDirPath, dirTree, dirSortOrders);
console.log('Created best practice content directory structure');