import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allowedOfficialRoadmapTopicResourceType } from './lib/official-roadmap-topic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROADMAP_CONTENT_DIR = path.join(__dirname, '../roadmaps');

const args = process.argv.slice(2);
const filesArg = args
  .find((arg) => arg.startsWith('--files='))
  ?.replace('--files=', '');
const validateAll = args.includes('--all');

const contentFilenamePattern = /^(.+)@([^.]+)\.md$/;
const resourceLinkPattern = /^- \[@([a-z.]+)@(.+?)\]\((\S+)\)$/;
const maxResourcesPerTopic = 8;

interface ValidationIssue {
  line: number | null;
  message: string;
}

interface ValidationResult {
  file: string;
  issues: ValidationIssue[];
}

function resolveFiles(files: string[]): string[] {
  const resolved: string[] = [];

  for (const file of files) {
    const normalizedPath = file.replace(/\\/g, '/');
    const isContentFile =
      normalizedPath.endsWith('.md') && normalizedPath.includes('content/');
    if (!isContentFile) {
      console.log(`🚨 Skipping ${file} because it is not a content file`);
      continue;
    }

    const filePath = path.join(process.cwd(), file);
    resolved.push(filePath);
  }

  return resolved;
}

async function getAllContentFiles(): Promise<string[]> {
  const roadmapsDir = await fs.readdir(ROADMAP_CONTENT_DIR);
  const files: string[] = [];

  for (const roadmapSlug of roadmapsDir) {
    const contentDir = path.join(ROADMAP_CONTENT_DIR, roadmapSlug, 'content');
    const stat = await fs
      .stat(contentDir)
      .then(() => true)
      .catch(() => false);
    if (!stat) {
      continue;
    }

    const contentFiles = await fs.readdir(contentDir);
    for (const file of contentFiles) {
      if (file.endsWith('.md')) {
        files.push(path.join(contentDir, file));
      }
    }
  }

  return files;
}

