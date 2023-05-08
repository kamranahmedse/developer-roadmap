const fs = require('node:fs');
const path = require('node:path');

const jsonsDir = path.join(process.cwd(), 'public/jsons');
const childJsonDirs = fs.readdirSync(jsonsDir);

childJsonDirs.forEach((childJsonDir) => {
  const fullChildJsonDirPath = path.join(jsonsDir, childJsonDir);
  const jsonFiles = fs.readdirSync(fullChildJsonDirPath);

  jsonFiles.forEach((jsonFileName) => {
    console.log(`Compressing ${jsonFileName}...`);

    const jsonFilePath = path.join(fullChildJsonDirPath, jsonFileName);
    const json = require(jsonFilePath);

    fs.writeFileSync(jsonFilePath, JSON.stringify(json));
  });
});
