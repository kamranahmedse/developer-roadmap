const fs = require('node:fs');
const path = require('node:path');

const roadmapId = 'frontend';

const roadmapDir = path.join(
  __dirname,
  `../src/data/roadmaps/${roadmapId}/content`,
);

function getHostNameWithoutTld(hostname) {
  const parts = hostname.split('.');
  return parts.slice(0, parts.length - 1).join('.');
}

function isOfficialWebsite(hostname, fileName, roadmapId) {
  if (hostname === 'javascript.info') {
    return false;
  }

  fileName = fileName.replace('/index.md', '').replace('.md', '');

  const parts = fileName.split('/');
  const lastPart = parts[parts.length - 1];

  const normalizedFilename = lastPart.replace(/\d+/g, '').replace(/-/g, '');
  const normalizedHostname = getHostNameWithoutTld(hostname);

  if (normalizedFilename === normalizedHostname) {
    return true;
  }

  if (normalizedFilename.includes(normalizedHostname)) {
    return true;
  }

  return !!roadmapId.includes(normalizedHostname);
}

// websites are educational websites that are of following types:
// - @official@
// - @article@
// - @course@
// - @opensource@
// - @podcast@
// - @video@
// - @website@
// content is only educational websites
function getTypeFromHostname(hostname) {
  hostname = hostname.replace('www.', '');

  const videoHostnames = ['youtube.com', 'vimeo.com'];
  const courseHostnames = ['coursera.org', 'udemy.com', 'edx.org'];
  const podcastHostnames = ['spotify.com', 'apple.com'];
  const opensourceHostnames = ['github.com', 'gitlab.com'];
  const articleHostnames = [
    'docs.gitlab.com',
    'docs.github.com',
    'skills.github.com',
    'cloudflare.com',
    'w3schools.com',
    'medium.com',
    'dev.to',
    'web.dev',
    'css-tricks.com',
    'developer.mozilla.org',
    'smashingmagazine.com',
    'freecodecamp.org',
    'cs.fyi',
    'thenewstack.io',
    'html5rocks.com',
    'html.com',
    'javascript.info',
    'css-tricks.com',
    'developer.apple.com',
  ];

  if (articleHostnames.includes(hostname)) {
    return 'article';
  }

  if (videoHostnames.includes(hostname)) {
    return 'video';
  }

  if (courseHostnames.includes(hostname)) {
    return 'course';
  }

  if (podcastHostnames.includes(hostname)) {
    return 'podcast';
  }

  if (opensourceHostnames.includes(hostname)) {
    return 'opensource';
  }

  if (hostname === 'roadmap.sh') {
    return 'website';
  }

  return '';
}

function readNestedMarkdownFiles(dir, files = []) {
  const dirEnts = fs.readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirEnts) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      readNestedMarkdownFiles(fullPath, files);
    } else {
      if (path.extname(fullPath) === '.md') {
        files.push(fullPath);
      }
    }
  }

  return files;
}

const files = readNestedMarkdownFiles(roadmapDir);

// for each of the files, assign the type of link to the beginning of each markdown link
// i.e. - [@article@abc](xyz) where @article@ is the type of link. Possible types:
// - @article@
// - @course@
// - @opensource@
// - @podcast@
// - @video@
// - @website@
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  const newContent = lines.map((line) => {
    if (line.startsWith('- [')) {
      const type = line.match(/@(\w+)@/);
      if (type) {
        return line;
      }

      let fullUrl = line.match(/\((https?:\/\/[^)]+)\)/)?.[1];
      if (!fullUrl) {
        // is it slashed URL i.e. - [abc](/xyz)
        fullUrl = line.match(/\((\/[^)]+)\)/)?.[1];
        if (fullUrl) {
          fullUrl = `https://roadmap.sh${fullUrl}`;
        }

        if (!fullUrl) {
          console.error('No URL found in line:', line);
          return;
        }
      }

      const url = new URL(fullUrl);
      const hostname = url.hostname;

      const urlType =
        getTypeFromHostname(hostname) ||
        (isOfficialWebsite(hostname, file, roadmapId) ? 'official' : '');

      if (urlType === 'official') {
        console.log('Official:', hostname);
        process.exit(0);
      }

      if (!urlType) {
        console.error('Missing type:', hostname);
        return;
      }
    }

    return line;
  });

  console.log(file);
});
