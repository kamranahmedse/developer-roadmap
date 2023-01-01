const fs = require('fs');
const path = require('path');

// 1 - Renames each readme.md to index.md
//    e.g.
//      before => roadmaps/frontend/content/internet/readme.md
//      after  => roadmaps/frontend/content/internet/index.md
//
// 2 - Replaces the resource tags with short codes
//    e.g.
//      <ResourceGroupTitle>Free Content</ResourceGroupTitle>
//      <BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/css/'>W3Schools — Learn CSS</BadgeLink>
//
//      {% resources %}
//        {% Blog "https://www.w3schools.com/css/", "W3Schools — Learn CSS" %}
//      {% endresources %}
//
// 3 - Removes the index.md file from within the content dir i.e. to avoid `/frontend` permalink for `/frontend/index.md`
//     Because we have the `/frontend` permalink serving the actual roadmap and not any content
const roadmapsDir = path.join(__dirname, '../src/roadmaps');
const roadmapDirs = fs.readdirSync(roadmapsDir);

roadmapDirs.forEach((roadmapDirName) => {
  const roadmapDirPath = path.join(roadmapsDir, roadmapDirName);
  const contentDirPath = path.join(roadmapDirPath, 'content');

  console.log(`[Start] == Migrating ${roadmapDirName}`);

  if (!fs.existsSync(contentDirPath)) {
    console.log(`Content dir not found ${roadmapDirName}/content`);
    return;
  }

  function handleContentDir(parentDirPath) {
    const dirChildrenNames = fs.readdirSync(parentDirPath);

    dirChildrenNames.forEach((dirChildName) => {
      let dirChildPath = path.join(parentDirPath, dirChildName);

      // If directory, handle the children for it
      if (fs.lstatSync(dirChildPath).isDirectory()) {
        handleContentDir(dirChildPath);
      }

      //////////////////////////////////////////////////////////
      // 1 - Rename directories to remove the numbers
      //////////////////////////////////////////////////////////
      // let newDirChildPath = path.join(
      //   path.dirname(dirChildPath),
      //   path.basename(dirChildPath).replace(/^\d+-/, '')
      // );
      // fs.renameSync(dirChildPath, dirChildPath);

      //////////////////////////////////////////////////////////
      // 1 - Rename readme.md to index.md
      //////////////////////////////////////////////////////////
      if (dirChildPath.endsWith('readme.md')) {
        const newFilePath = path.join(path.dirname(dirChildPath), `index.md`);

        fs.renameSync(dirChildPath, newFilePath);
        dirChildPath = newFilePath;
      }

      //////////////////////////////////////////////////////////
      // 2 - Replace the resource tags with short codes
      //////////////////////////////////////////////////////////
      if (fs.lstatSync(dirChildPath).isFile()) {
        const fileContent = fs.readFileSync(dirChildPath, 'utf-8');

        let resourceLinks = [...fileContent.matchAll(/<BadgeLink.+<\/BadgeLink>/g)].map(([fullMatch]) => {
          // const resourceType = fullMatch.match(/badgeText=["'](.+?)["']/)[1];
          const link = fullMatch.match(/href=["'](.+?)["']/)[1];
          const text = fullMatch.match(/>([^<]+)<\/BadgeLink>$/)[1];

          return `- [${text.replaceAll(/['"]/g, '')}](${link})`;
        });

        //////////////////////////////////////////////////////////////////////
        // Replace the dedicated roadmap tag with the short code
        //////////////////////////////////////////////////////////////////////
        // prettier-ignore
        const dedicatedRegex = /<DedicatedRoadmap\s*href=['"](.+?)['"]\s*title=['"](.+?)['"]\s*description=['"].+?['"]\s*\/>/;
        const dedicatedMatches = fileContent.match(dedicatedRegex);

        if (dedicatedMatches) {
          const [, href, title] = dedicatedMatches;

          resourceLinks = [`- [Visit Dedicated ${title}](${href})`, ...resourceLinks];
        }

        resourceLinks = resourceLinks.join('\n');

        let newFileContent = fileContent.replace(
          /<ResourceGroupTitle>([^<\/BadgeLink>]|\S|\s)+<\/BadgeLink>/,
          resourceLinks
        );

        // In case if the resources were not wrapped in <ResourceGroupTitle>
        newFileContent = newFileContent.replace(
          /<BadgeLink([^<\/BadgeLink>]|\S|\s)+<\/BadgeLink>/,
          resourceLinks
        );

        fs.writeFileSync(dirChildPath, newFileContent);
      }
    });
  }

  handleContentDir(contentDirPath);

  // 3 - Removes the index.md file from within the content dir i.e. to avoid `/frontend` permalink for `/frontend/index.md`
  //     Because we have the `/frontend` permalink serving the actual roadmap and not any content
  const contentRootFile = path.join(contentDirPath, '/index.md');
  if (fs.existsSync(contentRootFile)) {
    fs.rmSync(contentRootFile);
  }

  console.log(`        == Migrated ${roadmapDirName}`);
});
