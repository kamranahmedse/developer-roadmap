#!/usr/bin/env bash

set -e

rm -rf .temp
git clone git@github.com:roadmapsh/web-draw.git .temp/web-draw

# copy the files at /src/editor/renderer/* to /renderer
# while replacing any existing files
cp -rf .temp/web-draw/src/editor/renderer/* renderer

# remove the temporary directory
rm -rf .temp

# ignore the worktree changes for the renderer directory
git update-index --skip-worktree renderer
