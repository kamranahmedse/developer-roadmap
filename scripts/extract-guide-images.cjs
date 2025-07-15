// get all the base64 encoded images and save them to a file from the given markdown file

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const guidePath = path.join(process.cwd(), 'src/data/guides');
const tempDir = path.join(process.cwd(), '.temp');

const guideId = process.argv[2];
if (!guideId) {
  console.error('Guide ID is required');
  process.exit(1);
}

const guideContent = fs.readFileSync(
  path.join(guidePath, `${guideId}.md`),
  'utf8',
);

// Create temp directory if it doesn't exist
const guideTempDir = path.join(tempDir, guideId);
if (!fs.existsSync(guideTempDir)) {
  fs.mkdirSync(guideTempDir, { recursive: true });
}

const { data, content } = matter(guideContent);

// Find all base64 image references in the content
const images = content.match(/\[(.+?)\]:\s+?<data:image\/([^;]+);base64,([^\s]+)/g);

if (images) {
  images.forEach((image) => {
    const imageName = image.match(/\[(.+?)\]/)[1];
    const imageExtension = image.match(/<data:image\/([^;]+);base64/)[1];
    const imageData = image.match(/base64,([^\s]+)/)[1];

    // Write file using Buffer to properly decode base64
    fs.writeFileSync(
      path.join(guideTempDir, `${imageName}.${imageExtension}`),
      Buffer.from(imageData, 'base64')
    );
  });
}
