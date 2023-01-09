const fs = require('fs');
const path = require('path');

const roadmapId = process.argv[2];
if (!roadmapId) {
  console.error('Error: roadmapId is required');
}

const fullPath = path.join(__dirname, `../src/roadmaps/${roadmapId}`);
if (!fs.existsSync(fullPath)) {
  console.error(`Error: path not found: ${fullPath}!`);
  process.exit(1);
}

function readFiles(folderPath) {
  const stats = fs.lstatSync(folderPath);

  if (stats.isFile()) {
    return [folderPath];
  }

  const folderContent = fs.readdirSync(folderPath);
  let files = [];

  for (const file of folderContent) {
    const filePath = path.join(folderPath, file);

    files = [...files, ...readFiles(filePath)];
  }

  return files;
}

const files = readFiles(fullPath);
let allLinks = [];

files.forEach((file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const matches = [...fileContent.matchAll(/\[[^\]]+]\((https?:\/\/[^)]+)\)/g)];

  allLinks = [...allLinks, ...matches.map((match) => match[1])];
});

allLinks.map((link) => console.log(link));
