#!/usr/bin/env bash

set -e

# Change working directory to the directory of this script
cd "$(dirname "$0")"

if [ ! -d "./developer-roadmap" ]; then
  git clone --depth 1 -b master git@github.com:kamranahmedse/developer-roadmap.git
fi

echo "Removing old directories"
rm -rf ../src/videos
rm -rf ../src/guides
rm -rf ../src/roadmaps

rm -rf ../public/jsons
rm -rf ../public/pdfs

echo "=== Migrating Roadmaps ==="
node roadmap-migrator.cjs

echo "=== Migrating Content ==="
node content-migrator.cjs

echo "=== Migrating Guides ==="
node guide-migrator.cjs

echo "=== Migrating Videos ==="
node video-migrator.cjs
