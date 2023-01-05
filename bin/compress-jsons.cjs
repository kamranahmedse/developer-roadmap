const fs = require('node:fs');
const path = require('node:path');

const jsonsDir = path.join(process.cwd(), 'public/jsons');
const jsonFiles = fs.readdirSync(jsonsDir);

jsonFiles.forEach((jsonFileName) => {
  console.log(`Compressing ${jsonFileName}...`);

  const jsonFilePath = path.join(jsonsDir, jsonFileName);
  const json = require(jsonFilePath);

  fs.writeFileSync(jsonFilePath, JSON.stringify(json));
});
