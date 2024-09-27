import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// ERROR: `__dirname` is not defined in ES module scope
// https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedFileExtensions = [
  '.avif',
  '.gif',
  '.heif',
  '.jpeg',
  '.png',
  '.raw',
  '.tiff',
  '.webp',
] as const;
type AllowedFileExtension = (typeof allowedFileExtensions)[number];

const publicDir = path.join(__dirname, '../public');
const cacheFile = path.join(__dirname, '/compressed-images.json');

const KB_IN_BYTES = 1024;
const COMPRESS_CONFIG = {
  avif: {
    chromaSubsampling: '4:4:4',
    effort: 9.0,
  },
  gif: {
    effort: 10.0,
  },
  jpeg: {
    chromaSubsampling: '4:4:4',
    mozjpeg: true,
    trellisQuantisation: true,
    overshootDeringing: true,
    optimiseScans: true,
  },
  png: {
    compressionLevel: 9.0,
    palette: true,
  },
  raw: {},
  tiff: {
    compression: 'lzw',
  },
  webp: {
    effort: 6.0,
  },
};

(async () => {
  let cache: string[] = [];
  const isCacheFileExists = await fs
    .access(cacheFile)
    .then(() => true)
    .catch(() => false);

  if (isCacheFileExists) {
    const cacheFileContent = await fs.readFile(cacheFile, 'utf8');
    cache = JSON.parse(cacheFileContent);
  }

  const images = await recursiveGetImages(publicDir);
  for (const image of images) {
    const extname = path.extname(image).toLowerCase() as AllowedFileExtension;
    if (
      !allowedFileExtensions.includes(extname) ||
      image.includes('node_modules') ||
      image.includes('.astro') ||
      image.includes('.vscode') ||
      image.includes('.git')
    ) {
      continue;
    }

    const stats = await fs.stat(image);
    const relativeImagePath = path.relative(path.join(__dirname, '..'), image);
    if (cache.includes(relativeImagePath)) {
      continue;
    }

    const prevSize = stats.size / KB_IN_BYTES;

    let imageBuffer: Buffer | undefined;
    switch (extname) {
      case '.avif':
        imageBuffer = await sharp(image).avif(COMPRESS_CONFIG.avif).toBuffer();
        break;
      case '.heif':
        imageBuffer = await sharp(image).heif().toBuffer();
        break;
      case '.jpeg':
        imageBuffer = await sharp(image).jpeg(COMPRESS_CONFIG.jpeg).toBuffer();
        break;
      case '.png':
        imageBuffer = await sharp(image).png(COMPRESS_CONFIG.png).toBuffer();
        break;
      case '.raw':
        imageBuffer = await sharp(image).raw().toBuffer();
        break;
      case '.tiff':
        imageBuffer = await sharp(image).tiff(COMPRESS_CONFIG.tiff).toBuffer();
        break;
      case '.webp':
        imageBuffer = await sharp(image).webp(COMPRESS_CONFIG.webp).toBuffer();
        break;
      case '.gif':
        continue;
    }

    if (!imageBuffer) {
      console.error(`❌ ${image} Compressing failed!`);
      continue;
    }

    const newSize = imageBuffer.length / KB_IN_BYTES;
    const diff = prevSize - newSize;
    if (diff <= 0) {
      console.log(`📦 Skipped ${relativeImagePath}`);
      continue;
    }

    const diffPercent = ((diff / prevSize) * 100).toFixed(2);
    console.log(
      `📦 Reduced ${prevSize.toFixed(2)}KB → ${newSize.toFixed(2)}KB (${diff.toFixed(2)}KB, ${diffPercent}%) for ${relativeImagePath}`,
    );

    await fs.writeFile(image, imageBuffer);
    cache.push(relativeImagePath);

    // So that we don't lose the cache if the script crashes
    await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
  }

  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
})();

async function recursiveGetImages(dir: string): Promise<string[]> {
  const subdirs = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    subdirs.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? recursiveGetImages(res) : res;
    }),
  );

  return Array.prototype.concat(...files);
}
