const fs = require('fs');
const path = require('path');

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const ALL_ROADMAPS_DIR = path.join(__dirname, '../src/data/roadmaps');
const ROADMAP_JSON_DIR = path.join(__dirname, '../public/jsons/roadmaps');

const roadmapId = process.argv[2];

const allowedRoadmapIds = fs.readdirSync(ALL_ROADMAPS_DIR);
if (!roadmapId) {
  console.error('roadmapId is required');
  process.exit(1);
}

if (!allowedRoadmapIds.includes(roadmapId)) {
  console.error(`Invalid roadmap key ${roadmapId}`);
  console.error(`Allowed keys are ${allowedRoadmapIds.join(', ')}`);
  process.exit(1);
}

const ROADMAP_CONTENT_DIR = path.join(ALL_ROADMAPS_DIR, roadmapId, 'content');

function getFilesInFolder(folderPath, fileList = {}) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getFilesInFolder(filePath, fileList);
    } else if (stats.isFile()) {
      const fileUrl = filePath
        .replace(ROADMAP_CONTENT_DIR, '') // Remove the content folder
        .replace(/\/\d+-/g, '/') // Remove ordering info `/101-ecosystem`
        .replace(/\/index\.md$/, '') // Make the `/index.md` to become the parent folder only
        .replace(/\.md$/, ''); // Remove `.md` from the end of file

      fileList[fileUrl] = filePath;
    }
  });

  return fileList;
}

const topicUrlToPathMapping = getFilesInFolder(ROADMAP_CONTENT_DIR);

const roadmapJson = require(path.join(ROADMAP_JSON_DIR, `${roadmapId}.json`));
const groups = roadmapJson?.mockup?.controls?.control?.filter(
  (control) => control.typeID === '__group__' && !control.properties?.controlName?.startsWith('ext_link')
);

groups.forEach((group) => {
  const topicId = group?.properties?.controlName;
  const topicTitle = group?.children?.controls?.control?.find((control) => control?.typeID === 'Label')?.properties
    ?.text;
  const currTopicUrl = topicId.replace(/^\d+-/g, '/').replace(/:/g, '/');
  const contentFilePath = topicUrlToPathMapping[currTopicUrl];

  const currentFileContent = fs.readFileSync(contentFilePath, 'utf8');
  const isFileEmpty = currentFileContent.replace(/^#.+/, ``).trim() == '';

  if (!isFileEmpty) {
    console.log(`${topicId} not empty. Ignoring...`);
    return;
  }

  let newFileContent = `# ${topicTitle}`;

  if (!OPEN_AI_API_KEY) {
    console.log(`OPEN_AI_API_KEY not set. Only adding title to ${topicId}..`);
    fs.writeFileSync(contentFilePath, newFileContent, 'utf8');
    return;
  }

  // console.log(currentFileContent);
  // console.log(currTopicUrl);
  // console.log(topicTitle);
  // console.log(topicUrlToPathMapping[currTopicUrl]);
});
