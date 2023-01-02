const fs = require('fs');
const path = require('path');
const yaml = require('json-to-pretty-yaml');

const contentDirPath = path.join(__dirname, './developer-roadmap/content');
const guides = require('./developer-roadmap/content/guides.json');
const authors = require('./developer-roadmap/content/authors.json');

const guideImagesDirPath = path.join(__dirname, './developer-roadmap/public/guides');
const newGuideImagesDirPath = path.join(__dirname, '../public/guides');

// Remove the guide images directory
if (fs.existsSync(newGuideImagesDirPath)) {
  fs.rmSync(newGuideImagesDirPath, { recursive: true });
}

fs.cpSync(guideImagesDirPath, newGuideImagesDirPath, { recursive: true });

// Remove the old guides directory
const newGuidesDirPath = path.join(__dirname, '../src/guides');
if (fs.existsSync(newGuidesDirPath)) {
  fs.rmSync(newGuidesDirPath, { recursive: true });
}

fs.mkdirSync(newGuidesDirPath);

guides.forEach((guide) => {
  const { id: guideId } = guide;

  const originalGuidePath = path.join(contentDirPath, 'guides', `${guideId}.md`);
  const newGuidePath = path.join(__dirname, `../src/guides/${guideId}.md`);

  const guideWithoutFrontmatter = fs.readFileSync(originalGuidePath, 'utf8');
  fs.copyFileSync(originalGuidePath, newGuidePath);

  const guideAuthor = authors.find((author) => author.username === guide.authorUsername);

  const guideFrontMatter = yaml
    .stringify({
      title: guide.title,
      description: guide.description,
      author: {
        name: guideAuthor.name,
        url: `https://twitter.com/${guideAuthor.twitter}`,
        imageUrl: `${guideAuthor.picture}`,
      },
      seo: {
        title: `${guide.title} - roadmap.sh`,
        description: guide.description,
      },
      isNew: guide.isNew,
      type: guide.type,
      date: guide.createdAt.replace(/T.*/, ''),
      sitemap: {
        priority: 0.7,
        changefreq: 'weekly',
      },
      tags: ['guide', `${guide.type}-guide`, `guide-sitemap`],
    })
    .replace(/date: "(.+?)"/, 'date: $1');

  const guideWithUpdatedUrls = guideWithoutFrontmatter
    .replace(/\[\!\[\]\((.+?\.png)\)\]\((.+?\.png)\)/g, '[![]($1)]($2)')
    .replace(/\[\!\[\]\((.+?\.svg)\)\]\((.+?\.svg)\)/g, '[![]($1)]($2)')
    .replace(/\/http/g, 'http')
    .replace(/]\(\/guides\/(.+?)\.png\)/g, '](/guides/$1.png)')
    .replace(/<iframe/g, '<iframe class="w-full aspect-video mb-5"')
    .replace(/<iframe(.+?)\s?\/>/g, '<iframe$1></iframe>');

  const guideWithFrontmatter = `---\n${guideFrontMatter}---\n\n${guideWithUpdatedUrls}`;

  console.log(`Writing guide ${guideId} to disk`);
  fs.writeFileSync(newGuidePath, guideWithFrontmatter);
});

const oldAuthorAssetsPath = path.join(__dirname, 'developer-roadmap/public/authors');
const newAuthorAssetsPath = path.join(__dirname, '../public/authors');

if (fs.existsSync(newAuthorAssetsPath)) {
  fs.rmSync(newAuthorAssetsPath, { recursive: true });
}

fs.cpSync(oldAuthorAssetsPath, newAuthorAssetsPath, { recursive: true });
