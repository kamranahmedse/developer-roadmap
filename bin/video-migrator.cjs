const fs = require('fs');
const path = require('path');
const yaml = require('json-to-pretty-yaml');

const contentDirPath = path.join(__dirname, './developer-roadmap/content');
const videos = require('./developer-roadmap/content/videos.json');

// Remove the old videos directory
const newVideosDirPath = path.join(__dirname, '../src/videos');
if (fs.existsSync(newVideosDirPath)) {
  fs.rmSync(newVideosDirPath, { recursive: true });
}

fs.mkdirSync(newVideosDirPath);

videos.forEach((video) => {
  const { id: videoId } = video;

  const originalVideoPath = path.join(
    contentDirPath,
    'videos',
    `${videoId}.md`
  );

  const newVideoPath = path.join(__dirname, `../src/videos/${videoId}.md`);

  const videoWithoutFrontmatter = fs.readFileSync(originalVideoPath, 'utf8');
  fs.copyFileSync(originalVideoPath, newVideoPath);

  const videoFrontMatter = yaml
    .stringify({
      title: video.title,
      description: video.description,
      duration: video.duration,
      isNew: video.isNew,
      date: video.createdAt.replace(/T.*/, ''),
      author: {
        name: 'Kamran Ahmed',
        url: `https://twitter.com/kamranahmedse`,
        imageUrl: `/authors/kamranahmedse.jpeg`,
      },
      sitemap: {
        priority: 0.7,
        changefreq: 'weekly',
      },
      tags: ['video', `video-sitemap`],
    })
    .replace(/date: "(.+?)"/, 'date: $1');

  const videoWithIframeClass = videoWithoutFrontmatter
    .replace(/<iframe/g, '<iframe class="w-full aspect-video mb-5"')
    .replace(/<iframe(.+?)\s?\/>/g, '<iframe$1></iframe>');

  const videoWithFrontmatter = `---\n${videoFrontMatter}---\n\n${videoWithIframeClass}`;

  console.log(`Writing video ${videoId} to disk`);
  fs.writeFileSync(newVideoPath, videoWithFrontmatter);
});
