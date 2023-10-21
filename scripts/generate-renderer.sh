-#!/usr/bin/env bash

set -e

# ignore cloning if .temp/web-draw already exists
if [ ! -d ".temp/web-draw" ]; then
  mkdir -p .temp
  git clone git@github.com:roadmapsh/web-draw.git .temp/web-draw
fi

rm -rf editor
mkdir editor

# copy the files at /src/editor/* to /editor
# while replacing any existing files
cp -rf .temp/web-draw/src/editor/* editor

# Add @ts-nocheck to the top of each ts and tsx file
# so that the typescript compiler doesn't complain
# about the missing types
find editor -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
  if [ -f "$file" ]; then
    echo "// @ts-nocheck" > temp
    cat "$file" >> temp
    mv temp "$file"
    echo "Added @ts-nocheck to $file"
  fi
done


# ignore the worktree changes for the editor directory
git update-index --assume-unchanged editor/readonly-editor.tsx