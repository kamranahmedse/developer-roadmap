#!/usr/bin/env tsx

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const roadmapsDir = path.join(process.cwd(), 'src/data/roadmaps');

const roadmapIds = fs.readdirSync(roadmapsDir)
  .filter(item => {
    const fullPath = path.join(roadmapsDir, item);
    return fs.statSync(fullPath).isDirectory();
  });

console.log(`Found ${roadmapIds.length} roadmaps to process...`);

const promises = roadmapIds.map(roadmapId => {
  return new Promise((resolve, reject) => {
    console.log(`Processing: ${roadmapId}`);
    
    try {
      execSync(`npm run roadmap-assets ${roadmapId}`, {
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log(`✓ Completed: ${roadmapId}`);
      resolve(roadmapId);
    } catch (error) {
      console.error(`✗ Failed: ${roadmapId}`, error);
      reject(error);
    }
  });
});

Promise.allSettled(promises).then(results => {
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(`\n=== Summary ===`);
  console.log(`✓ Successful: ${successful}/${roadmapIds.length}`);
  if (failed > 0) {
    console.log(`✗ Failed: ${failed}/${roadmapIds.length}`);
  }
});