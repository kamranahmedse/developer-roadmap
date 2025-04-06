#!/usr/bin/env bash

set -e

# Remove old editor
rm -rf editor

if [ ! -d ".temp/web-draw" ]; then
  git clone ssh://git@github.com/roadmapsh/web-draw.git .temp/web-draw --depth 1
fi

# Make dir
mkdir -p packages/editor
mkdir -p packages/editor/dist

# Copy the editor dist, package.json
cp -rf .temp/web-draw/packages/dummy-editor/dist packages/editor
cp -rf .temp/web-draw/packages/dummy-editor/package.json packages/editor

# replace the @roadmapsh/dummy-editor with @roadmapsh/editor
sed -i '' 's/@roadmapsh\/dummy-editor/@roadmapsh\/editor/g' packages/editor/package.json

# Remove temp directory
rm -rf .temp

# Reinstall so that the editor which was setup gets used
rm -rf node_modules
pnpm install
