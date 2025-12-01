import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const roadmapSlug = args
  .find((arg) => arg.startsWith('--roadmap='))
  ?.replace('--roadmap=', '');
const secret = args
  .find((arg) => arg.startsWith('--secret='))
  ?.replace('--secret=', '');

if (!roadmapSlug) {
  console.error('❌ Roadmap slug is required. Use --roadmap=<slug>');
  console.error('   Example: npm run sync:roadmap -- --roadmap=frontend --secret=<secret>');
  process.exit(1);
}

if (!secret) {
  console.error('❌ Secret is required. Use --secret=<secret>');
  console.error('   Example: npm run sync:roadmap -- --roadmap=frontend --secret=<secret>');
  process.exit(1);
}

const roadmapDir = path.join(__dirname, '../src/data/roadmaps', roadmapSlug);

if (!fs.existsSync(roadmapDir)) {
  console.error(`❌ Roadmap directory not found: ${roadmapDir}`);
  process.exit(1);
}

console.log(`🔍 Finding all content files in: ${roadmapDir}`);

function getAllFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const allFiles = getAllFiles(roadmapDir);
const relativeFiles = allFiles.map((file) =>
  file.replace(path.join(__dirname, '../'), ''),
);

console.log(`📁 Found ${relativeFiles.length} files`);

if (relativeFiles.length === 0) {
  console.log('⚠️ No files found to sync');
  process.exit(0);
}

const filesArg = relativeFiles.join(',');

console.log(`🚀 Syncing roadmap "${roadmapSlug}" to database...`);

try {
  execSync(
    `npx tsx ./scripts/sync-repo-to-database.ts --files="${filesArg}" --secret=${secret}`,
    {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    },
  );
  console.log(`✅ Successfully synced roadmap "${roadmapSlug}" to database`);
} catch (error) {
  console.error(`❌ Failed to sync roadmap "${roadmapSlug}" to database`);
  process.exit(1);
}
