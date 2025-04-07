import fs from 'fs';
import path from 'path';

const roadmapDirs = fs.readdirSync(
  path.join(__dirname, '..', 'src', 'data', 'roadmaps'),
);

roadmapDirs.forEach((roadmapDir) => {
  const roadmapDirPath = path.join(
    __dirname,
    '..',
    'src',
    'data',
    'roadmaps',
    roadmapDir,
    'content',
  );

  const roadmapDirContent = fs.readdirSync(roadmapDirPath);

  roadmapDirContent.forEach((content) => {
    const contentPath = path.join(roadmapDirPath, content);
    const contentStats = fs.statSync(contentPath);

    const oldName = path.basename(contentPath);
    const newName = oldName.replace(/^(\d+)-/, '');

    fs.renameSync(contentPath, path.join(roadmapDirPath, newName));

    if (contentStats.isDirectory()) {
      const contentDirContent = fs.readdirSync(contentPath);
      
      contentDirContent.forEach((contentDir) => {
        const contentDirPath = path.join(contentPath, contentDir);
        const contentDirStats = fs.statSync(contentDirPath);

        const oldName = path.basename(contentDirPath);
        const newName = oldName.replace(/^(\d+)-/, '');

        fs.renameSync(contentDirPath, path.join(contentPath, newName));

        if (contentDirStats.isDirectory()) {
          const contentDirContent = fs.readdirSync(contentDirPath);

          contentDirContent.forEach((contentDir) => {
            const contentDirPath2 = path.join(contentDirPath, contentDir);
            const contentDirStats2 = fs.statSync(contentDirPath2);

            const oldName2 = path.basename(contentDirPath2);
            const newName2 = oldName2.replace(/^(\d+)-/, '');

            fs.renameSync(contentDirPath2, path.join(contentDirPath, newName2));
          });
        }
      });
    }
  });
});