async function validateFile(filePath: string): Promise<ValidationResult> {
  const relativePath = path
    .relative(process.cwd(), filePath)
    .replace(/\\/g, '/');
  const issues: ValidationIssue[] = [];

  const fileName = path.basename(filePath);
  const filenameMatch = fileName.match(contentFilenamePattern);
  if (!filenameMatch) {
    issues.push({
      line: null,
      message: `Invalid file name "${fileName}", expected <topic-slug>@<node-id>.md`,
    });
  }

  const content = await fs.readFile(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  const firstNonEmptyLineIndex = lines.findIndex((line) => line.trim() !== '');
  if (firstNonEmptyLineIndex === -1) {
    issues.push({ line: null, message: 'File is empty' });
    return { file: relativePath, issues };
  }

  const firstLine = lines[firstNonEmptyLineIndex];
  const titleMatch = firstLine.match(/^# (.+)$/);
  if (!titleMatch || !titleMatch[1].trim()) {
    issues.push({
      line: firstNonEmptyLineIndex + 1,
      message: 'Missing "# Topic Title" heading as the first line',
    });
  }

  const resourceLines: { line: number; raw: string }[] = [];

  lines.forEach((line, index) => {
    if (line.trim().startsWith('- [@')) {
      resourceLines.push({ line: index + 1, raw: line.trim() });
    }
  });

  for (const resourceLine of resourceLines) {
    const match = resourceLine.raw.match(resourceLinkPattern);
    if (!match) {
      issues.push({
        line: resourceLine.line,
        message: `Malformed resource link, expected - [@type@Title](url)`,
      });
      continue;
    }

    const [, type, title, url] = match;

    if (
      !(allowedOfficialRoadmapTopicResourceType as readonly string[]).includes(
        type,
      )
    ) {
      issues.push({
        line: resourceLine.line,
        message: `Invalid resource type "@${type}@", expected one of: ${allowedOfficialRoadmapTopicResourceType.join(', ')}`,
      });
    }

    if (!title.trim()) {
      issues.push({
        line: resourceLine.line,
        message: 'Resource link title is empty',
      });
    }

    if (url.includes('geeksforgeeks.org')) {
      issues.push({
        line: resourceLine.line,
        message: 'GeeksforGeeks links are not allowed',
      });
    }
  }

  if (resourceLines.length > maxResourcesPerTopic) {
    issues.push({
      line: resourceLines[maxResourcesPerTopic].line,
      message: `Found ${resourceLines.length} resource links, maximum allowed is ${maxResourcesPerTopic}`,
    });
  }

  return { file: relativePath, issues };
}

function getNodeIdKey(filePath: string): string | null {
  const fileName = path.basename(filePath);
  const match = fileName.match(contentFilenamePattern);
  if (!match) {
    return null;
  }

  const roadmapSlug = path
    .dirname(path.dirname(filePath))
    .split(path.sep)
    .pop();

  return `${roadmapSlug}/${match[2]}`;
}

async function findDuplicateNodeIds(
  targetFiles: string[],
  scanFiles: string[],
): Promise<Map<string, string[]>> {
  const byNodeId = new Map<string, string[]>();

  for (const filePath of scanFiles) {
    const key = getNodeIdKey(filePath);
    if (!key) {
      continue;
    }

    const existing = byNodeId.get(key) ?? [];
    existing.push(path.basename(filePath));
    byNodeId.set(key, existing);
  }

  const targetKeys = new Set(
    targetFiles
      .map((filePath) => getNodeIdKey(filePath))
      .filter((key): key is string => key !== null),
  );

  const duplicates = new Map<string, string[]>();
  for (const [key, fileNames] of byNodeId) {
    if (fileNames.length > 1 && targetKeys.has(key)) {
      duplicates.set(key, fileNames);
    }
  }

  return duplicates;
}

async function main() {
  let filesToValidate: string[];

  if (validateAll) {
    console.log('🔍 Validating all content files...');
    filesToValidate = await getAllContentFiles();
  } else {
    const files =
      filesArg
        ?.split(',')
        .map((file) => file.trim())
        .filter(Boolean) || [];
    if (files.length === 0) {
      console.error(
        'Usage: tsx scripts/validate-content.ts --files=path/to/file.md,path/to/other.md',
      );
      console.error('       tsx scripts/validate-content.ts --all');
      process.exit(1);
    }

    filesToValidate = resolveFiles(files);
    if (filesToValidate.length === 0) {
      console.error('❌ No content files found to validate');
      process.exit(1);
    }
  }

  console.log(`🚀 Validating ${filesToValidate.length} file(s)...`);

  const results: ValidationResult[] = [];
  for (const filePath of filesToValidate) {
    results.push(await validateFile(filePath));
  }

  const scanFiles = validateAll ? filesToValidate : await getAllContentFiles();
  const duplicateNodeIds = await findDuplicateNodeIds(
    filesToValidate,
    scanFiles,
  );

  let failedFiles = 0;
  for (const result of results) {
    if (result.issues.length === 0) {
      continue;
    }

    failedFiles++;
    console.error(`❌ ${result.file}`);
    for (const issue of result.issues) {
      const lineInfo = issue.line !== null ? `:${issue.line}` : '';
      console.error(`  - ${lineInfo} ${issue.message}`);
    }
  }

  for (const [key, fileNames] of duplicateNodeIds) {
    failedFiles++;
    console.error(
      `❌ ${key} is used by multiple content files: ${fileNames.join(', ')}`,
    );
  }

  if (failedFiles > 0) {
    console.error(`❌ Validation failed for ${failedFiles} file(s)`);
    process.exit(1);
  }

  console.log(`✅ Successfully validated ${results.length} file(s)`);
}

main().catch((error) => {
  console.error('❌ Validation failed with error:');
  console.error(error);
  process.exit(1);
});
