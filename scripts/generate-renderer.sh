#!/usr/bin/env bash

set -e

if [ ! -d ".temp/web-draw" ]; then
  git clone ssh://git@github.com/roadmapsh/web-draw.git .temp/web-draw --depth 1
fi

cd .temp/web-draw
pnpm install
npm run build -- --filter=@roadmapsh/editor

# Remove old editor
rm -rf editor

# Copy new editor
cp -rf packages/editor ../../editor

cd ../../

editor_changed_files=$(git ls-files -m editor)

echo $editor_changed_files

# for each of the changed files, assume they are unchanged
for file in $editor_changed_files; do
  echo "Assuming $file is unchanged"
  git update-index --assume-unchanged $file
done

# Remove temp directory
rm -rf .temp

# Reinstall so that the editor which was setup gets used
rm -rf node_modules
pnpm install

git checkout -- pnpm-lock.yaml