import { readdir, rm } from 'fs/promises';
import { join } from 'path';
import puppeteer from 'puppeteer';
import { getRoadmaps } from '../src/lib/roadmap';
import { Roadmap } from '../src/lib/roadmap';

async function refreshRoadmapAssets(roadmapId: string) {
  // Validate roadmapId to prevent path traversal.
  if (/[/\\]|\.\./.test(roadmapId)) {
    throw new Error(
      `Invalid roadmapId, contains path traversal characters: ${roadmapId}`,
    );
  }

  const roadmapUrl = `http://localhost:3000/${roadmapId}?print=true`;
  const roadmapImage = `public/roadmaps/${roadmapId}.png`;
  const roadmapThumb = `public/roadmaps/${roadmapId}.thumb.png`;

  // Remove the old assets
  const assetsDir = join('public', 'roadmaps');
  try {
    // Validate roadmapId to prevent command injection
    if (!/^[a-zA-Z0-9_-]+$/.test(roadmapId)) {
      throw new Error(`Invalid roadmapId: ${roadmapId}`);
    }

    // Use spawn instead of exec to prevent command injection
    const { spawn } = require("child_process");
    const child = spawn("git", ["log", "--format=%H", "-n", "1", "--", `src/data/roadmaps/${roadmapId}`], {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"]
    });

    let output = "";
    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    return new Promise((resolve, reject) => {
      child.on("close", (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });
      child.on("error", reject);
    });
    const assetsToRemove = allAssets.filter((asset) =>
      asset.startsWith(roadmapId),
    );

    await Promise.all(
      assetsToRemove.map((asset) =>
        rm(join(assetsDir, asset), { recursive: true, force: true }),
      ),
    );
  } catch (error: any) {
    // Ignore if the directory doesn't exist, otherwise rethrow.
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
  });

  await page.goto(roadmapUrl, {
    waitUntil: 'networkidle0',
  });

  const roadmapElement = await page.$('.roadmap-container');
  if (!roadmapElement) {
    await browser.close();
    return;
  }

  await roadmapElement.screenshot({
    path: roadmapImage,
    type: 'png',
  });

  // Create a thumbnail
  await roadmapElement.screenshot({
    path: roadmapThumb,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1440,
      height: 200,
    },
  });

  await browser.close();
}

(async function () {
  const roadmaps = getRoadmaps();
  for (const roadmap of roadmaps) {
    await refreshRoadmapAssets(roadmap.id);
  }
})();
