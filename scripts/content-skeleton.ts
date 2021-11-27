import fs from 'fs';
import path from 'path';

// Directory containing the roadmaps
const CONTENT_DIR = path.join(__dirname, '../content/roadmaps');
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
  angular: require('../public/project/angular.json'),
};

if (!roadmapKey || !roadmaps[roadmapKey]) {
  console.error(`Invalid roadmap key ${roadmapKey}`);
  console.error(`Allowed keys are ${Object.keys(roadmaps).join(', ')}`);
  process.exit(1);
}

// Directory holding the roadmap content files
const roadmapDirName = fs
  .readdirSync(CONTENT_DIR)
  .find((dirName: string) => dirName.replace(/\d+-/, '') === roadmapKey);

if (!roadmapDirName) {
  console.error('Roadmap directory not found');
  process.exit(1);
}

const roadmapContentPath = path.join(CONTENT_DIR, roadmapDirName, 'content');
// If roadmap content already exists do not proceed as it would override the files
if (fs.existsSync(roadmapContentPath)) {
  console.error(`Roadmap content already exists @ ${roadmapContentPath}`);
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

function createDirTree(parentDir: string, dirTree: DirTreeType) {
  const childrenDirNames = Object.keys(dirTree);
  const hasChildren = childrenDirNames.length !== 0;

  // If no children, create a file for this under the parent directory
  if (!hasChildren) {
    fs.writeFileSync(`${parentDir}.md`, '');
    return;
  }

  // There *are* children, so create the parent as a directory
  // and create `readme.md` as the content file for this
  fs.mkdirSync(parentDir);
  fs.writeFileSync(path.join(parentDir, 'readme.md'), '');

  // For each of the directory names, create a
  // directory inside the given directory
  childrenDirNames.forEach((dirName) => {
    createDirTree(dirName, dirTree[dirName]);
  });
}

createDirTree(roadmapContentPath, dirTree);

console.log(JSON.stringify(dirTree, null, 2));
