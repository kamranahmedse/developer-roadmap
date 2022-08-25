import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(__dirname, '../content');
// Directory containing the roadmaps
const ROADMAP_CONTENT_DIR = path.join(__dirname, '../content/roadmaps');
const roadmapKey = process.argv[2];

type ControlType = {
  ID: string;
  typeID: string;
  zOrder: string;
  w: string;
  h: string;
  measuredW: string;
  measuredH: string;
  x: string;
  y: string;
  properties: {
    controlName: string;
  };
  children: {
    controls: {
      control: ControlType[];
    };
  };
};

type RoadmapType = {
  mockup: {
    controls: {
      control: ControlType[];
    };
  };
};

const roadmaps: Record<string, RoadmapType> = {
  frontend: require('../public/project/frontend.json'),
  backend: require('../public/project/backend.json'),
  devops: require('../public/project/devops.json'),
  android: require('../public/project/android.json'),
  golang: require('../public/project/golang.json'),
  java: require('../public/project/java.json'),
  python: require('../public/project/python.json'),
  react: require('../public/project/react.json'),
  vue: require('../public/project/vue.json'),
  angular: require('../public/project/angular.json'),
  blockchain: require('../public/project/blockchain.json'),
  javascript: require('../public/project/javascript.json'),
  nodejs: require('../public/project/nodejs.json'),
};

if (!roadmapKey || !roadmaps[roadmapKey]) {
  console.error(`Invalid roadmap key ${roadmapKey}`);
  console.error(`Allowed keys are ${Object.keys(roadmaps).join(', ')}`);
  process.exit(1);
}

// Directory holding the roadmap content files
const roadmapDirName = fs
  .readdirSync(ROADMAP_CONTENT_DIR)
  .find((dirName: string) => dirName.replace(/\d+-/, '') === roadmapKey);

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

// Type representing the nested dir tree
// {
//    frontend: {
//      internet: {
//        dns-how-does-it-work: {}
//        what-is-domain-name: {}
//      },
//      html: {},
//      css: {
//          making-layouts: {}
//      },
//    }
// }
type DirTreeType = {
  [dirName: string]: DirTreeType;
};

// Hashmap containing the dir key to sort order mapping
// {
//   "frontend": 100,
//   "frontend:internet": 200,
//   "frontend:internet:dns-how-does-it-work": 100
// }
type DirSortOrdersType = Record<string, number>;

function prepareDirTree(
  control: ControlType,
  dirTree: DirTreeType,
  dirSortOrders: DirSortOrdersType
) {
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

const roadmap = roadmaps[roadmapKey];
const controls = roadmap.mockup.controls.control;

// Prepare the dir tree that we will be creating and also calculate the sort orders
const dirTree: DirTreeType = {};
const dirSortOrders: DirSortOrdersType = {};

controls.forEach((control) => {
  prepareDirTree(control, dirTree, dirSortOrders);
});

/**
 * @param parentDir Parent directory in which directory is to be created
 * @param dirTree Nested dir tree to be created
 * @param sortOrders Mapping from groupName to sort order
 * @param filePaths The mapping from groupName to file path
 */
function createDirTree(
  parentDir: string,
  dirTree: DirTreeType,
  sortOrders: DirSortOrdersType,
  filePaths: Record<string, string> = {}
) {
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
  // and create `readme.md` as the content file for this
  fs.mkdirSync(parentDir);

  let readmeFilePath = path.join(parentDir, 'readme.md');
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
const filePaths = createDirTree(roadmapContentDirPath, dirTree, dirSortOrders);
const contentPathsFilePath = path.join(roadmapDirPath, 'content-paths.json');

fs.writeFileSync(contentPathsFilePath, JSON.stringify(filePaths, null, 2));

const roadmapMetaFilePath = path.join(roadmapDirPath, 'meta.json');
const roadmapMeta = require(roadmapMetaFilePath);

// Put the content paths file path in the roadmap meta
roadmapMeta.contentPathsFilePath = contentPathsFilePath.replace(
  roadmapDirPath,
  '.'
);

fs.writeFileSync(roadmapMetaFilePath, JSON.stringify(roadmapMeta, null, 2));
