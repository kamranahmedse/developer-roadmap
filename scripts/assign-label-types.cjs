const fs = require('node:fs');
const path = require('node:path');

const allRoadmapDirs = fs.readdirSync(
  path.join(__dirname, '../src/data/roadmaps'),
);

allRoadmapDirs.forEach((roadmapId) => {
  const roadmapDir = path.join(
    __dirname,
    `../src/data/roadmaps/${roadmapId}/content`,
  );

  function getHostNameWithoutTld(hostname) {
    const parts = hostname.split('.');
    return parts.slice(0, parts.length - 1).join('.');
  }

  function isOfficialWebsite(hostname, fileName, roadmapId) {
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
  function getTypeFromHostname(hostname, fileName, roadmapId) {
    hostname = hostname.replace('www.', '');

    const videoHostnames = ['youtube.com', 'vimeo.com', 'youtu.be'];
    const courseHostnames = ['coursera.org', 'udemy.com', 'edx.org'];
    const podcastHostnames = ['spotify.com', 'apple.com'];
    const opensourceHostnames = ['github.com', 'gitlab.com'];
    const articleHostnames = [
      'neilpatel.com',
      'learningseo.io',
      'htmlreference.io',
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
      return 'roadmap.sh';
    }

    if (isOfficialWebsite(hostname, fileName, roadmapId)) {
      return 'official';
    }

    return 'article';
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
  // - @official@
  // - @opensource@
  // - @article@
  // - @course@
  // - @opensource@
  // - @podcast@
  // - @video@
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    const newContent = lines
      .map((line) => {
        if (line.startsWith('- [') && !line.startsWith('- [@')) {
          const type = line.match(/@(\w+)@/);
          if (type) {
            return line;
          }

          let urlMatches = line.match(/\((https?:\/\/[^)]+)\)/);
          let fullUrl = urlMatches?.[1];

          if (!fullUrl) {
            // is it slashed URL i.e. - [abc](/xyz)
            fullUrl = line.match(/\((\/[^)]+)\)/)?.[1];
            if (fullUrl) {
              fullUrl = `https://roadmap.sh${fullUrl}`;
            }

            if (!fullUrl) {
              console.error('Invalid URL found in:', file);
              return line;
            }
          }

          const url = new URL(fullUrl);
          const hostname = url.hostname;

          let urlType = getTypeFromHostname(hostname, file, roadmapId);
          const linkText = line.match(/\[([^\]]+)\]/)[1];

          if (
            linkText.toLowerCase().startsWith('visit dedicated') &&
            linkText.toLowerCase().endsWith('roadmap')
          ) {
            urlType = 'roadmap';
          }

          return line.replace('- [', `- [@${urlType}@`).replace('](', '](');
        }

        return line;
      })
      .join('\n');

    fs.writeFileSync(file, newContent);
  });
});
