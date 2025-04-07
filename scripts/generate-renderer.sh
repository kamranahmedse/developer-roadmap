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
cp -rf .temp/web-draw/packages/editor/dist packages/editor
cp -rf .temp/web-draw/packages/editor/package.json packages/editor

# Remove temp directory
rm -rf .temp

# Reinstall so that the editor which was setup gets used
rm -rf node_modules
pnpm install
