const fs = require('fs');
const path = require('path');

const roadmapId = process.argv[2];
if (!roadmapId) {
  console.error('Error: roadmapId is required');
}

const fullPath = path.join(__dirname, `../src/data/roadmaps/${roadmapId}/content`);
if (!fs.existsSync(fullPath)) {
  console.error(`Error: path not found: ${fullPath}!`);
  process.exit(1);
}

const allowedModes = ['simple', 'full'];
var mode = process.argv[3] || 'simple';
if (!allowedModes.includes(mode)) {
  console.error(`Error: unknown mode ${mode}! Available modes are: "${allowedModes}"`);
  process.exit(1);
}

// This sorts strings starting with letters before strings starting with numbers
// The purpose is that index.md and other files beginning with letters are ordered
// before the files with the contents of the individual subsections, which usually begin with a number
function customSort(a, b) {
  const isALetter = isNaN(parseInt(a[0], 10));
  const isBLetter = isNaN(parseInt(b[0], 10));

  if (isALetter && !isBLetter) {
    return -1; // A comes before B
  } else if (!isALetter && isBLetter) {
    return 1; // B comes before A
  } else {
    return a.localeCompare(b, undefined, { numeric: true }); // Use default sorting for equal cases
  }
}

function readFiles(folderPath) {
  const stats = fs.lstatSync(folderPath);

  if (stats.isFile()) {
    return [folderPath];
  }

  const folderContent = fs.readdirSync(folderPath).sort(customSort);
  let files = [];

  for (const file of folderContent) {
    const filePath = path.join(folderPath, file);

    files = [...files, ...readFiles(filePath)];
  }

  return files;
}

const baseDepth = (fullPath.match(/\//g) || []).length;
const files = readFiles(fullPath);
const header = /^#/;
const link = /- (\[[^\]]+]\((https?:\/\/[^)]+)\))/;

files.forEach((file) => {
  var fileDepth = (file.match(/\//g) || []).length - baseDepth;
  if (!file.endsWith('index.md')) {
    fileDepth++;
  }

  var fileContent = fs.readFileSync(file, 'utf-8');
  const lines = fileContent.split('\n');

  for (const line of lines) {
    if (mode === 'full') {
      if (header.test(line)) {
        console.log(line.replace(header, '#'.repeat(fileDepth)));
      } else if (link.test(line)) {
        console.log(line.replace(link, '- [ ] $1'));
      } else {
        console.log(line);
      }
    } else if (mode === 'simple') {
      if (header.test(line)) {
        console.log(line.replace(/^#+/, '    '.repeat(fileDepth - 1) + '-'));
      } else if (link.test(line)) {
        console.log(line.replace(link, '    '.repeat(fileDepth) + '- [ ] $1'));
      }
    }
  }
});
